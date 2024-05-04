import { useController, useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { InputError } from '@/components/ui/form/input-error';
import { useId } from 'react';

type FormCheckboxProps = {
  field: string;
  label: string;
};
export const FormCheckbox = ({ field: name, label }: FormCheckboxProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });
  const hasError = !!fieldState.error;

  const checkBoxId = useId();
  return (
    <div>
      <div className="flex flex-row items-center">
        <Checkbox
          id={checkBoxId}
          className="mr-2"
          checked={field.value}
          onCheckedChange={field.onChange}
        />
        <label
          htmlFor={checkBoxId}
          className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
      {hasError && <InputError field={name} />}
    </div>
  );
};
