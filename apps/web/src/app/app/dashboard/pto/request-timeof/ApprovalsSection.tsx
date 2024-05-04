import { PtoRequestStatus, useGetApprovalRequestsQuery } from '@/generated';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OptionCard } from '@/components/OptionCard';
import { formatLeaveRequestTime } from '@/domain/pto/utils';
import { IconMenu } from '@/components/ui/menues/icon-menu';
import { Icons } from '@/components/ui/icons';
import * as React from 'react';

type ApprovalsSectionProps = {
  setRequestDetailsId: (id: number | null) => void;
  handleApprove: (requestId: number) => void;
  handleReject: (requestId: number) => void;
  approving: boolean;
};
export const ApprovalsSection = ({
  setRequestDetailsId,
  handleApprove,
  handleReject,
  approving,
}: ApprovalsSectionProps) => {
  const { data: pendingRequests, loading: loadingPendingRequests } =
    useGetApprovalRequestsQuery({
      variables: {
        status: PtoRequestStatus.PENDING,
      },
    });
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold mb-4">For Approval</span>
        <Button variant="outline" asChild>
          <Link href="/app/dashboard/pto/approval-requests-history">
            View All
          </Link>
        </Button>
      </div>
      <div className="flex flex-row gap-4 flex-wrap">
        {pendingRequests?.getRequestsForApproval.map((request) => (
          <OptionCard
            key={request.id}
            title={request.requestedByName ?? ''}
            description={`${
              request.leaveCategoryName
            } from: ${formatLeaveRequestTime(
              request.startDate,
              request.endDate,
              request.workingDays,
            )}`}
            menu={
              <IconMenu
                icon={<Icons.MoreHorizontal size={16} />}
                items={[
                  {
                    label: 'View Details',
                    onClick: () => {
                      // show details
                      setRequestDetailsId(request.id);
                    },
                  },
                ]}
              />
            }
          >
            <div className="flex flex-row gap-2">
              <Button
                variant="secondary"
                onClick={() => handleReject(request.id)}
                loading={approving}
              >
                Reject
              </Button>
              <Button
                onClick={() => handleApprove(request.id)}
                loading={approving}
              >
                Approve
              </Button>
            </div>
          </OptionCard>
        ))}
        {pendingRequests?.getRequestsForApproval.length === 0 &&
          !loadingPendingRequests && (
            <p className="text-gray-500">
              There are no pending requests for approval
            </p>
          )}
      </div>
    </div>
  );
};
