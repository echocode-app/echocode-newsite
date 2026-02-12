// This barrel defines the stable utility surface for backend route handlers.
export { handleApiRoute } from '@/server/lib/http';
export { logger } from '@/server/lib/logger';
export { fail, ok } from '@/server/lib/response';
export type { ApiFailure, ApiResponse, ApiSuccess } from '@/server/lib/response';
export { validate } from '@/server/lib/validate';
export type { ApiErrorCode } from '@/server/lib/errors';
export { ApiError, isApiError, toApiError } from '@/server/lib/errors';
