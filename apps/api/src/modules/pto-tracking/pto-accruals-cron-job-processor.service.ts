import { Process, Processor } from '@nestjs/bull';
import { PTO_ACCRUALS_CRON_JOB, PTO_QUEUE } from '../../queues/cron-jobs';
import { Database } from '../../database/database.module';
import { DateService } from '../../shared/date.service';

@Processor(PTO_QUEUE)
export class PtoAccrualsCronJobProcessorService {
  constructor(
    private readonly database: Database,
    private dateService: DateService,
  ) {}
  @Process(PTO_ACCRUALS_CRON_JOB)
  async handleCron() {
    // go over vacation policies
    await this.database.transaction().execute(async (tx) => {
      try {
        // fetch vacation policy for each company by taking the latest policy for each company
        const companies = await tx.selectFrom('Company').selectAll().execute();

        for (let i = 0; i < companies.length; i++) {
          const company = companies[i];
          const policy = await tx
            .selectFrom('VacationPolicy')
            .where('VacationPolicy.companyId', '=', company.id)
            .where('VacationPolicy.default', '=', true)
            .orderBy('VacationPolicy.createdAt', 'desc')
            .selectAll()
            .limit(1)
            .executeTakeFirst();
          if (!policy) {
            continue;
          }
          const leaveCategories = await tx
            .selectFrom('LeaveCategory')
            .where('LeaveCategory.companyId', '=', company.id)
            .where('LeaveCategory.policyId', '=', policy.id)
            .selectAll()
            .execute();

          // for each leave category, accrue PTO for each employee

          const SUPPORTED_ACCRUAL_TYPES = ['PER_MONTH_START', 'PER_YEAR_START'];
          for (let j = 0; j < leaveCategories.length; j++) {
            const leaveCategory = leaveCategories[j];

            if (!SUPPORTED_ACCRUAL_TYPES.includes(leaveCategory.accrualType)) {
              return;
            }
            // for each employee check if there is a LeaveAccrual with this leaveCategoryId created in the current month

            const employees = await tx
              .selectFrom('Employee')
              .where('Employee.companyId', '=', company.id)
              .where('Employee.status', '=', 'ACTIVE')
              .selectAll()
              .execute();

            for (let k = 0; k < employees.length; k++) {
              const currentDate = this.dateService.getCurrentDate();
              const employee = employees[k];

              let queryForLeaveAccrual = tx
                .selectFrom('LeaveAccrual')
                .where('LeaveAccrual.employeeId', '=', employee.id)
                .where('LeaveAccrual.categoryId', '=', leaveCategory.id);

              if (leaveCategory.accrualType === 'PER_MONTH_START') {
                queryForLeaveAccrual = queryForLeaveAccrual
                  .where(
                    'LeaveAccrual.createdAt',
                    '>',
                    currentDate.startOf('month').toDate(),
                  )
                  .where(
                    'LeaveAccrual.createdAt',
                    '<',
                    currentDate.endOf('month').toDate(),
                  );
              }
              if (leaveCategory.accrualType === 'PER_YEAR_START') {
                queryForLeaveAccrual = queryForLeaveAccrual
                  .where(
                    'LeaveAccrual.createdAt',
                    '>',
                    currentDate.startOf('year').toDate(),
                  )
                  .where(
                    'LeaveAccrual.createdAt',
                    '<',
                    currentDate.endOf('year').toDate(),
                  );
              }

              const leaveAccrual = await queryForLeaveAccrual
                .selectAll()
                .executeTakeFirst();

              if (!leaveAccrual) {
                const accrualValue =
                  leaveCategory.accrualType === 'PER_MONTH_START'
                    ? +(leaveCategory.daysAllowed / 12).toFixed(2)
                    : leaveCategory.accrualType === 'PER_YEAR_START'
                    ? leaveCategory.daysAllowed
                    : leaveCategory.daysAllowed;
                await tx
                  .insertInto('LeaveAccrual')
                  .values({
                    employeeId: employee.id,
                    categoryId: leaveCategory.id,
                    accrualValue,
                    accrualDate: new Date().toISOString(),
                  })
                  .returning('id')
                  .executeTakeFirstOrThrow();
              }
            }
          }
        }
      } catch (e) {
        console.error('Failed to accrue PTO', e);
        throw e;
      }
    });
  }
}
