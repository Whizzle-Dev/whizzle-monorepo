import { registerEnumType } from '@nestjs/graphql';

export enum PermissionRoleEnum {
  ADMIN = 'ADMIN',
  ACCOUNT_OWNER = 'ACCOUNT_OWNER',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
}

registerEnumType(PermissionRoleEnum, { name: 'PermissionRoleEnum' });
