import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class LeaveCategoryInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  daysAllowed: number;

  @Field(() => AccrualType)
  @IsNotEmpty()
  accrualType: keyof typeof AccrualType;
}

export enum AccrualType {
  FIXED_NUMBER_PER_MONTH = 'FIXED_NUMBER_PER_MONTH',
  FIXED_NUMBER_PER_YEAR = 'FIXED_NUMBER_PER_YEAR',
  PER_MONTH_START = 'PER_MONTH_START',
  PER_YEAR_START = 'PER_YEAR_START',
}

registerEnumType(AccrualType, { name: 'AccrualType' });
