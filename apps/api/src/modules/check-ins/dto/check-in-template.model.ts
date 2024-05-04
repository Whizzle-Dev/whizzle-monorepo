import { Field, ObjectType } from '@nestjs/graphql';

import { CheckInType } from './enums';

@ObjectType()
export class CheckInTemplateModel {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  createdBy: number;

  @Field(() => String)
  formElements: string;

  @Field(() => CheckInType)
  type: keyof typeof CheckInType;
}
