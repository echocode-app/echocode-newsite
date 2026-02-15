import { z } from 'zod';
import { ApiError } from '@/server/lib/errors';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_SORT_ORDER = 'desc';
const MAX_LIMIT = 100;

const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().int().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
  sortBy: z.string().trim().min(1).default(DEFAULT_SORT_BY),
  sortOrder: z.enum(['asc', 'desc']).default(DEFAULT_SORT_ORDER),
  cursor: z.string().trim().min(1).optional(),
});

export type SortOrder = 'asc' | 'desc';

export type OffsetPagination = {
  mode: 'offset';
  page: number;
  limit: number;
  offset: number;
  sortBy: string;
  sortOrder: SortOrder;
};

export type CursorPagination = {
  mode: 'cursor';
  cursor: string;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
};

export type PaginationQuery = OffsetPagination | CursorPagination;

export type PaginationMeta = {
  mode: PaginationQuery['mode'];
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
  page: number | null;
  nextCursor: string | null;
  hasNextPage: boolean;
};

export type PaginatedPayload<TItem> = {
  items: TItem[];
  pagination: PaginationMeta;
};

/**
 * Parses and validates pagination/sorting query params with a single contract.
 * Cursor and page modes are mutually exclusive to avoid ambiguous pagination.
 */
export function parsePaginationQuery(searchParams: URLSearchParams): PaginationQuery {
  const raw = Object.fromEntries(searchParams.entries());
  const parsed = paginationQuerySchema.safeParse(raw);
  if (!parsed.success) {
    throw ApiError.fromCode('INVALID_PAGINATION', 'Invalid pagination query', {
      cause: parsed.error,
    });
  }

  const usedCursor = typeof raw.cursor === 'string' && raw.cursor.trim().length > 0;
  const usedPage = typeof raw.page === 'string' && raw.page.trim().length > 0;
  if (usedCursor && usedPage) {
    throw ApiError.fromCode(
      'INVALID_PAGINATION',
      'Cursor and page cannot be used together',
    );
  }

  if (parsed.data.cursor) {
    return {
      mode: 'cursor',
      cursor: parsed.data.cursor,
      limit: parsed.data.limit,
      sortBy: parsed.data.sortBy,
      sortOrder: parsed.data.sortOrder,
    };
  }

  return {
    mode: 'offset',
    page: parsed.data.page,
    limit: parsed.data.limit,
    offset: (parsed.data.page - 1) * parsed.data.limit,
    sortBy: parsed.data.sortBy,
    sortOrder: parsed.data.sortOrder,
  };
}

/** Builds a stable pagination meta block for list endpoint responses. */
export function buildPaginationMeta(input: {
  pagination: PaginationQuery;
  hasNextPage: boolean;
  nextCursor?: string | null;
}): PaginationMeta {
  return {
    mode: input.pagination.mode,
    limit: input.pagination.limit,
    sortBy: input.pagination.sortBy,
    sortOrder: input.pagination.sortOrder,
    page: input.pagination.mode === 'offset' ? input.pagination.page : null,
    nextCursor: input.pagination.mode === 'cursor' ? input.nextCursor ?? null : null,
    hasNextPage: input.hasNextPage,
  };
}

/** Builds the canonical payload shape for list endpoints. */
export function buildPaginatedPayload<TItem>(
  items: TItem[],
  pagination: PaginationMeta,
): PaginatedPayload<TItem> {
  return { items, pagination };
}
