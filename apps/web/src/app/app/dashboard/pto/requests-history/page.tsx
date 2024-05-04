'use client';

import { withAuth } from '@/domain/auth/withAuth';
import { Separator } from '@/components/ui/separator';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import { useGetPtoRequestsForEmployeeQuery } from '@/generated';
import * as React from 'react';
import { useRequestsHistoryColumns } from '@/app/app/dashboard/pto/requests-history/useRequestsHistoryColumns';

const RequestsHistory = () => {
  const { data, loading } = useGetPtoRequestsForEmployeeQuery({});

  const columns = useRequestsHistoryColumns();
  const { table } = useDataTable({
    data: data?.getPtoRequestsForEmployee,
    columns,
  });
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Requests History</h2>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <DataTable colSpan={columns.length} table={table} loading={loading} />
    </>
  );
};

export default withAuth(RequestsHistory);
