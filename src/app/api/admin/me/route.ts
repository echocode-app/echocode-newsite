import { bootstrapAdminIfAllowed, getAuthenticatedUserProfile } from '@/server/auth';
import { ApiError, withAdminApi } from '@/server/lib';

export const runtime = 'nodejs';

/** Thin controller: auth bootstrap + trusted user profile response */
export const GET = withAdminApi(
  async ({ auth }) => {
    if (!auth) {
      throw ApiError.fromCode('UNAUTHORIZED', 'Auth context is required for /api/admin/me');
    }

    const authContext = auth;
    await bootstrapAdminIfAllowed(authContext.uid, authContext.email ?? undefined);
    return getAuthenticatedUserProfile(authContext.uid);
  },
);

// curl http://localhost:3000/api/admin/me
