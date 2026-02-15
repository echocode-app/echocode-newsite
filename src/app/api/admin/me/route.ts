import { bootstrapAdminIfAllowed, getAuthenticatedUserProfile } from '@/server/auth';
import { ADMIN_ACCESS_PERMISSION } from '@/server/auth/roles';
import { requirePermission } from '@/server/middlewares';
import { ApiError, withApi } from '@/server/lib';

export const runtime = 'nodejs';

/** Thin controller: auth bootstrap + trusted user profile response */
export const GET = withApi(
  async ({ auth }) => {
    if (!auth) {
      throw ApiError.fromCode('UNAUTHORIZED', 'Auth context is required for /api/admin/me');
    }

    const authContext = auth;
    // Allowlisted users can be bootstrapped before strict permission enforcement.
    await bootstrapAdminIfAllowed(authContext.uid, authContext.email ?? undefined);
    requirePermission(authContext, ADMIN_ACCESS_PERMISSION);
    return getAuthenticatedUserProfile(authContext.uid);
  },
  { auth: true },
);

// curl http://localhost:3000/api/admin/me
