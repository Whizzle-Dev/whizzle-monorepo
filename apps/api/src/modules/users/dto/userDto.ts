import { Field, ObjectType } from '@nestjs/graphql';
import { CompanyDto } from '../../company/dto/company.dto';

@ObjectType()
export class UserDto {
  @Field()
  id: number;
  @Field()
  email: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  phoneNumber: string | null;

  @Field(() => Date, { nullable: true })
  dateOfBirth: Date | null;

  @Field(() => String, { nullable: true })
  address?: string | null;

  @Field(() => CompanyDto, { nullable: true })
  company: CompanyDto | null;

  @Field(() => String, { nullable: true })
  profilePhotoUrl?: string | null;

  profilePhotoFilename?: string | null;
}
