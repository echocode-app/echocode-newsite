// Keep middleware imports centralized to avoid deep path coupling in routes.
export { requireAuth } from '@/server/middlewares/requireAuth';
export type { AuthContext } from '@/server/middlewares/requireAuth';
export { requirePermission } from '@/server/middlewares/requirePermission';
