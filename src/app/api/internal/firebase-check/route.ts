import { env } from '@/server/config/env';
import {
  checkFirebaseStorageAvailability,
  isFirebaseAuthAvailable,
  runFirestoreSmokeCheck,
} from '@/server/firebase';
import { ApiError, withApi } from '@/server/lib';

export const runtime = 'nodejs';

/** INTERNAL endpoint: validates Firebase Admin service connectivity. */
export const GET = withApi(async () => {
  if (env.nodeEnv === 'production') {
    throw ApiError.fromCode(
      'INTERNAL_ENDPOINT_DISABLED',
      'Internal firebase-check endpoint is disabled in production',
    );
  }

  if (!env.internalFirebaseCheckEnabled) {
    throw ApiError.fromCode(
      'INTERNAL_ENDPOINT_DISABLED',
      'Internal firebase-check endpoint is disabled by configuration',
    );
  }

  isFirebaseAuthAvailable();
  const firestore = await runFirestoreSmokeCheck();
  // Storage is optional in local/dev projects without Blaze billing.
  const storage = env.firebaseCheckStorage
    ? await checkFirebaseStorageAvailability()
    : null;

  return {
    internal: true,
    status: 'ok',
    services: {
      auth: 'ok',
      firestore: 'ok',
      storage: storage ? 'ok' : 'skipped',
    },
    checks: {
      firestoreDocumentPath: firestore.documentPath,
      storageBucket: storage?.bucket ?? null,
    },
    timestamp: new Date().toISOString(),
  };
});

// curl http://localhost:3000/api/internal/firebase-check
