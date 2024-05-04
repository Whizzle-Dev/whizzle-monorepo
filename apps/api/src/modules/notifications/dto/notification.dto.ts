import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { JsonValue } from 'kysely-codegen';

@ObjectType()
export class NotificationDto {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  read: boolean;

  @Field()
  createdAt: Date;

  @Field(() => GraphQLJSON)
  payload: JsonValue;

  @Field()
  eventName: string;
}
