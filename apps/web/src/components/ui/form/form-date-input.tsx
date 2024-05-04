import { Controller, useFormContext } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { format, isDate } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { InputError } from '@/components/ui/form/input-error';
import * as React from 'react';

type FormDateInputProps = {
  label: string;
  field: string;
  isDisabled?: (date: Date) => boolean;
};
export const FormDateInput = ({
  label,
  field: name,
  isDisabled,
}: FormDateInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value = !field.value
          ? null
          : isDate(field.value)
          ? field.value
          : new Date(field.value);
        return (
          <Popover>
            <PopoverTrigger asChild>
              <div className="grid gap-1">
                <Label htmlFor={name}>{label}</Label>
                <div className="relative flex flex-row items-center">
                  <Input
                    placeholder="Pick a date"
                    value={isDate(value) ? format(value, 'dd/LL/yyyy') : ''}
                    readOnly
                  />
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50 absolute right-4" />
                </div>
                <InputError field={name} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value}
                components={{}}
                onSelect={field.onChange}
                disabled={isDisabled}
                initialFocus
                captionLayout="dropdown"
                fromYear={1900}
                toYear={2024}
                styles={{
                  // todo revisit
                  caption_label: {
                    display: 'none',
                  },
                }}
              />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};
