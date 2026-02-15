import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  deleteObject,
  getBytes,
  ref,
  uploadBytes,
} from 'firebase/storage';

const projectId = process.env.FIREBASE_PROJECT_ID || 'echocode-admin-dev';
const host = process.env.FIREBASE_STORAGE_EMULATOR_HOST || '127.0.0.1:9199';
const [emulatorHost, emulatorPortRaw] = host.split(':');
const emulatorPort = Number(emulatorPortRaw || '9199');
const rules = readFileSync(resolve(process.cwd(), 'storage.rules'), 'utf8');

/**
 * Runs Storage Rules smoke tests for:
 * - role-based upload/replace/delete controls
 * - size/type validation for images and documents
 * - public vs private read expectations
 */
async function run() {
  const testEnv = await initializeTestEnvironment({
    projectId,
    storage: {
      host: emulatorHost,
      port: emulatorPort,
      rules,
    },
  });

  try {
    const anonymousStorage = testEnv.unauthenticatedContext().storage();
    const adminStorage = testEnv.authenticatedContext('admin-uid', {
      role: 'admin',
    }).storage();
    const developerStorage = testEnv.authenticatedContext('dev-uid', {
      role: 'developer',
    }).storage();
    const managerStorage = testEnv.authenticatedContext('manager-uid', {
      role: 'manager',
    }).storage();

    const imageBytes = new Uint8Array(1024);
    const oversizedImage = new Uint8Array(5 * 1024 * 1024 + 1);
    const documentBytes = new Uint8Array(2048);
    const oversizedDocument = new Uint8Array(20 * 1024 * 1024 + 1);

    const portfolioRefPath = 'uploads/portfolio/p1/cover.webp';
    const vacanciesRefPath = 'uploads/vacancies/v1/banner.jpg';
    const submissionsRefPath = 'uploads/submissions/s1/cv.pdf';

    // Public image reads for portfolio/vacancies.
    await assertSucceeds(
      uploadBytes(ref(adminStorage, portfolioRefPath), imageBytes, {
        contentType: 'image/webp',
      }),
    );
    await assertSucceeds(getBytes(ref(anonymousStorage, portfolioRefPath)));

    // Team roles can upload new images.
    await assertSucceeds(
      uploadBytes(ref(managerStorage, vacanciesRefPath), imageBytes, {
        contentType: 'image/jpeg',
      }),
    );

    // Manager cannot replace existing files (replace is admin/developer only).
    await assertFails(
      uploadBytes(ref(managerStorage, vacanciesRefPath), imageBytes, {
        contentType: 'image/jpeg',
      }),
    );
    await assertSucceeds(
      uploadBytes(ref(developerStorage, vacanciesRefPath), imageBytes, {
        contentType: 'image/jpeg',
      }),
    );

    // Manager cannot delete existing files.
    await assertFails(deleteObject(ref(managerStorage, vacanciesRefPath)));
    await assertSucceeds(deleteObject(ref(developerStorage, vacanciesRefPath)));

    // Image restrictions: mime + size.
    await assertFails(
      uploadBytes(ref(adminStorage, 'uploads/portfolio/p1/invalid.txt'), imageBytes, {
        contentType: 'text/plain',
      }),
    );
    await assertFails(
      uploadBytes(ref(adminStorage, 'uploads/portfolio/p1/huge.jpg'), oversizedImage, {
        contentType: 'image/jpeg',
      }),
    );

    // Submission files are private: staff read only.
    await assertSucceeds(
      uploadBytes(ref(managerStorage, submissionsRefPath), documentBytes, {
        contentType: 'application/pdf',
      }),
    );
    await assertFails(getBytes(ref(anonymousStorage, submissionsRefPath)));
    await assertSucceeds(getBytes(ref(adminStorage, submissionsRefPath)));
    await assertSucceeds(getBytes(ref(managerStorage, submissionsRefPath)));

    // Document restrictions: mime + size.
    await assertFails(
      uploadBytes(ref(adminStorage, 'uploads/submissions/s1/cv.png'), documentBytes, {
        contentType: 'image/png',
      }),
    );
    await assertFails(
      uploadBytes(ref(adminStorage, 'uploads/submissions/s1/huge.pdf'), oversizedDocument, {
        contentType: 'application/pdf',
      }),
    );

    // Unknown paths remain denied.
    await assertFails(
      uploadBytes(ref(adminStorage, 'uploads/misc/m1/file.jpg'), imageBytes, {
        contentType: 'image/jpeg',
      }),
    );

    console.log('Storage rules test suite passed');
  } finally {
    await testEnv.cleanup();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
