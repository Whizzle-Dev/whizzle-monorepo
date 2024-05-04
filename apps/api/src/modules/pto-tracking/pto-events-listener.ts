import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Database } from '../../database/database.module';
import { PtoRequestCreatedEvent } from '../events/types';
import { NotificationsService } from '../notifications/notifications.service';
import { AppEvents } from '../../shared/app-events';

@Injectable()
export class PtoEventsListener {
  constructor(
    private database: Database,
    private notificationsService: NotificationsService,
  ) {}

  @OnEvent(AppEvents.PTO_REQUEST_CREATED)
  async handleOrderCreatedEvent(event: PtoRequestCreatedEvent) {
    const { timeOfRequest, approvers } = event;
    const { approversList, requestedBy, requestType } = await this.database
      .transaction()
      .execute(async (tx) => {
        const requestedBy = await tx
          .selectFrom('Employee')
          .where('Employee.id', '=', timeOfRequest.requestedById)
          .innerJoin('User', 'User.id', 'Employee.userId')
          .select(['User.name', 'User.email'])
          .executeTakeFirstOrThrow();

        const approversList = await tx
          .selectFrom('Employee')
          .where('Employee.id', 'in', approvers)
          .innerJoin('User', 'User.id', 'Employee.userId')
          .select(['User.email', 'Employee.id'])
          .execute();

        const requestType = await tx
          .selectFrom('LeaveCategory')
          .where('id', '=', timeOfRequest.categoryId)
          .select(['name'])
          .executeTakeFirstOrThrow();
        return {
          requestedBy,
          approversList,
          requestType,
        };
      });

    this.notificationsService.handlePtoRequestSubmitted(
      timeOfRequest.requestedById,
      requestedBy,
      approversList,
      requestType,
      timeOfRequest,
    );
  }

  @OnEvent('PTO_REQUEST_REJECTED')
  async handleRejected(event: { requestId: number }) {
    // send email to the request submitter
    console.log('PTO_REQUEST_REJECTED');
  }
  @OnEvent('PTO_REQUEST_FULLY_APPROVED')
  async handleFullyApproved(event: { requestId: number }) {
    // send email to the request submitter

    console.log('PTO_REQUEST_FULLY_APPROVED');
  }

  @OnEvent('PTO_REQUEST_LEVEL_APPROVED')
  async handleLevelApproved(event: { requestId: number }) {
    // send email to the next level approvers
    console.log('PTO_REQUEST_LEVEL_APPROVED');
  }
}
