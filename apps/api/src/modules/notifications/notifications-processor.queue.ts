import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { NotificationsQueueEvents } from '../../queues/notification-queue';
import { EmailService } from './email.service';
import { GeneralQueueProcessor } from '../../shared/general-queue-processor';
import { QUEUES } from '../../queues/queues';

@Processor(QUEUES.NOTIFICATIONS_QUEUE.name)
export class NotificationsProcessorQueue extends GeneralQueueProcessor {
  constructor(private emailService: EmailService) {
    super();
  }

  @Process(QUEUES.NOTIFICATIONS_QUEUE.SEND_EMAIL.name)
  async sendEmail(job: Job<NotificationsQueueEvents>) {
    if (job.data.type === 'AUTH_VERIFY_ACCOUNT') {
      await this.emailService.sendEmail({
        recipients: [job.data.email],
        template: 'verify-account',
        data: { verificationCode: job.data.verificationToken },
        subject: 'Verify your account',
      });
      return true;
    }

    if (job.data.type === 'INVITE_USER_EVENT') {
      await this.emailService.sendEmail({
        recipients: [job.data.email],
        template: 'invitation',
        data: {
          inviterName: job.data.inviterName,
          companyName: job.data.companyName,
          inviteLink: job.data.inviteLink,
        },
        subject: 'You have been invited to join a company',
      });
      return true;
    }

    if (job.data.type === 'RESEND_INVITE_USER_EVENT') {
      await this.emailService.sendEmail({
        recipients: [job.data.email],
        template: 'invitation',
        data: {
          inviterName: job.data.inviterName,
          companyName: job.data.companyName,
          inviteLink: job.data.inviteLink,
        },
        subject: 'You have been invited to join a company',
      });

      return true;
    }
    if (job.data.type === 'PTO_REQUEST_SUBMITTED') {
      await this.emailService.sendEmail({
        recipients: job.data.recipients,
        template: 'pto-notify-approvers',
        data: {
          requestSubmitterName: job.data.requestSubmitterName,
          requestDuration: job.data.requestDuration,
          timeOffType: job.data.timeOffType,
          startDate: job.data.startDate,
          endDate: job.data.endDate,
          ctaLink: job.data.ctaLink,
        },
        subject: 'PTO Request',
      });

      return true;
    }
    if (job.data.type === 'EMPLOYEE_MENTIONED_ON_DOCUMENT') {
      await this.emailService.sendEmail({
        recipients: [job.data.mentionedEmployeeEmail],
        template: 'employee-mentioned-on-document',
        data: {
          mentionerName: job.data.mentionerEmployeeName,
          ctaLink: job.data.ctaUrl,
        },
        subject: 'You have been mentioned',
      });

      return true;
    }

    throw new Error('Not implemented');
  }
}
