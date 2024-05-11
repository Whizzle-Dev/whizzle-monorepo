import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NOTIFICATIONS_QUEUE } from '../../queues/notification-queue';
import { AccessControlService } from '../auth/access-control.service';
import {
  CHECK_INS_QUEUE,
  EMPLOYEES_QUEUE,
  PTO_QUEUE,
} from '../../queues/cron-jobs';
import { FilesModule } from '../files/files.module';
import { DateService } from '../../shared/date.service';
import { Buffer } from 'buffer';
import { UtilService } from '../../services/util.service';

@Global()
@Module({
  providers: [AccessControlService, DateService, UtilService],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        privateKey: Buffer.from(
          configService.get('JWT_PRIVATE_KEY') as string,
          'base64',
        ).toString('utf-8'),
        publicKey: Buffer.from(
          configService.get('JWT_PUBLIC_KEY') as string,
          'base64',
        ).toString('utf-8'),
        verifyOptions: {
          algorithms: [configService.get('JWT_ALGORITHM')] as any,
        },
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue(
      {
        name: CHECK_INS_QUEUE,
      },
      {
        name: PTO_QUEUE,
      },
      {
        name: EMPLOYEES_QUEUE,
      },
      {
        name: NOTIFICATIONS_QUEUE,
      },
    ),
    FilesModule,
  ],
  exports: [
    ConfigModule,
    JwtModule,
    BullModule,
    AccessControlService,
    FilesModule,
    DateService,
    UtilService,
  ],
})
export class GlobalModule {}
