import { Field, ObjectType } from '@nestjs/graphql';

export interface IBankInformation {
  id: number;
  bankAccountNumber?: string | null;
  bankName?: string | null;
}

@ObjectType()
export class BankInformationDto implements IBankInformation {
  @Field()
  id: number;
  @Field(() => String, { nullable: true })
  bankAccountNumber: string | null;
  @Field(() => String, { nullable: true })
  bankName: string | null;
}
