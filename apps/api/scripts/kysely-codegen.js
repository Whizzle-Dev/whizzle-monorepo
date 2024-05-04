require('dotenv').config();
const { exec } = require('child_process');

const dbUsername = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.POSTGRES_DB;
const dbSchema = process.env.DB_SCHEMA;

if (!dbUsername || !dbPassword || !dbHost || !dbPort || !dbName || !dbSchema) {
  console.error('Environment variables are missing');
  process.exit(1);
}

const databaseUrl = `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?schema=${dbSchema}`;

exec(
  `export DATABASE_URL="${databaseUrl}" && pnpm kysely-codegen --dialect=postgres --schema=${dbSchema}`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  },
);
