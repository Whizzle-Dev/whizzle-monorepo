import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { JsonValue } from 'kysely-codegen';

@ObjectType()
export class DocumentDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => GraphQLJSON)
  content: JsonValue;

  @Field(() => String, { nullable: true })
  icon?: string | null;
}
