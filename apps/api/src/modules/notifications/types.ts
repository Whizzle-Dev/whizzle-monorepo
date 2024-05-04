import { NotificationType } from '../../queues/notification-queue';

export type Templates =
  | 'invitation'
  | 'verify-account'
  | 'pto-notify-approvers'
  | 'employee-mentioned-on-document';

export type SendEmailArgs = {
  recipients: string[];
  template: Templates;
  data: any;
  subject: string;
};
export type CreateNotificationArgs = {
  payload: any;
  eventName: NotificationType;
  employeeId: number;
  version?: number;
  title: string;
};
