import { Module } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';
import { TimeTrackingResolver } from './time-tracking.resolver';

@Module({
  imports: [],
  providers: [TimeTrackingService, TimeTrackingResolver],
  exports: [],
})
export class TimeTrackingModule {}
