import { Injectable } from '@nestjs/common';
import { ApprovalRoutingRepository } from './approval-routing.respository';
import { CreateApprovalRoutingInput } from '../dto/create-approval-routing.input';
import { json } from '../../../database/json';
import { Database } from '../../../database/database.module';
import { UpdateApprovalRoutingInput } from '../dto/update-approval-routing.input';
import { ApprovalConfigJSON } from '../types';
import { PtoRequestStatus } from '../dto/pto-employee-request.dto';
import { ApprovalRoutingDto } from '../dto/approval-routing.dto';
import { EmployeeFromDB, mapEmployee } from '../../company/util';

@Injectable()
export class ApprovalRoutingService {
  constructor(
    private approvalRoutingRepository: ApprovalRoutingRepository,
    private database: Database,
  ) {}

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
  assignApprovalRouting(
    employeeIds: number[],
    approvalRoutingId: number,
    companyId: number,
  ) {
    return this.approvalRoutingRepository
      .assignApprovalRouting(employeeIds, approvalRoutingId, companyId)
      .execute();
  }

  async deleteApprovalRouting(id: number, companyId: number) {
    return this.approvalRoutingRepository
      .deleteApprovalRouting(id, companyId)
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

  getRequestsForApproval() {
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
    return this.getRequestsForApproval()
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
}
