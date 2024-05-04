import { Module } from '@nestjs/common';
import { CheckInsResolver } from './check-ins.resolver';
import { CheckInsRepository } from './check-ins.repository';
import { CheckInsCronJobProcessorService } from './check-ins-cron-job-processor.service';

@Module({
  providers: [
    CheckInsRepository,
    CheckInsResolver,
    CheckInsCronJobProcessorService,
  ],
  imports: [],
  exports: [CheckInsCronJobProcessorService],
})
export class CheckInsModule {}
