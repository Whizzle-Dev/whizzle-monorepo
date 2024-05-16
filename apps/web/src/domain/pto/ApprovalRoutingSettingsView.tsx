import React, { useState } from 'react';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  ApprovalRoutingFragment,
  useGetApprovalRoutingsQuery,
} from '@/generated';
import { ManageApprovalRoutingDrawer } from '@/domain/pto/ManageApprovalRoutingDrawer';
import { ApprovalRoutingCard } from '@/domain/pto/ApprovalRoutingCard';

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
