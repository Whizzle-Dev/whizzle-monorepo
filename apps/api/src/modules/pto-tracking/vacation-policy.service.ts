import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import { Transaction } from 'kysely';
import { DB } from 'kysely-codegen';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { UpdateVacationPolicyInput } from './dto/update-vacation-policy.input';
import { CreateVacationPolicyInput } from './dto/create-vacation-policy.input';
import { mapEmployee } from '../company/util';
import { VacationPolicyDto } from './dto/vacation-policy.dto';

@Injectable()
export class VacationPolicyService {
  constructor(private readonly database: Database) {}

  getVacationPolicies(args: { companyId: number }) {
    return this.getPolicyQuery(this.database, args.companyId)
      .orderBy('default desc')
      .orderBy('archived asc')
      .orderBy('createdAt desc')
      .execute();
  }

  async getVacationPolicyForEmployee(
    tx: Transaction<DB>,
    employeeId: number,
    companyId: number,
  ) {
    const employee = await tx
      .selectFrom('Employee')
      .where('Employee.id', '=', employeeId)
      .where('Employee.companyId', '=', companyId)
      .select('assignedVacationPolicyId')
      .executeTakeFirst();
    if (employee?.assignedVacationPolicyId) {
      return this.getPolicyQuery(tx, companyId)
        .where('VacationPolicy.id', '=', employee.assignedVacationPolicyId)
        .limit(1)
        .executeTakeFirst();
    } else {
      return this.getPolicyQuery(tx, companyId)
        .where('VacationPolicy.default', '=', true)
        .limit(1)
        .executeTakeFirst();
    }
  }
  updateVacationPolicy(input: UpdateVacationPolicyInput, companyId: number) {
    return this.database
      .updateTable('VacationPolicy')
      .where('id', '=', input.id)
      .where('companyId', '=', companyId)
      .set({
        name: input.name,
        description: input.description,
        policyDocument: input.policyDocument,
      })
      .execute();
  }

  async setAsDefault(id: number, companyId: number) {
    return this.database.transaction().execute(async (tx) => {
      const updates = await tx
        .updateTable('VacationPolicy')
        .where('companyId', '=', companyId)
        .where('archived', '=', false)
        .set('default', false)
        .returning(['id'])
        .execute();
      if (updates.length === 0) {
        throw new Error('No active policies to set as default');
      }
      await tx
        .updateTable('VacationPolicy')
        .where('id', '=', id)
        .where('companyId', '=', companyId)
        .set('default', true)
        .execute();
    });
  }

  async assignEmployeesToVacationPolicy(
    param: {
      employeeIds: number[];
      removedIds: number[];
    },
    policyId: number,
    companyId: number,
  ) {
    await this.database.transaction().execute(async (tx) => {
      if (param.employeeIds.length > 0) {
        await tx
          .updateTable('Employee')
          .set('assignedVacationPolicyId', policyId)
          .where('id', 'in', param.employeeIds)
          .where('companyId', '=', companyId)
          .execute();
      }
      if (param.removedIds.length > 0) {
        await tx
          .updateTable('Employee')
          .set('assignedVacationPolicyId', null)
          .where('id', 'in', param.removedIds)
          .where('companyId', '=', companyId)
          .execute();
      }
    });
  }

  createVacationPolicy(data: CreateVacationPolicyInput, companyId: number) {
    return this.database.transaction().execute(async (tx) => {
      const hasDefaultPolicy = await tx
        .selectFrom('VacationPolicy')
        .where('companyId', '=', companyId)
        .where('default', '=', true)
        .select('id')
        .limit(1)
        .executeTakeFirst();

      const policy = await tx
        .insertInto('VacationPolicy')
        .values({
          name: data.name,
          policyDocument: data.policyDocument,
          description: data.description,
          companyId,
          workingDays: data.workingDays,
          default: !hasDefaultPolicy,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      const publicHolidays = await tx
        .insertInto('NationalHoliday')
        .values(
          data.publicHolidays.map((holiday) => ({
            name: holiday.name,
            date: holiday.date,
            vacationPolicyId: policy.id,
          })),
        )
        .returningAll()
        .execute();

      const leaveCategoriesData = data.leaveCategories.map((category) => ({
        name: category.name,
        daysAllowed: category.daysAllowed,
        policyId: policy.id,
        companyId,
      }));
      let leaveCategories: { id: number; name: string; daysAllowed: number }[] =
        [];
      if (leaveCategoriesData.length > 0) {
        leaveCategories = await tx
          .insertInto('LeaveCategory')
          .values(
            data.leaveCategories.map((category) => ({
              name: category.name,
              daysAllowed: category.daysAllowed,
              policyId: policy.id,
              companyId,
              accrualType: category.accrualType,
            })),
          )
          .returning(['id', 'name', 'daysAllowed'])
          .execute();
      }
      let employees: {
        employeeId: number;
        companyId: number;
        profilePhotoFilename?: string | null;
        fullName: string;
        email: string;
        status: any;
        permissionRole: any;
      }[] = [];
      if (data.employees.length > 0) {
        employees = await tx
          .updateTable('Employee')
          .innerJoin('User', 'User.id', 'Employee.userId')
          .innerJoin('Company', 'Company.id', 'Employee.companyId')
          .set('assignedVacationPolicyId', policy.id)
          .where('id', 'in', data.employees)
          .returning([
            'Employee.id as employeeId',
            'Employee.companyId as companyId',
            'User.profilePhotoUrl as profilePhotoUrl',
            'User.name as fullName',
            'User.email as email',
            'Employee.status as status',
            'Employee.permissionRole as permissionRole',
          ])
          .execute();
      }
      return {
        ...policy,
        leaveCategories,
        publicHolidays,
        employees: employees.map(mapEmployee),
      };
    });
  }

  getVacationPolicy(args: { companyId: number; id: number }) {
    return this.database.transaction().execute(async (tx) => {
      const policy: VacationPolicyDto = await tx
        .selectFrom('VacationPolicy')
        .where('VacationPolicy.companyId', '=', args.companyId)
        .where('VacationPolicy.id', '=', args.id)
        .select((eb) => [
          'VacationPolicy.id as id',
          'VacationPolicy.name as name',
          'VacationPolicy.description as description',
          'VacationPolicy.policyDocument as policyDocument',
          'VacationPolicy.workingDays as workingDays',
          'VacationPolicy.default as default',
          'VacationPolicy.archived as archived',
          jsonArrayFrom(
            eb
              .selectFrom('LeaveCategory')
              .where('LeaveCategory.policyId', '=', args.id)
              .selectAll(),
          ).as('leaveCategories'),
          jsonArrayFrom(
            eb
              .selectFrom('NationalHoliday')
              .where('NationalHoliday.vacationPolicyId', '=', args.id)
              .selectAll(),
          ).as('publicHolidays'),
        ])
        .orderBy('createdAt desc')
        .limit(1)
        .executeTakeFirstOrThrow();

      return policy;
    });
  }

  archiveVacationPolicy(param: {
    companyId: number;
    id: number;
    value: boolean;
  }) {
    return this.database
      .updateTable('VacationPolicy')
      .where('id', '=', param.id)
      .where('companyId', '=', param.companyId)
      .where('default', '=', false)
      .set('archived', param.value)
      .returning(['id'])
      .execute();
  }

  getPolicyQuery(txOrDatabase: Transaction<DB> | Database, companyId: number) {
    return txOrDatabase
      .selectFrom('VacationPolicy')
      .where('VacationPolicy.companyId', '=', companyId)
      .select((eb) => {
        return [
          'VacationPolicy.id as id',
          'VacationPolicy.name as name',
          'VacationPolicy.description as description',
          'VacationPolicy.policyDocument as policyDocument',
          'VacationPolicy.workingDays as workingDays',
          'VacationPolicy.default as default',
          'VacationPolicy.archived as archived',
          jsonArrayFrom(
            eb
              .selectFrom('Employee')
              .whereRef(
                'Employee.assignedVacationPolicyId',
                '=',
                'VacationPolicy.id',
              )
              .innerJoin('User', 'User.id', 'Employee.userId')
              .select([
                'Employee.id as employeeId',
                'Employee.companyId as companyId',
                'User.profilePhotoUrl as profilePhotoUrl',
                'User.name as fullName',
                'User.email as email',
                'Employee.status as status',
                'Employee.permissionRole as permissionRole',
              ]),
          ).as('employees'),
        ];
      });
  }
}
