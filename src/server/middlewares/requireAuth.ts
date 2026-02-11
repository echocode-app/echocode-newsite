import type { DecodedIdToken } from 'firebase-admin/auth';
import { auth } from '@/server/firebase/admin';
import { ApiError } from '@/server/lib/errors';
import { isRole, type Role } from '@/server/auth/roles';

/** Authenticated request context derived from a verified Firebase ID token */
export type AuthContext = {
  uid: string;
  email: string | null;
  token: DecodedIdToken;
  role: Role | null;
};

function parseBearerToken(authorizationHeader: string | null): string {
  if (!authorizationHeader?.startsWith('Bearer ')) {
    throw new ApiError(
      'UNAUTHORIZED',
      401,
      'Missing or invalid Authorization header',
      { publicMessage: 'Unauthorized' },
    );
  }

  const token = authorizationHeader.slice('Bearer '.length).trim();
  if (!token) {
    throw new ApiError(
      'UNAUTHORIZED',
      401,
      'Missing bearer token',
      { publicMessage: 'Unauthorized' },
    );
  }

  return token;
}

/** Verifies bearer token and returns normalized auth context for handlers/services */
export async function requireAuth(
  authorizationHeader: string | null,
): Promise<AuthContext> {
  const token = parseBearerToken(authorizationHeader);

  let decoded: DecodedIdToken;
  try {
    decoded = await auth.verifyIdToken(token);
  } catch (cause) {
    throw new ApiError(
      'UNAUTHORIZED',
      401,
      'Invalid or expired token',
      { publicMessage: 'Unauthorized', cause },
    );
  }

  const roleClaim = decoded.role;
  const role = isRole(roleClaim) ? roleClaim : null;

  return {
    uid: decoded.uid,
    email: decoded.email ?? null,
    token: decoded,
    role,
  };
}
