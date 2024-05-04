import * as z from 'zod';

export const PROJECT_COLUMN_SCHEMA = z.object({
  name: z.string(),
  value: z.string(),
});
