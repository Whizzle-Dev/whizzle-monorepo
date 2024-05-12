import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalModule } from './modules/global/global.module';
import { UserModule } from './modules/users/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PtoTrackingModule } from './modules/pto-tracking/pto-tracking.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CompanyModule } from './modules/company/company.module';
import { CheckInsModule } from './modules/check-ins/check-ins.module';
import { DatabaseModule } from './database/database.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ProjectManagementModule } from './modules/project-management/project-management.module';
import { TimeTrackingModule } from './modules/time-tracking/time-tracking.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CronJobsManagerService } from './queues/cron-jobs-manager.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import GraphQLJSON from 'graphql-type-json';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { UtilService } from './services/util.service';

@Module({
  imports: [
    GlobalModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      resolvers: { JSON: GraphQLJSON },
      context: ({ req, res }: any) => ({ req, res }),
    }),
    AuthModule,
    UserModule,
    PtoTrackingModule,
    CompanyModule,
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get('REDIS_HOST') || '127.0.0.1',
            port: +configService.get('REDIS_PORT') || 6379,
            password: configService.get('REDIS_PASSWORD') || undefined,
            tls:
              configService.get('NODE_ENV') === 'production' ? {} : undefined,
          },
        };
      },
      inject: [ConfigService],
    }),
    CheckInsModule,
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('DB_HOST') as string,
        port: Number(configService.get('DB_PORT') as string),
        user: configService.get('POSTGRES_USER') as string,
        password: configService.get('POSTGRES_PASSWORD') as string,
        database: configService.get('POSTGRES_DB') as string,
        schema: configService.get('DB_SCHEMA') as string,
      }),
    }),
    NotificationsModule,
    DocumentsModule,
    ProjectManagementModule,
    TimeTrackingModule,
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    LoggerModule.forRootAsync({
      inject: [UtilService],
      useFactory: (utilService: UtilService) => ({
        pinoHttp: {
          level: 'debug',
          redact: ['req.headers.authorization'],
          genReqId: () => utilService.generateUUID(),
          autoLogging: true,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    CronJobsManagerService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: (configService: ConfigService) => {
        const timeoutInMilliseconds: number = parseInt(
          configService.get<any>('TIMEOUT_IN_MILLISECONDS', 30000),
        );
        return new TimeoutInterceptor(timeoutInMilliseconds);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private cronJobsManagerService: CronJobsManagerService) {}
  onApplicationBootstrap() {
    this.cronJobsManagerService.registerJobs();
  }
}
