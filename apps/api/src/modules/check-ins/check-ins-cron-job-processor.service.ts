import { Process, Processor } from '@nestjs/bull';
import { sql, Transaction } from 'kysely';
import { DB } from 'kysely-codegen';
import type { Dayjs, OpUnitType } from 'dayjs';

import { Database } from '../../database/database.module';
import { QUEUES } from '../../queues/queues';
import { GeneralQueueProcessor } from '../../shared/general-queue-processor';
import { DateService } from '../../shared/date.service';

@Processor(QUEUES.CHECK_INS_QUEUE.name)
export class CheckInsCronJobProcessorService extends GeneralQueueProcessor {
  constructor(
    private readonly database: Database,
    private dateService: DateService,
  ) {
    super();
  }

  @Process(QUEUES.CHECK_INS_QUEUE.CHECK_INS.name)
  async handleCron() {
    await this.database.transaction().execute(async (tx) => {
      const checkIns = await this.getCheckInsData(tx);

      for (const checkIn of checkIns) {
        const { companyId, recurrence } = checkIn;

        const employees = await this.getEmployeesData(tx, companyId);

        if (recurrence === 'DAILY') {
          await this.createCheckInsForRecurrence(tx, checkIn, employees, 'day');
        } else if (recurrence === 'WEEKLY') {
          await this.createCheckInsForRecurrence(
            tx,
            checkIn,
            employees,
            'week',
          );
        } else if (recurrence === 'MONTHLY') {
          await this.createCheckInsForRecurrence(
            tx,
            checkIn,
            employees,
            'month',
          );
        }
      }
    });
  }

  private async getCheckInsData(tx: Transaction<DB>) {
    return await tx
      .selectFrom('CheckInForm')
      .innerJoin('Company', 'Company.id', 'CheckInForm.companyId')
      .where('CheckInForm.active', '=', true)
      .where('Company.active', '=', true)
      .select([
        'CheckInForm.recurrence',
        'CheckInForm.id',
        'Company.id as companyId',
      ])
      .execute();
  }

  private async getEmployeesData(tx: Transaction<DB>, companyId: number) {
    return await tx
      .selectFrom('Employee')
      .where('Employee.companyId', '=', companyId)
      .where('Employee.status', '=', 'ACTIVE')
      .select('Employee.id')
      .execute();
  }

  private async createCheckInsForRecurrence(
    tx: Transaction<DB>,
    checkIn: any,
    employees: any,
    interval: OpUnitType,
  ) {
    const currentDateEnd = this.dateService.getCurrentDate().endOf(interval);

    for (const employee of employees) {
      const employeeId = employee.id;
      const checkInFormId = checkIn.id;

      const checkInSubmission = await this.getCheckInSubmissionData(
        tx,
        checkInFormId,
        employeeId,
        interval,
      );

      if (checkInSubmission.length === 0) {
        await this.createCheckInSubmission(
          tx,
          checkInFormId,
          employeeId,
          currentDateEnd,
        );
      }
    }
  }

  private async getCheckInSubmissionData(
    tx: Transaction<DB>,
    checkInFormId: number,
    employeeId: number,
    interval: string,
  ) {
    return await tx
      .selectFrom('CheckInFormSubmission')
      .where('CheckInFormSubmission.checkInFormId', '=', checkInFormId)
      .where('CheckInFormSubmission.submittedById', '=', employeeId)
      .where((eb) => {
        if (interval === 'day') {
          return eb.and([
            sql<any>`EXTRACT(DAY FROM "CheckInFormSubmission"."createdAt") = EXTRACT(DAY FROM CURRENT_DATE)`,
            sql<any>`EXTRACT(MONTH FROM "CheckInFormSubmission"."createdAt") = EXTRACT(MONTH FROM CURRENT_DATE)`,
            sql<any>`EXTRACT(YEAR FROM "CheckInFormSubmission"."createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)`,
          ]);
        }
        if (interval === 'week') {
          return sql<any>`EXTRACT(WEEK FROM "CheckInFormSubmission"."createdAt") = EXTRACT(WEEK FROM CURRENT_DATE) AND EXTRACT(year FROM "CheckInFormSubmission"."createdAt") = EXTRACT(year FROM CURRENT_DATE);`;
        }
        if (interval === 'month') {
          return sql<any>`EXTRACT(MONTH FROM "CheckInFormSubmission"."createdAt") = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(year FROM "CheckInFormSubmission"."createdAt") = EXTRACT(year FROM CURRENT_DATE);`;
        }
        throw new Error('Unsupported interval type: ' + interval);
      })
      .select('CheckInFormSubmission.id')
      .execute();
  }

  private async createCheckInSubmission(
    tx: Transaction<DB>,
    checkInFormId: number,
    employeeId: number,
    currentDateEnd: Dayjs,
  ) {
    await tx
      .insertInto('CheckInFormSubmission')
      .values({
        checkInFormId,
        submittedById: employeeId,
        createdAt: new Date().toISOString(),
        status: 'PENDING',
        answer: '',
        dueAt: currentDateEnd.toISOString(),
      })
      .execute();
  }
}
