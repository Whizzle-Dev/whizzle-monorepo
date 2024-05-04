'use client';

import { withAuth } from '@/domain/auth/withAuth';
import { Separator } from '@/components/ui/separator';
import { DataTable, useDataTable } from '@/components/ui/data-table/DataTable';
import { useGetApprovalRequestsQuery } from '@/generated';
import * as React from 'react';
import { useApprovalRequestsHistoryColumns } from '@/app/app/dashboard/pto/approval-requests-history/useApprovalRequestsHistoryColumns';

const ApprovalRequestsHistory = () => {
  const { data, loading: loadingPendingRequests } =
    useGetApprovalRequestsQuery();

  const columns = useApprovalRequestsHistoryColumns();
  const { table } = useDataTable({
    data: data?.getRequestsForApproval,
    columns,
  });
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Approval Requests History</h2>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <DataTable
        colSpan={columns.length}
        table={table}
        loading={loadingPendingRequests}
      />
    </>
  );
};

export default withAuth(ApprovalRequestsHistory);
