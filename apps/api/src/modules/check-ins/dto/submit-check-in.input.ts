import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SubmitCheckInInput {
  @Field(() => Number)
  @IsNotEmpty()
  checkInId: number;

  @Field(() => String)
  @IsNotEmpty()
  answers: string;
}
