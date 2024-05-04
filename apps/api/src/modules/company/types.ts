import { Employee } from 'kysely-codegen';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

export type UpdateEmployeePayload = {
  inviteCode: string;
  inviteDate: string;
  status: Employee['status'];
  companyId: number;
  teamId?: number | null;
  employeeId: number;
};
export type CreateTeamArgs = {
  companyId: number;
  name: string;
  description?: string | null;
};
export type UpdateTeamForEmployeeArgs = {
  employeeIds: number[];
  removedIds: number[];
  teamId: number;
  companyId: number;
};
export type InviteEmployeeArgs = {
  email: string;
  name: string;
  companyId: number;
  invitedBy: number;
  roleId: number | null;
  permission: PermissionRoleEnum;
  teamId: number | null;
};
export type UpdateTeamArgs = {
  companyId: number;
  name: string;
  description?: string | null;
  id: number;
};
