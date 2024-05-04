import { Employee } from 'kysely-codegen';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

export type UpdateUserSignupRequestPayload = {
  password: string;
  name: string;
  verificationCode: string;
  codeGeneratedAt: Date;
  company: {
    name: string;
    website: string;
  };
};
export type CreateUserSignupRequestPayload = {
  password: string;
  name: string;
  verificationCode: string;
  codeGeneratedAt: Date;
  company: {
    name: string;
    website: string;
  };
  email: string;
};
export type CreateUserPayload = {
  verificationToken: string;
  email: string;
  name: string;
  password: string;
  emailVerified: boolean;
  status: Employee['status'];
  companyId: number;
  permissionRole: PermissionRoleEnum;
};
