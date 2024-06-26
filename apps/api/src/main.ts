import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  const sentryDsn = process.env.SENTRY_DSN;

  if (sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      environment: process.env.ENVIRONMENT,
      ignoreErrors: ['Non-Error exception captured'],
      integrations: [new Sentry.Integrations.Http({ tracing: true })],
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(helmet());

  app.enableCors();

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
