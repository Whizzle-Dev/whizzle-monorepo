import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PublicHolidayDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => Date)
  date: Date;
}
