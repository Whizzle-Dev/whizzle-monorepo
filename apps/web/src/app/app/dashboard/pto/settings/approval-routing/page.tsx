'use client';

import { withAuth } from '@/domain/auth/withAuth';
import { ApprovalRoutingSettingsView } from '@/domain/pto/ApprovalRoutingSettingsView';

function ApprovalRoutingSettings() {
  return <ApprovalRoutingSettingsView />;
}

export default withAuth(ApprovalRoutingSettings);
