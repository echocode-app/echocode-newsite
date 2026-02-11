import { type AuthContext } from '@/server/middlewares/requireAuth';
import { hasPermission, isRole, type Permission } from '@/server/auth/roles';
import { ApiError } from '@/server/lib/errors';

type RequiredPermission = Exclude<Permission, '*'>;
type PermissionMode = 'all' | 'any';

/** Enforces permission checks using role-permission mapping from the auth context */
export function requirePermission(
  authContext: AuthContext,
  permissions: RequiredPermission | readonly RequiredPermission[],
  mode: PermissionMode = 'all',
): void {
  const role = authContext.role;
  if (!role || !isRole(role)) {
    throw new ApiError(
      'FORBIDDEN',
      403,
      'Role is missing or invalid',
      { publicMessage: 'Forbidden' },
    );
  }

  const requested = Array.isArray(permissions) ? permissions : [permissions];
  const evaluator = mode === 'any' ? 'some' : 'every';
  const granted = requested[evaluator]((permission) => hasPermission(role, permission));

  if (!granted) {
    throw new ApiError(
      'FORBIDDEN',
      403,
      `Missing required permissions (${mode}): ${requested.join(', ')}`,
      { publicMessage: 'Forbidden' },
    );
  }
}
