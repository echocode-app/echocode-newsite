import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/server/middlewares/requireAuth';
import {
  bootstrapAdminIfAllowed,
  getAuthenticatedUserProfile,
} from '@/server/auth/auth.service';
import { handleApiRoute } from '@/server/lib/http';

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
