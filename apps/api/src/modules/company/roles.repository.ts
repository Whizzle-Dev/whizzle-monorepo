import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';

@Injectable()
export class RolesRepository {
  constructor(private readonly database: Database) {}

  private getRolesQuery(companyId: number) {
    return this.database
      .selectFrom(['Role'])
      .leftJoin('Employee', 'Employee.roleId', 'Role.id')
      .select((expressionBuilder) => {
        return [
          expressionBuilder.fn
            .count<number>('Employee.id')
            .as('numberOfEmployees'),
          'Role.id',
          'Role.name',
          'Role.companyId',
          'Role.updatedAt',
          'Role.createdAt',
          'Role.description',
        ];
      })
      .where('Role.companyId', '=', companyId)
      .orderBy('createdAt desc')
      .groupBy(['Role.id', 'Role.name']);
  }

  getSingle(companyId: number, roleId: number) {
    return this.getRolesQuery(companyId)
      .where('Role.id', '=', roleId)
      .executeTakeFirst();
  }
  getAll(companyId: number) {
    return this.getRolesQuery(companyId).execute();
  }

  create(
    {
      name,
      description,
    }: {
      name: string;
      description?: string | null;
    },
    companyId: number,
  ) {
    return this.database
      .insertInto('Role')
      .values({
        name,
        companyId,
        description,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  delete(companyId: number, id: number) {
    return this.database
      .deleteFrom('Role')
      .where('id', '=', id)
      .where('companyId', '=', companyId)
      .execute();
  }

  update(
    companyId: number,
    id: number,
    data: { name: string; description?: string | null },
  ) {
    return this.database
      .updateTable('Role')
      .set({
        updatedAt: new Date(),
        name: data.name,
        description: data.description,
      })
      .where('id', '=', id)
      .where('companyId', '=', companyId)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
