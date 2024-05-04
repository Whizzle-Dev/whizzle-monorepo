export type CreateTaskArgs = {
  projectId: number;
  name: string;
  description: string;
  createdBy: number;
  assignedTo: number | null;
  status: string;
  isBacklog: boolean;
};
export type GetTasksArgs = {
  companyId: number;
  projectId: number | null;
  isBacklog: boolean | null;
  searchQuery?: string | null;
  assignedTo: number[] | null;
};
export type GetTaskArgs = {
  companyId: number;
  taskId: number;
};
export type UpdateTaskPositionArgs = {
  prevCursor: string | null;
  nextCursor: string | null;
  companyId: number;
  taskId: number;
};
