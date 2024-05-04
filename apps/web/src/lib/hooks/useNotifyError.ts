import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ApolloError } from '@apollo/client';
import { getGraphqlError } from '@/lib/utils';

export const useNotifyError = (error: ApolloError | undefined) => {
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
        description: getGraphqlError(error),
      });
    }
  }, [error]);
};
