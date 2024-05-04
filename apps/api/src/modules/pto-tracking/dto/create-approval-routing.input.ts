import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateApprovalRoutingInput {
  @Field(() => [Routing])
  @IsNotEmpty()
  routing: Routing[];

  @Field(() => [Number])
  @IsNotEmpty()
  assignedEmployees: number[];

  @Field()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class ApproverEntry {
  @Field()
  @IsNotEmpty()
  approverId: number;
}

@InputType()
export class Routing {
  @Field(() => [ApproverEntry])
  @IsNotEmpty()
  approvers: ApproverEntry[];
}
