import type { ApiErrorCode } from '@/server/lib/errors';

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

/** Builds standardized successful API payloads */
export function ok<T>(data: T): ApiSuccess<T> {
  return { success: true, data };
}

/** Builds standardized failed API payloads */
export function fail(code: ApiErrorCode, message: string): ApiFailure {
  return {
    success: false,
    error: { code, message },
  };
}
