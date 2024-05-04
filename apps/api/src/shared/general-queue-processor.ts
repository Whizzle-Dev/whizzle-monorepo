import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueWaiting,
} from '@nestjs/bull';
import { Job } from 'bull';

export abstract class GeneralQueueProcessor {
  @OnQueueFailed()
  handler(job: Job, error: Error) {
    console.log(`fired exception for job ${job.id}`, error);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );
  }

  @OnQueueWaiting()
  waiting(job: Job) {
    console.log(`A job with id ${job.id} is waiting...`);
  }
  @OnQueueCompleted()
  completed(job: Job) {
    console.log(`A job with id ${job.id} is completed...`);
  }
}
