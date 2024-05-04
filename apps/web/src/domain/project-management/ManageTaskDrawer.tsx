import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import {
  GetTasksDocument,
  TaskFragment,
  useCreateTaskMutation,
  useGetAvailableStatusesForProjectQuery,
  useUpdateTaskMutation,
} from '@/generated';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { ManageTaskForm } from '@/domain/project-management/ManageTaskForm';
import Link from 'next/link';
import { Icons } from '@/components/ui/icons';
import { tryParse } from '@/components/ui/form/FormPlateEditor';

type ManageTaskDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string | undefined;
  onSuccess?: () => void;
  task?: TaskFragment;
  initialStatus?: string;
  onChangePosition?: (task: TaskFragment) => void;
  isBacklog?: boolean;
};

export const ManageTaskDrawer = ({
  open,
  onOpenChange,
  projectId,
  onSuccess,
  task,
  initialStatus,
  onChangePosition,
  isBacklog,
}: ManageTaskDrawerProps) => {
  const statusesQuery = useGetAvailableStatusesForProjectQuery({
    variables: {
      projectId: Number(projectId),
    },
    skip: !projectId,
  });
  const methods = useForm<TaskFormValues>({
    // @ts-expect-error todo fix
    resolver: zodResolver(taskSchema),
  });
  const { toast } = useToast();
  const [create, { loading: creating }] = useCreateTaskMutation({
    // todo see if needed
    refetchQueries: [
      { query: GetTasksDocument, variables: { projectId: Number(projectId) } },
    ],
    awaitRefetchQueries: true,
  });

  const [updateTask, { loading: updating }] = useUpdateTaskMutation();

  const loading = creating || updating;
  useEffect(() => {
    if (initialStatus) {
      methods.setValue('status', initialStatus);
    }
  }, [initialStatus]);

  useEffect(() => {
    if (task) {
      methods.setValue('name', task.name);
      methods.setValue('description', tryParse(task.description));
      methods.setValue('assigned', task.assignedTo?.toString() ?? '-1');
      methods.setValue('status', task.status);
    }
  }, [task]);
  const handleSubmit = (data: TaskFormValues) => {
    if (!projectId) {
      throw new Error('Project ID is required');
    }

    if (task) {
      updateTask({
        variables: {
          payload: {
            id: task.id,
            name: data.name,
            assignedTo:
              data.assigned && data.assigned !== '-1'
                ? Number(data.assigned)
                : null,
            description: JSON.stringify(data.description),
            status: data.status,
          },
        },
        onCompleted: () => {
          toast({
            title: 'Task Updated',
            description: 'Task has been updated',
            variant: 'default',
          });
          onOpenChange(false);
          onSuccess?.();
        },
        onError: (e) => {
          toast({
            title: 'Failed to update task',
            description: e.message,
            variant: 'destructive',
          });
        },
      });
    } else {
      create({
        variables: {
          payload: {
            name: data.name,
            assignedTo:
              data.assigned && data.assigned !== '-1'
                ? Number(data.assigned)
                : null,
            description: JSON.stringify(data.description),
            status: data.status,
            isBacklog: isBacklog ?? false,
          },
          projectId: Number(projectId),
        },
        onCompleted: () => {
          toast({
            title: 'Task Created',
            description: 'Task has been created',
            variant: 'default',
          });
          onOpenChange(false);
          onSuccess?.();
        },
        onError: (e) => {
          toast({
            title: 'Failed to create task',
            description: e.message,
            variant: 'destructive',
          });
        },
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <Drawer.Content onPointerDownOutside={(e) => e.preventDefault()}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-1 flex-col"
        >
          <Drawer.Header>
            <Drawer.Title>{task ? 'Edit Task' : 'Create a Task'}</Drawer.Title>
            <Drawer.Description>
              Tasks are used to organize your work and track time spent on
              specific tasks.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            <ManageTaskForm
              methods={methods}
              statusItems={
                statusesQuery.data?.availableStatusesForProject.map((item) => ({
                  value: item.value,
                  label: item.name,
                })) ?? []
              }
            />
          </Drawer.Body>
          <Drawer.Footer>
            <div className="mr-auto flex items-center gap-2">
              {task && (
                <Button asChild variant="secondary">
                  <Link
                    href={
                      `/app/dashboard/project-management/tasks?id=${task.id}` as any
                    }
                  >
                    <Icons.Maximize className="text-gray-500" size={16} />
                  </Link>
                </Button>
              )}
              {task && onChangePosition && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onChangePosition(task)}
                >
                  {task.isBacklog ? 'Move to Board' : 'Move to Backlog'}
                </Button>
              )}
            </div>
            <Button loading={loading} type="submit">
              {task ? 'Save' : 'Create'}
            </Button>
          </Drawer.Footer>
        </form>
      </Drawer.Content>
    </Drawer>
  );
};

export const taskSchema = z.object({
  name: z.string().min(3, 'Required').max(255),
  description: z.any(),
  assigned: z.string().nullable(),
  status: z.string().nullable(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
