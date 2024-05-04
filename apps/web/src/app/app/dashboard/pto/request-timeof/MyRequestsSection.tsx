import {
  GetPtoRequestsForEmployeeDocument,
  useCancelPtoRequestMutation,
  useGetPtoRequestsForEmployeeQuery,
} from '@/generated';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { OptionCard } from '@/components/OptionCard';
import {
  formatLeaveRequestTime,
  getBadgeVariantFromStatus,
} from '@/domain/pto/utils';
import { IconMenu } from '@/components/ui/menues/icon-menu';
import { Icons } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import * as React from 'react';

type MyRequestsSectionProps = {
  setRequestDetailsId: (id: number | null) => void;
};
export const MyRequestsSection = ({
  setRequestDetailsId,
}: MyRequestsSectionProps) => {
  const { data, loading } = useGetPtoRequestsForEmployeeQuery({
    variables: {
      options: {
        take: 3,
        skip: 0,
      },
    },
  });
  const [cancelRequest] = useCancelPtoRequestMutation({
    refetchQueries: [GetPtoRequestsForEmployeeDocument],
  });

  const { toast } = useToast();
  const handleCancel = (requestId: number) => {
    cancelRequest({
      variables: {
        requestId,
      },
    })
      .then(() => {
        toast({
          variant: 'default',
          title: 'Successfully cancelled',
          description: 'Your request has been cancelled',
        });
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Failed to cancel',
          description: error.message || 'Something went wrong',
        });
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="text-xl font-bold mb-4">My Requests</div>
        <Button variant="outline" asChild>
          <Link href="/app/dashboard/pto/requests-history">View All</Link>
        </Button>
      </div>
      <div className="flex flex-row gap-4 flex-wrap">
        {!loading && !data?.getPtoRequestsForEmployee.length && (
          <p className="text-gray-500">
            There are no previously submitted requests
          </p>
        )}
        <AnimatePresence initial={false} presenceAffectsLayout>
          {data?.getPtoRequestsForEmployee.map((request) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, easings: ['linear'] }}
              key={request.id}
            >
              <OptionCard
                key={request.id}
                title={request.leaveCategoryName}
                description={formatLeaveRequestTime(
                  request.startDate,
                  request.endDate,
                  request.workingDays,
                )}
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
                      {
                        label: 'Cancel',
                        onClick: () => {
                          handleCancel(request.id);
                        },
                      },
                    ]}
                  />
                }
              >
                <Badge variant={getBadgeVariantFromStatus(request.status)}>
                  {request.status}
                </Badge>
              </OptionCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
