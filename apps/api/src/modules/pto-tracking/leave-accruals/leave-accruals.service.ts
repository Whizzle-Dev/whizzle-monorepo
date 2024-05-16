import { Injectable } from '@nestjs/common';
import { Database } from '../../../database/database.module';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

@Injectable()
export class LeaveAccrualsService {
  constructor(private database: Database) {}
  getAccrualsQuery() {
    return this.database
      .selectFrom('LeaveAccrual')
      .innerJoin('Employee', 'Employee.id', 'LeaveAccrual.employeeId')
      .leftJoin('LeaveCategory', 'LeaveCategory.id', 'LeaveAccrual.categoryId')
      .select((eb) => [
        'LeaveAccrual.id',
        'LeaveAccrual.employeeId',
        'LeaveAccrual.categoryId',
        'LeaveAccrual.accrualValue',
        'LeaveAccrual.accrualDate',
        'LeaveAccrual.description',
        'LeaveAccrual.cancelReason',
        'LeaveAccrual.status',
        'LeaveAccrual.timeOfRequestId',
        'LeaveAccrual.createdAt',
        'LeaveAccrual.updatedAt',
        'Employee.companyId as companyId',
        'LeaveCategory.name as leaveCategoryName',
        jsonObjectFrom(
          eb
            .selectFrom('Employee')
            .whereRef('Employee.id', '=', 'LeaveAccrual.employeeId')
            .innerJoin('User', 'User.id', 'Employee.userId')
            .select([
              'User.name as name',
              'Employee.id as id',
              'User.email as email',
              'Employee.permissionRole as permissionRole',
              'Employee.companyId as companyId',
              'Employee.status as status',
              'User.profilePhotoUrl as profilePhotoUrl',
            ]),
        ).as('employee'),
      ])
      .orderBy('LeaveAccrual.createdAt desc');
  }
  getAccrualsForEmployee(employeeId: number, companyId: number) {
    return this.getAccrualsQuery()
      .where('LeaveAccrual.employeeId', '=', employeeId)
      .where('Employee.companyId', '=', companyId)
      .execute();
  }

  getAccrualsForCompany(companyId: number) {
    return this.getAccrualsQuery()
      .where('Employee.companyId', '=', companyId)
      .execute();
  }
}
