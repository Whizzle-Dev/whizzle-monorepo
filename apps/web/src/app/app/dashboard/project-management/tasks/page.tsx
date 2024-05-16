'use client';

import React, { Suspense } from 'react';
import {
  TaskWithProjectFragment,
  useGetAvailableStatusesForProjectQuery,
  useGetTaskQuery,
  useUpdateTaskMutation,
} from '@/generated';
import { withAuth } from '@/domain/auth/withAuth';
import { useForm } from 'react-hook-form';
import {
  TaskFormValues,
  taskSchema,
} from '@/domain/project-management/ManageTaskDrawer';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { ManageTaskForm } from '@/domain/project-management/ManageTaskForm';
import Link from 'next/link';
import { Loader } from '@/components/ui/loader';
import { tryParse } from '@/components/ui/form/FormPlateEditor';
import { parseAsInteger, useQueryState } from 'nuqs';

const Task = () => {
  const [id] = useQueryState('id', parseAsInteger);
  const { data, refetch, loading } = useGetTaskQuery({
    variables: { id: Number(id) },
  });

  const task = data?.task;

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  return task && <TaskPageComponent task={task} onSuccess={refetch} />;
};

type TaskPagePTaskPageComponentProps = {
  task: TaskWithProjectFragment;
  onSuccess: () => void;
};
const TaskPageComponent = ({
  task,
  onSuccess,
}: TaskPagePTaskPageComponentProps) => {
  const { toast } = useToast();

  const statusesQuery = useGetAvailableStatusesForProjectQuery({
    variables: {
      projectId: Number(task.project?.id),
    },
    skip: !task.project?.id,
  });
  const methods = useForm<any>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: task.name,
      description: tryParse(task.description),
      assigned: task.assignedTo?.toString() ?? '-1',
      status: task.status,
    },
  });

  const [updateTask, { loading: updating }] = useUpdateTaskMutation();

  const handleSubmit = (data: TaskFormValues) => {
    if (!task) {
      return;
    }
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
        onSuccess();
      },
      onError: (e) => {
        toast({
          title: 'Failed to update task',
          description: e.message,
          variant: 'destructive',
        });
      },
    });
  };
  return (
    <div className="max-w-screen-lg">
      <Button variant="secondary" className="gap-2" asChild>
        <Link
          href={{
            pathname: '/app/dashboard/project-management/projects',
            query: { id: task.project?.id.toString() },
          }}
        >
          <Icons.ArrowLeft className="text-gray-500" size={16} />
          Back to Project
        </Link>
      </Button>
      <Separator className="my-4" />
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="flex flex-1 flex-col gap-4"
      >
        <ManageTaskForm
          statusItems={
            statusesQuery.data?.availableStatusesForProject.map((column) => ({
              value: column.value,
              label: column.name,
            })) ?? []
          }
          methods={methods}
        />
        <Button type="submit" loading={updating} className="w-fit">
          Save
        </Button>
      </form>
    </div>
  );
};

const TaskPage = () => {
  return (
    <Suspense>
      <Task />
    </Suspense>
  );
};
export default withAuth(TaskPage);
