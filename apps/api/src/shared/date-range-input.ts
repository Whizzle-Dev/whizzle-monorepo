import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class DateRangeInput {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  from?: Date | null;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  to?: Date | null;
}
