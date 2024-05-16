import { Field, ObjectType } from '@nestjs/graphql';
import { EmployeeDto } from '../../company/dto/employee.dto';
import { PtoRequestApproverDto } from './pto-request-approver.dto';

@ObjectType()
export class PtoRequestDto {
  @Field()
  id: number;

  @Field()
  status: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => [PtoRequestApproverDto])
  approvers: PtoRequestApproverDto[];

  @Field()
  workingDays: number;

  @Field(() => EmployeeDto, { nullable: true })
  requstedBy: EmployeeDto | null;

  @Field()
  ptoCategoryName: string;
}

