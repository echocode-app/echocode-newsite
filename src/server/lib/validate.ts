import { z } from 'zod';
import { ApiError } from '@/server/lib/errors';

/** Validates unknown input against a Zod schema and throws ApiError on failure */
export function validate<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  input: unknown,
): z.infer<TSchema> {
  const parsed = schema.safeParse(input);
  if (parsed.success) return parsed.data;

  const firstIssue = parsed.error.issues[0];
  const path = firstIssue?.path.join('.') || 'payload';
  const reason = firstIssue?.message || 'Invalid request payload';

  throw new ApiError(
    'BAD_REQUEST',
    400,
    `Validation failed at "${path}": ${reason}`,
    {
      publicMessage: 'Invalid request payload',
      cause: parsed.error,
    },
  );
}
