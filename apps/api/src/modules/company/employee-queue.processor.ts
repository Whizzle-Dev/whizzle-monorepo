import { Process, Processor } from '@nestjs/bull';
import {
  EMPLOYEE_EXPIRED_INVITES_JOB,
  EMPLOYEE_PROFILE_IMAGE_GENERATOR_JOB,
  EMPLOYEES_QUEUE,
} from '../../queues/cron-jobs';
import { Database } from '../../database/database.module';
import { sql } from 'kysely';
import { GeneralQueueProcessor } from '../../shared/general-queue-processor';
import { INVITE_VALID_DAYS } from '../../constants';
import { FilesService } from '../files/files.service';

@Processor(EMPLOYEES_QUEUE)
export class EmployeeQueueProcessor extends GeneralQueueProcessor {
  constructor(
    private readonly database: Database,
    private readonly filesService: FilesService,
  ) {
    super();
  }
  @Process(EMPLOYEE_EXPIRED_INVITES_JOB)
  async handleCron() {
    try {
      await this.database.transaction().execute(async (tx) => {
        await tx
          .updateTable('Employee')
          .where('Employee.status', '=', 'INVITED')
          .where(
            'Employee.inviteDate',
            '<',
            sql<any>`timestamp 'now' - interval '${sql.raw(
              INVITE_VALID_DAYS.toString(),
            )} days'`,
          )
          .set({
            status: 'EXPIRED',
          })
          .execute();
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Process(EMPLOYEE_PROFILE_IMAGE_GENERATOR_JOB)
  async handleProfileImageGenerator() {
    try {
      await this.database.transaction().execute(async (tx) => {
        const users = await tx
          .selectFrom('User')
          .select(['profilePhotoFileName', 'id'])
          .execute();
        for (const user of users) {
          if (!user.profilePhotoFileName) {
            continue;
          }
          const url = await this.filesService.getReadUrl({
            fileName: user.profilePhotoFileName,
          });
          await tx
            .updateTable('User')
            .where('User.id', '=', user.id)
            .set({
              profilePhotoUrl: url,
            })
            .execute();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
