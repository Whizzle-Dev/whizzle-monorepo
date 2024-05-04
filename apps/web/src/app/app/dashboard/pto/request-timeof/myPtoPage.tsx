'use client';
import * as React from 'react';
import { Separator } from '@/components/ui/separator';
import { PtoRequestDetailsDialog } from '@/app/app/dashboard/pto/request-timeof/PtoRequestDetailsDialog';
import { MyRequestsSection } from '@/app/app/dashboard/pto/request-timeof/MyRequestsSection';
import { ApprovalsSection } from '@/app/app/dashboard/pto/request-timeof/ApprovalsSection';
import { parseAsInteger, useQueryState } from 'nuqs';
import { MyEntitlements } from '@/app/app/dashboard/pto/request-timeof/MyEntitlements';
import { useManagePtoRequestActions } from '@/domain/pto/hooks/useManagePtoRequestActions';

export const MyPtoPage = () => {
  const {
    handleApprove,
    handleReject,
    loading: approving,
  } = useManagePtoRequestActions();
  const [requestDetailsId, setRequestDetailsId] = useQueryState(
    'requestDetailsId',
    parseAsInteger,
  );
  return (
    <>
      <div className="flex flex-col min-w-[800px] w-1/2">
        {/*section - my entitlements*/}
        <MyEntitlements />
        <Separator className="my-6" />
        {/*section - my submitted requests*/}
        <MyRequestsSection setRequestDetailsId={setRequestDetailsId} />
        <Separator className="my-6" />
        {/*section - approvals*/}
        <ApprovalsSection
          approving={approving}
          handleApprove={handleApprove}
          handleReject={handleReject}
          setRequestDetailsId={setRequestDetailsId}
        />
      </div>
      {requestDetailsId && (
        <PtoRequestDetailsDialog
          onOpenChange={(open) => {
            if (!open) {
              setRequestDetailsId(null);
            }
          }}
          requestId={requestDetailsId}
        />
      )}
    </>
  );
};
