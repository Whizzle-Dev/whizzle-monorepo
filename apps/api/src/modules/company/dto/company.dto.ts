import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanyDto {
  @Field()
  id: number;
  @Field(() => String, { nullable: true })
  website: string | null;
  @Field()
  businessName: string;
}
