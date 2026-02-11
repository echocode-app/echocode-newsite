import { z } from 'zod';

type NodeEnv = 'development' | 'test' | 'production';

type RequiredEnv = {
  firebaseProjectId: string;
  firebaseClientEmail: string;
  firebasePrivateKey: string;
};

type OptionalEnv = {
  nodeEnv: NodeEnv;
  adminBootstrapEmails: string[];
  apiVersion: string;
};

export type Env = RequiredEnv & OptionalEnv;

class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  FIREBASE_PROJECT_ID: z.string().trim().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().trim().email(),
  FIREBASE_PRIVATE_KEY: z.string().trim().min(1),
  ADMIN_BOOTSTRAP_EMAILS: z.string().optional(),
  API_VERSION: z.string().trim().min(1).default('v1'),
});

/** Normalizes bootstrap allowlist into a lowercase, deduplicated email array */
function normalizeBootstrapEmails(value: string | undefined): string[] {
  if (!value) return [];

  const emailSchema = z.string().email();
  const uniqueEmails = new Set<string>();

  for (const entry of value.split(',')) {
    const email = entry.trim().toLowerCase();
    if (!email) continue;

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      throw new ConfigurationError(
        `Invalid email in ADMIN_BOOTSTRAP_EMAILS: ${email}`,
      );
    }

    uniqueEmails.add(email);
  }

  return Array.from(uniqueEmails);
}

/** Parses and validates process environment once at module load (fail-fast) */
function parseEnvironment(raw: NodeJS.ProcessEnv): Env {
  const parsed = envSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const path = firstIssue.path.join('.') || '(root)';
    throw new ConfigurationError(
      `Environment configuration error: ${path} ${firstIssue.message}`,
    );
  }

  return {
    nodeEnv: parsed.data.NODE_ENV,
    firebaseProjectId: parsed.data.FIREBASE_PROJECT_ID,
    firebaseClientEmail: parsed.data.FIREBASE_CLIENT_EMAIL,
    firebasePrivateKey: parsed.data.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    adminBootstrapEmails: normalizeBootstrapEmails(parsed.data.ADMIN_BOOTSTRAP_EMAILS),
    apiVersion: parsed.data.API_VERSION,
  };
}

/** Canonical environment accessor for the entire server layer */
export const env = parseEnvironment(process.env);
export const requiredEnv: RequiredEnv = {
  firebaseProjectId: env.firebaseProjectId,
  firebaseClientEmail: env.firebaseClientEmail,
  firebasePrivateKey: env.firebasePrivateKey,
};
export const optionalEnv: OptionalEnv = {
  nodeEnv: env.nodeEnv,
  adminBootstrapEmails: env.adminBootstrapEmails,
  apiVersion: env.apiVersion,
};
