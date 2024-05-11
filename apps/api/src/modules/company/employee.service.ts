import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UtilService } from '../../services/util.service';

import { PasswordService } from '../../services/password.service';
import { EmployeeRepository } from './employee.repository';
import { Database } from '../../database/database.module';
import { INVITE_VALID_DAYS } from '../../constants';
import { EditEmployeeInput } from './dto/edit-employee.input';
import { NotificationsService } from '../notifications/notifications.service';
import { InviteEmployeeArgs } from './types';
import { DateService } from '../../shared/date.service';

@Injectable()
export class EmployeeService {
  constructor(
    private utilService: UtilService,
    private passwordService: PasswordService,
    private employeeRepository: EmployeeRepository,
    private database: Database,
    private notificationsService: NotificationsService,
    private dateService: DateService,
  ) {}

  async inviteEmployee(args: InviteEmployeeArgs) {
    const existingEmployee = await this.employeeRepository.getByEmail(
      args.email,
      args.companyId,
    );

    const inviteCode = this.utilService.generateUUID();

    if (existingEmployee) {
      if (existingEmployee.status === 'ACTIVE') {
        throw new Error('User already active');
      }

      await this.employeeRepository.update(existingEmployee.id, {
        inviteCode,
        inviteDate: new Date().toISOString(),
        status: 'INVITED',
        companyId: args.companyId,
      });

      this.notificationsService.handleEmployeeAddedToCompany(
        existingEmployee.businessName as string,
      );
    } else {
      await this.database.transaction().execute(async (tx) => {
        const user = await tx
          .insertInto('User')
          .values({
            email: args.email,
            name: args.name,
            password: this.utilService.generateUUID(),
            emailVerified: false,
          })
          .returning('User.id')
          .executeTakeFirstOrThrow();

        await tx
          .insertInto('Employee')
          .values({
            inviteCode,
            inviteDate: new Date().toISOString(),
            status: 'INVITED',
            companyId: args.companyId,
            userId: user.id,
            roleId: args.roleId,
            permissionRole: args.permission,
            teamId: args.teamId,
          })
          .returning('Employee.id')
          .executeTakeFirstOrThrow();
      });

      this.notificationsService.handleEmployeeInvited({
        companyId: args.companyId,
        invitedBy: args.invitedBy,
        email: args.email,
        inviteCode: inviteCode,
      });
    }
  }

  async acceptInvite(param: { inviteCode: string; newPassword: string }) {
    const existingEmployee = await this.database
      .selectFrom('Employee')
      .where('Employee.inviteCode', '=', param.inviteCode)
      .innerJoin('User', 'User.id', 'Employee.userId')
      .select([
        'Employee.id as employeeId',
        'Employee.inviteDate as inviteDate',
        'Employee.inviteCode as inviteCode',
        'Employee.status as status',
        'Employee.userId as userId',
        'Employee.companyId as companyId',
        'User.email as email',
        'User.name as fullName',
        'Employee.permissionRole as permissionRole',
        'User.profilePhotoUrl as profilePhotoUrl',
      ])
      .executeTakeFirst();

    if (
      !existingEmployee ||
      existingEmployee.status !== 'INVITED' ||
      !existingEmployee.inviteCode ||
      !existingEmployee.inviteDate
    ) {
      throw new NotFoundException('Failed to accept the invite');
    }

    if (
      this.dateService
        .addDays(existingEmployee.inviteDate, INVITE_VALID_DAYS)
        .isBefore(this.dateService.getCurrentDate())
    ) {
      throw new NotFoundException(
        'Invite expired. Please ask your manager to send you another invite',
      );
    }

    await this.database.transaction().execute(async (tx) => {
      await tx
        .updateTable('Employee')
        .where('Employee.id', '=', existingEmployee.employeeId)
        .set({
          inviteDate: null,
          inviteCode: null,
          status: 'ACTIVE',
          acceptedInviteAt: new Date(),
        })
        .execute();
      await tx
        .updateTable('User')
        .where('User.id', '=', existingEmployee.userId)
        .set({
          emailVerified: true,
          password: await this.passwordService.hashPassword(param.newPassword),
        })
        .execute();
    });
    return existingEmployee;
  }

  async cancelInvite(param: { companyId: number; employeeId: number }) {
    const existingEmployee = await this.database
      .selectFrom('Employee')
      .leftJoin('User', 'User.id', 'Employee.userId')
      .where('Employee.id', '=', param.employeeId)
      .select([
        'Employee.id as id',
        'Employee.status as status',
        'Employee.userId as userId',
      ])
      .executeTakeFirst();

    //todo revisit logic
    if (existingEmployee && existingEmployee.status === 'INVITED') {
      if (existingEmployee.userId === null) {
        await this.database
          .deleteFrom('Employee')
          .where('id', '=', param.employeeId)
          .execute();
      } else {
        // delete employee and user
        await this.database.transaction().execute(async (tx) => {
          await tx
            .deleteFrom('Employee')
            .where('id', '=', param.employeeId)
            .execute();
          await tx
            .deleteFrom('User')
            .where('id', '=', existingEmployee.userId)
            .execute();
        });
      }
    } else {
      throw new BadRequestException(
        `Can't cancel an invite for employee ${param.employeeId}`,
      );
    }
  }

  async resendInvite(param: {
    companyId: number;
    employeeId: number;
    inviterId: number;
  }) {
    const code = this.utilService.generateUUID();
    const { inviter, existingEmployee } = await this.database
      .transaction()
      .execute(async (tx) => {
        const existingEmployee = await tx
          .selectFrom('Employee')
          .where('Employee.id', '=', param.employeeId)
          .innerJoin('User', 'User.id', 'Employee.userId')
          .innerJoin('Company', 'Company.id', 'Employee.companyId')
          .select([
            'Employee.id as id',
            'Employee.status as status',
            'User.email as email',
            'Company.businessName as companyBusinessName',
          ])
          .executeTakeFirst();

        if (existingEmployee && existingEmployee.status === 'EXPIRED') {
          await tx
            .updateTable('Employee')
            .where('Employee.id', '=', param.employeeId)
            .set({
              inviteDate: new Date().toISOString(),
              inviteCode: code,
              status: 'INVITED',
            })
            .execute();
        } else {
          throw new BadRequestException(
            `Can't resend an invite for employee ${param.employeeId}`,
          );
        }

        const inviter = await tx
          .selectFrom('Employee')
          .where('Employee.id', '=', param.inviterId)
          .innerJoin('User', 'User.id', 'Employee.userId')
          .select(['User.name as name'])
          .executeTakeFirstOrThrow();

        return { existingEmployee, inviter };
      });
    this.notificationsService.handleEmployeeInviteResend({
      code: code,
      email: existingEmployee.email as string,
      companyBusinessName: existingEmployee.companyBusinessName as string,
      inviterName: inviter.name as string,
    });
  }

  async editEmployee(param: {
    input: EditEmployeeInput;
    companyId: number;
    employeeId: number;
  }) {
    return this.database.transaction().execute(async (tx) => {
      await tx
        .updateTable('Employee')
        .where('Employee.id', '=', param.employeeId)
        .set({
          roleId: param.input.roleId,
          teamId: param.input.teamId,
          permissionRole: param.input.permission,
        })
        .execute();
      await tx
        .updateTable('User')
        .where('User.id', '=', param.employeeId)
        .set({
          name: param.input.name,
          email: param.input.email,
        })
        .execute();
    });
  }
}
