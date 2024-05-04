import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import {
  CHECK_INS_QUEUE,
  CRON_JOB_FOR_CHECK_INS,
  CRON_JOB_FOR_CHECK_INS_UNIQUE_ID,
  EMPLOYEE_EXPIRED_INVITES_JOB,
  EMPLOYEE_EXPIRED_INVITES_JOB_ID,
  EMPLOYEE_PROFILE_IMAGE_GENERATOR_JOB,
  EMPLOYEE_PROFILE_IMAGE_GENERATOR_JOB_ID,
  EMPLOYEES_QUEUE,
  PTO_ACCRUALS_CRON_JOB,
  PTO_ACCRUALS_CRON_JOB_ID,
  PTO_QUEUE,
} from './cron-jobs';
import { Queue } from 'bull';
import { CronExpression } from '../types/cron-expresion';

@Injectable()
export class CronJobsManagerService {
  config = {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  };
  constructor(
    @InjectQueue(CHECK_INS_QUEUE)
    private checkInQueue: Queue,
    @InjectQueue(PTO_QUEUE)
    private ptoQueue: Queue,
    @InjectQueue(EMPLOYEES_QUEUE)
    private employeeQueue: Queue,
  ) {}

  registerJobs() {
    this.checkInQueue.add(
      CRON_JOB_FOR_CHECK_INS,
      {},
      {
        ...this.config,
        repeat: {
          cron: CronExpression.EVERY_12_HOURS,
        } as any,
        jobId: CRON_JOB_FOR_CHECK_INS_UNIQUE_ID,
      },
    );

    this.ptoQueue.add(
      PTO_ACCRUALS_CRON_JOB,
      {},
      {
        ...this.config,
        repeat: {
          cron: CronExpression.EVERY_12_HOURS,
        } as any,
        jobId: PTO_ACCRUALS_CRON_JOB_ID,
      },
    );

    this.employeeQueue.add(
      EMPLOYEE_EXPIRED_INVITES_JOB,
      {},
      {
        ...this.config,
        repeat: {
          cron: CronExpression.EVERY_2_HOURS,
        } as any,
        jobId: EMPLOYEE_EXPIRED_INVITES_JOB_ID,
      },
    );
    this.employeeQueue.add(
      EMPLOYEE_PROFILE_IMAGE_GENERATOR_JOB,
      {},
      {
        ...this.config,
        repeat: {
          cron: CronExpression.EVERY_DAY_AT_2AM,
        } as any,
        jobId: EMPLOYEE_PROFILE_IMAGE_GENERATOR_JOB_ID,
      },
    );
  }
}
