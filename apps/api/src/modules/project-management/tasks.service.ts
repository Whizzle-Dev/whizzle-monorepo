import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import { sql } from 'kysely';
import { UpdateTaskInput } from './dto/update-task.input';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

import {
  CreateTaskArgs,
  GetTaskArgs,
  GetTasksArgs,
  UpdateTaskPositionArgs,
} from './types';
import { LexoRank } from 'lexorank';

@Injectable()
export class TasksService {
  constructor(private database: Database) {}

  getTasks(args: GetTasksArgs) {
    const { companyId, projectId, isBacklog, searchQuery } = args;
    return (
      this.database
        .selectFrom('Task')
        .innerJoin('Project', 'Task.projectId', 'Project.id')
        .where('Project.companyId', '=', companyId)
        .$if(Boolean(projectId), (query) =>
          query.where('Task.projectId', '=', projectId),
        )
        .$if(isBacklog !== null && isBacklog !== undefined, (query) =>
          query.where('Task.isBacklog', '=', isBacklog),
        )
        .$if(Boolean(searchQuery), (query) =>
          query.where('Task.name', 'ilike', `%${searchQuery}%`),
        )
        .$if((args.assignedTo?.length ?? 0) > 0, (query) =>
          query.where('Task.assignedTo', 'in', args.assignedTo),
        )
        .select((eb) => [
          'Task.id',
          'Task.name',
          'Task.status',
          'Task.assignedTo',
          'Task.createdBy',
          'Task.description',
          'Task.isBacklog',
          'Task.lexoRank as rank',
          jsonObjectFrom(
            eb
              .selectFrom('Employee')
              .whereRef('Employee.id', '=', 'Task.assignedTo')
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
          ).as('assignedToEmployee'),
        ])
        // .orderBy('Task.status', 'asc')
        .orderBy('Task.lexoRank', 'asc')
        .execute()
    );
  }

  createTask(args: CreateTaskArgs) {
    return this.database
      .insertInto('Task')
      .values({
        projectId: args.projectId,
        name: args.name,
        description: args.description,
        createdBy: args.createdBy,
        assignedTo: args.assignedTo,
        status: args.status,
        isBacklog: args.isBacklog,
      })
      .returning([
        'id',
        'name',
        'status',
        'assignedTo',
        'createdBy',
        'description',
        'isBacklog',
        'projectId',
        'lexoRank as rank',
      ])
      .executeTakeFirstOrThrow();
  }

  updateTask(payload: UpdateTaskInput, employeeId: number) {
    return this.database
      .updateTable('Task')
      .set({
        ...(payload.name !== undefined && { name: payload.name }),
        ...(payload.description !== undefined && {
          description: payload.description,
        }),
        ...(payload.status !== undefined && { status: payload.status }),
        ...(payload.assignedTo !== undefined && {
          assignedTo: payload.assignedTo,
        }),
        ...(payload.isBacklog !== undefined && {
          isBacklog: payload.isBacklog,
        }),
        updatedAt: new Date(),
      })
      .where('id', '=', payload.id)
      .where('createdBy', '=', employeeId)
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

  updateTaskAdmin(payload: UpdateTaskInput, companyId: number) {
    return this.database.transaction().execute(async (trx) => {
      const task = await trx
        .selectFrom('Task')
        .innerJoin('Project', 'Task.projectId', 'Project.id')
        .where('Task.id', '=', payload.id)
        .where('Project.companyId', '=', companyId)
        .select(['Task.id'])
        .executeTakeFirst();
      if (!task) {
        throw new Error('Task not found');
      }

      return trx
        .updateTable('Task')
        .set({
          ...(payload.name !== undefined && { name: payload.name }),
          ...(payload.description !== undefined && {
            description: payload.description,
          }),
          ...(payload.status !== undefined && { status: payload.status }),
          ...(payload.assignedTo !== undefined && {
            assignedTo: payload.assignedTo,
          }),
          ...(payload.isBacklog !== undefined && {
            isBacklog: payload.isBacklog,
          }),
        })
        .where('Task.id', '=', payload.id)

        .execute();
    });
  }
  getMyTasksQuery(employeeId: number) {
    return this.database
      .selectFrom('Task')
      .where('Task.assignedTo', '=', employeeId)
      .select((eb) => [
        'Task.id',
        'Task.name',
        'Task.status',
        'Task.assignedTo',
        'Task.createdBy',
        'Task.description',
        'Task.isBacklog',
        'Task.projectId',
        'Task.lexoRank as rank',
        jsonObjectFrom(
          eb
            .selectFrom('Project')
            .whereRef('Project.id', '=', 'Task.projectId')
            .select([
              'Project.id',
              'Project.name',
              'Project.color',
              'Project.description',
            ]),
        ).as('project'),
      ])
      .orderBy('Task.lexoRank', 'asc');
  }

  getMyTasks(employeeId: number) {
    return this.getMyTasksQuery(employeeId).execute();
  }

  getTask(args: GetTaskArgs) {
    return this.database
      .selectFrom('Task')
      .innerJoin('Project', 'Task.projectId', 'Project.id')
      .where('Task.id', '=', args.taskId)
      .where('Project.companyId', '=', args.companyId)
      .select((eb) => [
        'Task.id',
        'Task.name',
        'Task.status',
        'Task.assignedTo',
        'Task.createdBy',
        'Task.description',
        'Task.isBacklog',
        'Task.lexoRank as rank',
        jsonObjectFrom(
          eb
            .selectFrom('Employee')
            .whereRef('Employee.id', '=', 'Task.assignedTo')
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
        ).as('assignedToEmployee'),
        jsonObjectFrom(
          eb
            .selectFrom('Project')
            .whereRef('Project.id', '=', 'Task.projectId')
            .select([
              'Project.id',
              'Project.name',
              'Project.color',
              'Project.description',
            ]),
        ).as('project'),
      ])
      .executeTakeFirstOrThrow();
  }

  getMyRecentTasks(employeeId: number) {
    return this.getMyTasksQuery(employeeId)
      .orderBy('updatedAt desc')
      .limit(10)
      .execute();
  }

  getBetweenRankAsc(payload: any): LexoRank {
    const { prevEntity, entity, nextEntity } = payload;
    let newLexoRank: LexoRank;
    if (!prevEntity && !!nextEntity) {
      newLexoRank = LexoRank.parse(nextEntity).genPrev();
    } else if (!nextEntity && !!prevEntity) {
      newLexoRank = LexoRank.parse(prevEntity).genNext();
    } else if (!!prevEntity && !!nextEntity) {
      newLexoRank = LexoRank.parse(nextEntity).between(
        LexoRank.parse(prevEntity),
      );
    } else {
      newLexoRank = LexoRank.parse(entity).genNext();
    }

    return newLexoRank;
  }
  async updateTaskPosition(args: UpdateTaskPositionArgs) {
    return this.database.transaction().execute(async (trx) => {
      const rank = this.getBetweenRankAsc({
        prevEntity: args.prevCursor,
        entity: args,
        nextEntity: args.nextCursor,
      });
      console.log(rank.toString(), args);
      await trx
        .updateTable('Task')
        .where('id', '=', args.taskId)
        .set({
          lexoRank: rank.toString(),
        })
        .executeTakeFirstOrThrow();
    });
  }

  async assignInitialRankToAllTasks() {
    const tasks = await this.database
      .selectFrom('Task')
      .select(['id'])
      .execute();
    let rank = LexoRank.middle();
    await this.database.transaction().execute(async (trx) => {
      for (const task of tasks) {
        await trx
          .updateTable('Task')
          .where('id', '=', task.id)
          .set({
            lexoRank: rank.toString(),
          })
          .execute();
        rank = rank.genNext();
      }
    });
  }

  async assignEmployeeToTask(param: {
    companyId: number;
    employeeId: number;
    taskId: number;
  }) {
    return this.database
      .updateTable('Task')
      .innerJoin('Project', 'Task.projectId', 'Project.id')
      .set({ assignedTo: param.employeeId })
      .where('Task.id', '=', param.taskId)
      .where('Project.companyId', '=', param.companyId)
      .execute();
  }
}
