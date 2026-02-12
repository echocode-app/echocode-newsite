import {
  getFirebaseUser,
  setFirebaseCustomUserClaims,
} from '@/server/firebase/auth';
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

  const user = await getFirebaseUser(uid);

  if (isRole(user.customClaims?.role)) return;

  try {
    await setFirebaseCustomUserClaims(uid, {
      ...(user.customClaims ?? {}),
      role: 'developer',
    });
    await getFirebaseUser(uid);
  } catch (cause) {
    if (cause instanceof ApiError) throw cause;
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
  const user = await getFirebaseUser(uid);

  return {
    uid: user.uid,
    email: user.email ?? null,
    role: isRole(user.customClaims?.role) ? user.customClaims.role : null,
  };
}
