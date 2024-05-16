import { Field, ObjectType } from '@nestjs/graphql';
import { EmployeeDto } from '../../company/dto/employee.dto';

@ObjectType()
export class PtoRequestApproverDto {
  @Field(() => EmployeeDto)
  employee: EmployeeDto;

  @Field()
  status: string;

  @Field()
  priority: number;
}
