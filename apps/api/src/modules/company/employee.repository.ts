import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import { EmployeeFiltersInput } from './dto/employees-filter.input';
import { UpdateEmployeePayload, UpdateTeamForEmployeeArgs } from './types';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly database: Database) {}

  getById(employeeId: number, companyId: number) {
    return this.database
      .selectFrom('Employee')
      .where('Employee.id', '=', employeeId)
      .where('Employee.companyId', '=', companyId)
      .innerJoin('User', 'User.id', 'Employee.userId')
      .leftJoin('Role', 'Role.id', 'Employee.roleId')
      .leftJoin('Team', 'Team.id', 'Employee.teamId')
      .leftJoin(
        'BankInformation',
        'BankInformation.id',
        'Employee.bankInformationId',
      )
      .select([
        'Employee.id as employeeId',
        'User.email as email',
        'User.phoneNumber as phoneNumber',
        'User.name as fullName',
        'Role.name as roleName',
        'Team.name as teamName',
        'Role.id as roleId',
        'Team.id as teamId',
        'Employee.status as status',
        'BankInformation.bankAccountNumber as bankAccountNumber',
        'BankInformation.bankName as bankName',
        'Employee.bankInformationId as bankInformationId',
        'Employee.userId as userId',
        'Employee.permissionRole as permissionRole',
        'Employee.companyId as companyId',
        'User.profilePhotoUrl as profilePhotoUrl',
      ])
      .executeTakeFirst();
  }

  getAllByCompany(companyId: number, filters: EmployeeFiltersInput | null) {
    let query = this.database
      .selectFrom('Employee')
      .where('Employee.companyId', '=', companyId)
      .innerJoin('User', 'Employee.userId', 'User.id')
      .leftJoin('Role', 'Employee.roleId', 'Role.id')
      .leftJoin('Team', 'Employee.teamId', 'Team.id')
      .orderBy('Employee.createdAt desc')
      .select([
        'Employee.id as employeeId',
        'User.email as email',
        'User.phoneNumber as phoneNumber',
        'User.name as fullName',
        'Role.name as roleName',
        'Team.name as teamName',
        'Role.id as roleId',
        'Team.id as teamId',
        'Employee.status as status',
        'Employee.permissionRole as permissionRole',
        'User.profilePhotoUrl as profilePhotoUrl',
        'Employee.companyId as companyId',
      ]);

    if (filters?.roleId === null) {
      query = query.where('Employee.roleId', 'is', null);
    }

    if (filters?.teamId === null) {
      query = query.where('Employee.teamId', 'is', null);
    }

    return query.execute();
  }
  getByEmail(email: string, companyId: number) {
    return this.database
      .selectFrom(['Employee'])
      .innerJoin('User', 'User.id', 'Employee.userId')
      .innerJoin('Company', 'Company.id', 'Employee.companyId')
      .where('User.email', '=', email)
      .where('Company.id', '=', companyId)
      .select([
        'Employee.id as id',
        'Employee.status as status',
        'Company.businessName as businessName',
        'Company.id as companyId',
        'Employee.permissionRole as permissionRole',
      ])
      .executeTakeFirst();
  }

  update(id: number, employee: Partial<UpdateEmployeePayload>) {
    return this.database
      .updateTable('Employee')
      .set({
        inviteCode: employee.inviteCode,
        inviteDate: employee.inviteDate,
        status: employee.status,
        companyId: employee.companyId,
      })
      .where('Employee.id', '=', id)
      .execute();
  }

  removeFromTeam(employeeId: number, teamId: number, companyId: number) {
    return this.database
      .updateTable('Employee')
      .where('Employee.id', '=', employeeId)
      .where('Employee.teamId', '=', teamId)
      .where('Employee.companyId', '=', companyId)
      .set({
        teamId: null,
      })
      .execute();
  }

  updateRole(
    ids: { employeeIds: number[]; removedIds: number[] },
    roleId: number,
    companyId: number,
  ) {
    return this.database.transaction().execute(async (tx) => {
      if (ids.employeeIds.length > 0) {
        await tx
          .updateTable('Employee')
          .set({
            roleId,
          })
          .where('Employee.companyId', '=', companyId)
          .where('id', 'in', ids.employeeIds)
          .execute();
      }
      if (ids.removedIds.length > 0) {
        await tx
          .updateTable('Employee')
          .set({
            roleId: null,
          })
          .where('Employee.companyId', '=', companyId)
          .where('id', 'in', ids.removedIds)
          .execute();
      }
    });
  }
  updateTeam(args: UpdateTeamForEmployeeArgs) {
    return this.database.transaction().execute(async (tx) => {
      if (args.employeeIds.length > 0) {
        await tx
          .updateTable('Employee')
          .set({
            teamId: args.teamId,
          })
          .where('Employee.companyId', '=', args.companyId)
          .where('id', 'in', args.employeeIds)
          .execute();
      }
      if (args.removedIds.length > 0) {
        await tx
          .updateTable('Employee')
          .set({
            teamId: null,
          })
          .where('Employee.companyId', '=', args.companyId)
          .where('id', 'in', args.removedIds)
          .execute();
      }
    });
  }

  updateBankInformation(
    bankInformationId: number,
    payload: { bankName: string; bankAccountNumber: string },
  ) {
    return this.database
      .updateTable('BankInformation')
      .set({
        bankName: payload.bankName,
        bankAccountNumber: payload.bankAccountNumber,
      })
      .where('BankInformation.id', '=', bankInformationId)
      .execute();
  }

  createBankInformation(
    employeeId: number,
    payload: { bankName: string; bankAccountNumber: string },
  ) {
    return this.database.transaction().execute(async (tx) => {
      const bankInfo = await tx
        .insertInto('BankInformation')
        .values({
          bankName: payload.bankName,
          bankAccountNumber: payload.bankAccountNumber,
        })
        .returning('BankInformation.id')
        .executeTakeFirstOrThrow();

      await tx
        .updateTable('Employee')
        .where('Employee.id', '=', employeeId)
        .set({
          bankInformationId: bankInfo.id,
        })
        .execute();
    });
  }

  getByRole(roleId: number) {
    return this.database
      .selectFrom('Employee')
      .innerJoin('User', 'Employee.userId', 'User.id')
      .innerJoin('Role', 'Employee.roleId', 'Role.id')
      .leftJoin('Team', 'Employee.teamId', 'Team.id')
      .where('Employee.roleId', '=', roleId)
      .orderBy('Employee.createdAt desc')
      .select([
        'Employee.id as employeeId',
        'User.email as email',
        'User.phoneNumber as phoneNumber',
        'User.name as fullName',
        'Role.name as roleName',
        'Team.name as teamName',
        'Role.id as roleId',
        'Team.id as teamId',
        'Employee.status as status',
        'Employee.companyId as companyId',
        'Employee.permissionRole as permissionRole',
      ])
      .execute();
  }

  getByTeam(teamId: number) {
    return this.database
      .selectFrom('Employee')
      .innerJoin('User', 'Employee.userId', 'User.id')
      .leftJoin('Role', 'Employee.roleId', 'Role.id')
      .innerJoin('Team', 'Employee.teamId', 'Team.id')
      .where('Employee.teamId', '=', teamId)
      .orderBy('Employee.createdAt desc')
      .select([
        'Employee.id as employeeId',
        'User.email as email',
        'User.phoneNumber as phoneNumber',
        'User.name as fullName',
        'Role.name as roleName',
        'Team.name as teamName',
        'Role.id as roleId',
        'Team.id as teamId',
        'Employee.status as status',
        'Employee.companyId as companyId',
        'Employee.permissionRole as permissionRole',
      ])
      .execute();
  }

  async getRecentlyJoinedEmployees(companyId: number) {
    return this.database
      .selectFrom('Employee')
      .innerJoin('User', 'Employee.userId', 'User.id')
      .leftJoin('Role', 'Employee.roleId', 'Role.id')
      .leftJoin('Team', 'Employee.teamId', 'Team.id')
      .where('Employee.companyId', '=', companyId)
      .where('Employee.acceptedInviteAt', 'is not', null)
      .where('Employee.status', '=', 'ACTIVE')
      .orderBy('Employee.acceptedInviteAt desc')
      .select([
        'Employee.id as employeeId',
        'User.email as email',
        'User.phoneNumber as phoneNumber',
        'User.name as fullName',
        'Employee.status as status',
        'Employee.companyId as companyId',
        'Employee.permissionRole as permissionRole',
        'Role.name as roleName',
        'Role.id as roleId',
        'Team.name as teamName',
        'Team.id as teamId',
        'User.profilePhotoUrl as profilePhotoUrl',
      ])
      .limit(12)
      .execute();
  }
}
