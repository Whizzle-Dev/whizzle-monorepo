import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '../label';
import { Input } from '../input';
import { cn } from '@/lib/utils';
import { InputError } from '@/components/ui/form/input-error';

type FormInputProps = {
  field: string;
  label: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export const FormInput = ({
  field,
  label,
  placeholder,
  ...rest
}: FormInputProps) => {
  const { register, formState, getFieldState } = useFormContext();

  const fieldState = getFieldState(field);
  const hasError =
    (formState.errors[field] && formState.errors[field]?.message) ||
    !!fieldState.error;

  return (
    <div className="grid gap-1">
      {label && <Label htmlFor={field}>{label}</Label>}
      <Input
        className={cn(hasError ? 'border-red-400' : null)}
        placeholder={placeholder}
        {...register(field)}
        {...rest}
        formAction={undefined}
      />
      <InputError field={field} />
    </div>
  );
};
