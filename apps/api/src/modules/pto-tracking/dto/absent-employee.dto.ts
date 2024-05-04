import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AbsentEmployeeDto {
  @Field()
  employeeId: number;

  @Field()
  employeeName: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  reason: string;

  @Field()
  absentType: string;
}
