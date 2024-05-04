import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { JwtPayload } from '../../types/jwt-payload';
import { PtoTrackingService } from './pto-tracking.service';
import { PtoEmployeeRequestModel } from './dto/pto-employee-request.dto';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { PaginatedQueryInput } from '../../shared/paginated-query.input';
import { GetPtoRequestsFilter } from './dto/get-pto-requests.filter';
import { AbsentEmployeesResponse } from './dto/absent-employees.response';
import { CreatePtoRequestInput } from './dto/create-pto-request.input';
import { PtoRequestCreatedEvent } from '../events/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppEvents } from '../../shared/app-events';

@UseGuards(JwtGraphqlGuard)
@Resolver()
export class PtoTrackingResolver {
  constructor(
    private ptoTrackingService: PtoTrackingService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [PtoEmployeeRequestModel])
  getPtoRequestsForEmployee(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('options', {
      nullable: true,
      type: () => PaginatedQueryInput,
    })
    options: PaginatedQueryInput | null,
  ): Promise<PtoEmployeeRequestModel[]> {
    return this.ptoTrackingService.getRequestsForEmployee(
      token.employeeId,
      options,
    );
  }

  @Roles(PermissionRoleEnum.MANAGER)
  @Query(() => [PtoEmployeeRequestModel])
  getPtoRequestsForCompany(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('options', {
      nullable: true,
      type: () => PaginatedQueryInput,
    })
    options: PaginatedQueryInput | null,
    @Args('filters', { type: () => GetPtoRequestsFilter })
    filters: GetPtoRequestsFilter,
  ): Promise<PtoEmployeeRequestModel[]> {
    return this.ptoTrackingService.getRequestsForCompany({
      companyId: token.companyId,
      options,
      filters,
    });
  }
  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => AbsentEmployeesResponse)
  async absentEmployees(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('fromDate', { type: () => Date }) fromDate: Date,
    @Args('toDate', { type: () => Date }) toDate: Date,
  ): Promise<AbsentEmployeesResponse> {
    const employees = await this.ptoTrackingService.getAbsentEmployees({
      companyId: token.companyId,
      fromDate,
      toDate,
    });
    return {
      employees,
      totalCount: Number(employees?.[0]?.totalCount ?? 0),
    };
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async createPTORequest(
    @Args('input') input: CreatePtoRequestInput,
    @JwtGraphqlDecorator() token: JwtPayload,
  ) {
    const { approvers, timeOfRequest } =
      await this.ptoTrackingService.createPTORequest(
        input,
        token.companyId,
        token.employeeId,
      );

    const firstLevelApprovers = approvers.filter(
      (approver) => approver.priority === 1,
    );

    this.eventEmitter.emit(AppEvents.PTO_REQUEST_CREATED, {
      approvers: firstLevelApprovers.map((a) => a.approverId),
      timeOfRequest,
    } as PtoRequestCreatedEvent);
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  cancelPTORequest(
    @Args('requestId', { type: () => Number }) requestId: number,
    @JwtGraphqlDecorator() token: JwtPayload,
  ) {
    return this.ptoTrackingService.cancelPTORequest(
      requestId,
      token.employeeId,
    );
  }

  @Roles(PermissionRoleEnum.MANAGER)
  @Mutation(() => Boolean)
  async approveRejectPTORequest(
    @Args('requestId', { type: () => Number }) requestId: number,
    @Args('accepted', { type: () => Boolean }) accepted: boolean,
    @JwtGraphqlDecorator() token: JwtPayload,
  ) {
    return this.ptoTrackingService.acceptRejectPTORequest({
      requestId,
      accepted,
      approverId: token.employeeId,
    });
  }
}
