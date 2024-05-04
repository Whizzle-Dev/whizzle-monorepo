import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { InputError } from '@/components/ui/form/input-error';
import { Calendar } from '@/components/ui/calendar';
import * as React from 'react';

type FormDateRangeInputProps = {
  label: string;
  field: string;
  isDisabled?: (date: Date) => boolean;
  className?: string;
  placeholder: string;
};
export const FormDateRangeInput = ({
  label,
  field: name,
  className,
  placeholder,
  isDisabled,
}: FormDateRangeInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const date = field.value;
        return (
          <div className={cn('grid gap-2', className)}>
            <Popover>
              <PopoverTrigger asChild>
                <div className="grid gap-1">
                  <Label htmlFor={name}>{label}</Label>
                  <Button
                    type="button"
                    id="date"
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'LLL dd, y')} -{' '}
                          {format(date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(date.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </Button>
                  <InputError field={name} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                  disabled={isDisabled}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
    />
  );
};
