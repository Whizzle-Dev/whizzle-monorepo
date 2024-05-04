import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLFloat } from 'graphql/type';

@ObjectType()
export class LeaveEntitlementDto {
  @Field()
  categoryId: number;

  @Field()
  name: string;

  @Field(() => GraphQLFloat)
  remainingDays: number;
}
