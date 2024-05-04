import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateApprovalRoutingInput } from './create-approval-routing.input';

@InputType()
export class UpdateApprovalRoutingInput extends CreateApprovalRoutingInput {
  @Field()
  @IsNotEmpty()
  id: number;
}
