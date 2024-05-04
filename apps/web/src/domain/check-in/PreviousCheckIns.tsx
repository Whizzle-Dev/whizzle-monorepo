import * as React from 'react';
import { useGetPastCheckInsQuery } from '@/generated';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import { useCheckInTableColumns } from '@/domain/check-in/hooks/useCheckInTableColumns';

export const PreviousCheckIns = () => {
  const { data, loading } = useGetPastCheckInsQuery();

  const columns = useCheckInTableColumns();
  const { table } = useDataTable({
    data: data?.getPastCheckIns,
    columns,
  });

  return (
    <div className="flex flex-col">
      <DataTable loading={loading} table={table} colSpan={columns.length} />
    </div>
  );
};
