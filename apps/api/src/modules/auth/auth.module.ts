import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { UtilService } from '../../services/util.service';
import { AuthResolver } from './auth.resolver';
import { PasswordService } from '../../services/password.service';
import { AuthRepository } from './auth.repository';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  providers: [
    AuthService,
    UtilService,
    AuthResolver,
    PasswordService,
    AuthRepository,
  ],
  imports: [forwardRef(() => UserModule), NotificationsModule],
  exports: [AuthService],
})
export class AuthModule {}
