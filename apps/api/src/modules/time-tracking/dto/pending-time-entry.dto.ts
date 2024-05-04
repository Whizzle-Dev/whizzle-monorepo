import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PendingTimeEntryDto {
  @Field()
  id: number;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  startDate: Date;

  @Field(() => Number, { nullable: true })
  taskId: number | null;

  @Field(() => Number, { nullable: true })
  projectId: number | null;
}
