import { env } from '@/server/config/env';
import { withApi } from '@/server/lib';

export const runtime = 'nodejs';

/** Basic liveness endpoint for platform and CI smoke checks */
export const GET = withApi(async () => ({
  status: 'ok',
  env: env.nodeEnv,
  timestamp: new Date().toISOString(),
}));

// curl http://localhost:3000/api/health
