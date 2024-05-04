'use client';
import React, { Suspense } from 'react';
import { useGetProjectQuery } from '@/generated';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import { Separator } from '@/components/ui/separator';
import { useTasksColumns } from '@/app/app/dashboard/project-management/projects/backlog/useTasksColumns';
import Link from 'next/link';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { ProjectSelect } from '@/app/app/dashboard/project-management/projects/components';
import { Input } from '@/components/ui/input';
import { ManageTaskDrawer } from '@/domain/project-management/ManageTaskDrawer';
import { useDebounce } from 'use-debounce';

export const ProjectBackLog = ({ params }: { params: { id: string } }) => {
  const [searchValue, onSearchChange] = React.useState('');
  const [searchDebounced] = useDebounce(searchValue, 300);
  const [createTaskOpen, setCreateTaskOpen] = React.useState(false);
  const {
    data: currentData,
    previousData,
    loading,
    refetch,
  } = useGetProjectQuery({
    variables: {
      id: Number(params.id),
      isBacklog: true,
      searchQuery: searchDebounced,
    },
    skip: !params.id,
  });

  const data = loading ? previousData ?? currentData : currentData;

  const columns = useTasksColumns({
    projectId: params.id,
    onUpdate: refetch,
  });
  const { table } = useDataTable({
    data: data?.tasks,
    columns,
  });
  return (
    <Suspense>
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-4">
          <ProjectSelect selected={params.id} />
          <Input
            placeholder="Search tasks..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              setCreateTaskOpen(true);
            }}
          >
            Create Task <Icons.PlusIcon size={16} />
          </Button>
          <Button variant="secondary" className="gap-2" asChild>
            <Link
              href={
                `/app/dashboard/project-management/projects?id=${params.id}` as any
              }
            >
              Board
            </Link>
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <DataTable
        colSpan={columns.length}
        table={table}
        loading={!previousData && loading}
      />
      <ManageTaskDrawer
        open={createTaskOpen}
        onOpenChange={setCreateTaskOpen}
        projectId={params.id}
        isBacklog
        onSuccess={refetch}
      />
    </Suspense>
  );
};
