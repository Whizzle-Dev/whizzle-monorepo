import { Module } from '@nestjs/common';
import { TeamsResolver } from './teams.resolver';
import { EmployeesResolver } from './employees.resolver';
import { EmployeeService } from './employee.service';
import { RolesResolver } from './roles.resolver';
import { PasswordService } from '../../services/password.service';
import { EmployeeRepository } from './employee.repository';
import { RolesRepository } from './roles.repository';
import { TeamsRepository } from './teams.repository';
import { FilesService } from '../files/files.service';
import { EmployeeQueueProcessor } from './employee-queue.processor';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [
    // resolvers
    TeamsResolver,
    EmployeesResolver,
    RolesResolver,
    EmployeeRepository,
    // repositories
    RolesRepository,
    TeamsRepository,
    //services
    EmployeeService,
    PasswordService,
    FilesService,
    //other
    EmployeeQueueProcessor,
  ],
  exports: [EmployeeQueueProcessor],
})
export class CompanyModule {}
