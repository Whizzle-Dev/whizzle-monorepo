import React, { useState } from 'react';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  ApprovalRoutingFragment,
  GetApprovalRoutingsDocument,
  useDeleteApprovalRoutingMutation,
  useGetApprovalRoutingsQuery,
} from '@/generated';
import { Card } from '@/components/ui/card';
import { ManageApprovalRoutingDrawer } from '@/domain/pto/ManageApprovalRoutingDrawer';
import { Separator } from '@/components/ui/separator';
import { IconMenu } from '@/components/ui/menues/icon-menu';
import { Icons } from '@/components/ui/icons';
import { DropdownMenuShortcut } from '@/components/ui/menues/dropdown-menu';

import { EmployeeAvatar } from '@/components/ui/avatar';

export const ApprovalRoutingSettingsView = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [edit, setEdit] = useState<ApprovalRoutingFragment | null>(null);
  const { data } = useGetApprovalRoutingsQuery();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <h3>Manage Approval Routing</h3>
          <InfoTooltip description="Approval routing defines flows for approving employee PTO requests." />
        </div>
        <ManageApprovalRoutingDrawer
          open={drawerOpen}
          onOpenChange={(value) => {
            setDrawerOpen(value);
            if (!value) {
              setEdit(null);
            }
          }}
          approvalRouting={edit}
        />
      </div>
      <div className="grid gap-2">
        {data?.approvalRoutings.map((routing) => {
          return (
            <ApprovalRoutingCard
              routing={routing}
              key={routing.id}
              onEdit={(routing) => {
                setEdit(routing);
                setDrawerOpen(true);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

type ApprovalRoutingCardProps = {
  routing: ApprovalRoutingFragment;
  onEdit: (routing: ApprovalRoutingFragment) => void;
};
const ApprovalRoutingCard = ({ routing, onEdit }: ApprovalRoutingCardProps) => {
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
