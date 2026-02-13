import {
  App,
  AppOptions,
  applicationDefault,
  cert,
  getApps,
  initializeApp,
} from 'firebase-admin/app';
import { env } from '@/server/config/env';
import { ApiError } from '@/server/lib/errors';
import { assertServerOnly } from '@/server/lib/serverOnly';

declare global {
  var __firebase_admin_app__: App | undefined;
}

// Protect against accidental client-side imports during future refactors.
assertServerOnly('src/server/firebase/app');

/** Builds Firebase Admin app options using env credentials or ADC fallback. */
function buildAppOptions(): AppOptions {
  const options: AppOptions = {};

  if (env.firebaseCredentialSource === 'env') {
    options.credential = cert({
      projectId: env.firebaseProjectId!,
      clientEmail: env.firebaseClientEmail!,
      privateKey: env.firebasePrivateKey!,
    });
  } else {
    // ADC path keeps production-ready flexibility for managed runtimes.
    options.credential = applicationDefault();
  }

  if (env.firebaseStorageBucket) {
    options.storageBucket = env.firebaseStorageBucket;
  }

  return options;
}

/** Initializes Firebase Admin once per process and reuses it across hot reloads. */
function createFirebaseAdminApp(): App {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  try {
    return initializeApp(buildAppOptions());
  } catch (cause) {
    throw ApiError.fromCode(
      'FIREBASE_UNAVAILABLE',
      'Failed to initialize Firebase Admin app',
      { cause },
    );
  }
}

export const firebaseAdminApp =
  globalThis.__firebase_admin_app__ ?? createFirebaseAdminApp();

if (!globalThis.__firebase_admin_app__) {
  globalThis.__firebase_admin_app__ = firebaseAdminApp;
}

export function getFirebaseAdminApp(): App {
  return firebaseAdminApp;
}
