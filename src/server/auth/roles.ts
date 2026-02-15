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
const MANAGER_ALLOWED_PERMISSIONS: readonly Exclude<Permission, '*'>[] = [
  'admin.access',
  'submissions.read',
  'submissions.updateStatus',
  'vacancies.write',
  'portfolio.write',
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
  // Manager has explicit business permissions and cannot auto-inherit future sensitive scopes.
  manager: MANAGER_ALLOWED_PERMISSIONS,
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
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes('*') || permissions.includes(permission);
}
