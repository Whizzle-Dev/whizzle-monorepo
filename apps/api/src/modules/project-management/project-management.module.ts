import { Module } from '@nestjs/common';
import { ProjectManagementResolver } from './project-management.resolver';
import { ProjectManagementService } from './project-management.service';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [],
  providers: [
    ProjectManagementResolver,
    ProjectManagementService,
    TasksService,
    TasksResolver,
  ],
  exports: [],
})
export class ProjectManagementModule {}
