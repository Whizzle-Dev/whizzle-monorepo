import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LeaveCategoryDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  daysAllowed: number;
}
