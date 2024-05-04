import { useToast } from '@/components/ui/use-toast';
import {
  GetApprovalRequestsDocument,
  GetLeaveEntitlementsDocument,
  GetPtoRequestsDetailDocument,
  GetPtoRequestsForEmployeeDocument,
  PtoRequestStatus,
  useApproveRejectPtoRequestMutation,
} from '@/generated';

export const useManagePtoRequestActions = () => {
  const { toast } = useToast();

  const [approveReject, { loading }] = useApproveRejectPtoRequestMutation({});

  const handleReject = (requestId: number) => {
    approveReject({
      variables: {
        requestId,
        accepted: false,
      },
      refetchQueries: [
        {
          query: GetPtoRequestsDetailDocument,
          variables: { requestId },
        },
        GetPtoRequestsForEmployeeDocument,
        {
          query: GetApprovalRequestsDocument,
          variables: { status: PtoRequestStatus.PENDING },
        },
        GetLeaveEntitlementsDocument,
      ],
    })
      .then(() => {
        toast({
          variant: 'default',
          title: 'Request Reject',
          description: 'The request has been rejected',
        });
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Failed to reject',
          description: error.message || 'Something went wrong',
        });
      });
  };

  const handleApprove = (requestId: number) => {
    approveReject({
      variables: {
        requestId,
        accepted: true,
      },
      refetchQueries: [
        {
          query: GetPtoRequestsDetailDocument,
          variables: { requestId },
        },
        GetPtoRequestsForEmployeeDocument,
        {
          query: GetApprovalRequestsDocument,
          variables: { status: PtoRequestStatus.PENDING },
        },
        GetLeaveEntitlementsDocument,
      ],
    })
      .then(() => {
        toast({
          variant: 'default',
          title: 'Request Approved',
          description: 'The request has been approved',
        });
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Failed to approve',
          description: error.message || 'Something went wrong',
        });
      });
  };

  return {
    loading,
    handleApprove,
    handleReject,
  };
};
