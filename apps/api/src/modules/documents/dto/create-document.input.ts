import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateDocumentInput {
  @IsNotEmpty()
  @Field()
  name: string;
  @IsNotEmpty()
  @Field()
  content: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  icon: string | null;

  @IsNotEmpty()
  @Field(() => Boolean)
  isPrivate: boolean;
}
