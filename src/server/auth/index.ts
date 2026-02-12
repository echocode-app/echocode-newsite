// Public auth layer surface for routes and other server modules.
export type { AuthenticatedUserProfile } from '@/server/auth/auth.service';
export {
  bootstrapAdminIfAllowed,
  getAuthenticatedUserProfile,
} from '@/server/auth/auth.service';
export { hasPermission, isRole, ROLE_PERMISSIONS } from '@/server/auth/roles';
export type { Permission, Role } from '@/server/auth/roles';
