import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadFileModel {
  @Field()
  url: string;
  @Field()
  fileName: string;
}
