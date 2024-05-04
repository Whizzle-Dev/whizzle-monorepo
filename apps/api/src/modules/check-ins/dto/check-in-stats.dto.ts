import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLFloat } from 'graphql/type';

@ObjectType()
export class CheckInStatsDto {
  @Field(() => GraphQLFloat)
  completionRate: number;

  @Field()
  pending: number;

  @Field()
  overdue: number;
}
