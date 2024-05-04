import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from '../../database/database.module';
import { CreateVacationPolicyInput } from './dto/create-vacation-policy.input';
import { CreateApprovalRoutingInput } from './dto/create-approval-routing.input';
import { json } from '../../database/json';
import { LeaveEntitlementDto } from './dto/leave-entitlement.dto';
import { CreatePtoRequestInput } from './dto/create-pto-request.input';
import { Transaction } from 'kysely';
import { DB } from 'kysely-codegen';
import * as z from 'zod';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { VacationPolicyDto } from './dto/vacation-policy.dto';
import { ApprovalRoutingDto } from './dto/approval-routing.dto';
import { EmployeeFromDB, mapEmployee } from '../company/util';
import { UpdateApprovalRoutingInput } from './dto/update-approval-routing.input';
import { UpdateVacationPolicyInput } from './dto/update-vacation-policy.input';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PtoRequestStatus } from './dto/pto-employee-request.dto';
import { PaginatedQueryInput } from '../../shared/paginated-query.input';
import { GetPtoRequestsFilter } from './dto/get-pto-requests.filter';
import { DateService } from '../../shared/date.service';

type ApprovalConfigJSON = {
  routing: { approvers: { approverId: number }[] }[];
  assignedEmployees: number[];
};

@Injectable()
export class PtoTrackingService {
  constructor(
    private readonly database: Database,
    private eventEmitter: EventEmitter2,
    private dateService: DateService,
  ) {}

  getRequestsForEmployee(
    employeeId: number,
    options: PaginatedQueryInput | null,
  ) {
    return this.database
      .selectFrom('TimeOffRequest')
      .where('TimeOffRequest.requestedById', '=', employeeId)
      .innerJoin(
        'LeaveCategory',
        'TimeOffRequest.categoryId',
        'LeaveCategory.id',
      )
      .orderBy('createdAt desc')
      .select([
        'LeaveCategory.name as leaveCategoryName',
        'TimeOffRequest.id as id',
        'TimeOffRequest.requestedById as requestedById',
        'TimeOffRequest.status as status',
        'TimeOffRequest.workingDays as workingDays',
        'TimeOffRequest.createdAt as createdAt',
        'TimeOffRequest.startDate as startDate',
        'TimeOffRequest.endDate as endDate',
      ])
      .$if(Boolean(options), (eb) => {
        const skip = options?.skip as number;
        const take = options?.take as number;
        return eb.offset(skip).limit(take);
      })
      .execute();
  }

  getVacationPolicyForEmployee(employeeId: number, companyId: number) {
    return this.database.transaction().execute(async (tx) => {
      const employee = await tx
        .selectFrom('Employee')
        .where('Employee.id', '=', employeeId)
        .where('Employee.companyId', '=', companyId)
        .select('assignedVacationPolicyId')
        .executeTakeFirst();
      if (employee?.assignedVacationPolicyId) {
        // this is the vacation policy id
        return this.getPolicyQuery(tx, companyId)
          .where('VacationPolicy.id', '=', employee.assignedVacationPolicyId)
          .limit(1)
          .executeTakeFirstOrThrow();
      } else {
        return this.getPolicyQuery(tx, companyId)
          .where('VacationPolicy.default', '=', true)
          .limit(1)
          .executeTakeFirstOrThrow();
        // return default policy
      }
    });
  }

  private getPolicyQuery(
    txOrDatabase: Transaction<DB> | Database,
    companyId: number,
  ) {
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

  getVacationPolicies(args: { companyId: number }) {
    return this.getPolicyQuery(this.database, args.companyId)
      .orderBy('default desc')
      .orderBy('archived asc')
      .orderBy('createdAt desc')
      .execute();
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

  createVacationPolicy(data: CreateVacationPolicyInput, companyId: number) {
    return this.database.transaction().execute(async (tx) => {
      const policy = await tx
        .insertInto('VacationPolicy')
        .values({
          name: data.name,
          policyDocument: data.policyDocument,
          description: data.description,
          companyId,
          workingDays: data.workingDays,
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
        fullName: string | null;
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

  getLeaveCategories(args: { policyId?: number; companyId: number }) {
    let query = this.database
      .selectFrom('LeaveCategory')
      .where('LeaveCategory.companyId', '=', args.companyId);

    if (args.policyId) {
      query = query.where('LeaveCategory.policyId', '=', args.policyId);
    }
    return query.selectAll().execute();
  }

  getPublicHolidays(args: { policyId: number; companyId: number }) {
    return this.database
      .selectFrom('NationalHoliday')
      .where('NationalHoliday.vacationPolicyId', '=', args.policyId)
      .selectAll()
      .execute();
  }

  createLeaveCategory(data: CreateLeaveCategoryArgs) {
    return this.database
      .insertInto('LeaveCategory')
      .values({
        name: data.name,
        daysAllowed: data.daysAllowed,
        policyId: data.policyId,
        companyId: data.companyId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  getApprovalRoutings(args: {
    companyId: number;
  }): Promise<ApprovalRoutingDto[]> {
    return this.database.transaction().execute(async (tx) => {
      const result = await tx
        .selectFrom('ApprovalRouting')
        .where('ApprovalRouting.companyId', '=', args.companyId)
        .orderBy('createdAt desc')
        .selectAll()
        .execute();

      const employeeIds = [
        ...new Set([
          ...result
            .map((r) =>
              (r.config as ApprovalConfigJSON).routing.map((r) => r.approvers),
            )
            .flatMap((c) => c.flatMap((c) => c.flatMap((c) => c.approverId))),
          ...result
            .map((r) => (r.config as ApprovalConfigJSON).assignedEmployees)
            .flat(),
        ]),
      ];

      let employees: EmployeeFromDB[] = [];
      if (employeeIds.length) {
        employees = await tx
          .selectFrom('Employee')
          .innerJoin('User', 'User.id', 'Employee.userId')
          .where('Employee.id', 'in', employeeIds)
          .select([
            'User.email as email',
            'User.name as fullName',
            'Employee.id as employeeId',
            'Employee.status as status',
            'Employee.permissionRole as permissionRole',
            'User.profilePhotoUrl as profilePhotoUrl',
          ])
          .selectAll()
          .execute();
      }

      const routings: ApprovalRoutingDto[] = result.map((r) => {
        return {
          id: r.id,
          assignedEmployees: (
            r.config as ApprovalConfigJSON
          ).assignedEmployees.map((id) =>
            mapEmployee(
              employees.find((e) => e.employeeId === id) as EmployeeFromDB,
            ),
          ),
          approvingLevels: (r.config as ApprovalConfigJSON).routing.map(
            (routing) => ({
              approvers: routing.approvers.map((approve) =>
                mapEmployee(
                  employees.find(
                    (e) => e.employeeId === approve.approverId,
                  ) as EmployeeFromDB,
                ),
              ),
            }),
          ),
          config: JSON.stringify(r.config ?? '[]'),
          name: r.name,
        };
      });
      return routings;
    });
  }

  getAssignedApprovalRouting(employeeId: number, companyId: number) {
    return this.database
      .selectFrom('Employee')
      .where('Employee.id', '=', employeeId)
      .where('Employee.companyId', '=', companyId)
      .innerJoin(
        'ApprovalRouting',
        'Employee.assignedApprovalRoutingId',
        'ApprovalRouting.id',
      )
      .selectAll()
      .executeTakeFirst();
  }

  async createApprovalRouting(data: {
    config: CreateApprovalRoutingInput;
    companyId: number;
  }) {
    await this.database.transaction().execute(async (tx) => {
      const routing = await tx
        .insertInto('ApprovalRouting')
        .values({
          config: json({
            routing: data.config.routing,
            assignedEmployees: data.config.assignedEmployees,
          }),
          companyId: data.companyId,
          name: data.config.name,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await tx
        .updateTable('Employee')
        .set('assignedApprovalRoutingId', routing.id)
        .where('id', 'in', data.config.assignedEmployees)
        .execute();
    });
  }

  async getLeaveEntitlementsForEmployee(param: {
    companyId: number;
    employeeId: number;
  }): Promise<LeaveEntitlementDto[]> {
    // for each category calculate accruals
    const result = await this.database
      .selectFrom('LeaveAccrual')
      .where('LeaveAccrual.employeeId', '=', param.employeeId)
      .where('LeaveAccrual.status', '=', 'ACCRUED')
      .innerJoin('LeaveCategory', 'LeaveAccrual.categoryId', 'LeaveCategory.id')
      .select((eb) => [
        eb.fn.sum<number>('accrualValue').as('remainingDays'),
        'LeaveCategory.name',
        'LeaveCategory.id as categoryId',
      ])
      .groupBy([
        'LeaveAccrual.employeeId',
        'LeaveAccrual.categoryId',
        'LeaveCategory.name',
        'LeaveCategory.id',
      ])
      .execute();
    return result;
  }

  async createTimeOfRequest(
    tx: Transaction<DB>,
    input: CreatePtoRequestInput,
    companyId: number,
    employeeId: number,
  ) {
    const policy = await tx
      .selectFrom('VacationPolicy')
      .innerJoin('LeaveCategory', 'LeaveCategory.policyId', 'VacationPolicy.id')
      .where('LeaveCategory.id', '=', input.categoryId)
      .where('VacationPolicy.companyId', '=', companyId)
      .limit(1)
      .select([
        'VacationPolicy.archived as archived',
        'VacationPolicy.id as id',
        'VacationPolicy.workingDays as workingDays',
      ])
      .executeTakeFirstOrThrow();

    if (policy.archived) {
      throw new Error('Policy is archived');
    }

    const publicHolidays = await tx
      .selectFrom('NationalHoliday')
      .where('NationalHoliday.vacationPolicyId', '=', policy.id)
      .selectAll()
      .execute();

    const timeOfRequest = await tx
      .insertInto('TimeOffRequest')
      .values({
        categoryId: input.categoryId,
        requestedById: employeeId,
        startDate: input.startDate,
        endDate: input.endDate,
        workingDays: this.calculateWorkingDays(
          input.startDate,
          input.endDate,
          policy.workingDays ?? [],
          publicHolidays.map((h) => h.date),
        ),
        status: 'PENDING',
      })
      .returning([
        'TimeOffRequest.id',
        'TimeOffRequest.startDate',
        'TimeOffRequest.endDate',
        'TimeOffRequest.workingDays',
        'TimeOffRequest.requestedById',
        'TimeOffRequest.categoryId',
      ])
      .executeTakeFirstOrThrow();

    return timeOfRequest;
  }

  createPTORequest(
    input: CreatePtoRequestInput,
    companyId: number,
    employeeId: number,
  ) {
    return this.database.transaction().execute(async (tx) => {
      const timeOfRequest = await this.createTimeOfRequest(
        tx,
        input,
        companyId,
        employeeId,
      );
      const approvers = await this.createRequestApprovers(
        tx,
        employeeId,
        timeOfRequest.id,
      );

      return { timeOfRequest, approvers };
    });
  }

  async cancelPTORequest(requestId: number, employeeId: number) {
    const [request] = await this.database
      .selectFrom('TimeOffRequest')
      .where('TimeOffRequest.id', '=', requestId)
      .where('TimeOffRequest.requestedById', '=', employeeId)
      .selectAll()
      .execute();

    if (!request) {
      throw new NotFoundException('PTO request not found');
    }
    if (request.status !== 'PENDING') {
      throw new Error('Only Pending PTO Requests can be cancelled');
    }

    await this.database
      .deleteFrom('TimeOffRequest')
      .where('id', '=', requestId)
      .execute();
    return true;
  }

  async createRequestApprovers(
    tx: Transaction<DB>,
    employeeId: number,
    timeOfRequestId: number,
  ) {
    const approvalRouting = await tx
      .selectFrom('Employee')
      .where('Employee.id', '=', employeeId)
      .innerJoin(
        'ApprovalRouting',
        'Employee.assignedApprovalRoutingId',
        'ApprovalRouting.id',
      )
      .orderBy('ApprovalRouting.createdAt desc')
      .select(['ApprovalRouting.config as config'])
      .executeTakeFirst();

    if (approvalRouting) {
      const { config } = approvalRouting;
      const { routing } = schema.parse(config);

      // create this payload and create in a single call
      const approvers = routing
        .map((r, index) =>
          r.approvers.map((a) => ({
            approverId: a.approverId,
            priority: index + 1,
          })),
        )
        .flat();

      const createdApprovers = await tx
        .insertInto('TimeOffRequestApprover')
        .values(
          approvers.map((approver) => ({
            priority: approver.priority,
            approverId: approver.approverId,
            requestId: timeOfRequestId,
            status: 'PENDING',
            updatedAt: new Date(),
          })),
        )
        .returningAll()
        .execute();
      return createdApprovers;
    } else {
      // todo handle this case
      throw new BadRequestException('No approval routing found');
    }
  }

  getApprovalRequestsQuery() {
    return this.database
      .selectFrom('TimeOffRequestApprover')
      .innerJoin(
        'TimeOffRequest',
        'TimeOffRequest.id',
        'TimeOffRequestApprover.requestId',
      )
      .innerJoin('Employee', 'TimeOffRequest.requestedById', 'Employee.id')
      .innerJoin('User', 'Employee.userId', 'User.id')
      .innerJoin(
        'LeaveCategory',
        'TimeOffRequest.categoryId',
        'LeaveCategory.id',
      )
      .select([
        'TimeOffRequest.id as id',
        'TimeOffRequest.status as status',
        'TimeOffRequest.startDate as startDate',
        'TimeOffRequest.endDate as endDate',
        'TimeOffRequest.workingDays as workingDays',
        'TimeOffRequest.createdAt as createdAt',
        'User.name as requestedByName',
        'LeaveCategory.name as leaveCategoryName',
      ]);
  }
  getApprovalRequests(approverId: number, status?: PtoRequestStatus | null) {
    return this.getApprovalRequestsQuery()
      .where('TimeOffRequestApprover.approverId', '=', approverId)
      .$if(status === PtoRequestStatus.PENDING, (eb) =>
        eb.where(
          'TimeOffRequestApprover.status',
          '=',
          PtoRequestStatus.PENDING,
        ),
      )
      .orderBy('TimeOffRequest.createdAt desc')
      .execute();
  }

  acceptRejectPTORequest(args: ApproveRejectPTORequestArgs) {
    const { requestId, accepted, approverId } = args;
    return this.database.transaction().execute(async (tx) => {
      const { priority } = await tx
        .updateTable('TimeOffRequestApprover')
        .where('TimeOffRequestApprover.approverId', '=', approverId)
        .where('TimeOffRequestApprover.requestId', '=', requestId)
        .set({
          status: accepted ? 'APPROVED' : 'REJECTED',
        })
        .returning(['priority'])
        .executeTakeFirstOrThrow();

      if (!accepted) {
        await tx
          .updateTable('TimeOffRequest')
          .where('TimeOffRequest.id', '=', requestId)
          .set({
            status: 'REJECTED',
          })
          .execute();
        await tx
          .updateTable('TimeOffRequestApprover')
          .where('TimeOffRequestApprover.requestId', '=', requestId)
          .where('TimeOffRequestApprover.status', '=', 'PENDING')
          .set({ status: 'CANCELLED' })
          .execute();
        this.eventEmitter.emit('PTO_REQUEST_REJECTED', {
          requestId,
        });
        return false;
      } else {
        const allApprovers = await tx
          .selectFrom('TimeOffRequestApprover')
          .where('TimeOffRequestApprover.requestId', '=', requestId)
          .select(['id', 'priority', 'status'])
          .execute();

        if (allApprovers.every((a) => a.status === 'APPROVED')) {
          const { requestedById, workingDays, categoryId, id } = await tx
            .updateTable('TimeOffRequest')
            .where('TimeOffRequest.id', '=', requestId)
            .set({ status: 'APPROVED' })
            .returning([
              'TimeOffRequest.requestedById',
              'TimeOffRequest.workingDays',
              'TimeOffRequest.id',
              'TimeOffRequest.categoryId',
            ])
            .executeTakeFirstOrThrow();

          await tx
            .insertInto('LeaveAccrual')
            .values({
              employeeId: requestedById,
              categoryId,
              accrualDate: new Date(),
              accrualValue: -workingDays,
              timeOfRequestId: id,
            })
            .execute();
          this.eventEmitter.emit('PTO_REQUEST_FULLY_APPROVED', {
            requestId,
          });
          return true;
        } else {
          // if all from current levels are approved - send new emails to next level
          if (
            allApprovers.every((a) =>
              a.priority === priority ? a.status === 'APPROVED' : true,
            )
          ) {
            this.eventEmitter.emit('PTO_REQUEST_LEVEL_APPROVED', {
              requestId,
            });
          }
        }
      }

      return false;
    });
  }

  assignApprovalRouting(
    employeeIds: number[],
    approvalRoutingId: number,
    companyId: number,
  ) {
    return this.database
      .updateTable('Employee')
      .where('id', 'in', employeeIds)
      .where('companyId', '=', companyId)
      .set('assignedApprovalRoutingId', approvalRoutingId)
      .execute();
  }

  async deleteApprovalRouting(id: number, companyId: number) {
    return this.database
      .deleteFrom('ApprovalRouting')
      .where('id', '=', id)
      .where('companyId', '=', companyId)
      .execute();
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

  updateApprovalRouting(param: {
    input: UpdateApprovalRoutingInput;
    companyId: number;
  }) {
    return this.database.transaction().execute(async (tx) => {
      const currentRouting = await tx
        .selectFrom('ApprovalRouting')
        .where('id', '=', param.input.id)
        .where('companyId', '=', param.companyId)
        .select('config')
        .executeTakeFirstOrThrow();

      const config = currentRouting.config as ApprovalConfigJSON;
      const removedEmployees = config.assignedEmployees.filter(
        (employeeId) => !param.input.assignedEmployees.includes(employeeId),
      );
      const addedEmployees = param.input.assignedEmployees.filter(
        (employeeId) => !config.assignedEmployees.includes(employeeId),
      );

      if (removedEmployees.length > 0) {
        await tx
          .updateTable('Employee')
          .set('assignedApprovalRoutingId', null)
          .where('id', 'in', removedEmployees)
          .execute();
      }

      if (addedEmployees.length > 0) {
        await tx
          .updateTable('Employee')
          .set('assignedApprovalRoutingId', param.input.id)
          .where('id', 'in', addedEmployees)
          .execute();
      }
      await tx
        .updateTable('ApprovalRouting')
        .where('id', '=', param.input.id)
        .where('companyId', '=', param.companyId)
        .set({
          config: json({
            routing: param.input.routing,
            assignedEmployees: param.input.assignedEmployees,
          }),
          name: param.input.name,
          updatedAt: new Date().toISOString(),
        })
        .execute();
    });
  }

  async updateVacationPolicy(
    input: UpdateVacationPolicyInput,
    companyId: number,
  ) {
    await this.database.transaction().execute(async (tx) => {
      console.log('in here', { input });
      await tx
        .updateTable('VacationPolicy')
        .where('id', '=', input.id)
        .where('companyId', '=', companyId)
        .set({
          name: input.name,
          description: input.description,
          policyDocument: input.policyDocument,
        })
        .execute();
    });
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

  getRequestDetails(requestId: number, companyId: number) {
    return this.database
      .selectFrom('TimeOffRequest')
      .innerJoin(
        'LeaveCategory',
        'LeaveCategory.id',
        'TimeOffRequest.categoryId',
      )
      .where('TimeOffRequest.id', '=', requestId)
      .where('LeaveCategory.companyId', '=', companyId)
      .select((eb) => [
        'TimeOffRequest.id',
        'TimeOffRequest.status',
        'TimeOffRequest.startDate',
        'TimeOffRequest.endDate',
        'TimeOffRequest.workingDays',
        'TimeOffRequest.createdAt',
        'LeaveCategory.name as leaveCategoryName',
        jsonObjectFrom(
          eb
            .selectFrom('Employee')
            .whereRef('Employee.id', '=', 'TimeOffRequest.requestedById')
            .innerJoin('User', 'User.id', 'Employee.userId')
            .select([
              'User.name as name',
              'Employee.id as id',
              'User.email as email',
              'Employee.permissionRole as permissionRole',
              'Employee.companyId as companyId',
              'Employee.status as status',
              'User.profilePhotoUrl as profilePhotoUrl',
            ]),
        ).as('requestedBy'),
        jsonArrayFrom(
          eb
            .selectFrom('TimeOffRequestApprover')
            .whereRef(
              'TimeOffRequestApprover.requestId',
              '=',
              'TimeOffRequest.id',
            )
            .innerJoin('User', 'User.id', 'TimeOffRequestApprover.approverId')
            .innerJoin('Employee', 'Employee.userId', 'User.id')
            .orderBy('TimeOffRequestApprover.priority asc')
            .select([
              'TimeOffRequestApprover.id as id',
              'User.name as name',
              'Employee.id as id',
              'User.email as email',
              'Employee.permissionRole as permissionRole',
              'Employee.companyId as companyId',
              'Employee.status as status',
              'TimeOffRequestApprover.status as approverStatus',
              'User.profilePhotoUrl as profilePhotoUrl',
              'TimeOffRequestApprover.priority as priority',
            ]),
        ).as('approvers'),
      ])
      .executeTakeFirstOrThrow();
  }

  getRequestsForCompany(args: {
    companyId: number;
    options: PaginatedQueryInput | null;
    filters: GetPtoRequestsFilter;
  }) {
    return this.database
      .selectFrom('TimeOffRequest')
      .innerJoin(
        'LeaveCategory',
        'TimeOffRequest.categoryId',
        'LeaveCategory.id',
      )
      .innerJoin('Employee', 'TimeOffRequest.requestedById', 'Employee.id')
      .innerJoin('User', 'User.id', 'Employee.userId')
      .leftJoin('Team', 'Employee.teamId', 'Team.id')
      .leftJoin('Role', 'Employee.roleId', 'Role.id')
      .orderBy('createdAt desc')
      .select([
        'LeaveCategory.name as leaveCategoryName',
        'TimeOffRequest.id as id',
        'TimeOffRequest.requestedById as requestedById',
        'TimeOffRequest.status as status',
        'TimeOffRequest.workingDays as workingDays',
        'TimeOffRequest.createdAt as createdAt',
        'TimeOffRequest.startDate as startDate',
        'TimeOffRequest.endDate as endDate',
        'User.name as requestedByName',
      ])
      .where('Employee.companyId', '=', args.companyId)
      .where('TimeOffRequest.status', '=', args.filters.status)
      .$if(Boolean(args.options), (eb) => {
        const skip = args.options?.skip as number;
        const take = args.options?.take as number;
        return eb.offset(skip).limit(take);
      })
      .$if(Boolean(args.filters.employeeIds), (eb) => {
        if (args.filters.employeeIds?.length) {
          return eb.where(
            'TimeOffRequest.requestedById',
            'in',
            args.filters.employeeIds,
          );
        }
        return eb;
      })
      .$if(Boolean(args.filters.teamIds), (eb) => {
        if (args.filters.teamIds?.length) {
          return eb.where('Employee.teamId', 'in', args.filters.teamIds);
        }
        return eb;
      })
      .$if(Boolean(args.filters.roleIds), (eb) => {
        if (args.filters.roleIds?.length) {
          return eb.where('Employee.roleId', 'in', args.filters.roleIds);
        }
        return eb;
      })
      .execute();
  }

  getAbsentEmployees(param: {
    fromDate: Date;
    companyId: number;
    toDate: Date;
  }) {
    return this.database
      .selectFrom('TimeOffRequest')
      .innerJoin(
        'LeaveCategory',
        'TimeOffRequest.categoryId',
        'LeaveCategory.id',
      )
      .innerJoin('Employee', 'TimeOffRequest.requestedById', 'Employee.id')
      .innerJoin('User', 'User.id', 'Employee.userId')
      .where('TimeOffRequest.status', '=', 'APPROVED')
      .where('TimeOffRequest.startDate', '<=', param.toDate)
      .where('Employee.companyId', '=', param.companyId)
      .select((eb) => [
        'LeaveCategory.name as leaveCategoryName',
        'TimeOffRequest.id as id',
        'TimeOffRequest.requestedById as requestedById',
        'TimeOffRequest.status as status',
        'TimeOffRequest.workingDays as workingDays',
        'TimeOffRequest.createdAt as createdAt',
        'TimeOffRequest.startDate as startDate',
        'TimeOffRequest.endDate as endDate',
        'User.name as requestedByName',
        'User.profilePhotoUrl as profilePhotoUrl',
        eb.fn.countAll().over().as('totalCount'),
      ])
      .orderBy('startDate asc')
      .limit(6)
      .execute();
  }

  private calculateWorkingDays(
    startDate: Date,
    endDate: Date,
    workingDays: string[],
    holidays: Date[],
  ) {
    let workingDaysCount = 0;
    let currentDate = startDate;
    // convert strings to ints from 0 to 6
    const workingDaysInts: number[] = workingDays.map((day) => {
      if (day === 'MONDAY') {
        return 0;
      }
      if (day === 'TUESDAY') {
        return 1;
      }
      if (day === 'WEDNESDAY') {
        return 2;
      }
      if (day === 'THURSDAY') {
        return 3;
      }
      if (day === 'FRIDAY') {
        return 4;
      }
      if (day === 'SATURDAY') {
        return 5;
      }
      if (day === 'SUNDAY') {
        return 6;
      }
      return 0;
    });
    while (currentDate <= endDate) {
      if (
        workingDaysInts.includes(currentDate.getDay()) &&
        !holidays.some((holiday) =>
          this.dateService.createFrom(holiday).isSame(currentDate, 'day'),
        )
      ) {
        workingDaysCount++;
      }
      currentDate = this.dateService
        .createFrom(currentDate)
        .add(1, 'day')
        .toDate();
    }
    return workingDaysCount;
  }
}
const schema = z.object({
  routing: z.array(
    z.object({
      approvers: z.array(z.object({ approverId: z.number() })),
    }),
  ),
  assignedEmployees: z.array(z.number()),
});

type CreateLeaveCategoryArgs = {
  name: string;
  daysAllowed: number;
  companyId: number;
  policyId: number;
};

type ApproveRejectPTORequestArgs = {
  requestId: number;
  accepted: boolean;
  approverId: number;
};
