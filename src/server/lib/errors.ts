import { ZodError } from 'zod';

export type ApiErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'BAD_REQUEST'
  | 'INTERNAL_ERROR'
  | 'SERVICE_UNAVAILABLE';

type ApiErrorOptions = {
  publicMessage?: string;
  cause?: unknown;
};

/** Standard error contract for API-safe failures in the server layer. */
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

/** Type guard for normalized API errors */
export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError;
}

/** Converts unknown thrown values into a stable ApiError shape */
export function toApiError(value: unknown): ApiError {
  if (isApiError(value)) return value;
  if (value instanceof ZodError) {
    const firstIssue = value.issues[0];
    const path = firstIssue?.path.join('.') || 'payload';
    const reason = firstIssue?.message || 'Invalid request payload';

    return new ApiError(
      'BAD_REQUEST',
      400,
      `Validation failed at "${path}": ${reason}`,
      {
        publicMessage: 'Invalid request payload',
        cause: value,
      },
    );
  }

  return new ApiError(
    'INTERNAL_ERROR',
    500,
    'Unexpected server error',
    {
      publicMessage: 'Unexpected server error',
      cause: value,
    },
  );
}
