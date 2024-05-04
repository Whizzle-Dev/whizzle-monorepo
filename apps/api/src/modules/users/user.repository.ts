import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtPayload } from '../../types/jwt-payload';

@Injectable()
export class UserRepository {
  constructor(private readonly database: Database) {}

  getUserFromToken(token: JwtPayload) {
    return this.database
      .selectFrom(['User'])
      .innerJoin('Employee', 'Employee.userId', 'User.id')
      .where('Employee.companyId', '=', token.companyId)
      .where('User.id', '=', token.userId);
  }

  updateUser(id: number, user: UpdateUserInput) {
    return this.database.transaction().execute(async (tx) => {
      await tx
        .updateTable('User')
        .where('User.id', '=', id)
        .set({
          ...(user.phoneNumber && { phoneNumber: user.phoneNumber }),
          ...(user.fullName && { name: user.fullName }),
          ...(user.dateOfBirth && { dateOfBirth: user.dateOfBirth }),
          ...(user.address && { address: user.address }),
          ...(user.profilePhotoFileName !== undefined && {
            profilePhotoFileName: user.profilePhotoFileName,
          }),
          ...(user.profilePhotoUrl !== undefined && {
            profilePhotoUrl: user.profilePhotoUrl,
          }),
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    });
  }

  getUserFromEmail(email: string) {
    return this.database
      .selectFrom(['User'])
      .where('User.email', '=', email)
      .innerJoin('Employee', 'User.id', 'Employee.userId')
      .innerJoin('Company', 'Employee.companyId', 'Company.id')
      .select([
        'User.id',
        'User.email',
        'User.dateOfBirth',
        'User.address',
        'User.name',
        'User.createdAt',
        'User.emailVerified',
        'User.phoneNumber',
        'User.profilePhotoUrl',
        'User.updatedAt',
        'User.password',
        'Employee.id as employeeId',
        'Employee.companyId as companyId',
        'Employee.permissionRole as permissionRole',
      ]);
  }
}
