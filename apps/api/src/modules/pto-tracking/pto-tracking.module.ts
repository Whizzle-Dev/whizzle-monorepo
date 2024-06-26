import { Module } from '@nestjs/common';
import { VacationPolicyResolver } from './vacation-policy.resolver';
import { PtoTrackingService } from './pto-tracking.service';
import { LeaveCategoriesResolver } from './leave-category.resolver';
import { ApprovalRoutingResolver } from './approval-routing/approval-routing.resolver';
import { PtoTrackingResolver } from './pto-tracking.resolver';
import { PtoAccrualsCronJobProcessorService } from './pto-accruals-cron-job-processor.service';
import { PtoEventsListener } from './pto-events-listener';
import { LeaveAccrualsService } from './leave-accruals/leave-accruals.service';
import { LeaveAccrualsResolver } from './leave-accruals/leave-accruals.resolver';
import { NotificationsModule } from '../notifications/notifications.module';
import { ApprovalRoutingRepository } from './approval-routing/approval-routing.respository';
import { ApprovalRoutingService } from './approval-routing/approval-routing.service';
import { VacationPolicyService } from './vacation-policy.service';

@Module({
  imports: [NotificationsModule],
  providers: [
    VacationPolicyResolver,
    LeaveCategoriesResolver,
    ApprovalRoutingResolver,
    PtoTrackingService,
    PtoTrackingResolver,
    PtoAccrualsCronJobProcessorService,
    PtoEventsListener,
    LeaveAccrualsService,
    LeaveAccrualsResolver,
    ApprovalRoutingRepository,
    ApprovalRoutingService,
    VacationPolicyService,
  ],
  exports: [PtoAccrualsCronJobProcessorService, PtoEventsListener],
})
export class PtoTrackingModule {}
