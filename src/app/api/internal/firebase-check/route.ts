import { ADMIN_ACCESS_PERMISSION } from '@/server/auth/roles';
import { env } from '@/server/config/env';
import {
  checkFirebaseStorageAvailability,
  isFirebaseAuthAvailable,
  runFirestoreSmokeCheck,
} from '@/server/firebase';
import { requireAuth, requirePermission } from '@/server/middlewares';
import { ApiError, withApi } from '@/server/lib';

export const runtime = 'nodejs';

/** INTERNAL endpoint: validates Firebase Admin service connectivity. */
export const GET = withApi(async ({ req }) => {
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

  // Keep local development friction low, but enforce auth in stricter environments.
  if (env.nodeEnv !== 'development') {
    const auth = await requireAuth(req);
    requirePermission(auth, ADMIN_ACCESS_PERMISSION);
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
