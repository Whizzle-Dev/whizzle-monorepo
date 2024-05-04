import { useFieldArray, useFormContext } from 'react-hook-form';
import { ApprovalRoutingEmployeeList } from '@/domain/pto/ApprovalRoutingEmployeeList';
import { Button } from '@/components/ui/button';
import React from 'react';

export const ApprovalRoutingConfigTimeline = ({}) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'config',
  });

  return (
    <>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {fields.map((step, index) => (
          <li className="mb-10 ms-4 flex flex-col gap-4" key={step.id}>
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mt-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Level {index + 1}
            </time>

            <ApprovalRoutingEmployeeList
              index={index}
              onRemove={() => remove(index)}
            />
          </li>
        ))}
      </ol>
      <Button
        variant="secondary"
        type="button"
        className="w-fit mt-6"
        onClick={() => append({ employees: [{}] })}
      >
        + Add Level
      </Button>
    </>
  );
};
