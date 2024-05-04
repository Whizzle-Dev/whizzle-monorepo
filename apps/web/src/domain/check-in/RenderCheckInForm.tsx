import { FormElements } from '@/domain/check-in/manage/types';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { FormInput } from '@/components/ui/form/form-input';
import { FormTextArea } from '@/components/ui/form/form-textarea';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { RatingInput } from '@/components/ui/rating';
import {
  CheckInSubmissionFragment,
  CheckInSubmissionStatus,
  useGetCurrentUserQuery,
} from '@/generated';

export type FormValues = any;

type RenderFillFormProps = {
  checkIn: CheckInSubmissionFragment;
  methods: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
};
export const RenderCheckInForm = ({
  checkIn,
  methods,
  onSubmit,
}: RenderFillFormProps) => {
  // todo add yup validation to parsing
  const template = JSON.parse(checkIn.formElements) as FormElements;

  const { data } = useGetCurrentUserQuery();
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <div className="grid gap-4">
          {template.map((element, index) => {
            if (element.type === 'short_answer') {
              return (
                <FormInput
                  field={index.toString()}
                  label={element.question}
                  key={element.question}
                />
              );
            }
            if (element.type === 'long_answer') {
              return (
                <FormTextArea
                  field={index.toString()}
                  label={element.question}
                  key={element.question}
                />
              );
            }

            if (element.type === 'rating') {
              return (
                <RatingInput
                  label={element.question}
                  key={element.question}
                  value={methods.watch(index.toString())}
                  onValueChange={(value) => {
                    methods.setValue(index.toString(), value);
                  }}
                />
              );
            }
          })}
          {checkIn.status !== CheckInSubmissionStatus.SUBMITTED &&
            checkIn.employee.id === data?.currentEmployee.id && (
              <Button type="submit" className="w-fit">
                Submit
              </Button>
            )}
        </div>
      </FormProvider>
    </form>
  );
};
