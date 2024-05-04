import { Field, ObjectType } from '@nestjs/graphql';

import { LeaveCategoryDto } from './leave-category.dto';
import { PublicHolidayDto } from './public-holiday.dto';
import { EmployeeDto } from '../../company/dto/employee.dto';

@ObjectType()
export class VacationPolicyDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  policyDocument: string | null;

  @Field(() => [LeaveCategoryDto], { nullable: true })
  leaveCategories?: LeaveCategoryDto[];

  @Field(() => [PublicHolidayDto], { nullable: true })
  publicHolidays?: PublicHolidayDto[];

  @Field(() => [String], { nullable: true })
  workingDays?: string[] | null;

  @Field()
  default: boolean;

  @Field()
  archived: boolean;

  @Field(() => [EmployeeDto], { nullable: true })
  employees?: EmployeeDto[];
}
