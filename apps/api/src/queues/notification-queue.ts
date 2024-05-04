export const NOTIFICATIONS_QUEUE = 'notifications-queue';

export type NotificationsQueueEvents =
  | {
      type: 'AUTH_VERIFY_ACCOUNT';
      verificationToken: string;
      email: string;
    }
  | {
      type: 'INVITE_USER_EVENT';
      email: string;
      inviteLink: string;
      inviterName: string;
      companyName: string;
    }
  | {
      type: 'ADD_EMPLOYEE_TO_COMPANY';
      companyName: string;
      accessUrl: string;
    }
  | {
      type: 'RESEND_INVITE_USER_EVENT';
      email: string;
      inviteLink: string;
      companyName: string;
      inviterName: string;
    }
  | {
      type: 'PTO_REQUEST_SUBMITTED';
      recipients: string[];
      requestSubmitterName: string;
      requestDuration: string;
      timeOffType: string;
      startDate: string;
      endDate: string;
      ctaLink: string;
      requestId: number;
    }
  | {
      type: 'EMPLOYEE_MENTIONED_ON_DOCUMENT';
      ctaUrl: string;
      mentionedEmployeeId: number;
      mentionerEmployeeId: number;
      mentionedEmployeeEmail: string;
      mentionerEmployeeName: string;
    }
  | {
      type: 'EMPLOYEE_ASSIGNED_ON_A_TASK';
      ctaUrl: string;
      assignedEmployeeId: number;
      assignerEmployeeId: number;
      assignerEmployeeName: string;
      taskId: number;
      taskName: string;
    };

export enum NotificationsQueueJobs {
  SEND_EMAIL = 'send-email',
  SEND_SLACK_NOTIFICATION = 'send-slack-notification',
}

export type NotificationType = NotificationsQueueEvents['type'];
