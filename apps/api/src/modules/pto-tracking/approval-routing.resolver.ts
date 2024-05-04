import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PtoTrackingService } from './pto-tracking.service';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { CreateApprovalRoutingInput } from './dto/create-approval-routing.input';

import { JwtPayload } from '../../types/jwt-payload';
import { ApprovalRoutingDto } from './dto/approval-routing.dto';
import { PendingRequestForApprovalDto } from './dto/pending-request-for-approval.dto';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { UpdateApprovalRoutingInput } from './dto/update-approval-routing.input';
import { PtoRequestDto } from './pto-request.dto';
import { PtoRequestStatus } from './dto/pto-employee-request.dto';

@UseGuards(JwtGraphqlGuard)
@Resolver(() => ApprovalRoutingDto)
export class ApprovalRoutingResolver {
  constructor(private ptoTrackingService: PtoTrackingService) {}

  @Roles(PermissionRoleEnum.MANAGER)
  @Query(() => [PendingRequestForApprovalDto])
  async getRequestsForApproval(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('status', { nullable: true, type: () => PtoRequestStatus })
    status?: PtoRequestStatus | null,
  ): Promise<PendingRequestForApprovalDto[]> {
    return this.ptoTrackingService.getApprovalRequests(
      token.employeeId,
      status,
    );
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Query(() => [ApprovalRoutingDto])
  async approvalRoutings(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<ApprovalRoutingDto[]> {
    const result = await this.ptoTrackingService.getApprovalRoutings({
      companyId: token.companyId,
    });

    return result;
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async createApprovalRouting(
    @Args('input', { type: () => CreateApprovalRoutingInput })
    input: CreateApprovalRoutingInput,
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<boolean> {
    await this.ptoTrackingService.createApprovalRouting({
      config: input,
      companyId: token.companyId,
    });
    return true;
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async updateApprovalRouting(
    @Args('input', { type: () => UpdateApprovalRoutingInput })
    input: UpdateApprovalRoutingInput,
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<boolean> {
    await this.ptoTrackingService.updateApprovalRouting({
      input,
      companyId: token.companyId,
    });
    return true;
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async assignApprovalRouting(
    @Args('employeeIds', { type: () => [Number] }) employeeIds: number[],
    @Args('approvalRoutingId', { type: () => Number })
    approvalRoutingId: number,
    @JwtGraphqlDecorator() token: JwtPayload,
  ) {
    await this.ptoTrackingService.assignApprovalRouting(
      employeeIds,
      approvalRoutingId,
      token.companyId,
    );
    return true;
  }


  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async deleteApprovalRouting(
    @Args('id', { type: () => Number }) id: number,
    @JwtGraphqlDecorator() token: JwtPayload,
  ) {
    await this.ptoTrackingService.deleteApprovalRouting(id, token.companyId);
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => PtoRequestDto)
  async getPtoRequestDetails(
    @Args('requestId', { type: () => Number }) requestId: number,
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<PtoRequestDto> {
    const result = await this.ptoTrackingService.getRequestDetails(
      requestId,
      token.companyId,
    );

    return {
      approvers: result.approvers.map((a) => ({
        employee: a,
        status: a.approverStatus,
        priority: a.priority,
      })),
      id: result.id,
      startDate: result.startDate,
      endDate: result.endDate,
      status: result.status,
      workingDays: result.workingDays,
      requstedBy: result.requestedBy,
      ptoCategoryName: result.leaveCategoryName,
    };
  }
}
