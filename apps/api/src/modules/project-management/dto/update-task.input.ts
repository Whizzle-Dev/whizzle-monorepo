import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  status?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  assignedTo?: number | null;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isBacklog?: boolean;
}
