import { NextResponse } from 'next/server';
import { env } from '@/server/config/env';
import {
  checkFirebaseStorageAvailability,
  isFirebaseAuthAvailable,
  runFirestoreSmokeCheck,
} from '@/server/firebase';
import { ApiError, handleApiRoute } from '@/server/lib';

export const runtime = 'nodejs';

/** INTERNAL endpoint: validates Firebase Admin service connectivity. */
export async function GET(): Promise<NextResponse> {
  return handleApiRoute(async () => {
    if (env.nodeEnv === 'production') {
      throw new ApiError(
        'FORBIDDEN',
        403,
        'Internal firebase-check endpoint is disabled in production',
        { publicMessage: 'Forbidden' },
      );
    }

    const authOk = isFirebaseAuthAvailable();
    const firestore = await runFirestoreSmokeCheck();
    // Storage is optional in local/dev projects without Blaze billing.
    const storage = env.firebaseCheckStorage
      ? await checkFirebaseStorageAvailability()
      : null;

    return {
      internal: true,
      status: 'ok',
      services: {
        auth: authOk ? 'ok' : 'unavailable',
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
}

// curl http://localhost:3000/api/internal/firebase-check
