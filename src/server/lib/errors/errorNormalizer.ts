import { ZodError } from 'zod';
import { ApiError, isApiError } from '@/server/lib/errors/ApiError';

// Normalize unknown exceptions so route boundaries always return stable shapes.
export function toApiError(value: unknown): ApiError {
  if (isApiError(value)) return value;

  if (value instanceof ZodError) {
    const firstIssue = value.issues[0];
    const path = firstIssue?.path.join('.') || 'payload';
    const reason = firstIssue?.message || 'Invalid request payload';

    return ApiError.fromCode(
      'VALIDATION_FAILED',
      `Validation failed at "${path}": ${reason}`,
      {
        cause: value,
      },
    );
  }

  return ApiError.fromCode(
    'INTERNAL_ERROR',
    'Unexpected server error',
    {
      cause: value,
    },
  );
}
