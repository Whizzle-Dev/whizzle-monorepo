import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecentlyUpdateDocumentDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  employeeName?: string | null;

  @Field(() => String, { nullable: true })
  employeePhotoUrl?: string | null;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
