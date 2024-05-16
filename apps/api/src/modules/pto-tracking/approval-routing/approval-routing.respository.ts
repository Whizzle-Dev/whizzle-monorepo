import { Injectable } from '@nestjs/common';
import { Database } from '../../../database/database.module';

@Injectable()
export class ApprovalRoutingRepository {
  constructor(private database: Database) {}

  assignApprovalRouting(
    employeeIds: number[],
    approvalRoutingId: number,
    companyId: number,
  ) {
    return this.database
      .updateTable('Employee')
      .where('id', 'in', employeeIds)
      .where('companyId', '=', companyId)
      .set('assignedApprovalRoutingId', approvalRoutingId);
  }

  deleteApprovalRouting(id: number, companyId: number) {
    return this.database
      .deleteFrom('ApprovalRouting')
      .where('id', '=', id)
      .where('companyId', '=', companyId);
  }
}
