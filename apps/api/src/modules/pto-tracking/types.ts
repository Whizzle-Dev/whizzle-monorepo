import * as z from 'zod';

export type ApprovalConfigJSON = {
  routing: { approvers: { approverId: number }[] }[];
  assignedEmployees: number[];
};
export const APPROVAL_ROUTING_JSON_SCHEMA = z.object({
  routing: z.array(
    z.object({
      approvers: z.array(z.object({ approverId: z.number() })),
    }),
  ),
  assignedEmployees: z.array(z.number()),
});
export type CreateLeaveCategoryArgs = {
  name: string;
  daysAllowed: number;
  companyId: number;
  policyId: number;
};
export type ApproveRejectPTORequestArgs = {
  requestId: number;
  accepted: boolean;
  approverId: number;
};