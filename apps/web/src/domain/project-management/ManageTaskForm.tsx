'use client';

import { useEmployeeSelectOptions } from '@/domain/shared/useEmployeeSelectOptions';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { FormInput } from '@/components/ui/form/form-input';
import { FormSelect } from '@/components/ui/form/form-select';
import { FormSelectEmployeeItem } from '@/domain/pto/FormSelectEmployeeItem';
import { FormPlateEditor } from '@/components/ui/form/FormPlateEditor';
import React from 'react';
import { TaskFormValues } from '@/domain/project-management/ManageTaskDrawer';
import {
  QuickAssign,
  UnassignedEmployeeItem,
} from '@/domain/project-management/QuickAssign';

type ManageTaskFormProps = {
  statusItems: { value: string; label: string }[];
  methods: UseFormReturn<TaskFormValues, any, any>;
};

export const ManageTaskForm = ({
  statusItems,
  methods,
}: ManageTaskFormProps) => {
  const options = useEmployeeSelectOptions();
  return (
    <FormProvider {...methods}>
      <div className="grid gap-4">
        <FormInput field="name" label="Title" />
        <div>
          <FormSelect
            field="assigned"
            label="Assignee"
            items={[UnassignedEmployeeItem].concat(options)}
            renderItem={(item) => (
              <FormSelectEmployeeItem
                key={item.value}
                value={item.value.toString()}
                url={item.avatarUrl ?? ''}
                label={item.label}
              />
            )}
          />
          <QuickAssign />
        </div>
        <FormSelect
          field="status"
          label="Status"
          items={statusItems}
          renderItem={(item) => (
            <FormSelect.Item
              key={item.value.toString()}
              value={item.value.toString()}
            >
              {item.label}
            </FormSelect.Item>
          )}
        />
        <FormPlateEditor field="description" />
      </div>
    </FormProvider>
  );
};
