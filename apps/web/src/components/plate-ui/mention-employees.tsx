import React from 'react';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import { useEmployeeSelectOptions } from '@/domain/shared/useEmployeeSelectOptions';

type MentionEmployeesProps = {
  onMention?: (employeeId: number) => void;
};
export const MentionEmployees = ({ onMention }: MentionEmployeesProps) => {
  const options = useEmployeeSelectOptions();

  return (
    <MentionCombobox
      items={options.map((option) => ({
        key: option.value.toString(),
        value: option.label,
        text: option.label,
        avatarUrl: option.avatarUrl,
      }))}
      onMention={(mention) => {
        onMention?.(parseInt(mention.key));
      }}
    />
  );
};
