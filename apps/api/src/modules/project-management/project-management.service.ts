import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import { sql } from 'kysely';
import { json } from '../../database/json';
import { ProjectColumnInput } from './dto/project-column.dto';

@Injectable()
export class ProjectManagementService {
  constructor(private database: Database) {}

  getProjects(companyId: number) {
    return this.database
      .selectFrom('Project')
      .where('Project.companyId', '=', companyId)
      .select([
        'Project.id',
        'Project.name',
        'Project.color',
        'Project.description',
      ])
      .execute();
  }

  getProject(id: number, companyId: number) {
    return this.database
      .selectFrom('Project')
      .where('Project.id', '=', id)
      .where('Project.companyId', '=', companyId)
      .select([
        'Project.id',
        'Project.name',
        'Project.color',
        'Project.description as description',
        'Project.columns as columns',
      ])
      .executeTakeFirstOrThrow();
  }

  createProject(
    companyId: number,
    data: { name: string; description: string | null; color: string },
  ) {
    return this.database
      .insertInto('Project')
      .values({
        companyId,
        name: data.name,
        color: data.color,
        description: data.description ?? '',
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  updateProject(id: number, name: string) {
    return this.database
      .updateTable('Project')
      .set({ name })
      .where('id', '=', id)
      .returningAll()
      .execute();
  }

  async addColumnToProject(param: {
    companyId: number;
    name: string;
    projectId: number;
    value: string;
  }) {
    return this.database
      .updateTable('Project')
      .set({
        columns: sql`"columns" || '${sql.raw(
          JSON.stringify([{ value: param.value, name: param.name }]),
        )}'::jsonb`,
      })
      .where('id', '=', param.projectId)
      .where('companyId', '=', param.companyId)
      .execute();
  }

  async removeColumnFromProject(param: {
    companyId: number;
    projectId: number;
    value: string;
  }) {
    return this.database.transaction().execute(async (trx) => {
      const project = await trx
        .selectFrom('Project')
        .where('id', '=', param.projectId)
        .where('companyId', '=', param.companyId)
        .select(['columns'])
        .executeTakeFirst();
      if (!project) {
        throw new Error('Project not found');
      }

      const columns = (project.columns as any).filter(
        (column: { value: string }) => column.value !== param.value,
      );

      return trx
        .updateTable('Project')
        .set({ columns: json(columns) })
        .where('id', '=', param.projectId)
        .execute();
    });
  }

  async updateColumnsForProject(param: {
    companyId: number;
    columns: ProjectColumnInput[];
    projectId: number;
  }) {
    return this.database.transaction().execute(async (trx) => {
      const project = await trx
        .selectFrom('Project')
        .where('id', '=', param.projectId)
        .where('companyId', '=', param.companyId)
        .select(['columns'])
        .executeTakeFirst();
      if (!project) {
        throw new Error('Project not found');
      }

      const columns = param.columns.map((column) => ({
        value: column.value,
        name: column.name,
      }));

      return trx
        .updateTable('Project')
        .set({ columns: json(columns) })
        .where('id', '=', param.projectId)
        .execute();
    });
  }
}
