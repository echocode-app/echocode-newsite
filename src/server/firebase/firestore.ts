import { nanoid } from 'nanoid';
import { FieldValue, Firestore, getFirestore } from 'firebase-admin/firestore';
import { ApiError } from '@/server/lib/errors';
import { getFirebaseAdminApp } from '@/server/firebase/app';
import { assertServerOnly } from '@/server/lib/serverOnly';

// Firestore admin access must stay server-only by design.
assertServerOnly('src/server/firebase/firestore');

/** Returns the singleton Firestore admin client. */
export function getFirestoreDb(): Firestore {
  return getFirestore(getFirebaseAdminApp());
}

/** Performs a temporary write/read/delete cycle to validate Firestore availability. */
export async function runFirestoreSmokeCheck(): Promise<{ documentPath: string }> {
  const firestore = getFirestoreDb();
  const docRef = firestore
    .collection('_internal_firebase_checks')
    .doc(`check_${Date.now()}_${nanoid(8)}`);

  try {
    await docRef.set({
      createdAt: FieldValue.serverTimestamp(),
      source: 'internal-firebase-check',
    });

    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      throw new ApiError(
        'SERVICE_UNAVAILABLE',
        503,
        'Firestore smoke check failed to read written document',
        { publicMessage: 'Service unavailable' },
      );
    }
  } catch (cause) {
    throw new ApiError(
      'SERVICE_UNAVAILABLE',
      503,
      'Firestore service is unavailable',
      { publicMessage: 'Service unavailable', cause },
    );
  } finally {
    // Best-effort cleanup keeps the health check collection from growing over time.
    await docRef.delete().catch(() => undefined);
  }

  return { documentPath: docRef.path };
}
