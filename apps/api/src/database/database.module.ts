import { Global, Module } from '@nestjs/common';
import {
  ConfigurableDatabaseModule,
  DATABASE_OPTIONS,
  DatabaseOptions,
} from './database';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { DB } from 'kysely-codegen';

export class Database extends Kysely<DB> {}

@Global()
@Module({
  exports: [Database],
  providers: [
    {
      provide: Database,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        const dialect = new PostgresDialect({
          pool: new Pool({
            max: 50,
            connectionString: `postgresql://${databaseOptions.user}:${databaseOptions.password}@${databaseOptions.host}:${databaseOptions.port}/${databaseOptions.database}`,
            options: `-c search_path=${databaseOptions.schema}`,
          }),
        });

        return new Database({
          dialect,
        });
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
