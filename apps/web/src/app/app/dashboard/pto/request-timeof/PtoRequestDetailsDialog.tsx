import {
  PtoRequestFragmentFragment,
  PtoRequestStatus,
  useGetCurrentUserQuery,
  useGetPtoRequestsDetailQuery,
} from '@/generated';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { formatLeaveRequestTime } from '@/domain/pto/utils';
import { Badge } from '@/components/ui/badge';
import { DialogClose } from '@/components/plate-ui/dialog';
import { Button } from '@/components/ui/button';
import * as React from 'react';

import { EmployeeAvatar } from '@/components/ui/avatar';
import { useManagePtoRequestActions } from '@/domain/pto/hooks/useManagePtoRequestActions';

type PtoRequestDetailsDialogProps = {
  onOpenChange: (open: boolean) => void;
  requestId: number;
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
};
export const PtoRequestDetailsDialog = ({
  onOpenChange,
  requestId,
  trigger,
  defaultOpen = true,
}: PtoRequestDetailsDialogProps) => {
  const { loading, handleApprove, handleReject } = useManagePtoRequestActions();
  const userData = useGetCurrentUserQuery({
    fetchPolicy: 'cache-first',
  });
  const { data } = useGetPtoRequestsDetailQuery({
    variables: {
      requestId,
    },
  });
  const approvers = data?.getPtoRequestDetails?.approvers.reduce(
    (acc, curr) => {
      if (acc[curr.priority]) {
        acc[curr.priority]?.push(curr);
      } else {
        acc[curr.priority] = [curr];
      }
      return acc;
    },
    {} as Record<number, PtoRequestFragmentFragment['approvers'][number][]>,
  );

  const isApproverView = !!data?.getPtoRequestDetails.approvers.some(
    (approver) =>
      approver.employee.id === userData.data?.currentEmployee.id &&
      approver.status === 'PENDING',
  );
  return (
    <Dialog defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">Requested By: </span>
            <EmployeeAvatar
              src={data?.getPtoRequestDetails.requstedBy?.profilePhotoUrl}
              name={data?.getPtoRequestDetails.requstedBy?.name}
            />
            <span className="font-medium">
              {data?.getPtoRequestDetails.requstedBy?.name}
            </span>
          </div>

          <span className="text-base">
            PTO Category:{' '}
            <span className="font-medium">
              {data?.getPtoRequestDetails.ptoCategoryName}
            </span>
          </span>
          <span className="text-base">
            From:{' '}
            <span className="font-medium">
              {data?.getPtoRequestDetails
                ? formatLeaveRequestTime(
                    data.getPtoRequestDetails.startDate,
                    data.getPtoRequestDetails.endDate,
                    data.getPtoRequestDetails.workingDays,
                  )
                : ''}{' '}
            </span>
          </span>
        </div>
        <span>Approval</span>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {approvers &&
            Object.entries(approvers).map(([, l], index) => (
              <li className="mb-2 ms-4 flex flex-col gap-4" key={index}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mt-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Level {index + 1}
                </time>

                {l.map((approver) => (
                  <div
                    className="flex flex-row items-center gap-4"
                    key={'approver-level' + index + '-' + approver.employee.id}
                  >
                    <EmployeeAvatar
                      src={approver.employee.profilePhotoUrl}
                      name={approver.employee.name}
                    />
                    <span className="text-sm text-gray-600">
                      {approver.employee.name}
                    </span>
                    <Badge
                      variant={getButtonVariantFromStatus(
                        approver.status as PtoRequestStatus,
                      )}
                      className="ml-auto"
                    >
                      {approver.status}
                    </Badge>
                  </div>
                ))}
              </li>
            ))}
        </ol>

        <DialogFooter className="mt-4 flex gap-2">
          {isApproverView ? (
            <>
              <DialogClose>
                <Button
                  variant="secondary"
                  onClick={() => handleReject(requestId)}
                  loading={loading}
                >
                  Reject
                </Button>
              </DialogClose>
              <DialogClose>
                <Button
                  variant="default"
                  onClick={() => handleApprove(requestId)}
                  loading={loading}
                >
                  Approve
                </Button>
              </DialogClose>
            </>
          ) : (
            <DialogClose>
              <Button variant="outline">Close</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const getButtonVariantFromStatus = (status: PtoRequestStatus) => {
  return status === 'PENDING'
    ? 'warning'
    : status === 'APPROVED'
    ? 'primary'
    : status === 'REJECTED'
    ? 'destructive'
    : 'secondary';
};
