import { Field, ObjectType } from '@nestjs/graphql';
import { PtoEmployeeRequestModel } from './pto-employee-request.dto';

@ObjectType()
export class AbsentEmployeesResponse {
  @Field(() => [PtoEmployeeRequestModel])
  employees: PtoEmployeeRequestModel[];

  @Field()
  totalCount: number;
}
