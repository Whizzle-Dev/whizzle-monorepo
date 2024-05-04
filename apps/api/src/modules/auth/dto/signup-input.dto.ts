import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @IsStrongPassword()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  website: string;
}
