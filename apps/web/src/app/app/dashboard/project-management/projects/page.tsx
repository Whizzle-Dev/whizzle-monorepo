'use client';

import React, { Suspense, useEffect, useMemo } from 'react';
import { withAuth } from '@/domain/auth/withAuth';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  GetProjectDocument,
  GetProjectQuery,
  ProjectColumnDto,
  TaskFragment,
  TaskFragmentDoc,
  useAddColumnMutation,
  useGetProjectQuery,
  useRemoveColumnMutation,
  useUpdateColumnsMutation,
  useUpdateTaskMutation,
  useUpdateTaskPositionMutation,
} from '@/generated';
import { ManageTaskDrawer } from '@/domain/project-management/ManageTaskDrawer';
import { PopoverClose } from '@radix-ui/react-popover';
import {
  AssigneeFilter,
  BoardColumn,
  ProjectSelect,
} from '@/app/app/dashboard/project-management/projects/components';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations } from '@formkit/drag-and-drop';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import { parseAsBoolean, parseAsInteger, useQueryState } from 'nuqs';
import { ProjectBackLog } from '@/app/app/dashboard/project-management/projects/backlog/ProjectBacklog';

const Projects = ({ params }: { params: { id: number } }) => {
  const [selectedEmployees, setSelectedEmployees] = React.useState<number[]>(
    [],
  );
  const [searchValue, onSearchChange] = React.useState('');
  const [createTaskDrawerOpen, setCreateTaskDrawerOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<
    TaskFragment | undefined
  >();
  const [initialStatus, setInitialStatus] = React.useState<
    string | undefined
  >();
  const [debouncedSearchTerm] = useDebounce(searchValue, 300);

  const {
    data: currentData,
    previousData,
    loading,
    refetch,
  } = useGetProjectQuery({
    variables: {
      id: params.id,
      isBacklog: false,
      searchQuery: debouncedSearchTerm,
      assignedTo: selectedEmployees,
    },
    skip: !params.id,
  });

  const [addColumn] = useAddColumnMutation({
    onCompleted: () => {
      refetch();
    },
  });

  const data = loading ? previousData ?? currentData : currentData;
  const [updateColumns] = useUpdateColumnsMutation();
  const [removeColumn] = useRemoveColumnMutation({
    onCompleted: () => {
      refetch();
    },
  });

  const [updateTask] = useUpdateTaskMutation();

  const tasksMap = useMemo(() => {
    return (
      data?.project.columns?.reduce((acc, column) => {
        acc[column.value] = data?.tasks.filter(
          (task) => task.status === column.value,
        );
        return acc;
      }, {} as Record<string, TaskFragment[]>) ?? {}
    );
  }, [data]);

  const columns = data?.project.columns ?? [];
  const [parent, columnsList, setColumns] = useDragAndDrop<
    HTMLUListElement,
    ProjectColumnDto
  >(columns, {
    group: 'columns',
    plugins: [animations()],
    draggable: (child) => {
      return child.id !== 'ignore-drag';
    },
    handleEnd(data) {
      const newColumns = data.targetData.parent.data.enabledNodes.map(
        (node) => ({
          value: node.data.value.value,
          name: node.data.value.name,
        }),
      );
      updateColumns({
        variables: {
          projectId: Number(params.id),
          columns: newColumns,
        },
      });
    },
  });

  const [updatePosition] = useUpdateTaskPositionMutation();
  useEffect(() => {
    if (data?.project.columns) {
      setColumns(data.project.columns);
    }
  }, [data?.project.columns]);

  const [update] = useUpdateTaskMutation({
    onCompleted: () => {
      refetch();
      setCreateTaskDrawerOpen(false);
    },
  });

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-4">
          <ProjectSelect selected={params.id.toString()} />
          <Input
            placeholder="Search tasks..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[150px] lg:w-[250px]"
          />
          <AssigneeFilter
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
          />
        </div>
        <Button variant="secondary" className="gap-2" asChild>
          <Link
            href={
              `/app/dashboard/project-management/projects?id=${params.id}&isBacklog=true` as any
            }
          >
            View Backlog
          </Link>
        </Button>
      </div>
      <Separator className="my-4" />
      <>
        <ul className="flex flex-row gap-4 overflow-scroll" ref={parent}>
          {columnsList.map((column) => (
            <li key={column.value + 'li'} className="cursor-pointer">
              {tasksMap[column.value] && (
                <BoardColumn
                  key={column.value + 'col'}
                  title={column.name}
                  value={column.value}
                  tasks={tasksMap[column.value] ?? []}
                  onCreateTask={() => {
                    setInitialStatus(column.value);
                    setCreateTaskDrawerOpen(true);
                  }}
                  onOpenTask={(task) => {
                    setSelectedTask(task);
                    setCreateTaskDrawerOpen(true);
                  }}
                  handleUpdatePosition={(taskId, prev, next) => {
                    updatePosition({
                      variables: {
                        taskId: Number(taskId),
                        prevCursor: prev,
                        nextCursor: next,
                      },
                    });
                  }}
                  handleUpdateStatus={(taskId, newStatus) => {
                    updateTask({
                      variables: {
                        payload: {
                          id: Number(taskId),
                          status: newStatus,
                        },
                      },
                      optimisticResponse: {
                        updateTask: true,
                      },
                      update: (cache) => {
                        cache.updateFragment<TaskFragment>(
                          {
                            id: `TaskDto:${taskId}`,
                            fragment: TaskFragmentDoc,
                            fragmentName: 'Task',
                          },
                          (data) => {
                            if (!data) return;
                            return {
                              ...data,
                              status: newStatus,
                            };
                          },
                        );
                        cache.updateQuery<GetProjectQuery>(
                          {
                            query: GetProjectDocument,
                            variables: {
                              id: params.id,
                              isBacklog: false,
                            },
                          },
                          (data) => {
                            if (!data) return data;
                            return {
                              ...data,
                              tasks: data.tasks.map((task) => {
                                if (task.id.toString() === taskId) {
                                  return {
                                    ...task,
                                    status: newStatus,
                                  };
                                }
                                return task;
                              }),
                            };
                          },
                        );
                      },
                    });
                  }}
                  handleRemoveColumn={(value) => {
                    removeColumn({
                      variables: {
                        projectId: Number(params.id),
                        value,
                      },
                    });
                  }}
                />
              )}
            </li>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 items-center"
                id="ignore-drag"
              >
                Add Status
                <Icons.PlusIcon size={14} className="text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <form
                className="flex flex-row items-center gap-2 p-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  const value = (event.target as any)['columnName'].value;
                  if (typeof value === 'string' && value) {
                    addColumn({
                      variables: {
                        projectId: Number(params.id),
                        name: value,
                        value: value.toLowerCase().replace(' ', '_'),
                      },
                    });
                  }
                }}
              >
                <Input placeholder="Column name" name="columnName" />
                <PopoverClose>
                  <Button type="submit">Add</Button>
                </PopoverClose>
              </form>
            </PopoverContent>
          </Popover>
        </ul>
      </>
      <ManageTaskDrawer
        open={createTaskDrawerOpen}
        onOpenChange={(open) => {
          if (!open) {
            setInitialStatus(undefined);
            setSelectedTask(undefined);
          }
          setCreateTaskDrawerOpen(open);
        }}
        projectId={params.id.toString()}
        onSuccess={() => {
          refetch();
        }}
        initialStatus={initialStatus}
        task={selectedTask}
        onChangePosition={(task) => {
          update({
            variables: {
              payload: {
                id: Number(task.id),
                isBacklog: !task.isBacklog,
              },
            },
          });
        }}
      />
    </>
  );
};

const ProjectsPage = () => {
  return (
    <Suspense>
      <ProjectsParamsProvider />
    </Suspense>
  );
};

const ProjectsParamsProvider = () => {
  const [id] = useQueryState('id', parseAsInteger);
  const [isBacklog] = useQueryState('isBacklog', parseAsBoolean);
  if (isBacklog) {
    return id && <ProjectBackLog params={{ id: id.toString() }} />;
  }
  return id && <Projects params={{ id }} />;
};

export default withAuth(ProjectsPage);
