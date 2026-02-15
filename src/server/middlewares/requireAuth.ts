import { extractIdToken, verifyIdToken } from '@/server/auth/auth.service';
import { ApiError } from '@/server/lib/errors';
import { isRole, type Role } from '@/server/auth/roles';

/** Authenticated request context derived from a verified Firebase ID token */
export type AuthContext = {
  uid: string;
  email: string | null;
  claims: Awaited<ReturnType<typeof verifyIdToken>>['claims'];
  role: Role | null;
};

/** Verifies bearer token and returns normalized auth context for handlers/services */
export async function requireAuth(
  request: Pick<Request, 'headers'>,
): Promise<AuthContext> {
  try {
    const token = extractIdToken(request);
    const verified = await verifyIdToken(token);
    const roleClaim = verified.claims.role;
    const role = isRole(roleClaim) ? roleClaim : null;

    return {
      uid: verified.uid,
      email: verified.email ?? null,
      claims: verified.claims,
      role,
    };
  } catch (cause) {
    if (cause instanceof ApiError) throw cause;
    throw ApiError.fromCode('AUTH_INVALID_TOKEN', 'Invalid or expired token', { cause });
  }
}
