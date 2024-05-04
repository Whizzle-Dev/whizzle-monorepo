import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class EditActiveTimerInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  taskId: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string;
}
