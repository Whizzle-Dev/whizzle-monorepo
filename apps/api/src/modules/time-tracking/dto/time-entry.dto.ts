import { Field, ObjectType } from '@nestjs/graphql';
import { TaskDto } from '../../project-management/dto/task.dto';
import { ProjectDto } from '../../project-management/dto/project.dto';
import { EmployeeDto } from '../../company/dto/employee.dto';

@ObjectType()
export class TimeEntryDto {
  @Field()
  id: number;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => TaskDto, { nullable: true })
  task?: TaskDto | null;

  @Field(() => ProjectDto, { nullable: true })
  project?: ProjectDto | null;

  @Field(() => EmployeeDto, { nullable: true })
  employee?: EmployeeDto | null;
}
