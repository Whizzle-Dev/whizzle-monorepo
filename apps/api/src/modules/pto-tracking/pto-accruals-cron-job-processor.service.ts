import { DateService } from '../../shared/date.service';
import { Database } from '../../database/database.module';
import { VacationPolicyService } from './vacation-policy.service';
import { QUEUES } from '../../queues/queues';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

@Processor(QUEUES.PTO_QUEUE.name)
export class PtoAccrualsCronJobProcessorService {
  private readonly logger = new Logger(PtoAccrualsCronJobProcessorService.name);
  private readonly SUPPORTED_ACCRUAL_TYPES = [
    'PER_MONTH_START',
    'PER_YEAR_START',
  ];
  constructor(
    private readonly database: Database,
    private dateService: DateService,
    private vacationPolicyService: VacationPolicyService,
  ) {}

  @Process(QUEUES.PTO_QUEUE.PTO_ACCRUALS.name)
  async handleCron() {
    await this.database.transaction().execute(async (tx) => {
      try {
        // Fetch all active employees
        const employees = await tx
          .selectFrom('Employee')
          .where('Employee.status', '=', 'ACTIVE')
          .select(['Employee.id', 'assignedVacationPolicyId', 'companyId'])
          .execute();

        for (let i = 0; i < employees.length; i++) {
          const employee = employees[i];

          // Fetch the assigned vacation policy or the default policy for the company
          const policy =
            await this.vacationPolicyService.getVacationPolicyForEmployee(
              tx,
              employee.id,
              employee.companyId,
            );

          if (!policy) {
            continue;
          }

          // Fetch the leave categories for the fetched policy
          const leaveCategories = await tx
            .selectFrom('LeaveCategory')
            .where('LeaveCategory.companyId', '=', employee.companyId)
            .where('LeaveCategory.policyId', '=', policy.id)
            .selectAll()
            .execute();

          for (let j = 0; j < leaveCategories.length; j++) {
            const leaveCategory = leaveCategories[j];

            if (
              !this.SUPPORTED_ACCRUAL_TYPES.includes(leaveCategory.accrualType)
            ) {
              continue;
            }

            // Check if there is a LeaveAccrual with this leaveCategoryId created in the current period
            let queryForLeaveAccrual = tx
              .selectFrom('LeaveAccrual')
              .where('LeaveAccrual.employeeId', '=', employee.id)
              .where('LeaveAccrual.categoryId', '=', leaveCategory.id);

            const currentDate = this.dateService.getCurrentDate();
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

            // If there's no LeaveAccrual, calculate the accrual value and create a new LeaveAccrual
            if (!leaveAccrual) {
              const accrualValue =
                this.getAccrualValueForLeaveCategory(leaveCategory);

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
      } catch (e) {
        this.logger.error('Failed to accrue PTO', e);
        throw e;
      }
    });
  }

  getAccrualValueForLeaveCategory(leaveCategory: {
    accrualType: string;
    daysAllowed: number;
  }) {
    return leaveCategory.accrualType === 'PER_MONTH_START'
      ? +(leaveCategory.daysAllowed / 12).toFixed(2)
      : leaveCategory.accrualType === 'PER_YEAR_START'
      ? leaveCategory.daysAllowed
      : leaveCategory.daysAllowed;
  }
}
