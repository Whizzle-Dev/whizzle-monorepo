import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VacationPolicyDto } from './dto/vacation-policy.dto';
import { PtoTrackingService } from './pto-tracking.service';
import { CreateVacationPolicyInput } from './dto/create-vacation-policy.input';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';

import { JwtPayload } from '../../types/jwt-payload';
import { LeaveEntitlementDto } from './dto/leave-entitlement.dto';
import { LeaveCategoryDto } from './dto/leave-category.dto';
import { PublicHolidayDto } from './dto/public-holiday.dto';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { UpdateVacationPolicyInput } from './dto/update-vacation-policy.input';
import { mapEmployee } from '../company/util';

@UseGuards(JwtGraphqlGuard)
@Resolver(() => VacationPolicyDto)
export class VacationPolicyResolver {
  constructor(private ptoTrackingService: PtoTrackingService) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [LeaveEntitlementDto])
  leaveEntitlements(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<LeaveEntitlementDto[]> {
    return this.ptoTrackingService.getLeaveEntitlementsForEmployee({
      companyId: token.companyId,
      employeeId: token.employeeId,
    });
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [VacationPolicyDto])
  async vacationPolicies(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<VacationPolicyDto[]> {
    const policies = await this.ptoTrackingService.getVacationPolicies({
      companyId: token.companyId,
    });

    return policies.map((policy) => ({
      ...policy,
      employees: policy.employees.map(mapEmployee),
    }));
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Query(() => VacationPolicyDto)
  vacationPolicy(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
  ): Promise<VacationPolicyDto> {
    return this.ptoTrackingService.getVacationPolicy({
      companyId: token.companyId,
      id,
    });
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => VacationPolicyDto)
  createVacationPolicy(
    @Args('input') input: CreateVacationPolicyInput,
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<VacationPolicyDto> {
    return this.ptoTrackingService.createVacationPolicy(input, token.companyId);
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async setAsDefault(
    @Args('id', { type: () => Number }) id: number,
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<boolean> {
    await this.ptoTrackingService.setAsDefault(id, token.companyId);
    return true;
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async assignEmployeeToVacationPolicy(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('employeeIds', { type: () => [Number] }) employeeIds: number[],
    @Args('removedIds', { type: () => [Number] }) removedIds: number[],
    @Args('policyId') policyId: number,
  ) {
    await this.ptoTrackingService.assignEmployeesToVacationPolicy(
      { employeeIds, removedIds },
      policyId,
      token.companyId,
    );
    return true;
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async updateVacationPolicy(
    @Args('input') input: UpdateVacationPolicyInput,
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<boolean> {
    await this.ptoTrackingService.updateVacationPolicy(input, token.companyId);
    return true;
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async archiveVacationPolicy(
    @Args('id') id: number,
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('value', { defaultValue: true, nullable: true })
    value: boolean,
  ): Promise<boolean> {
    const updatedLines = await this.ptoTrackingService.archiveVacationPolicy({
      companyId: token.companyId,
      id,
      value,
    });
    if (updatedLines.length === 0) {
      throw new BadRequestException("Can't archive policy");
    }
    return true;
  }

  @ResolveField(() => [PublicHolidayDto])
  publicHolidays(
    @JwtGraphqlDecorator() user: JwtPayload,
    @Parent() parent: VacationPolicyDto,
  ): Promise<PublicHolidayDto[]> {
    return this.ptoTrackingService.getPublicHolidays({
      policyId: parent.id,
      companyId: user.companyId,
    });
  }

  @ResolveField(() => [LeaveCategoryDto])
  leaveCategories(
    @JwtGraphqlDecorator() user: JwtPayload,
    @Parent() parent: VacationPolicyDto,
  ): Promise<LeaveCategoryDto[]> {
    return this.ptoTrackingService.getLeaveCategories({
      policyId: parent.id,
      companyId: user.companyId,
    });
  }
}
