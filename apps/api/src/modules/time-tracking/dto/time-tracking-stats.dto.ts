import { EmployeeDto } from '../../company/dto/employee.dto';
import { ProjectDto } from '../../project-management/dto/project.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { TeamDto } from '../../company/dto/team.dto';

@ObjectType()
export class TimeTrackingStatsDto {
  @Field(() => [EmployeeDto])
  mostActiveEmployees: EmployeeDto[];

  @Field(() => TrendingProject, { nullable: true })
  trendingProject: TrendingProject | null;

  @Field(() => Number)
  totalMinutesThisWeek: number;

  @Field(() => String)
  minutesPercentageDiffFromLastWeek: string;
}

@ObjectType()
class TrendingProject {
  @Field(() => ProjectDto)
  project: ProjectDto;

  @Field(() => Number)
  totalMinutes: number;
}

@ObjectType()
export class TimeTrackedPerProject {
  @Field(() => ProjectDto)
  project: ProjectDto;

  @Field(() => Number)
  totalMinutes: number;
}

@ObjectType()
export class TimeTrackedPerEmployee {
  @Field(() => EmployeeDto)
  employee: EmployeeDto;

  @Field(() => Number)
  totalMinutes: number;
}

@ObjectType()
export class TimeTrackedPerTeam {
  @Field(() => TeamDto)
  team: TeamDto;

  @Field(() => Number)
  totalMinutes: number;
}
