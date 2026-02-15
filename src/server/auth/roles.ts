import { env } from '@/server/config/env';

export type Role = 'admin' | 'developer' | 'manager';

export type Permission =
  | '*'
  | 'admin.access'
  | 'admin.settings'
  | 'submissions.read'
  | 'submissions.updateStatus'
  | 'vacancies.write'
  | 'portfolio.write'
  | 'audit.read';

export const ADMIN_ACCESS_PERMISSION = 'admin.access';
const MANAGER_DENIED_PERMISSIONS: readonly Exclude<Permission, '*'>[] = [
  'admin.settings',
  'audit.read',
];

const DEVELOPER_READONLY_PERMISSIONS: readonly Permission[] = [
  'admin.access',
  'submissions.read',
  'audit.read',
];

function resolveDeveloperPermissions(): readonly Permission[] {
  // Development always stays unrestricted for fast local delivery.
  if (env.nodeEnv === 'development') return ['*'];
  return env.developerAccessMode === 'full' ? ['*'] : DEVELOPER_READONLY_PERMISSIONS;
}

const developerPermissions = resolveDeveloperPermissions();

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  admin: ['*'],
  developer: developerPermissions,
  // Manager has full business access except explicit security/administration exclusions.
  manager: ['*'],
};

/** Runtime guard for role claims coming from external token/user payloads */
export function isRole(value: unknown): value is Role {
  return value === 'admin' || value === 'developer' || value === 'manager';
}

/** Evaluates role permissions, including wildcard ("*") grants */
export function hasPermission(
  role: Role,
  permission: Exclude<Permission, '*'>,
): boolean {
  if (role === 'manager' && MANAGER_DENIED_PERMISSIONS.includes(permission)) {
    return false;
  }

  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes('*') || permissions.includes(permission);
}
