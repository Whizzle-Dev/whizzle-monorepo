import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QUEUES } from './queues';
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
    @InjectQueue(QUEUES.CHECK_INS_QUEUE.name)
    private checkInQueue: Queue,
    @InjectQueue(QUEUES.PTO_QUEUE.name)
    private ptoQueue: Queue,
    @InjectQueue(QUEUES.EMPLOYEES_QUEUE.name)
    private employeeQueue: Queue,
  ) {}

  registerJobs() {
    this.checkInQueue.add(
      QUEUES.CHECK_INS_QUEUE.CHECK_INS.name,
      {},
      {
        ...this.config,
        repeat: {
          cron: CronExpression.EVERY_12_HOURS,
        },
        jobId: QUEUES.CHECK_INS_QUEUE.CHECK_INS.id,
      },
    );

    this.ptoQueue.add(
      QUEUES.PTO_QUEUE.PTO_ACCRUALS.name,
      {},
      {
        ...this.config,
        repeat: {
          cron: CronExpression.EVERY_12_HOURS,
        },
        jobId: QUEUES.PTO_QUEUE.PTO_ACCRUALS.id,
      },
    );

    this.employeeQueue.add(
      QUEUES.EMPLOYEES_QUEUE.EXPIRED_INVITES.name,
      {},
      {
        ...this.config,
        repeat: {
          cron: CronExpression.EVERY_6_HOURS,
        },
        jobId: QUEUES.EMPLOYEES_QUEUE.EXPIRED_INVITES.id,
      },
    );
    this.employeeQueue.add(
      QUEUES.EMPLOYEES_QUEUE.PROFILE_IMAGE_GENERATOR.name,
      {},
      {
        ...this.config,
        repeat: {
          cron: CronExpression.EVERY_DAY_AT_2AM,
        },
        jobId: QUEUES.EMPLOYEES_QUEUE.PROFILE_IMAGE_GENERATOR.id,
      },
    );
  }
}
