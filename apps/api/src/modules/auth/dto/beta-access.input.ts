import { IsNotEmpty } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BetaAccessInput {
  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  company: string;

  @IsNotEmpty()
  @Field()
  fullName: string;
}
