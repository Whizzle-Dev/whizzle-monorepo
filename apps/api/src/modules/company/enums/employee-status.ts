import { registerEnumType } from '@nestjs/graphql';

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INVITED = 'INVITED',
  DISMISSED = 'DISMISSED',
  EXPIRED = 'EXPIRED',
}

registerEnumType(EmployeeStatus, { name: 'EmployeeStatus' });
