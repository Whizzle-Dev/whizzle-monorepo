import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { InputError } from '@/components/ui/form/input-error';
import React, { CSSProperties, ReactNode } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import { ScrollArea } from '@/components/ui/scroll-area';

type FormSelectProps<T> = {
  field: string;
  label: string;
  placeholder?: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  renderFooter?: () => ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (value: string) => void;
  width?: CSSProperties['width'];
};
export const FormSelect = <T,>({
  label,
  items,
  renderItem,
  field: name,
  placeholder,
  renderFooter,
  open,
  onOpenChange,
  onChange,
  width = '100%',
}: FormSelectProps<T>) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });
  const hasError = !!fieldState.error;

  return (
    <div className="flex flex-col w-full gap-1">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Select
        key={field.value}
        value={field.value}
        onValueChange={(v) => {
          field.onChange(v);
          if (onChange) {
            onChange(v);
          }
        }}
        onOpenChange={onOpenChange}
        open={open}
      >
        <SelectTrigger
          className={clsx(
            typeof width === 'number' && `w-[${width}px]`,
            '[&>span]:truncate',
          )}
        >
          <SelectValue
            placeholder={
              <span className="text-muted-foreground whitespace-nowrap">
                {placeholder}
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent className={cn(hasError ? 'border-red-400' : null)}>
          {items.length === 0 && (
            <SelectGroup className="p-2">
              <span className="text-muted-foreground text-sm">
                No items available
              </span>
            </SelectGroup>
          )}
          <ScrollArea maxHeight={300}>
            <SelectGroup>{items.map((item) => renderItem(item))}</SelectGroup>
          </ScrollArea>
          {renderFooter && <SelectGroup>{renderFooter()}</SelectGroup>}
        </SelectContent>
      </Select>
      <InputError field={name} />
    </div>
  );
};

FormSelect.Item = SelectItem;
