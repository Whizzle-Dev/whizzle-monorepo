import { Query, Resolver } from '@nestjs/graphql';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { JwtPayload } from '../../types/jwt-payload';
import { LeaveAccrualsService } from './leave-accruals.service';
import { LeaveAccrualsDto } from './dto/leave-accruals.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

@Resolver(() => LeaveAccrualsDto)
export class LeaveAccrualsResolver {
  constructor(private leaveAccrualsService: LeaveAccrualsService) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @UseGuards(JwtGraphqlGuard)
  @Query(() => [LeaveAccrualsDto])
  async getLeaveAccrualsForEmployee(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<LeaveAccrualsDto[]> {
    const result = await this.leaveAccrualsService.getAccrualsForEmployee(
      token.employeeId,
      token.companyId,
    );
    return result;
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @UseGuards(JwtGraphqlGuard)
  @Query(() => [LeaveAccrualsDto])
  async getLeaveAccrualsForCompany(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<LeaveAccrualsDto[]> {
    return this.leaveAccrualsService.getAccrualsForCompany(token.companyId);
  }
}
