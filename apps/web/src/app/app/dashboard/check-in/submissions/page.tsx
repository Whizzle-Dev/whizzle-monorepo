'use client';

import React, { Suspense, useEffect } from 'react';
import { withAuth } from '@/domain/auth/withAuth';
import {
  CheckInSubmissionStatus,
  useGetCheckInByIdQuery,
  useSubmitCheckInMutation,
  useUpdateCheckInSubmissionMutation,
} from '@/generated';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import {
  FormValues,
  RenderCheckInForm,
} from '@/domain/check-in/RenderCheckInForm';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useNotifyError } from '@/lib/hooks/useNotifyError';

const CheckInSubmissionPage = () => {
  const [id] = useQueryState('id', parseAsInteger);

  const router = useRouter();
  const { data, refetch } = useGetCheckInByIdQuery({
    variables: {
      id: Number(id),
    },
    skip: !id,
  });

  const { toast } = useToast();
  const checkIn = data?.getCheckInSubmission;

  const methods = useForm<any>();

  useEffect(() => {
    if (checkIn?.answer) {
      methods.reset(JSON.parse(checkIn?.answer ?? '{}'));
    }
  }, [checkIn?.answer]);

  const [updateMutation, { error: updateError }] =
    useUpdateCheckInSubmissionMutation({
      onCompleted: () => {
        toast({
          variant: 'default',
          title: 'Check-in updated',
          description: 'Your check-in has been updated successfully',
        });
        refetch();
      },
    });

  const [submitCheckInMutation, { error: createError }] =
    useSubmitCheckInMutation({
      onCompleted: () => {
        toast({
          variant: 'default',
          title: 'Check-in submitted',
          description: 'Your check-in has been submitted successfully',
        });
        refetch();
      },
    });

  const error = updateError || createError;

  useNotifyError(error);

  const onSubmit = (values: FormValues) => {
    if (checkIn?.status === CheckInSubmissionStatus.PENDING) {
      submitCheckInMutation({
        variables: {
          payload: {
            checkInId: checkIn.id,
            answers: JSON.stringify(values),
          },
        },
      });
    } else if (checkIn) {
      updateMutation({
        variables: {
          payload: {
            answers: JSON.stringify(values),
          },
          id: checkIn.id,
        },
      });
    }
  };

  return (
    <div className="flex flex-col">
      {checkIn && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <Button
              size="sm"
              variant="secondary"
              className="w-fit"
              onClick={() => router.back()}
            >
              <Icons.ArrowLeft className="mr-2" size={16} />
              Back
            </Button>
          </div>
          <span className="font-bold mb-4 text-xl">{checkIn.prettyName}</span>
          <RenderCheckInForm
            checkIn={checkIn}
            methods={methods}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </div>
  );
};

const SuspendedCheckInSubmissionPage = () => {
  return (
    <Suspense>
      <CheckInSubmissionPage />
    </Suspense>
  );
};

export default withAuth(SuspendedCheckInSubmissionPage);
