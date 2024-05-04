import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import { CreateTimeEntryInput } from './dto/create-time-entry.input';
import { StartTimerInput } from './dto/start-timer.input';
import { EditTimeEntryInput } from './dto/edit-time-entry.input';
import { EditActiveTimerInput } from './dto/edit-active-timer.input';
import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { sql } from 'kysely';
import { TimeTrackingStatsDto } from './dto/time-tracking-stats.dto';
import { DateRangeInput } from '../../shared/date-range-input';
import { GetTimeEntriesArgs } from './types';
import { DateService } from '../../shared/date.service';

@Injectable()
export class TimeTrackingService {
  constructor(private database: Database, private dateService: DateService) {}

  getTimeEntryQuery() {
    return this.database
      .selectFrom('TimeEntry')
      .orderBy('TimeEntry.createdAt desc')
      .select((eb) => [
        'TimeEntry.id as id',
        'TimeEntry.startDate as startDate',
        'TimeEntry.endDate as endDate',
        'TimeEntry.description as description',
        'TimeEntry.taskId as taskId',
        jsonObjectFrom(
          eb
            .selectFrom('Task')
            .whereRef('Task.id', '=', 'TimeEntry.taskId')
            .select(['Task.id as id', 'Task.name as name']),
        ).as('task'),
        jsonObjectFrom(
          eb
            .selectFrom('Project')
            .innerJoin('Task', 'Task.projectId', 'Project.id')
            .whereRef('Task.id', '=', 'TimeEntry.taskId')
            .select([
              'Project.id as id',
              'Project.name as name',
              'Project.color',
              'Project.description as description',
            ]),
        ).as('project'),
      ]);
  }

  getTimeEntries(employeeId: number) {
    return this.getTimeEntryQuery()
      .where('TimeEntry.employeeId', '=', employeeId)
      .execute();
  }

  getTimeEntry(id: number, employeeId: number) {
    return this.getTimeEntryQuery()
      .where('TimeEntry.employeeId', '=', employeeId)
      .where('TimeEntry.id', '=', id)
      .executeTakeFirstOrThrow();
  }

  createTimeEntry(
    payload: CreateTimeEntryInput,
    employeeId: number,
    companyId: number,
  ) {
    return this.database
      .insertInto('TimeEntry')
      .values({
        ...payload,
        employeeId,
        companyId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  startTimer(payload: StartTimerInput, employeeId: number) {
    return this.database
      .insertInto('PendingTimer')
      .values({
        ...payload,
        employeeId,
      })
      .executeTakeFirstOrThrow();
  }

  stopTimer(employeeId: number, companyId: number) {
    return this.database.transaction().execute(async (transaction) => {
      const pendingTimer = await transaction
        .selectFrom('PendingTimer')
        .where('PendingTimer.employeeId', '=', employeeId)
        .selectAll()
        .executeTakeFirstOrThrow();
      const entry = await transaction
        .insertInto('TimeEntry')
        .values({
          taskId: pendingTimer.taskId,
          startDate: pendingTimer.startDate,
          endDate: new Date(),
          description: pendingTimer.description,
          companyId,
          employeeId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await transaction
        .deleteFrom('PendingTimer')
        .where('PendingTimer.employeeId', '=', employeeId)
        .execute();

      return entry;
    });
  }

  activeTimer(employeeId: number) {
    return this.database
      .selectFrom('PendingTimer')
      .where('PendingTimer.employeeId', '=', employeeId)
      .leftJoin('Task', 'Task.id', 'PendingTimer.taskId')
      .leftJoin('Project', 'Project.id', 'Task.projectId')
      .select([
        'PendingTimer.id as id',
        'PendingTimer.startDate as startDate',
        'PendingTimer.description as description',
        'Task.id as taskId',
        'Project.id as projectId',
      ])
      .executeTakeFirst();
  }

  deleteTimeEntry(id: number, employeeId: number) {
    return this.database
      .deleteFrom('TimeEntry')
      .where('TimeEntry.id', '=', id)
      .where('TimeEntry.employeeId', '=', employeeId)
      .executeTakeFirstOrThrow();
  }

  deleteTimeEntryAdmin(id: number, companyId: number) {
    return this.database
      .deleteFrom('TimeEntry')
      .where('TimeEntry.id', '=', id)
      .where('TimeEntry.companyId', '=', companyId)
      .executeTakeFirstOrThrow();
  }
  editTimeEntry(payload: EditTimeEntryInput, employeeId: number) {
    return this.database
      .updateTable('TimeEntry')
      .where('TimeEntry.id', '=', payload.id)
      .where('TimeEntry.employeeId', '=', employeeId)
      .set({
        ...(payload.taskId ? { taskId: payload.taskId } : {}),
        ...(payload.startDate ? { startDate: payload.startDate } : {}),
        ...(payload.endDate ? { endDate: payload.endDate } : {}),
        ...(payload.description ? { description: payload.description } : {}),
      })
      .executeTakeFirst();
  }

  updateActiveTimer(payload: EditActiveTimerInput, employeeId: number) {
    return this.database
      .updateTable('PendingTimer')
      .where('PendingTimer.employeeId', '=', employeeId)
      .set({
        ...(payload.taskId ? { taskId: payload.taskId } : {}),
        ...(payload.description ? { description: payload.description } : {}),
      })
      .execute();
  }

  getCompanyTimeEntries(args: GetTimeEntriesArgs) {
    return this.getTimeEntryQuery()
      .innerJoin('Employee', 'Employee.id', 'TimeEntry.employeeId')
      .innerJoin('User', 'Employee.userId', 'User.id')
      .innerJoin('Task', 'Task.id', 'TimeEntry.taskId')
      .innerJoin('Project', 'Project.id', 'Task.projectId')
      .leftJoin('Team', 'Team.id', 'Employee.teamId')
      .where('TimeEntry.companyId', '=', args.companyId)
      .$if(Boolean(args.options), (eb) => {
        const skip = args.options?.skip as number;
        const take = args.options?.take as number;
        return eb.offset(skip).limit(take);
      })
      .$if(Boolean(args.filters), (eb) => {
        let builder = eb;
        if (args.filters?.teamIds) {
          builder = builder.where('Team.id', 'in', args.filters.teamIds);
        }
        if (args.filters?.employeeIds) {
          builder = builder.where(
            'Employee.id',
            'in',
            args.filters.employeeIds,
          );
        }
        if (args.filters?.projectIds) {
          builder = builder.where('Project.id', 'in', args.filters.projectIds);
        }

        if (args.filters?.taskIds) {
          builder = builder.where('Task.id', 'in', args.filters.taskIds);
        }
        if (args.filters?.dateRange?.from && args.filters?.dateRange?.to) {
          const from = this.dateService.formatDate(
            args.filters.dateRange.from,
            DateService.Formats.FullYearMonthDayTime,
          );
          const to = this.dateService.formatDate(
            args.filters.dateRange.to,
            DateService.Formats.FullYearMonthDayTime,
          );

          // todo refactor this bit to work more generically
          builder = builder.where(
            sql<any>`"TimeEntry"."startDate"::date >= '${sql.raw(
              from,
            )}'::date AND "TimeEntry"."startDate"::date <= '${sql.raw(
              to,
            )}'::date`,
          );
        }
        return builder;
      })
      .select((eb) => [
        sql<number>`count(*) over()`.as('totalCount'),
        jsonObjectFrom(
          eb
            .selectFrom('Employee')
            .whereRef('Employee.id', '=', 'TimeEntry.employeeId')
            .innerJoin('User', 'Employee.userId', 'User.id')
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
      .execute();
  }

  getWeeklyStats(companyId: number): Promise<TimeTrackingStatsDto> {
    return this.database.transaction().execute(async (transaction) => {
      const currentDate = this.dateService.getCurrentDate();
      const weeklyStats = await transaction
        .selectFrom('TimeEntry')
        .where('TimeEntry.companyId', '=', companyId)
        .where(
          'TimeEntry.startDate',
          '>=',
          currentDate.startOf('week').toDate(),
        )
        .where('TimeEntry.startDate', '<=', currentDate.endOf('week').toDate())
        .select([
          sql<number>`sum((extract (epoch from ("TimeEntry"."endDate"::timestamp - "TimeEntry"."startDate"::timestamp)))::integer) over()`.as(
            'totalSeconds',
          ),
        ])
        .executeTakeFirst();

      const pastWeekStats = await transaction
        .selectFrom('TimeEntry')
        .where('TimeEntry.companyId', '=', companyId)
        .where(
          'TimeEntry.startDate',
          '>=',
          currentDate.startOf('week').subtract(1, 'week').toDate(),
        )
        .where(
          'TimeEntry.startDate',
          '<=',
          currentDate.endOf('week').subtract(1, 'week').toDate(),
        )
        .select([
          sql<number>`sum((extract (epoch from ("TimeEntry"."endDate"::timestamp - "TimeEntry"."startDate"::timestamp)))::integer) over()`.as(
            'totalSeconds',
          ),
        ])
        .executeTakeFirst();

      // find the most tracked project and display number of hours tracked for it
      const mostTrackedProject = await transaction
        .selectFrom('TimeEntry')
        .innerJoin('Task', 'Task.id', 'TimeEntry.taskId')
        .innerJoin('Project', 'Project.id', 'Task.projectId')
        .where('TimeEntry.companyId', '=', companyId)
        .select([
          'Project.id as id',
          'Project.name as name',
          'Project.color as color',
          'Project.description as description',
          sql<number>`sum((extract (epoch from ("TimeEntry"."endDate"::timestamp - "TimeEntry"."startDate"::timestamp)))::integer)`.as(
            'totalSeconds',
          ),
        ])
        .groupBy('Project.id')
        .orderBy('totalSeconds', 'desc')
        .executeTakeFirst();

      const diff = Math.floor(
        ((weeklyStats?.totalSeconds ?? 0) /
          (pastWeekStats?.totalSeconds ?? 0)) *
          100,
      );

      const mostActiveEmployees = await transaction
        .selectFrom('TimeEntry')
        .innerJoin('Employee', 'Employee.id', 'TimeEntry.employeeId')
        .innerJoin('User', 'User.id', 'Employee.userId')
        .where('TimeEntry.companyId', '=', companyId)
        .select([
          'Employee.id as id',
          'Employee.companyId as companyId',
          'Employee.status as status',
          'User.email as email',
          'User.name as name',
          'User.profilePhotoUrl as profilePhotoUrl',
          'User.email as email',
          'Employee.permissionRole as permissionRole',
          sql<number>`sum((extract (epoch from ("TimeEntry"."endDate"::timestamp - "TimeEntry"."startDate"::timestamp)))::integer)`.as(
            'totalSeconds',
          ),
        ])
        .groupBy([
          'Employee.id',
          'User.name',
          'User.email',
          'User.profilePhotoUrl',
          'Employee.permissionRole',
          'Employee.companyId',
        ])
        .orderBy('totalSeconds', 'desc')
        .limit(5)
        .execute();

      return {
        mostActiveEmployees,
        trendingProject: mostTrackedProject
          ? {
              project: mostTrackedProject,
              totalMinutes: Math.floor(mostTrackedProject.totalSeconds / 60),
            }
          : null,
        totalMinutesThisWeek: Math.floor((weeklyStats?.totalSeconds ?? 0) / 60),
        minutesPercentageDiffFromLastWeek:
          diff > 0 ? `+${diff.toFixed(1)}%` : `-${diff.toFixed(1)}%`,
      };
    });
  }

  getTimeTrackedPerProject(
    companyId: number,
    dateRange: DateRangeInput | null,
  ) {
    return (
      this.database
        .selectFrom('TimeEntry')
        .innerJoin('Task', 'Task.id', 'TimeEntry.taskId')
        .innerJoin('Project', 'Project.id', 'Task.projectId')
        .where('TimeEntry.companyId', '=', companyId)
        .$if(Boolean(dateRange), (eb) => {
          const from = dateRange?.from;
          const to = dateRange?.to;
          if (from && to) {
            return eb
              .where('TimeEntry.startDate', '>=', from)
              .where('TimeEntry.startDate', '<=', to);
          }
          return eb;
        })
        .select([
          'Project.id as id',
          'Project.name as name',
          'Project.color as color',
          'Project.description as description',
          sql<number>`sum((extract (epoch from ("TimeEntry"."endDate"::timestamp - "TimeEntry"."startDate"::timestamp)))::integer)`.as(
            'totalSeconds',
          ),
        ])
        .groupBy('Project.id')
        // .orderBy('totalSeconds', 'desc')
        .execute()
    );
  }

  async getTimeTrackedPerTeam(
    companyId: number,
    dateRange: DateRangeInput | null,
  ) {
    return this.database
      .selectFrom('TimeEntry')
      .innerJoin('Employee', 'Employee.id', 'TimeEntry.employeeId')
      .innerJoin('Team', 'Team.id', 'Employee.teamId')
      .where('TimeEntry.companyId', '=', companyId)
      .$if(Boolean(dateRange), (eb) => {
        const from = dateRange?.from;
        const to = dateRange?.to;
        if (from && to) {
          return eb
            .where('TimeEntry.startDate', '>=', from)
            .where('TimeEntry.startDate', '<=', to);
        }
        return eb;
      })
      .select([
        'Team.id as id',
        'Team.name as name',
        sql<number>`sum((extract (epoch from ("TimeEntry"."endDate"::timestamp - "TimeEntry"."startDate"::timestamp)))::integer)`.as(
          'totalSeconds',
        ),
      ])
      .groupBy('Team.id')
      .execute();
  }

  async getTimeTrackedPerEmployee(
    companyId: number,
    dateRange: DateRangeInput | null,
  ) {
    return this.database
      .selectFrom('TimeEntry')
      .innerJoin('Employee', 'Employee.id', 'TimeEntry.employeeId')
      .innerJoin('User', 'User.id', 'Employee.userId')
      .where('TimeEntry.companyId', '=', companyId)
      .$if(Boolean(dateRange), (eb) => {
        const from = dateRange?.from;
        const to = dateRange?.to;
        if (from && to) {
          return eb
            .where('TimeEntry.startDate', '>=', from)
            .where('TimeEntry.startDate', '<=', to);
        }
        return eb;
      })
      .select([
        'Employee.id as id',
        'User.name as name',
        sql<number>`sum((extract (epoch from ("TimeEntry"."endDate"::timestamp - "TimeEntry"."startDate"::timestamp)))::integer)`.as(
          'totalSeconds',
        ),
      ])
      .groupBy(['Employee.id', 'User.name'])
      .execute();
  }
}
