import { IsNotEmpty } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerificationInput {
  @IsNotEmpty()
  @Field()
  verificationToken: string;
}
