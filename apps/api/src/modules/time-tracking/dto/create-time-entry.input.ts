import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTimeEntryInput {
  @Field()
  @IsNotEmpty()
  taskId: number;

  @Field()
  @IsNotEmpty()
  startDate: Date;

  @Field()
  @IsNotEmpty()
  endDate: Date;

  @Field()
  @IsNotEmpty()
  description: string;
}
