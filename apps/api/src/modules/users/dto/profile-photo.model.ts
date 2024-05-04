import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfilePhotoModel {
  @Field()
  url: string;
  @Field()
  fileName: string;
}
