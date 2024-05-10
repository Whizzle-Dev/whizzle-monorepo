import { Field, ObjectType } from '@nestjs/graphql';
import dayjs from 'dayjs';
import { CheckInFormSubmission, Employee } from 'kysely-codegen';
import { EmployeeDto } from '../../company/dto/employee.dto';
import { CheckInSubmissionStatus, CheckInType } from './enums';

@ObjectType()
export class CheckInSubmissionModel {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  createdBy: number;

  @Field(() => String)
  formElements: string;

  @Field(() => CheckInType)
  type: keyof typeof CheckInType;

  @Field(() => String)
  prettyName: string;

  @Field(() => String, { nullable: true })
  answer: string | null;

  @Field(() => CheckInSubmissionStatus)
  status: keyof typeof CheckInSubmissionStatus;

  @Field(() => EmployeeDto)
  employee: EmployeeDto;

  constructor(checkIn: CheckInData) {
    this.id = checkIn.id;
    this.createdBy = checkIn.createdBy;
    this.formElements = JSON.stringify(checkIn.formElements ?? []);
    this.type = checkIn.recurrence;
    this.prettyName =
      checkIn.recurrence === 'DAILY'
        ? `Daily ${dayjs(checkIn.dueAt).format('MMM DD')}`
        : checkIn.recurrence === 'WEEKLY'
        ? `Weekly ${dayjs(checkIn.dueAt)
            .startOf('week')
            .format('MMM DD')} - ${dayjs(checkIn.dueAt)
            .endOf('week')
            .format('MMM DD')}`
        : `Monthly ${dayjs(checkIn.dueAt)
            .startOf('month')
            .format('MMM DD')} - ${dayjs(checkIn.dueAt)
            .endOf('month')
            .format('MMM DD')}`;

    this.status = checkIn.status;
    this.answer = checkIn.answer;
    this.employee = {
      id: checkIn.employeeId,
      name: checkIn.employeeName,
      email: checkIn.employeeEmail,
      permissionRole: checkIn.employeePermission,
      companyId: checkIn.employeeCompanyId,
      status: checkIn.employeeStatus,
      profilePhotoUrl: checkIn.employeeProfilePhotoUrl,
    };
  }
}

type CheckInData = {
  createdBy: number;
  formElements: any;
  recurrence: keyof typeof CheckInType;
  id: number;
  dueAt: Date;
  answer: string | null;
  status: CheckInFormSubmission['status'];
  employeeName?: string | null;
  employeeId: number;
  employeeEmail: string;
  employeePermission: Employee['permissionRole']['__select__'];
  employeeCompanyId: number;
  employeeStatus: Employee['status'];
  employeeProfilePhotoUrl?: string | null;
};
