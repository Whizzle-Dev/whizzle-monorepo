import { Controller, useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { InputError } from '@/components/ui/form/input-error';
import * as React from 'react';
import { ColorPicker } from '@/components/ui/ColorPicker';

type FormDateInputProps = {
  label: string;
  field: string;
};
export const FormColorPicker = ({ label, field: name }: FormDateInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="grid gap-1">
            <Label htmlFor={name}>{label}</Label>
            <ColorPicker
              background={field.value}
              setBackground={field.onChange}
            />
            <InputError field={name} />
          </div>
        );
      }}
    />
  );
};
