import { PermissionRoleEnum } from './permission-role.enum';

export type JwtPayload = {
  userId: number;
  companyId: number;
  employeeId: number;
  permissionRole: PermissionRoleEnum;
};
