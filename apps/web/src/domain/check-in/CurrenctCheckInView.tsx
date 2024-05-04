import { useForm } from 'react-hook-form';
import {
  FormValues,
  RenderCheckInForm,
} from '@/domain/check-in/RenderCheckInForm';
import { useToast } from '@/components/ui/use-toast';
import {
  useGetPendingCheckInsQuery,
  useSubmitCheckInMutation,
} from '@/generated';
import { useNotifyError } from '@/lib/hooks/useNotifyError';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Icons } from '@/components/ui/icons';
import { Loader } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const CurrentCheckInView = () => {
  const methods = useForm<FormValues>();
  const { toast } = useToast();

  const { data, loading, refetch } = useGetPendingCheckInsQuery({
    fetchPolicy: 'cache-first',
  });

  const [selectedId, setSelectedId] = useState<null | number>(null);

  const selected = data?.getPendingCheckins.find(
    (checkIn) => checkIn.id === selectedId,
  );

  const [submitCheckInMutation, { error }] = useSubmitCheckInMutation({
    onCompleted: () => {
      toast({
        variant: 'default',
        title: 'Check-in submitted',
        description: 'Your check-in has been submitted successfully',
      });
      refetch();
    },
  });
  useNotifyError(error);

  useEffect(() => {
    const firstCheckIn = data?.getPendingCheckins[0];
    if (firstCheckIn) {
      setSelectedId(firstCheckIn.id);
    }
  }, [data]);

  const onSubmit = (values: FormValues) => {
    if (selectedId) {
      submitCheckInMutation({
        variables: {
          payload: {
            checkInId: selectedId,
            answers: JSON.stringify(values),
          },
        },
      }).then(() => {
        methods.reset();
      });
    }
  };

  const hasPendingCheckIns =
    !loading && (data?.getPendingCheckins.length ?? 0) > 0;

  return (
    <div className="flex flex-col">
      {hasPendingCheckIns ? (
        <span className="text-xl font-bold">Pending Check-ins:</span>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <span className="text-xl font-bold">No pending check-ins</span>
          <span className="text-lg">You have no pending check-ins to fill</span>
          <Icons.CheckCircle2 className="w-6 h-6 ml-2 text-green-500" />
        </div>
      )}
      <div className="flex flex-row gap-2 mt-4 flex-wrap">
        {loading && <Loader className="w-6 h-6" />}
        {data?.getPendingCheckins.map((checkIn) => {
          return (
            <Badge
              variant={selectedId === checkIn.id ? 'default' : 'secondary'}
              size="xl"
              key={checkIn.type}
              onClick={() => setSelectedId(checkIn.id)}
              className="cursor-pointer"
            >
              {checkIn.prettyName}
            </Badge>
          );
        })}
      </div>
      {selected ? (
        <div className="flex flex-col gap-4 mt-8">
          <span>
            Fill in{' '}
            <span className="font-bold">{selected.prettyName} Check-In</span>
          </span>
          <RenderCheckInForm
            checkIn={selected}
            methods={methods}
            onSubmit={onSubmit}
          />
        </div>
      ) : (
        hasPendingCheckIns && (
          <div className="my-10">
            <span className="font-bold text-gray-500">
              Select a check-in to fill
            </span>
          </div>
        )
      )}
    </div>
  );
};
