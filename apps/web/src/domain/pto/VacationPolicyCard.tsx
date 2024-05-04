import { Card } from '@/components/ui/card';

import { Icons } from '@/components/ui/icons';
import { IconMenu } from '@/components/ui/menues/icon-menu';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  GetVacationPoliciesDocument,
  LightEmployeeFragment,
  useArchiveVacationPolicyMutation,
  useSetVacationPolicyAsDefaultMutation,
} from '@/generated';
import { useNotifyError } from '@/lib/hooks/useNotifyError';
import React, { useState } from 'react';
import { AssignEmployeesToVacationPolicyDialog } from '@/domain/pto/AssignEmployeeToVacationPolicyDialog';

import { EmployeeAvatar } from '@/components/ui/avatar';

type VacationPolicyCardProps = {
  name: string;
  description: string;
  id: number;
  defaultPolicy: boolean;
  archived: boolean;
  employees: LightEmployeeFragment[];
};
export const VacationPolicyCard = ({
  name,
  description,
  id,
  defaultPolicy,
  archived,
  employees,
}: VacationPolicyCardProps) => {
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const router = useRouter();
  const [archive, { error: arhiveError }] = useArchiveVacationPolicyMutation({
    refetchQueries: [GetVacationPoliciesDocument],
  });

  const [setAsDefault, { error: setAsDefaultError }] =
    useSetVacationPolicyAsDefaultMutation({
      refetchQueries: [GetVacationPoliciesDocument],
    });

  const error = arhiveError || setAsDefaultError;
  useNotifyError(error);

  const items = [
    {
      label: 'Edit',
      onClick: () => {
        router.push(`/app/dashboard/pto/settings/policy?id=${id}`);
      },
      hidden: archived,
    },
    {
      label: 'Set as Default',
      onClick: () => {
        setAsDefault({ variables: { id } });
      },
      hidden: archived || defaultPolicy,
    },
    {
      label: 'Assign to Employees',
      onClick: () => {
        setAssignDialogOpen(true);
      },
      hidden: archived || defaultPolicy,
    },
    {
      label: 'Archive',
      onClick: () => {
        archive({ variables: { id } });
      },
      hidden: archived || defaultPolicy,
    },

    {
      label: 'Un-Archive',
      onClick: () => {
        archive({ variables: { id, value: false } });
      },
      hidden: !archived,
    },
  ].filter((item) => !item.hidden);

  return (
    <Card className="p-4  w-full">
      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex-1">
          <div className="text-xl mb-2">{name}</div>
          <div className="text-sm">{description}</div>
          {employees.length > 0 && (
            <div className="flex flex-row items-center mt-2">
              <span className="mr-2 text-sm text-gray-500 ">
                Assigned Employees:
              </span>
              <div className="flex flex-row items-center gap-2 flex-wrap">
                {employees.map((employee) => (
                  <EmployeeAvatar
                    src={employee.profilePhotoUrl ?? ''}
                    name={employee.name ?? ''}
                    size="small"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {defaultPolicy && <Badge variant="primary">Default</Badge>}
        {archived && (
          <Badge variant="secondary" className="text-gray-500">
            Archived
          </Badge>
        )}
        <IconMenu icon={<Icons.MoreHorizontal size={16} />} items={items} />
        {assignDialogOpen && (
          <AssignEmployeesToVacationPolicyDialog
            onOpenChange={setAssignDialogOpen}
            id={id}
            name={name}
            employeesAssigned={employees}
          />
        )}
      </div>
    </Card>
  );
};
