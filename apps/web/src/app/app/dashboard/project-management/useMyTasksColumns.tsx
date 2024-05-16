import * as React from 'react';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  TaskFragment,
  TaskWithProjectFragment,
  useUpdateTaskMutation,
} from '@/generated';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ManageTaskDrawer } from '@/domain/project-management/ManageTaskDrawer';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

type UseTasksColumnsArgs = {
  onUpdate: () => void;
};
export const useMyTasksColumns = ({ onUpdate }: UseTasksColumnsArgs) => {
  return useMemo(() => {
    const columns: ColumnDef<TaskWithProjectFragment>[] = [
      {
        accessorKey: 'name',
        header: () => <span>Title</span>,
        cell: ({ row }) => {
          return (
            <div className="font-bold min-w-[250px]">
              <Link
                href={{
                  pathname: '/app/dashboard/project-management/tasks',
                  query: { id: row.original.id.toString() },
                }}
                className="hover:underline"
              >
                <span>{row.original.name}</span>
              </Link>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'project',
        header: () => <span>Project</span>,
        cell: ({ row }) => {
          const project = row.original.project;
          if (!project) return null;
          return (
            <div className="flex items-center gap-2 min-w-[250px]">
              <Link
                href={{
                  pathname: '/app/dashboard/project-management/projects',
                  query: { id: project.id.toString() },
                }}
                className="flex items-center gap-2 hover:underline"
              >
                {project.name}
                <div
                  className="rounded-full w-3 h-3 flex-grow-0 flex-shrink-0"
                  style={{ background: project.color }}
                />
              </Link>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => {
          return (
            <Badge
              variant={row.original.status === 'DONE' ? 'primary' : 'secondary'}
            >
              {row.original.status}
            </Badge>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        id: 'actions',
        header: () => null,
        cell: ({ row }) => {
          return (
            row.original.project?.id && (
              <TasksActionColumn
                task={row.original}
                projectId={row.original.project.id.toString()}
                onUpdate={onUpdate}
              />
            )
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
    ];

    return columns;
  }, []);
};

type TasksActionColumnProps = {
  task: TaskFragment;
  projectId: string;
  onUpdate: () => void;
};
const TasksActionColumn = ({
  task,
  projectId,
  onUpdate,
}: TasksActionColumnProps) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [update] = useUpdateTaskMutation({
    onCompleted: () => {
      onUpdate();
      toast({
        title: 'Success',
        description: `Task moved to ${task.isBacklog ? 'Board' : 'Backlog'}`,
      });
      setOpen(false);
    },
  });
  return (
    <div className="max-w-[60px] ml-auto">
      <Button
        variant="secondary"
        size="sm"
        className="gap-2 items-center"
        id="add-status-button"
        onClick={() => {
          setOpen(true);
        }}
      >
        View
      </Button>
      <ManageTaskDrawer
        open={open}
        onOpenChange={setOpen}
        projectId={projectId}
        task={task}
        onSuccess={onUpdate}
        onChangePosition={(task) => {
          update({
            variables: {
              payload: {
                id: task.id,
                isBacklog: !task.isBacklog,
              },
            },
          });
        }}
      />
    </div>
  );
};
