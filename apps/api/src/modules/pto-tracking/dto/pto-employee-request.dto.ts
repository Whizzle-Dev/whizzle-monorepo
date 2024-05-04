import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class PtoEmployeeRequestModel {
  @Field()
  id: number;

  @Field()
  requestedById: number;

  @Field(() => String, { nullable: true })
  requestedByName?: string | null;

  @Field(() => PtoRequestStatus)
  status: keyof typeof PtoRequestStatus;

  @Field()
  workingDays: number;

  @Field()
  createdAt: Date;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  leaveCategoryName: string;

  @Field(() => String, { nullable: true })
  profilePhotoUrl?: string | null;
}

export enum PtoRequestStatus {
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

registerEnumType(PtoRequestStatus, { name: 'PtoRequestStatus' });
