import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth, requirePermission, type AuthContext } from '@/server/middlewares';
import { ApiError } from '@/server/lib/errors';
import { handleApiRoute } from '@/server/lib/http';
import { parsePaginationQuery, type PaginationQuery } from '@/server/lib/pagination';
import { getOrCreateRequestId } from '@/server/lib/requestId';
import { validate } from '@/server/lib/validate';

type AnyZodSchema = z.ZodTypeAny;
type InferSchema<TSchema extends AnyZodSchema | undefined> = TSchema extends AnyZodSchema
  ? z.infer<TSchema>
  : undefined;
type PermissionRequirement = Parameters<typeof requirePermission>[1];
type PermissionMode = Parameters<typeof requirePermission>[2];

type WithApiOptions<
  TQuerySchema extends AnyZodSchema | undefined,
  TBodySchema extends AnyZodSchema | undefined,
> = {
  auth?: boolean;
  permissions?: PermissionRequirement;
  permissionMode?: PermissionMode;
  querySchema?: TQuerySchema;
  bodySchema?: TBodySchema;
  pagination?: boolean;
};

type WithPaginatedApiOptions<
  TQuerySchema extends AnyZodSchema | undefined,
  TBodySchema extends AnyZodSchema | undefined,
> = Omit<WithApiOptions<TQuerySchema, TBodySchema>, 'pagination'>;

export type ApiHandlerContext<TQuery = undefined, TBody = undefined> = {
  req: NextRequest;
  requestId: string;
  auth: AuthContext | null;
  query: TQuery | undefined;
  body: TBody | undefined;
  pagination: PaginationQuery | null;
};

export type PaginatedApiHandlerContext<TQuery = undefined, TBody = undefined> = Omit<
  ApiHandlerContext<TQuery, TBody>,
  'pagination'
> & {
  pagination: PaginationQuery;
};

function parseOptionalSchema<TSchema extends AnyZodSchema | undefined>(
  schema: TSchema,
  input: unknown,
): InferSchema<TSchema> {
  if (!schema) return undefined as InferSchema<TSchema>;
  return validate(schema, input) as InferSchema<TSchema>;
}

async function readJsonBody(req: NextRequest): Promise<unknown> {
  const rawBody = await req.text();
  if (!rawBody.trim()) return undefined;

  try {
    return JSON.parse(rawBody) as unknown;
  } catch (cause) {
    throw ApiError.fromCode('INVALID_JSON_BODY', 'Failed to parse request JSON body', {
      cause,
    });
  }
}

/**
 * Unified API route wrapper with request-id, auth, permission checks and input parsing.
 * This keeps endpoint handlers thin and contract-driven.
 */
export function withApi<
  TData,
  TQuerySchema extends AnyZodSchema | undefined = undefined,
  TBodySchema extends AnyZodSchema | undefined = undefined,
>(
  handler: (
    context: ApiHandlerContext<InferSchema<TQuerySchema>, InferSchema<TBodySchema>>,
  ) => Promise<TData> | TData,
  options: WithApiOptions<TQuerySchema, TBodySchema> = {},
): (req: NextRequest) => Promise<NextResponse> {
  return async function wrappedHandler(req: NextRequest): Promise<NextResponse> {
    const requestId = getOrCreateRequestId(req.headers);

    return handleApiRoute(
      async () => {
        const query = parseOptionalSchema(
          options.querySchema,
          Object.fromEntries(req.nextUrl.searchParams.entries()),
        );
        const body = parseOptionalSchema(options.bodySchema, await readJsonBody(req));
        const pagination = options.pagination
          ? parsePaginationQuery(req.nextUrl.searchParams)
          : null;

        let authContext: AuthContext | null = null;
        if (options.auth || options.permissions) {
          authContext = await requireAuth(req.headers.get('authorization'));
        }
        if (authContext && options.permissions) {
          requirePermission(
            authContext,
            options.permissions,
            options.permissionMode ?? 'all',
          );
        }

        return handler({
          req,
          requestId,
          auth: authContext,
          query,
          body,
          pagination,
        });
      },
      { requestId },
    );
  };
}

/**
 * Specialized list-endpoint wrapper that always enables pagination parsing.
 * Handlers receive a non-null pagination contract by type and runtime guarantees.
 */
export function withPaginatedApi<
  TData,
  TQuerySchema extends AnyZodSchema | undefined = undefined,
  TBodySchema extends AnyZodSchema | undefined = undefined,
>(
  handler: (
    context: PaginatedApiHandlerContext<
      InferSchema<TQuerySchema>,
      InferSchema<TBodySchema>
    >,
  ) => Promise<TData> | TData,
  options: WithPaginatedApiOptions<TQuerySchema, TBodySchema> = {},
): (req: NextRequest) => Promise<NextResponse> {
  return withApi(
    async (context) => {
      if (!context.pagination) {
        throw ApiError.fromCode(
          'INTERNAL_ERROR',
          'Pagination context is required for paginated API handler',
        );
      }

      return handler({
        ...context,
        pagination: context.pagination,
      });
    },
    {
      ...options,
      pagination: true,
    },
  );
}
