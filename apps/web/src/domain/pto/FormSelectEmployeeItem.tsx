import { FormSelect } from '@/components/ui/form/form-select';
import React from 'react';

import { EmployeeAvatar } from '@/components/ui/avatar';

type FormSelectEmployeeItemProps = {
  value: string;
  url: string;
  label: string;
};
export const FormSelectEmployeeItem = ({
  value,
  url,
  label,
}: FormSelectEmployeeItemProps) => {
  return (
    <FormSelect.Item value={value}>
      <div className="flex gap-2 items-center">
        <EmployeeAvatar src={url} name={label} size="small" />
        {label}
      </div>
    </FormSelect.Item>
  );
};
