import type { Bucket } from '@google-cloud/storage';
import { getStorage } from 'firebase-admin/storage';
import { ApiError } from '@/server/lib/errors';
import { env } from '@/server/config/env';
import { getFirebaseAdminApp } from '@/server/firebase/app';
import { assertServerOnly } from '@/server/lib/serverOnly';

// Storage admin utilities are intentionally unavailable to client-side code.
assertServerOnly('src/server/firebase/storage');

/** Returns a centralized Storage bucket instance for server operations. */
export function getFirebaseStorageBucket(): Bucket {
  try {
    const storage = getStorage(getFirebaseAdminApp());
    const bucket = env.firebaseStorageBucket
      ? storage.bucket(env.firebaseStorageBucket)
      : storage.bucket();

    if (!bucket.name) {
      throw new ApiError(
        'SERVICE_UNAVAILABLE',
        503,
        'Firebase Storage bucket is not configured',
        { publicMessage: 'Service unavailable' },
      );
    }

    return bucket;
  } catch (cause) {
    if (cause instanceof ApiError) throw cause;

    throw new ApiError(
      'SERVICE_UNAVAILABLE',
      503,
      'Failed to initialize Firebase Storage bucket',
      { publicMessage: 'Service unavailable', cause },
    );
  }
}

/** Fetches bucket metadata to validate Storage availability and credentials. */
export async function checkFirebaseStorageAvailability(): Promise<{ bucket: string }> {
  const bucket = getFirebaseStorageBucket();

  try {
    await bucket.getMetadata();
  } catch (cause) {
    throw new ApiError(
      'SERVICE_UNAVAILABLE',
      503,
      'Firebase Storage service is unavailable',
      { publicMessage: 'Service unavailable', cause },
    );
  }

  return { bucket: bucket.name };
}
