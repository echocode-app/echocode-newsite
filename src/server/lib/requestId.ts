const REQUEST_ID_HEADER = 'x-request-id';
const REQUEST_ID_MAX_LENGTH = 128;
const REQUEST_ID_PATTERN = /^[a-zA-Z0-9._:-]{1,128}$/;

/**
 * Normalizes incoming request ids and falls back to a generated UUID.
 * This keeps tracing stable across services while preventing oversized values.
 */
export function getOrCreateRequestId(headers: Headers): string {
  const headerValue = headers.get(REQUEST_ID_HEADER)?.trim();
  if (
    headerValue &&
    headerValue.length <= REQUEST_ID_MAX_LENGTH &&
    REQUEST_ID_PATTERN.test(headerValue)
  ) {
    return headerValue;
  }

  return crypto.randomUUID();
}

export function getRequestIdHeaderName(): string {
  return REQUEST_ID_HEADER;
}
