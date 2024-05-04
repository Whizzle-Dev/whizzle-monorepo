import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class ProjectColumn {
  @Field(() => String)
  name: string;

  @Field(() => String)
  value: string;
}

@InputType()
export class ProjectColumnInput {
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @Field(() => String)
  value: string;
}
