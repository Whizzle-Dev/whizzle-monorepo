import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class BankDetailsInput {
  @Field()
  @IsOptional()
  bankName: string;

  @Field()
  @IsOptional()
  bankAccountNumber: string;
}
