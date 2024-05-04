import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TimeTrackingService } from './time-tracking.service';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { JwtPayload } from '../../types/jwt-payload';
import { TimeEntryDto } from './dto/time-entry.dto';
import { CreateTimeEntryInput } from './dto/create-time-entry.input';
import { StartTimerInput } from './dto/start-timer.input';
import { PendingTimeEntryDto } from './dto/pending-time-entry.dto';
import { EditTimeEntryInput } from './dto/edit-time-entry.input';
import { EditActiveTimerInput } from './dto/edit-active-timer.input';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { PaginatedQueryInput } from '../../shared/paginated-query.input';
import { GetTimeEntriesFilters } from './dto/get-time-entries.filters';
import { CurrentUserRoleDecorator } from '../../decorators/current-user-role-decorator';
import { TimeEntriesPaginatedResponse } from './dto/time-entries-paginated.response';
import {
  TimeTrackedPerEmployee,
  TimeTrackedPerProject,
  TimeTrackedPerTeam,
  TimeTrackingStatsDto,
} from './dto/time-tracking-stats.dto';
import { DateRangeInput } from '../../shared/date-range-input';

@UseGuards(JwtGraphqlGuard)
@Resolver(() => TimeEntryDto)
export class TimeTrackingResolver {
  constructor(private timeTrackingService: TimeTrackingService) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [TimeEntryDto])
  async timeEntries(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<TimeEntryDto[]> {
    return this.timeTrackingService.getTimeEntries(token.employeeId);
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Query(() => TimeEntriesPaginatedResponse)
  async companyTimeEntries(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('options', { nullable: true, type: () => PaginatedQueryInput })
    options: PaginatedQueryInput | null,
    @Args('filters', { nullable: true, type: () => GetTimeEntriesFilters })
    filters: GetTimeEntriesFilters | null,
  ): Promise<TimeEntriesPaginatedResponse> {
    const data = await this.timeTrackingService.getCompanyTimeEntries({
      companyId: token.companyId,
      options,
      filters,
    });
    const totalCount = data[0]?.totalCount || 0;
    return {
      data,
      totalCount,
      hasNextPage: totalCount > (options?.skip || 0) + (options?.take || 0),
    };
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => TimeEntryDto)
  createTimeEntry(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('payload') payload: CreateTimeEntryInput,
  ): Promise<TimeEntryDto> {
    return this.timeTrackingService.createTimeEntry(
      payload,
      token.employeeId,
      token.companyId,
    );
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async startTimer(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('payload') payload: StartTimerInput,
  ): Promise<boolean> {
    await this.timeTrackingService.startTimer(payload, token.employeeId);
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => TimeEntryDto)
  async stopTimer(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<TimeEntryDto> {
    return this.timeTrackingService.stopTimer(
      token.employeeId,
      token.companyId,
    );
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => PendingTimeEntryDto, { nullable: true })
  activeTimer(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<PendingTimeEntryDto | undefined> {
    return this.timeTrackingService.activeTimer(token.employeeId);
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async updateActiveTimer(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('payload') payload: EditActiveTimerInput,
  ): Promise<boolean> {
    await this.timeTrackingService.updateActiveTimer(payload, token.employeeId);
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async deleteTimeEntry(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
    @CurrentUserRoleDecorator() role: PermissionRoleEnum,
  ): Promise<boolean> {
    if (role === 'EMPLOYEE') {
      await this.timeTrackingService.deleteTimeEntry(id, token.employeeId);
    } else {
      await this.timeTrackingService.deleteTimeEntryAdmin(id, token.companyId);
    }
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => TimeEntryDto)
  async editTimeEntry(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('payload') payload: EditTimeEntryInput,
  ): Promise<TimeEntryDto> {
    await this.timeTrackingService.editTimeEntry(payload, token.employeeId);

    return this.timeTrackingService.getTimeEntry(payload.id, token.employeeId);
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Query(() => TimeTrackingStatsDto)
  timeTrackingStats(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<TimeTrackingStatsDto> {
    return this.timeTrackingService.getWeeklyStats(token.companyId);
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Query(() => [TimeTrackedPerProject])
  async timeTrackedPerProject(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('dateRange', { nullable: true, type: () => DateRangeInput })
    dateRange: DateRangeInput | null,
  ): Promise<TimeTrackedPerProject[]> {
    const result = await this.timeTrackingService.getTimeTrackedPerProject(
      token.companyId,
      dateRange,
    );
    return result.map((item) => {
      return {
        project: {
          name: item.name,
          id: item.id,
          color: item.color,
          description: item.description,
        },
        totalMinutes: Math.floor(item.totalSeconds / 60),
      };
    });
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Query(() => [TimeTrackedPerTeam])
  async timeTrackedPerTeam(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('dateRange', { nullable: true, type: () => DateRangeInput })
    dateRange: DateRangeInput | null,
  ): Promise<TimeTrackedPerTeam[]> {
    const result = await this.timeTrackingService.getTimeTrackedPerTeam(
      token.companyId,
      dateRange,
    );
    return result.map((item) => {
      return {
        team: {
          name: item.name,
          id: item.id,
        },
        totalMinutes: Math.floor(item.totalSeconds / 60),
      };
    });
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Query(() => [TimeTrackedPerEmployee])
  async timeTrackedPerEmployee(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('dateRange', { nullable: true, type: () => DateRangeInput })
    dateRange: DateRangeInput | null,
  ): Promise<TimeTrackedPerEmployee[]> {
    const result = await this.timeTrackingService.getTimeTrackedPerEmployee(
      token.companyId,
      dateRange,
    );
    return result.map((item) => {
      return {
        employee: {
          id: item.id,
          name: item.name,
        } as any,
        totalMinutes: Math.floor(item.totalSeconds / 60),
      };
    });
  }
}
