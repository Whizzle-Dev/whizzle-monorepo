import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CheckInType } from './enums';

@InputType()
export class CreateCheckInTemplateDto {
  @Field(() => CheckInType)
  @IsNotEmpty()
  type: CheckInType;

  @Field(() => String)
  @IsNotEmpty()
  template: string;
}
