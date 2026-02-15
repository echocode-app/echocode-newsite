// Expose only high-level Firebase admin capabilities to the rest of the backend.
export {
  getFirebaseAuth,
  getFirebaseUser,
  isFirebaseAuthAvailable,
  setFirebaseCustomUserClaims,
  verifyFirebaseIdToken,
} from '@/server/firebase/auth';
export { getFirestoreDb, runFirestoreSmokeCheck } from '@/server/firebase/firestore';
export {
  checkFirebaseStorageAvailability,
  getFirebaseStorageBucket,
} from '@/server/firebase/storage';
