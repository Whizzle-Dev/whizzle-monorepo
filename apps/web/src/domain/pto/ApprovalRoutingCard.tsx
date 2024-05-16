import {
  ApprovalRoutingFragment,
  GetApprovalRoutingsDocument,
  useDeleteApprovalRoutingMutation,
} from '@/generated';
import { Card } from '@/components/ui/card';
import { IconMenu } from '@/components/ui/menues/icon-menu';
import { Icons } from '@/components/ui/icons';
import { DropdownMenuShortcut } from '@/components/ui/menues/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { EmployeeAvatar } from '@/components/ui/avatar';
import React from 'react';

type ApprovalRoutingCardProps = {
  routing: ApprovalRoutingFragment;
  onEdit: (routing: ApprovalRoutingFragment) => void;
};
export const ApprovalRoutingCard = ({
  routing,
  onEdit,
}: ApprovalRoutingCardProps) => {
  const [deleteMutation] = useDeleteApprovalRoutingMutation({
    refetchQueries: [GetApprovalRoutingsDocument],
  });
  return (
    <Card className="p-4" key={routing.id}>
      <div className="flex flex-row items-center justify-between">
        <span className="font-medium">{routing.name}</span>
        <IconMenu
          icon={<Icons.MoreHorizontal size={18} />}
          items={[
            {
              label: 'Edit',
              onClick: () => {
                onEdit(routing);
              },
            },
            {
              label: 'Delete',
              onClick: () => {
                deleteMutation({ variables: { id: routing.id } });
              },
              icon: <DropdownMenuShortcut>⌫</DropdownMenuShortcut>,
              className: 'text-red-500',
            },
          ]}
        />
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="mt-2">
        <div className="flex flex-row items-center gap-2 text-sm text-gray-500">
          Assigned Employees:
          {routing.assignedEmployees.map((employee) => (
            <EmployeeAvatar
              key={`avatar-${employee.id}-${routing.id}`}
              name={employee.name}
              src={employee.profilePhotoUrl}
            />
          ))}
        </div>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <span className="text-sm text-gray-500">Approval Flow:</span>
      <div className="flex flex-col mt-2">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {routing.approvingLevels.map((l, index) => (
            <li className="mb-2 ms-4 flex flex-col gap-4" key={index}>
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mt-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Level {index + 1}
              </time>

              {l.approvers.map((approver) => (
                <div
                  className="flex flex-row items-center gap-4"
                  key={'approver-level' + index + '-' + approver.id}
                >
                  <EmployeeAvatar
                    name={approver.name}
                    src={approver.profilePhotoUrl}
                  />
                  <span className="text-sm text-gray-600">{approver.name}</span>
                </div>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
};
