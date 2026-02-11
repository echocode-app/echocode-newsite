import { auth } from '@/server/firebase/admin';
import { env } from '@/server/config/env';
import { ApiError } from '@/server/lib/errors';
import { isRole, type Role } from '@/server/auth/roles';

/** Minimal authenticated user profile returned to API consumers */
export type AuthenticatedUserProfile = {
  uid: string;
  email: string | null;
  role: Role | null;
};

/** Bootstraps developer role only for allowlisted emails that currently have no role */
export async function bootstrapAdminIfAllowed(
  uid: string,
  email?: string
): Promise<void> {
  if (!email) return;

  if (!env.adminBootstrapEmails.includes(email.toLowerCase())) return;

  let user;
  try {
    user = await auth.getUser(uid);
  } catch (cause) {
    throw new ApiError(
      'INTERNAL_ERROR',
      500,
      'Failed to load Firebase user during admin bootstrap',
      { publicMessage: 'Unexpected server error', cause },
    );
  }

  if (isRole(user.customClaims?.role)) return;

  try {
    await auth.setCustomUserClaims(uid, {
      ...(user.customClaims ?? {}),
      role: 'developer',
    });
    await auth.getUser(uid);
  } catch (cause) {
    throw new ApiError(
      'INTERNAL_ERROR',
      500,
      'Failed to set Firebase custom claims',
      { publicMessage: 'Unexpected server error', cause },
    );
  }
}

/** Loads latest server-trusted user profile from Firebase Admin SDK */
export async function getAuthenticatedUserProfile(
  uid: string,
): Promise<AuthenticatedUserProfile> {
  let user;
  try {
    user = await auth.getUser(uid);
  } catch (cause) {
    throw new ApiError(
      'INTERNAL_ERROR',
      500,
      'Failed to load Firebase user profile',
      { publicMessage: 'Unexpected server error', cause },
    );
  }

  return {
    uid: user.uid,
    email: user.email ?? null,
    role: isRole(user.customClaims?.role) ? user.customClaims.role : null,
  };
}
