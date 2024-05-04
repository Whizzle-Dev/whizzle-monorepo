import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import {
  CreateUserPayload,
  CreateUserSignupRequestPayload,
  UpdateUserSignupRequestPayload,
} from './types';

@Injectable()
export class AuthRepository {
  constructor(private readonly database: Database) {}

  getUserSignupRequestByEmail(email: string) {
    return this.database
      .selectFrom('UserSignupRequest')
      .where('UserSignupRequest.email', '=', email)
      .selectAll()
      .executeTakeFirst();
  }

  getUserSignupRequestByToken(verificationToken: string) {
    return this.database
      .selectFrom('UserSignupRequest')
      .where('UserSignupRequest.verificationToken', '=', verificationToken)
      .selectAll()
      .executeTakeFirst();
  }

  updateUserSignupRequest(
    id: number,
    payload: UpdateUserSignupRequestPayload,
    requestCompanyId?: number,
  ) {
    return this.database.transaction().execute(async (tx) => {
      let company;
      if (!requestCompanyId) {
        company = await tx
          .insertInto('Company')
          .values({
            businessName: payload.company.name,
            website: payload.company.website,
          })
          .returningAll()
          .executeTakeFirstOrThrow();
      }
      return tx
        .updateTable('UserSignupRequest')
        .where('UserSignupRequest.id', '=', id)
        .set({
          name: payload.name,
          password: payload.password,
          codeGeneratedAt: payload.codeGeneratedAt,
          verificationToken: payload.verificationCode,
          companyId: company ? company.id : requestCompanyId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    });
  }

  createUserSignupRequest(payload: CreateUserSignupRequestPayload) {
    return this.database.transaction().execute(async (tx) => {
      const company = await tx
        .insertInto('Company')
        .values({
          businessName: payload.company.name,
          website: payload.company.website,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await tx
        .insertInto('UserSignupRequest')
        .values({
          name: payload.name,
          password: payload.password,
          codeGeneratedAt: payload.codeGeneratedAt,
          verificationToken: payload.verificationCode,
          companyId: company.id,
          email: payload.email,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    });
  }

  createUser({
    verificationToken,
    email,
    emailVerified,
    name,
    password,
    status,
    companyId,
    permissionRole,
  }: CreateUserPayload) {
    return this.database.transaction().execute(async (tx) => {
      const user = await tx
        .insertInto('User')
        .values({
          email,
          name,
          password,
          emailVerified,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await tx
        .insertInto('Employee')
        .values({
          userId: user.id,
          status,
          companyId,
          permissionRole,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      await tx
        .deleteFrom('UserSignupRequest')
        .where('UserSignupRequest.verificationToken', '=', verificationToken)
        .execute();
    });
  }
}
