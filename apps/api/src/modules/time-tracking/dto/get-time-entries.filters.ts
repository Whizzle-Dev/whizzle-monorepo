import { Field, InputType } from '@nestjs/graphql';
import { DateRangeInput } from '../../../shared/date-range-input';
import { IsOptional } from 'class-validator';

@InputType()
export class GetTimeEntriesFilters {
  @Field(() => [Number], { nullable: true })
  @IsOptional()
  projectIds?: number[] | null;

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  taskIds?: number[] | null;

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  teamIds?: number[] | null;

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  employeeIds?: number[] | null;

  @Field(() => DateRangeInput, { nullable: true })
  @IsOptional()
  dateRange?: DateRangeInput | null;
}
