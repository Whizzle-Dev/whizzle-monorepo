import { Field, ObjectType } from '@nestjs/graphql';
import { TaskDto } from './task.dto';

@ObjectType()
export class ProjectDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  color: string;

  @Field()
  description: string;

  @Field(() => [ProjectColumnDto], { nullable: true })
  columns?: ProjectColumnDto[] | null;

  @Field(() => [TaskDto], { nullable: true })
  tasks?: TaskDto[] | null;
}

@ObjectType()
export class ProjectColumnDto {
  @Field()
  value: string;

  @Field()
  name: string;
}
