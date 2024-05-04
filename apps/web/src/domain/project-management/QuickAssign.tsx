import { useFormContext, useWatch } from 'react-hook-form';
import { useGetCurrentUserQuery } from '@/generated';
import React from 'react';
import { TaskFormValues } from '@/domain/project-management/ManageTaskDrawer';

export const UnassignedEmployeeItem = {
  label: 'Unassigned',
  value: -1,
  avatarUrl: '/circle-user-round.svg' as string | null | undefined,
};
export const QuickAssign = () => {
  const { setValue } = useFormContext<TaskFormValues>();
  const assigned = useWatch({ name: 'assigned' });
  const currentUser = useGetCurrentUserQuery({
    fetchPolicy: 'cache-first',
  });
  return (
    <span
      className="text-sm text-gray-500 underline cursor-pointer"
      onClick={() => {
        if (
          currentUser.data?.currentEmployee.id.toString() &&
          assigned !== currentUser.data?.currentEmployee.id.toString()
        ) {
          setValue('assigned', currentUser.data.currentEmployee.id.toString());
        } else {
          setValue('assigned', '-1');
        }
      }}
    >
      {assigned === currentUser.data?.currentEmployee.id.toString()
        ? 'Un-Assign'
        : 'Assign to myself'}
    </span>
  );
};
