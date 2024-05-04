import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { LeaveCategoryInput } from './leave-category.input';
import { PublicHolidaysInput } from './public-holidays.input';

@InputType()
export class UpdateVacationPolicyInput {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsOptional()
  policyDocument: string;

  @Field(() => [LeaveCategoryInput], { nullable: true })
  @IsOptional()
  leaveCategories?: LeaveCategoryInput[] | null;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  workingDays?: string[] | null;

  @Field(() => [PublicHolidaysInput], { nullable: true })
  @IsOptional()
  publicHolidays?: PublicHolidaysInput[] | null;
}
