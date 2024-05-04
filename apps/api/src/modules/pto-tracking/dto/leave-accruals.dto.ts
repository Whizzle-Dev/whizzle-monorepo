import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GraphQLFloat } from 'graphql/type';
import { EmployeeDto } from '../../company/dto/employee.dto';

@ObjectType()
export class LeaveAccrualsDto {
  @Field()
  id: number;

  @Field()
  employeeId: number;

  @Field(() => EmployeeDto, { nullable: true })
  employee: EmployeeDto | null;

  @Field()
  categoryId: number;

  @Field(() => GraphQLFloat)
  accrualValue: number;

  @Field(() => Date)
  accrualDate: Date;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  cancelReason: string | null;

  @Field(() => LeaveAccrualStatus)
  status: keyof typeof LeaveAccrualStatus;

  @Field(() => Number, { nullable: true })
  timeOfRequestId: number | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  @Field(() => String, { nullable: true })
  leaveCategoryName: string | null;
}

enum LeaveAccrualStatus {
  ACCRUED = 'ACCRUED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(LeaveAccrualStatus, { name: 'LeaveAccrualStatus' });
