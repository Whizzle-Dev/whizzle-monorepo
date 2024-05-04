import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import { CreateCheckInTemplateDto } from './dto/create-check-in-template.dto';
import { SubmitCheckInInput } from './dto/submit-check-in.input';
import { PaginatedQueryInput } from '../../shared/paginated-query.input';
import { CheckInSubmissionsFiltersInput } from './dto/check-in-submissions-filters.input';
import { UpdateCheckInInput } from './dto/update-check-in.input';
import { DateService } from '../../shared/date.service';

@Injectable()
export class CheckInsRepository {
  constructor(
    private readonly database: Database,
    private dateService: DateService,
  ) {}

  createTemplate(
    companyId: number,
    employeeId: number,
    payload: CreateCheckInTemplateDto,
  ) {
    return this.database.transaction().execute(async (tx) => {
      const currentActive = await tx
        .selectFrom('CheckInForm')
        .where('active', '=', true)
        .where('recurrence', '=', payload.type)
        .executeTakeFirst();
      if (currentActive) {
        await tx
          .updateTable('CheckInForm')
          .set({
            active: false,
          })
          .where('active', '=', true)
          .where('recurrence', '=', payload.type)
          .execute();
      }
      return tx
        .insertInto('CheckInForm')
        .values({
          companyId: companyId,
          createdBy: employeeId,
          formElements: payload.template,
          recurrence: payload.type,
          active: true,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    });
  }

  getCheckInsForCompany(companyId: number) {
    return this.database
      .selectFrom('CheckInForm')
      .where('CheckInForm.companyId', '=', companyId)
      .where('CheckInForm.active', '=', true)
      .selectAll()
      .execute();
  }

  async getPendingCheckInsForEmployee(companyId: number, employeeId: number) {
    return this.getCheckInSubmissionQuery(companyId)
      .where('CheckInFormSubmission.submittedById', '=', employeeId)
      .where('CheckInFormSubmission.status', '=', 'PENDING')
      .orderBy('CheckInForm.recurrence', 'asc')
      .orderBy('CheckInFormSubmission.createdAt', 'desc')
      .execute();
  }

  async submitCheckIn(employeeId: number, payload: SubmitCheckInInput) {
    return this.database
      .updateTable('CheckInFormSubmission')
      .where('CheckInFormSubmission.id', '=', payload.checkInId)
      .where('CheckInFormSubmission.submittedById', '=', employeeId)
      .set({
        answer: payload.answers,
        status: 'SUBMITTED',
        updatedAt: new Date().toISOString(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async getPastCheckIns(companyId: number, employeeId: number) {
    return this.getCheckInSubmissionQuery(companyId)
      .where('CheckInFormSubmission.submittedById', '=', employeeId)
      .orderBy('CheckInFormSubmission.createdAt', 'desc')
      .execute();
  }

  async updateCheckInSubmission(
    employeeId: number,
    payload: UpdateCheckInInput,
    id: number,
  ) {
    return this.database
      .updateTable('CheckInFormSubmission')
      .where('CheckInFormSubmission.id', '=', id)
      .where('CheckInFormSubmission.submittedById', '=', employeeId)
      .set({
        answer: payload.answers,
        status: 'SUBMITTED',
        updatedAt: new Date(),
      })
      .executeTakeFirstOrThrow();
  }

  async getCheckInSubmission(param: {
    companyId: number;
    checkInSubmissionId: number;
  }) {
    return this.getCheckInSubmissionQuery(param.companyId)
      .where('CheckInFormSubmission.id', '=', param.checkInSubmissionId)
      .executeTakeFirstOrThrow();
  }

  async getCheckInSubmissionsForCompany(
    companyId: number,
    options: PaginatedQueryInput | null,
    filters: CheckInSubmissionsFiltersInput | null,
  ) {
    return this.getCheckInSubmissionQuery(companyId)
      .$if(Boolean(options), (eb) => {
        const skip = options?.skip as number;
        const take = options?.take as number;
        return eb.offset(skip).limit(take);
      })
      .$if(Boolean(filters), (eb) => {
        let builder = eb;
        if (filters?.teamId) {
          builder = builder.where('Employee.teamId', '=', filters.teamId);
        }
        if (filters?.status) {
          builder = builder.where(
            'CheckInFormSubmission.status',
            '=',
            filters.status,
          );
        }
        return builder;
      })
      .execute();
  }

  private getCheckInSubmissionQuery(companyId: number) {
    return this.database
      .selectFrom('CheckInFormSubmission')
      .innerJoin(
        'CheckInForm',
        'CheckInFormSubmission.checkInFormId',
        'CheckInForm.id',
      )
      .innerJoin(
        'Employee',
        'CheckInFormSubmission.submittedById',
        'Employee.id',
      )
      .innerJoin('User', 'Employee.userId', 'User.id')
      .where('CheckInForm.companyId', '=', companyId)
      .select([
        'CheckInFormSubmission.id as id',
        'CheckInForm.recurrence as recurrence',
        'CheckInForm.formElements as formElements',
        'CheckInForm.createdBy as createdBy',
        'CheckInFormSubmission.dueAt as dueAt',
        'CheckInFormSubmission.answer as answer',
        'CheckInFormSubmission.status as status',
        'User.name as employeeName',
        'Employee.id as employeeId',
        'User.email as employeeEmail',
        'Employee.permissionRole as employeePermission',
        'Employee.companyId as employeeCompanyId',
        'Employee.status as employeeStatus',
        'User.profilePhotoUrl as employeeProfilePhotoUrl',
      ]);
  }

  // return pending - check ins that are supposed to be submitted today - pastdue check ins that are not submitted and completion rate for this year
  async getCheckInStatus(employeeId: number) {
    return this.database.transaction().execute(async (tx) => {
      const currentDate = this.dateService.getCurrentDate();
      const { pending } = await tx
        .selectFrom('CheckInFormSubmission')
        .where('CheckInFormSubmission.submittedById', '=', employeeId)
        .where('CheckInFormSubmission.status', '=', 'PENDING')
        .select((eb) => [
          eb.fn.countAll<number>('CheckInFormSubmission').as('pending'),
        ])
        .where(
          'CheckInFormSubmission.createdAt',
          '>=',

          currentDate.startOf('year').toDate(),
        )
        .where(
          'CheckInFormSubmission.dueAt',
          '>=',
          currentDate.startOf('day').toDate(),
        )
        .executeTakeFirstOrThrow();
      const { overdue } = await tx
        .selectFrom('CheckInFormSubmission')
        .where('CheckInFormSubmission.submittedById', '=', employeeId)
        .where('CheckInFormSubmission.status', '=', 'PENDING')
        .where(
          'CheckInFormSubmission.createdAt',
          '>=',
          currentDate.startOf('year').toDate(),
        )
        .where(
          'CheckInFormSubmission.dueAt',
          '<',
          currentDate.startOf('day').toDate(),
        )
        .select((eb) => [
          eb.fn.countAll<number>('CheckInFormSubmission').as('overdue'),
        ])
        .executeTakeFirstOrThrow();
      const { completed } = await tx
        .selectFrom('CheckInFormSubmission')
        .where('CheckInFormSubmission.submittedById', '=', employeeId)
        .where('CheckInFormSubmission.status', '=', 'SUBMITTED')
        .where(
          'CheckInFormSubmission.createdAt',
          '>=',
          currentDate.startOf('year').toDate(),
        )
        .select((eb) => [
          eb.fn.countAll<number>('CheckInFormSubmission').as('completed'),
        ])
        .executeTakeFirstOrThrow();
      return {
        pending: pending,
        overdue: overdue,
        completionRate: Number(
          (
            (Number(completed) /
              (Number(completed) + Number(pending) + Number(overdue))) *
            100
          ).toFixed(2),
        ),
      };
    });
  }
}
