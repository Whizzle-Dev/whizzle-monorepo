import * as z from 'zod';

export const schema = z.object({
  description: z.string().min(3, 'Required').max(255),
  projectId: z.string().optional(),
  taskId: z.string().min(1, 'Required'),
});
export type FormValues = z.infer<typeof schema>;
