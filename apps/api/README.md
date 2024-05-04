
Main backend service in the Whizzle stack.

## Tech stack
* Language: Typescript
* Framework: NestJs
* Query builder: Kysely
* Migrations manager: Prisma
* Database: Postgres
* Queues/Jobs: Bull/Redis

Package manager: PNPM

### Local development/Debugging:
```
pnpm run dev
```

### Generate types for Kysely:
```
node scripts/kysely-codegen.js
```

### Creating a new database migration
1. Modify the schema.prisma file
2. Run `pnpm run prisma:migrate`
3. Run Kysely codegen to generate new types


