import { NextResponse } from 'next/server';
import { env } from '@/server/config/env';
import { fail, ok } from '@/server/lib/response';
import { toApiError } from '@/server/lib/errors';
import { logger } from '@/server/lib/logger';
import { getRequestIdHeaderName } from '@/server/lib/requestId';

type RouteMeta = {
  requestId?: string;
};

function buildApiHeaders(meta: RouteMeta = {}): HeadersInit {
  const requestIdHeader = getRequestIdHeaderName();

  return {
    'x-api-version': env.apiVersion,
    ...(meta.requestId ? { [requestIdHeader]: meta.requestId } : {}),
  };
}

/** Shared API route boundary that enforces response and error conventions */
export async function handleApiRoute<T>(
  handler: () => Promise<T>,
  meta: RouteMeta = {},
): Promise<NextResponse> {
  try {
    const data = await handler();
    return NextResponse.json(ok(data), {
      headers: buildApiHeaders(meta),
    });
  } catch (error) {
    const apiError = toApiError(error);

    if (env.nodeEnv !== 'test') {
      logger.error('api_error', {
        code: apiError.code,
        status: apiError.status,
        message: apiError.message,
        cause: apiError.cause,
        requestId: meta.requestId,
      });
    }

    return NextResponse.json(
      fail(apiError.code, apiError.publicMessage),
      {
        status: apiError.status,
        headers: buildApiHeaders(meta),
      },
    );
  }
}
