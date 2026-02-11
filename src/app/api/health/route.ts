import { NextResponse } from 'next/server';
import { env } from '@/server/config/env';
import { handleApiRoute } from '@/server/lib/http';

export const runtime = 'nodejs';

/** Basic liveness endpoint for platform and CI smoke checks */
export async function GET(): Promise<NextResponse> {
  return handleApiRoute(async () => ({
    status: 'ok',
    env: env.nodeEnv,
    timestamp: new Date().toISOString(),
  }));
}

// curl http://localhost:3000/api/health
