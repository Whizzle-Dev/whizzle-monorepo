import { sql, ValueExpression } from 'kysely';
import { DB } from 'kysely-codegen';

export function json<T, Key extends keyof DB>(
  value: T,
): ValueExpression<DB, Key, string> {
  return sql`CAST(${JSON.stringify(value)} AS JSONB)`;
}
