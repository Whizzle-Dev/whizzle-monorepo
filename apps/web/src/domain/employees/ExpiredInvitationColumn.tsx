import { useToast } from '@/components/ui/use-toast';
import { EmployeeStatus, useResendEmployeeInviteMutation } from '@/generated';
import { getGraphqlError } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import * as React from 'react';

type ExpiredInvitationColumnProps = {
  id: number;
};
export const ExpiredInvitationColumn = ({
  id,
}: ExpiredInvitationColumnProps) => {
  const { toast } = useToast();
  const [resend, { loading }] = useResendEmployeeInviteMutation({
    update: (cache, { data }) => {
      if (data?.resendEmployeeInvite) {
        cache.modify({
          id: `EmployeeDto:${id}`,
          fields: {
            status: () => EmployeeStatus.INVITED,
          },
        });
      }
    },

    onCompleted: () => {
      toast({
        title: 'Invitation resent',
        description: 'The invitation has been resent successfully',
        variant: 'default',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: getGraphqlError(error),
        variant: 'destructive',
      });
    },
    variables: {
      id,
    },
  });
  return (
    <div className="flex items-center gap-2">
      <Badge variant="destructive">Expired Invitation</Badge>
      <Button
        variant="outline"
        size="sm"
        onClick={() => resend()}
        loading={loading}
      >
        Resend
      </Button>
    </div>
  );
};
