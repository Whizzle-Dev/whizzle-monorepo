import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCheckInTemplateDto } from './dto/create-check-in-template.dto';
import { CheckInsRepository } from './check-ins.repository';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { CheckInTemplateModel } from './dto/check-in-template.model';
import { CheckInSubmissionModel } from './dto/check-in-submission.model';
import { SubmitCheckInInput } from './dto/submit-check-in.input';
import { JwtPayload } from '../../types/jwt-payload';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { PaginatedQueryInput } from '../../shared/paginated-query.input';
import { CheckInSubmissionsFiltersInput } from './dto/check-in-submissions-filters.input';
import { UpdateCheckInInput } from './dto/update-check-in.input';
import { CheckInStatsDto } from './dto/check-in-stats.dto';

@UseGuards(JwtGraphqlGuard)
@Resolver()
export class CheckInsResolver {
  constructor(private checkInRepository: CheckInsRepository) {}

  @Roles(PermissionRoleEnum.MANAGER)
  @Query(() => [CheckInTemplateModel])
  async getCheckInTemplates(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<CheckInTemplateModel[]> {
    const checkIns = await this.checkInRepository.getCheckInsForCompany(
      token.companyId,
    );
    return checkIns.map((checkIn) => ({
      id: checkIn.id,
      createdBy: checkIn.createdBy,
      formElements: JSON.stringify(checkIn.formElements ?? '[]'),
      type: checkIn.recurrence,
    }));
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => CheckInSubmissionModel)
  async getCheckInSubmission(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
  ): Promise<CheckInSubmissionModel> {
    const checkIns = await this.checkInRepository.getCheckInSubmission({
      companyId: token.companyId,
      checkInSubmissionId: id,
    });
    return new CheckInSubmissionModel(checkIns);
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [CheckInSubmissionModel])
  async getPendingCheckins(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<CheckInSubmissionModel[]> {
    const checkIns = await this.checkInRepository.getPendingCheckInsForEmployee(
      token.companyId,
      token.employeeId,
    );
    return checkIns.map((checkIn) => new CheckInSubmissionModel(checkIn));
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [CheckInSubmissionModel])
  async getCompanyCheckIns(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('options', { nullable: true, type: () => PaginatedQueryInput })
    options: PaginatedQueryInput | null,
    @Args('filters', {
      nullable: true,
      type: () => CheckInSubmissionsFiltersInput,
    })
    filters: CheckInSubmissionsFiltersInput | null,
  ): Promise<CheckInSubmissionModel[]> {
    const checkInSubmissions =
      await this.checkInRepository.getCheckInSubmissionsForCompany(
        token.companyId,
        options,
        filters,
      );
    return checkInSubmissions.map(
      (checkIn) => new CheckInSubmissionModel(checkIn),
    );
  }
  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [CheckInSubmissionModel])
  async getPastCheckIns(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<CheckInSubmissionModel[]> {
    const checkIns = await this.checkInRepository.getPastCheckIns(
      token.companyId,
      token.employeeId,
    );
    return checkIns.map((checkIn) => new CheckInSubmissionModel(checkIn));
  }

  @Roles(PermissionRoleEnum.MANAGER)
  @Mutation(() => Boolean)
  async createCheckInTemplate(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('payload') payload: CreateCheckInTemplateDto,
  ) {
    await this.checkInRepository.createTemplate(
      token.companyId,
      token.employeeId,
      payload,
    );

    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async submitCheckIn(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('payload') payload: SubmitCheckInInput,
  ) {
    await this.checkInRepository.submitCheckIn(token.employeeId, payload);
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async updateCheckIn(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('payload') payload: UpdateCheckInInput,
    @Args('id') id: number,
  ) {
    await this.checkInRepository.updateCheckInSubmission(
      token.employeeId,
      payload,
      id,
    );
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => CheckInStatsDto)
  async checkInsStatsForEmployee(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<CheckInStatsDto> {
    const { pending, overdue, completionRate } =
      await this.checkInRepository.getCheckInStatus(token.employeeId);
    return {
      pending,
      overdue,
      completionRate,
    };
  }
}
