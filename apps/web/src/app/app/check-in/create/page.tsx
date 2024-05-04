'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { withAuth } from '@/domain/auth/withAuth';
import { Button } from '@/components/ui/button';
import { FullPageLayout } from '@/components/layout/FullPageLayout';
import { FormPreview } from '@/domain/check-in/manage/FormPreview';
import { FormValues } from '@/domain/check-in/manage/types';
import { FormFieldManage } from '@/domain/check-in/manage/FormFieldManage';
import { CheckInType, useCreateCheckInTemplateMutation } from '@/generated';
import { useNotifyError } from '@/lib/hooks/useNotifyError';
import { useToast } from '@/components/ui/use-toast';
import { Suspense } from 'react';

const CreateCheckIn = () => {
  const [createCheckinTemplateMutation, { loading, error }] =
    useCreateCheckInTemplateMutation();
  useNotifyError(error);
  const { toast } = useToast();

  const router = useRouter();

  const searchParams = useSearchParams();

  const initialFormElements = parseFormElements(
    searchParams?.get('formElements') as string,
  );
  const methods = useForm<FormValues>({
    defaultValues: {
      formElements: initialFormElements,
    },
  });

  const formElements = useWatch({
    name: 'formElements',
    control: methods.control,
  });

  const type = searchParams?.get('type') as CheckInType;
  return (
    <FullPageLayout
      actions={
        <Button
          onClick={() => {
            createCheckinTemplateMutation({
              variables: {
                payload: {
                  type:
                    type === CheckInType.DAILY
                      ? CheckInType.DAILY
                      : type === CheckInType.MONTHLY
                      ? CheckInType.MONTHLY
                      : CheckInType.WEEKLY,
                  template: JSON.stringify(formElements),
                },
              },
            }).then(() => {
              toast({
                variant: 'default',
                title: 'Successfully created check-in template',
                description:
                  'Your employees will now be able to submit the check-in',
              });
              router.push('/app/dashboard/check-in/settings');
            });
          }}
          loading={loading}
        >
          Save
        </Button>
      }
    >
      <div className="grid grid-cols-2 grid-rows-1 gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold mb-3">Questions</span>
          <FormFieldManage methods={methods} />
        </div>
        <FormPreview formElements={formElements} />
      </div>
    </FullPageLayout>
  );
};

const Page = () => {
  return (
    <Suspense fallback="Loading...">
      <CreateCheckIn />
    </Suspense>
  );
};

export default withAuth(Page);

// todo add yup validation
const parseFormElements = (formElements: string): any => {
  const defaultFormElements = [
    {
      type: 'short_answer',
      question: 'How do you feel today?',
    },
  ];

  try {
    if (formElements) {
      return JSON.parse(formElements);
    } else {
      return defaultFormElements;
    }
  } catch (e) {
    return defaultFormElements;
  }
};
