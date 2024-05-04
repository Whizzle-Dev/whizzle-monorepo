import { SetMetadata } from '@nestjs/common';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

export const ROLE_KEY = 'role';

export const Roles = (...role: PermissionRoleEnum[]) =>
  SetMetadata(ROLE_KEY, role);
