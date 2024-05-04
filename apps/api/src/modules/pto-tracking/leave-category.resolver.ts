import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PtoTrackingService } from './pto-tracking.service';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { CreateLeaveCategoryInput } from './dto/create-leave-category.input';
import { LeaveCategoryDto } from './dto/leave-category.dto';

import { JwtPayload } from '../../types/jwt-payload';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

@UseGuards(JwtGraphqlGuard)
@Resolver(() => LeaveCategoryDto)
export class LeaveCategoriesResolver {
  constructor(private ptoTrackingService: PtoTrackingService) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [LeaveCategoryDto])
  leavesCategories(
    @JwtGraphqlDecorator() user: JwtPayload,
  ): Promise<LeaveCategoryDto[]> {
    return this.ptoTrackingService.getLeaveCategories({
      companyId: user.companyId,
    });
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => LeaveCategoryDto)
  createLeavesCategory(
    @Args('input') input: CreateLeaveCategoryInput,
    @JwtGraphqlDecorator() user: JwtPayload,
  ): Promise<LeaveCategoryDto> {
    return this.ptoTrackingService.createLeaveCategory({
      name: input.name,
      daysAllowed: input.daysAllowed,
      companyId: user.companyId,
      policyId: input.policyId,
    });
  }
}
