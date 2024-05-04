import { EmployeeDto } from './dto/employee.dto';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

export type EmployeeFromDB = {
  employeeId: number;
  fullName: string | null;
  email: string;
  roleId?: number | null;
  roleName?: string | null;
  teamId?: number | null;
  teamName?: string | null;
  status: string;
  bankInformationId?: number | null;
  bankName?: string | null;
  bankAccountNumber?: string | null;
  permissionRole: keyof typeof PermissionRoleEnum;
  companyId: number;
  profilePhotoUrl?: string | null;
};

export const mapEmployee = (employee: EmployeeFromDB): EmployeeDto => {
  return {
    id: employee.employeeId,
    name: employee.fullName || '',
    companyId: employee.companyId,
    email: employee.email,
    role:
      employee.roleId && employee.roleName
        ? {
            name: employee.roleName,
            id: employee.roleId,
          }
        : null,
    team:
      employee.teamId && employee.teamName
        ? {
            name: employee.teamName,
            id: employee.teamId,
          }
        : null,
    status: employee.status,
    bankInformation: employee.bankInformationId
      ? {
          id: employee.bankInformationId,
          bankName: employee.bankName || '',
          bankAccountNumber: employee.bankAccountNumber || '',
        }
      : null,
    permissionRole: employee.permissionRole,
    profilePhotoUrl: employee.profilePhotoUrl,
  };
};
