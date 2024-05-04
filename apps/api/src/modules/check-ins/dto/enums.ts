import { registerEnumType } from '@nestjs/graphql';

export enum CheckInSubmissionStatus {
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
}

registerEnumType(CheckInSubmissionStatus, { name: 'CheckInSubmissionStatus' });

export enum CheckInType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

registerEnumType(CheckInType, { name: 'CheckInType' });
