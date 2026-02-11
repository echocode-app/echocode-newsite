export type Role = 'admin' | 'developer' | 'manager';

export type Permission =
  | '*'
  | 'submissions.read'
  | 'submissions.updateStatus'
  | 'vacancies.write'
  | 'portfolio.write'
  | 'audit.read';

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  admin: ['*'],
  developer: ['*'],
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
