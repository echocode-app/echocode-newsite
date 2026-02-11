import { App, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { env } from '@/server/config/env';

declare global {
  var __firebase_admin_app__: App | undefined;
}

/** Creates a Firebase Admin app exactly once per process */
function createFirebaseAdminApp(): App {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  return initializeApp({
    credential: cert({
      projectId: env.firebaseProjectId,
      clientEmail: env.firebaseClientEmail,
      privateKey: env.firebasePrivateKey,
    }),
  });
}

export const firebaseAdminApp =
  globalThis.__firebase_admin_app__ ?? createFirebaseAdminApp();

if (!globalThis.__firebase_admin_app__) {
  globalThis.__firebase_admin_app__ = firebaseAdminApp;
}

export const auth = getAuth(firebaseAdminApp);
export const firestore = getFirestore(firebaseAdminApp);
export const storage = getStorage(firebaseAdminApp);
