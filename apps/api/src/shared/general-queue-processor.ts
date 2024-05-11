import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueWaiting,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

export abstract class GeneralQueueProcessor {
  private readonly logger = new Logger(GeneralQueueProcessor.name);

  @OnQueueFailed()
  handler(job: Job, error: Error) {
    this.logger.error(`fired exception for job ${job.id}`, error);
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job ${job.id} of type ${job.name}...`);
  }

  @OnQueueWaiting()
  waiting(job: Job) {
    this.logger.log(`Job ${job.id} is waiting...`);
  }
  @OnQueueCompleted()
  completed(job: Job) {
    this.logger.log(`Job ${job.id} completed`);
  }
}
