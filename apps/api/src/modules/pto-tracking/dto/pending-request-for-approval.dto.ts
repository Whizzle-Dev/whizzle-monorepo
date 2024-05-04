import { Field, ObjectType } from '@nestjs/graphql';
import { PtoRequestStatus } from './pto-employee-request.dto';
import { GraphQLFloat } from 'graphql/type';

@ObjectType()
export class PendingRequestForApprovalDto {
  @Field(() => Number)
  id: number;

  @Field(() => PtoRequestStatus)
  status: keyof typeof PtoRequestStatus;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => GraphQLFloat)
  workingDays: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String, { nullable: true })
  requestedByName: string | null;

  @Field(() => String)
  leaveCategoryName: string;
}
