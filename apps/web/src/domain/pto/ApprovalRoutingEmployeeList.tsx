import { useEmployeeSelectOptions } from '@/domain/shared/useEmployeeSelectOptions';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormSelect } from '@/components/ui/form/form-select';
import { FormSelectEmployeeItem } from '@/domain/pto/FormSelectEmployeeItem';
import { getAbbreviation } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import React from 'react';

type ApprovalRoutingEmployeeListProps = {
  index: number;
  onRemove: () => void;
};
export const ApprovalRoutingEmployeeList = ({
  index: parentIndex,
  onRemove,
}: ApprovalRoutingEmployeeListProps) => {
  const options = useEmployeeSelectOptions();
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    control: control,
    name: `config.${parentIndex}.employees`,
  });

  return (
    <div className="flex flex-col gap-4">
      {fields.map((e, index) => (
        <div className="flex flex-row gap-4 items-center" key={e.id}>
          <FormSelect
            field={`config.${parentIndex}.employees[${index}].selected`}
            label="Select Employee"
            items={options}
            renderItem={(item) => (
              <FormSelectEmployeeItem
                key={item.value}
                value={item.value.toString()}
                url={item.avatarUrl ?? ''}
                label={item.label}
              />
            )}
          />
          {(parentIndex !== 0 || (parentIndex === 0 && index > 0)) && (
            <Icons.XCircle
              size={20}
              type="button"
              className="mt-4 cursor-pointer"
              onClick={() => {
                remove(index);
                if (fields.length === 1) {
                  onRemove();
                }
              }}
            />
          )}
        </div>
      ))}
      <Button
        variant="secondary"
        type="button"
        className="w-fit"
        onClick={() => append({})}
      >
        +
      </Button>
    </div>
  );
};
