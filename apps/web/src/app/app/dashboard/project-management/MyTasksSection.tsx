import { useGetMyTasksQuery } from '@/generated';
import { useMyTasksColumns } from '@/app/app/dashboard/project-management/useMyTasksColumns';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import React from 'react';

export const MyTasksSection = () => {
  const { data, refetch, loading } = useGetMyTasksQuery();

  const columns = useMyTasksColumns({
    onUpdate: () => {
      refetch();
    },
  });

  const { table } = useDataTable({
    data: data?.myTasks,
    columns,
  });
  return <DataTable colSpan={columns.length} table={table} loading={loading} />;
};
