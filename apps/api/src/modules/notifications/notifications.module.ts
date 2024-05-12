import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { NotificationsProcessorQueue } from './notifications-processor.queue';
import { HtmlRenderService } from './html-render.service';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';

@Module({
  providers: [
    EmailService,
    NotificationsProcessorQueue,
    HtmlRenderService,
    NotificationsService,
    NotificationsResolver,
  ],
  exports: [NotificationsService],
  imports: [],
})
export class NotificationsModule {}
