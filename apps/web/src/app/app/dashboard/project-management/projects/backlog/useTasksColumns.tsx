import * as React from 'react';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { TaskFragment, useUpdateTaskMutation } from '@/generated';
import { Badge } from '@/components/ui/badge';
import { EmployeeAvatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ManageTaskDrawer } from '@/domain/project-management/ManageTaskDrawer';
import { useToast } from '@/components/ui/use-toast';

type UseTasksColumnsArgs = {
  projectId: string;
  onUpdate: () => void;
};
export const useTasksColumns = ({
  projectId,
  onUpdate,
}: UseTasksColumnsArgs) => {
  return useMemo(() => {
    const columns: ColumnDef<TaskFragment>[] = [
      {
        accessorKey: 'name',
        header: () => <span>Title</span>,
        cell: ({ row }) => {
          return <div className="font-bold">{row.original.name}</div>;
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'assignedTo',
        header: () => <span>Assigned To</span>,
        cell: ({ row }) => {
          const task = row.original;
          return task.assignedToEmployee ? (
            <div className="flex items-center gap-2">
              <EmployeeAvatar
                src={task.assignedToEmployee.profilePhotoUrl}
                name={task.assignedToEmployee.name}
              />
              <span>{task.assignedToEmployee.name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <EmployeeAvatar src="/circle-user-round.svg" name="" />
              <span>Unassigned</span>
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
          return <Badge variant="outline">{row.original.status}</Badge>;
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
            <TasksActionColumn
              task={row.original}
              projectId={projectId}
              onUpdate={onUpdate}
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableGrouping: false,
      },
    ];

    return columns;
  }, [projectId]);
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
