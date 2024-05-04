import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import {
  NOTIFICATIONS_QUEUE,
  NotificationsQueueEvents,
  NotificationsQueueJobs,
} from '../../queues/notification-queue';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import { DateService } from '../../shared/date.service';
import { CreateNotificationArgs } from './types';

@Injectable()
export class NotificationsService {
  constructor(
    private database: Database,
    @InjectQueue(NOTIFICATIONS_QUEUE)
    private notificationsQueue: Queue<NotificationsQueueEvents>,
    private configService: ConfigService,
    private dateService: DateService,
  ) {}

  private createNotifications(args: CreateNotificationArgs[]) {
    return this.database
      .insertInto('Notification')
      .values(
        args.map((arg) => ({
          payload: arg.payload,
          employeeId: arg.employeeId,
          read: false,
          eventName: arg.eventName,
          title: arg.title,
        })),
      )
      .returning(['Notification.id'])
      .execute();
  }

  async handlePtoRequestSubmitted(
    employeeId: number,
    requestedBy: { name: string | null; email: string },
    approversList: { email: string; id: number }[],
    requestType: { name: string },
    timeOfRequest: {
      id: number;
      workingDays: number;
      startDate: Date;
      endDate: Date;
    },
  ) {
    const payload = {
      recipients: approversList.map((a) => a.email),
      requestSubmitterName: requestedBy.name ?? '',
      requestDuration: `${timeOfRequest.workingDays} ${
        timeOfRequest.workingDays > 1 ? 'days' : 'day'
      }`,
      timeOffType: requestType.name ?? '',
      startDate: this.dateService.formatDate(
        timeOfRequest.startDate,
        DateService.Formats.FullMonthDayFullYear,
      ),
      endDate: this.dateService.formatDate(
        timeOfRequest.endDate,
        DateService.Formats.FullMonthDayFullYear,
      ),
      ctaLink: `${this.configService.get(
        'APP_URL',
      )}/app/dashboard/pto/request-timeof?requestId=${timeOfRequest.id}`,
      requestId: timeOfRequest.id,
    };

    await this.createNotifications(
      approversList.map((approver) => ({
        payload: JSON.stringify(payload),
        eventName: 'PTO_REQUEST_SUBMITTED',
        employeeId: approver.id,
        version: 2,
        title: `${requestedBy.name} submitted a PTO request for ${timeOfRequest.workingDays} days`,
      })),
    );

    this.notificationsQueue.add(NotificationsQueueJobs.SEND_EMAIL, {
      type: 'PTO_REQUEST_SUBMITTED',
      ...payload,
    });
  }

  handleUserSignedUp(verificationToken: string, email: string) {
    this.notificationsQueue.add(NotificationsQueueJobs.SEND_EMAIL, {
      type: 'AUTH_VERIFY_ACCOUNT',
      verificationToken,
      email,
    });
  }

  getNotifications(employeeId: number) {
    return this.database
      .selectFrom('Notification')
      .where('Notification.employeeId', '=', employeeId)
      .select([
        'Notification.id',
        'Notification.payload',
        'Notification.read',
        'Notification.createdAt',
        'Notification.title',
        'Notification.eventName',
      ])
      .orderBy('Notification.createdAt', 'desc')
      .execute();
  }

  async handleEmployeeInvited(args: {
    companyId: number;
    invitedBy: number;
    email: string;
    inviteCode: string;
  }) {
    const [company, inviter] = await this.database
      .transaction()
      .execute((trx) => {
        return Promise.all([
          trx
            .selectFrom('Company')
            .where('Company.id', '=', args.companyId)
            .select(['Company.businessName as businessName'])
            .executeTakeFirstOrThrow(),
          trx
            .selectFrom('User')
            .where('User.id', '=', args.invitedBy)
            .select(['User.name as name'])
            .executeTakeFirstOrThrow(),
        ]);
      });
    this.notificationsQueue.add(NotificationsQueueJobs.SEND_EMAIL, {
      type: 'INVITE_USER_EVENT',
      email: args.email as string,
      inviteLink:
        this.configService.get('APP_URL') +
        '/accept-invite?code=' +
        args.inviteCode,
      // todo fix 'as string'
      companyName: company.businessName as string,
      inviterName: inviter.name as string,
    });
  }

  handleEmployeeAddedToCompany(companyName: string) {
    this.notificationsQueue.add(NotificationsQueueJobs.SEND_EMAIL, {
      type: 'ADD_EMPLOYEE_TO_COMPANY',
      companyName,
      accessUrl: this.configService.get('APP_URL') as string,
    });
  }

  handleEmployeeInviteResend(args: {
    email: string;
    companyBusinessName: string;
    inviterName: string;
    code: string;
  }) {
    this.notificationsQueue.add(NotificationsQueueJobs.SEND_EMAIL, {
      type: 'RESEND_INVITE_USER_EVENT',
      email: args.email,
      inviteLink:
        this.configService.get('APP_URL') + '/accept-invite?code=' + args.code,
      companyName: args.companyBusinessName,
      inviterName: args.inviterName ?? '',
    });
  }

  async handleMentionOnDocument(param: {
    companyId: number;
    mentionedEmployee: number;
    employeeId: number;
    documentId: number;
  }) {
    const mentionedEmployee = await this.database
      .selectFrom('Employee')
      .innerJoin('User', 'Employee.userId', 'User.id')
      .where('Employee.id', '=', param.mentionedEmployee)
      .select(['User.email as email', 'Employee.id as id'])
      .executeTakeFirstOrThrow();

    const mentionerEmployee = await this.database
      .selectFrom('Employee')
      .innerJoin('User', 'Employee.userId', 'User.id')
      .where('Employee.id', '=', param.employeeId)
      .select(['User.name as name', 'Employee.id as id', 'User.email as email'])
      .executeTakeFirstOrThrow();

    const payload = {
      type: 'EMPLOYEE_MENTIONED_ON_DOCUMENT',
      mentionedEmployeeEmail: mentionedEmployee.email,
      mentionedEmployeeId: mentionedEmployee.id,
      mentionerEmployeeId: mentionerEmployee.id,
      mentionerEmployeeName: mentionerEmployee.name ?? mentionerEmployee.email,
      ctaUrl:
        this.configService.get('APP_URL') +
        `/app/dashboard/documents?id=${param.documentId}`,
    } as const;

    this.createNotifications([
      {
        payload: JSON.stringify(payload),
        eventName: 'EMPLOYEE_MENTIONED_ON_DOCUMENT',
        employeeId: mentionedEmployee.id,
        version: 1,
        title: `${mentionerEmployee.name} mentioned you on a document`,
      },
    ]);

    this.notificationsQueue.add(NotificationsQueueJobs.SEND_EMAIL, payload);
  }

  markAsRead(employeeId: number, id: number) {
    return this.database
      .updateTable('Notification')
      .set('read', true)
      .where('Notification.id', '=', id)
      .where('Notification.employeeId', '=', employeeId)
      .execute();
  }

  handleEmployeeAssigned(param: {
    companyId: number;
    assignedBy: number;
    assignedTo: number;
    taskId: number;
  }) {
    const payload = {
      type: 'EMPLOYEE_ASSIGNED_ON_A_TASK' as const,
      assignedEmployeeId: param.assignedTo,
      assignerEmployeeId: param.assignedBy,
      assignerEmployeeName: '',
      taskId: param.taskId,
      taskName: '',
      ctaUrl:
        this.configService.get('APP_URL') +
        `/app/dashboard/tasks/${param.taskId}`,
    };
    this.createNotifications([
      {
        payload: JSON.stringify(payload),
        eventName: 'EMPLOYEE_ASSIGNED_ON_A_TASK',
        employeeId: param.assignedTo,
        version: 1,
        title: 'You have been assigned to a task',
      },
    ]);
  }

  getUnreadNotificationsCount(employeeId: number) {
    return this.database
      .selectFrom('Notification')
      .where('Notification.employeeId', '=', employeeId)
      .where('Notification.read', '=', false)
      .select((eb) => [eb.fn.countAll<number>('Notification').as('count')])
      .executeTakeFirstOrThrow();
  }
}
