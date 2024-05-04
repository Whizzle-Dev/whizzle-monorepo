import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string | null;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  status: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  assignedTo: number | null;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isBacklog?: boolean;
}
