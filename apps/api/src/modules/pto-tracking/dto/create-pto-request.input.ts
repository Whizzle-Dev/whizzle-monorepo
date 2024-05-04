import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

@InputType()
export class CreatePtoRequestInput {
  @Field(() => Date)
  @IsDate()
  startDate: Date;

  @Field(() => Date)
  @IsDate()
  endDate: Date;

  @Field()
  @IsNotEmpty()
  categoryId: number;

  @Field(() => String, { nullable: true })
  @Optional()
  note: string | null;
}
