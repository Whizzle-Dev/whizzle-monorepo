'use client';

import { withAuth } from '@/domain/auth/withAuth';
import { Separator } from '@/components/ui/separator';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import { useGetAccrualsForEmployeeQuery } from '@/generated';
import * as React from 'react';
import { usePtoAccrualsColumns } from '@/app/app/dashboard/pto/accruals/usePtoAccrualsColumns';

const PtoAccruals = () => {
  const { data, loading } = useGetAccrualsForEmployeeQuery();

  const columns = usePtoAccrualsColumns({});
  const { table } = useDataTable({
    data: data?.getLeaveAccrualsForEmployee,
    columns,
  });
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Leave Accruals</h2>
        <p className="text-muted-foreground">
          Leave accruals show history of accrued days for PTO
        </p>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <DataTable colSpan={columns.length} table={table} loading={loading} />
    </>
  );
};

export default withAuth(PtoAccruals);
