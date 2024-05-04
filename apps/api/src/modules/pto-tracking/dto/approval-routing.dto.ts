import { Field, ObjectType } from '@nestjs/graphql';
import { EmployeeDto } from '../../company/dto/employee.dto';

@ObjectType()
export class ApprovalRoutingDto {
  @Field()
  id: number;

  @Field()
  config: string;

  @Field(() => [EmployeeDto])
  assignedEmployees: EmployeeDto[];

  @Field(() => [ApproversLevelDto])
  approvingLevels: ApproversLevelDto[];

  @Field()
  name: string;
}

@ObjectType()
export class ApproversLevelDto {
  @Field(() => [EmployeeDto])
  approvers: EmployeeDto[];
}
