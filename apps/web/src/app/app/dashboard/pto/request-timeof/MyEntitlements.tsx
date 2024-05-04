import { useGetLeaveEntitlementsQuery } from '@/generated';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OptionCard } from '@/components/OptionCard';
import { RequestTimeOfDialog } from '@/domain/pto/RequestTimeOfDialog';

export const MyEntitlements = () => {
  const leaveEntitlementsQuery = useGetLeaveEntitlementsQuery();
  const [requestDialogOpen, setRequestDialogOpen] = React.useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    number | null
  >(null);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div className="text-xl font-bold">Request Paid Time Leave</div>
          <Button variant="outline" asChild>
            <Link href="/app/dashboard/pto/accruals">View My Accruals</Link>
          </Button>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          Submit a request for paid time off.
        </div>
        <div className="flex flex-row gap-4 flex-wrap">
          {leaveEntitlementsQuery.data?.leaveEntitlements.map((entitlement) => (
            <OptionCard
              key={entitlement.name}
              title={entitlement.name}
              description={`${entitlement.remainingDays.toFixed(
                2,
              )} Days Remaining`}
              cta="Request"
              onClick={() => {
                setSelectedCategoryId(entitlement.categoryId);
                setRequestDialogOpen(true);
              }}
            />
          ))}
        </div>
      </div>
      {selectedCategoryId && (
        <RequestTimeOfDialog
          onOpenChange={setRequestDialogOpen}
          open={requestDialogOpen}
          categoryId={selectedCategoryId}
        />
      )}
    </>
  );
};
