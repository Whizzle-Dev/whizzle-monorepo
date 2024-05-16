import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from '../../database/database.module';
import { LeaveEntitlementDto } from './dto/leave-entitlement.dto';
import { CreatePtoRequestInput } from './dto/create-pto-request.input';
import { Transaction } from 'kysely';
import { DB } from 'kysely-codegen';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginatedQueryInput } from '../../shared/paginated-query.input';
import { GetPtoRequestsFilter } from './dto/get-pto-requests.filter';
import { DateService } from '../../shared/date.service';
import {
  ApproveRejectPTORequestArgs,
  CreateLeaveCategoryArgs,
  APPROVAL_ROUTING_JSON_SCHEMA,
} from './types';
import { VacationPolicyService } from './vacation-policy.service';

@Injectable()
export class PtoTrackingService {
  constructor(
    private readonly database: Database,
    private eventEmitter: EventEmitter2,
    private dateService: DateService,
    private vacationPolicyService: VacationPolicyService,
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
        'TimeOffRequest.id as id',
        'LeaveCategory.name as leaveCategoryName',
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
    const policy =
      await this.vacationPolicyService.getVacationPolicyForEmployee(
        tx,
        employeeId,
        companyId,
      );

    if (!policy) {
      throw new BadRequestException('No policy found for this employee');
    }

    if (policy.archived) {
      throw new BadRequestException('Policy for this employee is archived');
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
          publicHolidays,
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
      .limit(1)
      .select(['status'])
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
      const { routing } = APPROVAL_ROUTING_JSON_SCHEMA.parse(config);

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
          // todo move to enum this event name
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
            // todo move to enum this event name
            this.eventEmitter.emit('PTO_REQUEST_LEVEL_APPROVED', {
              requestId,
            });
          }
        }
      }

      return false;
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
    holidays: { date: Date }[],
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
          this.dateService.createFrom(holiday.date).isSame(currentDate, 'day'),
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
