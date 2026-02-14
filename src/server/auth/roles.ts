import { env } from '@/server/config/env';

export type Role = 'admin' | 'developer' | 'manager';

export type Permission =
  | '*'
  | 'admin.access'
  | 'submissions.read'
  | 'submissions.updateStatus'
  | 'vacancies.write'
  | 'portfolio.write'
  | 'audit.read';

export const ADMIN_ACCESS_PERMISSION = 'admin.access';

const developerPermissions: readonly Permission[] =
  env.nodeEnv === 'development' ? ['*'] : [];

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  admin: ['*'],
  // Keep development friction low, but lock developer access in non-dev environments.
  developer: developerPermissions,
  manager: [
    'submissions.read',
    'submissions.updateStatus',
    'vacancies.write',
    'portfolio.write',
    'audit.read',
  ],
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
