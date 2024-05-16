import { Process, Processor } from '@nestjs/bull';
import { QUEUES } from '../../queues/queues';
import { Database } from '../../database/database.module';
import { sql } from 'kysely';
import { GeneralQueueProcessor } from '../../shared/general-queue-processor';
import { INVITE_VALID_DAYS } from '../../constants';
import { FilesService } from '../files/files.service';

@Processor(QUEUES.EMPLOYEES_QUEUE.name)
export class EmployeeQueueProcessor extends GeneralQueueProcessor {
  constructor(
    private readonly database: Database,
    private readonly filesService: FilesService,
  ) {
    super();
  }
  @Process(QUEUES.EMPLOYEES_QUEUE.EXPIRED_INVITES.name)
  async handleCron() {
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
  }

  @Process(QUEUES.EMPLOYEES_QUEUE.PROFILE_IMAGE_GENERATOR.name)
  async handleProfileImageGenerator() {
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
  }
}
