import * as z from 'zod';

export const schema = z.object({
  description: z.string().min(3, 'Required').max(255),
  projectId: z.string().min(1, 'Select Project'),
  taskId: z.string().min(1, 'Select Task'),
});
export type StartTimeFormValues = z.infer<typeof schema>;
