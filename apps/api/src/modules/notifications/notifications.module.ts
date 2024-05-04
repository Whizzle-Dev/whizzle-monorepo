import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailProcessorService } from './email-processor.service';
import { HtmlRenderService } from './html-render.service';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';

@Module({
  providers: [
    EmailService,
    EmailProcessorService,
    HtmlRenderService,
    NotificationsService,
    NotificationsResolver,
  ],
  exports: [NotificationsService],
  imports: [],
})
export class NotificationsModule {}
