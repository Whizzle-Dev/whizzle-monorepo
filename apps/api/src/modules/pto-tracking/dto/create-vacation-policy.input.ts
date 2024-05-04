import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { LeaveCategoryInput } from './leave-category.input';
import { PublicHolidaysInput } from './public-holidays.input';

@InputType()
export class CreateVacationPolicyInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNotEmpty()
  policyDocument: string;

  @Field(() => [LeaveCategoryInput])
  @IsNotEmpty()
  leaveCategories: LeaveCategoryInput[];

  @Field(() => [String])
  @IsNotEmpty()
  workingDays: string[];

  @Field(() => [PublicHolidaysInput])
  @IsNotEmpty()
  publicHolidays: PublicHolidaysInput[];

  @Field(() => [Number])
  @IsNotEmpty()
  employees: number[];
}
