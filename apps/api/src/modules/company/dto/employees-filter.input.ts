import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class EmployeeFiltersInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  roleId?: number | null;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  teamId?: number | null;
}
