import { Control, useWatch } from 'react-hook-form';
import { FormElements } from '@/domain/check-in/manage/types';
import { FormInput } from '@/components/ui/form/form-input';
import { Button } from '@/components/ui/button';

type CheckBoxInputQuestionProps = {
  field: `formElements.${number}.${'type' | 'question'}`;
  control: Control<{ formElements: FormElements }>;
};
export const CheckBoxInputQuestion = ({
  field,
  control,
}: CheckBoxInputQuestionProps) => {
  const type = useWatch({
    name: field,
    control: control,
  });

  return (
    type === 'cx' && (
      <div className="grid gap-4">
        <FormInput label="Option 1" field={field} />
        <Button className="w-fit">Add option +</Button>
      </div>
    )
  );
};
