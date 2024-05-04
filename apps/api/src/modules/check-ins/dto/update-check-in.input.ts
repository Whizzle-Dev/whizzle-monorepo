import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCheckInInput {
  @Field(() => String)
  @IsNotEmpty()
  answers: string;
}
