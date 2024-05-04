import { Field, ObjectType } from '@nestjs/graphql';
import { EmployeeDto } from '../../company/dto/employee.dto';
import { ProjectDto } from './project.dto';

@ObjectType()
export class TaskDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field()
  status?: string;

  @Field(() => Number, { nullable: true })
  assignedTo?: number | null;

  @Field()
  createdBy?: number;

  @Field(() => EmployeeDto, { nullable: true })
  assignedToEmployee?: EmployeeDto | null;

  @Field(() => Boolean, { nullable: true })
  isBacklog?: boolean | null;

  @Field(() => ProjectDto, { nullable: true })
  project?: ProjectDto | null;

  @Field(() => String, { nullable: true })
  rank?: string | null;
}
