import type { Auth, DecodedIdToken, UserRecord } from 'firebase-admin/auth';
import { getAuth } from 'firebase-admin/auth';
import { ApiError } from '@/server/lib/errors';
import { getFirebaseAdminApp } from '@/server/firebase/app';
import { assertServerOnly } from '@/server/lib/serverOnly';

// Revocation-sensitive auth utilities must never leak into client bundles.
assertServerOnly('src/server/firebase/auth');

/** Returns the singleton Firebase Auth admin client. */
export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseAdminApp());
}

export type FirebaseDecodedIdToken = DecodedIdToken;

/** Verifies an ID token and enforces revocation checks for privileged APIs. */
export async function verifyFirebaseIdToken(
  token: string,
  checkRevoked = true,
): Promise<DecodedIdToken> {
  try {
    return await getFirebaseAuth().verifyIdToken(token, checkRevoked);
  } catch (cause) {
    throw new ApiError(
      'UNAUTHORIZED',
      401,
      'Invalid, expired, or revoked token',
      { publicMessage: 'Unauthorized', cause },
    );
  }
}

export async function getFirebaseUser(uid: string): Promise<UserRecord> {
  try {
    return await getFirebaseAuth().getUser(uid);
  } catch (cause) {
    throw new ApiError(
      'INTERNAL_ERROR',
      500,
      'Failed to load Firebase user',
      { publicMessage: 'Unexpected server error', cause },
    );
  }
}

export async function setFirebaseCustomUserClaims(
  uid: string,
  claims: Record<string, unknown>,
): Promise<void> {
  try {
    await getFirebaseAuth().setCustomUserClaims(uid, claims);
  } catch (cause) {
    throw new ApiError(
      'INTERNAL_ERROR',
      500,
      'Failed to update Firebase custom claims',
      { publicMessage: 'Unexpected server error', cause },
    );
  }
}

export function isFirebaseAuthAvailable(): boolean {
  try {
    getFirebaseAuth();
    return true;
  } catch (cause) {
    throw new ApiError(
      'SERVICE_UNAVAILABLE',
      503,
      'Firebase Auth service is unavailable',
      { publicMessage: 'Service unavailable', cause },
    );
  }
}
