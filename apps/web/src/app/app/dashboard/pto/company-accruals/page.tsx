'use client';

import { withAuth } from '@/domain/auth/withAuth';
import { Separator } from '@/components/ui/separator';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import { useGetLeaveAccrualsForCompanyQuery } from '@/generated';
import * as React from 'react';
import { usePtoAccrualsColumns } from '@/app/app/dashboard/pto/accruals/usePtoAccrualsColumns';

const PtoCompanyAccruals = () => {
  const { data, loading } = useGetLeaveAccrualsForCompanyQuery();

  const columns = usePtoAccrualsColumns({ admin: true });
  const { table } = useDataTable({
    data: data?.getLeaveAccrualsForCompany,
    columns,
  });
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Company Leave Accruals</h2>
        <p className="text-muted-foreground">
          Manage accruals for your employees
        </p>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <DataTable colSpan={columns.length} table={table} loading={loading} />
    </>
  );
};

export default withAuth(PtoCompanyAccruals);
