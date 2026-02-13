import {
  verifyFirebaseIdToken,
  type FirebaseDecodedIdToken,
} from '@/server/firebase/auth';
import { ApiError } from '@/server/lib/errors';
import { isRole, type Role } from '@/server/auth/roles';

/** Authenticated request context derived from a verified Firebase ID token */
export type AuthContext = {
  uid: string;
  email: string | null;
  token: FirebaseDecodedIdToken;
  role: Role | null;
};

function parseBearerToken(authorizationHeader: string | null): string {
  if (!authorizationHeader) {
    throw ApiError.fromCode('UNAUTHORIZED', 'Missing or invalid Authorization header');
  }

  const bearerPrefixMatch = authorizationHeader.match(/^Bearer\s+/i);
  if (!bearerPrefixMatch) {
    throw ApiError.fromCode('UNAUTHORIZED', 'Missing or invalid Authorization header');
  }

  const token = authorizationHeader.slice(bearerPrefixMatch[0].length).trim();
  if (!token) {
    throw ApiError.fromCode('UNAUTHORIZED', 'Missing bearer token');
  }

  return token;
}

/** Verifies bearer token and returns normalized auth context for handlers/services */
export async function requireAuth(
  authorizationHeader: string | null,
): Promise<AuthContext> {
  const token = parseBearerToken(authorizationHeader);

  let decoded: FirebaseDecodedIdToken;
  try {
    decoded = await verifyFirebaseIdToken(token, true);
  } catch (cause) {
    if (cause instanceof ApiError) throw cause;
    throw ApiError.fromCode('UNAUTHORIZED', 'Invalid or expired token', {
      publicMessage: 'Unauthorized',
      cause,
    });
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
