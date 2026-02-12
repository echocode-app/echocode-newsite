import { NextRequest, NextResponse } from 'next/server';
import { bootstrapAdminIfAllowed, getAuthenticatedUserProfile } from '@/server/auth';
import { handleApiRoute } from '@/server/lib';
import { requireAuth } from '@/server/middlewares';

export const runtime = 'nodejs';

/** Thin controller: auth bootstrap + trusted user profile response */
export async function GET(req: NextRequest): Promise<NextResponse> {
  return handleApiRoute(async () => {
    const authContext = await requireAuth(req.headers.get('authorization'));
    await bootstrapAdminIfAllowed(authContext.uid, authContext.email ?? undefined);
    return getAuthenticatedUserProfile(authContext.uid);
  });
}

// curl http://localhost:3000/api/admin/me
