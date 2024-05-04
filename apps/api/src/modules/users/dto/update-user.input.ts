import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  phoneNumber?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  address?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  fullName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  dateOfBirth?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  profilePhotoFileName?: string | null;

  profilePhotoUrl?: string | null;
}
