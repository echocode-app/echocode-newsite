import type { ApiErrorCode } from '@/server/lib/errors/errorCodes';

type ApiErrorOptions = {
  publicMessage?: string;
  cause?: unknown;
};

// This class separates internal diagnostics from user-facing messages.
export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly status: number;
  public readonly publicMessage: string;
  public readonly cause: unknown;

  constructor(
    code: ApiErrorCode,
    status: number,
    internalMessage: string,
    options: ApiErrorOptions = {},
  ) {
    super(internalMessage);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.publicMessage = options.publicMessage ?? internalMessage;
    this.cause = options.cause;
  }
}

export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError;
}
