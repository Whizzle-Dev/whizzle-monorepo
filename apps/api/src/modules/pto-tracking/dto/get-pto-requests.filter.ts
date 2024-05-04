import { Field, InputType } from '@nestjs/graphql';
import { PtoRequestStatus } from './pto-employee-request.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class GetPtoRequestsFilter {
  @IsNotEmpty()
  @Field(() => PtoRequestStatus)
  status: PtoRequestStatus;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  startDate?: Date | null;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  endDate?: Date | null;

  @IsOptional()
  @Field(() => [Number], { nullable: true })
  @IsOptional()
  teamIds?: number[] | null;

  @IsOptional()
  @Field(() => [Number], { nullable: true })
  @IsOptional()
  employeeIds?: number[] | null;

  @IsOptional()
  @Field(() => [Number], { nullable: true })
  @IsOptional()
  roleIds?: number[] | null;
}
