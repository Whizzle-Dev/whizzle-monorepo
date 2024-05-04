import {
  MultiSelect,
  MultiSelectOption,
  ValueType,
} from '@/components/ui/multi-select';
import { useController, useFormContext } from 'react-hook-form';
import { InputError } from '@/components/ui/form/input-error';

type FormMultiSelectProps<T extends ValueType> = {
  field: string;
  label?: string;
  searchPlaceholder?: string;
  items: MultiSelectOption<T>[];
};

export const FormMultiSelect = <T extends ValueType>({
  items,
  field: name,
  searchPlaceholder,
  label,
}: FormMultiSelectProps<T>) => {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name,
  });
  return (
    <div className="flex flex-col">
      {label && <label>{label}</label>}
      <MultiSelect
        options={items}
        onChange={field.onChange}
        value={field.value}
        searchPlaceholder={searchPlaceholder}
      />
      <InputError field={name} />
    </div>
  );
};
