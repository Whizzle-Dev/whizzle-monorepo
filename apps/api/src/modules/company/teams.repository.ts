import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import { CreateTeamArgs, UpdateTeamArgs } from './types';

@Injectable()
export class TeamsRepository {
  constructor(private readonly database: Database) {}

  getTeamsQuery(companyId: number) {
    return this.database
      .selectFrom(['Team'])
      .leftJoin('Employee', 'Employee.teamId', 'Team.id')
      .select((expressionBuilder) => {
        return [
          expressionBuilder.fn
            .count<number>('Employee.id')
            .as('numberOfEmployees'),
          'Team.id',
          'Team.name',
          'Team.companyId',
          'Team.updatedAt',
          'Team.createdAt',
          'Team.description',
        ];
      })
      .where('Team.companyId', '=', companyId)
      .groupBy(['Team.id', 'Team.name']);
  }

  getSingle(companyId: number, roleId: number) {
    return this.getTeamsQuery(companyId).where('Team.id', '=', roleId);
  }

  create(args: CreateTeamArgs) {
    return this.database.insertInto('Team').values({
      name: args.name,
      companyId: args.companyId,
      description: args.description,
    });
  }

  delete(id: number, companyId: number) {
    return this.database
      .deleteFrom('Team')
      .where('id', '=', id)
      .where('companyId', '=', companyId)
      .execute();
  }

  async update(args: UpdateTeamArgs) {
    return this.database
      .updateTable('Team')
      .set({
        name: args.name,
        description: args.description,
        updatedAt: new Date(),
      })
      .where('id', '=', args.id)
      .where('companyId', '=', args.companyId)
      .execute();
  }
}
