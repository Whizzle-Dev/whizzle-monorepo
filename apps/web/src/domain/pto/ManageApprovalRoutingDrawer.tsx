import * as z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { useEmployeeSelectOptions } from '@/domain/shared/useEmployeeSelectOptions';
import { useToast } from '@/components/ui/use-toast';
import {
  ApprovalRoutingFragment,
  GetApprovalRoutingsDocument,
  useCreateApprovalRoutingMutation,
  useUpdateApprovalRoutingMutation,
} from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraphQLError } from 'graphql/error';
import { Drawer } from '@/components/ui/Drawer';
import { Separator } from '@/components/ui/separator';
import { FormMultiSelect } from '@/components/ui/form/form-multi-select';
import { FormInput } from '@/components/ui/form/form-input';
import { ApprovalRoutingConfigTimeline } from '@/domain/pto/ApprovalRoutingConfigTimeline';

type ManageApprovalRoutingDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  approvalRouting: ApprovalRoutingFragment | null;
};
const schema = z.object({
  selectedEmployees: z.array(z.number()),
  config: z.array(
    z.object({
      employees: z.array(z.object({ selected: z.string() })),
    }),
  ),
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
});
type FormValues = z.infer<typeof schema>;

export const ManageApprovalRoutingDrawer = ({
  open,
  onOpenChange,
  approvalRouting,
}: ManageApprovalRoutingDrawerProps) => {
  const { toast } = useToast();
  const selectEmployeeOptions = useEmployeeSelectOptions();

  const [updateRouting, { loading: updating }] =
    useUpdateApprovalRoutingMutation({
      refetchQueries: [GetApprovalRoutingsDocument],
    });
  const [createRouting, { loading: creating }] =
    useCreateApprovalRoutingMutation({
      refetchQueries: [GetApprovalRoutingsDocument],
    });
  const loading = updating || creating;
  const methods = useForm<FormValues>({
    defaultValues: {
      selectedEmployees: [],
      config: [{ employees: [{ selected: '' }] }],
      name: '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (approvalRouting) {
      methods.setValue('name', approvalRouting.name);
      methods.setValue(
        'selectedEmployees',
        approvalRouting.assignedEmployees.map((e) => e.id),
      );
      methods.setValue(
        'config',
        approvalRouting.approvingLevels.map((level) => ({
          employees: level.approvers.map((e) => ({
            selected: e.id.toString(),
          })),
        })),
      );
    }
  }, [approvalRouting]);

  const handleSubmit = (formValues: FormValues) => {
    if (approvalRouting) {
      updateRouting({
        variables: {
          input: {
            id: approvalRouting.id,
            routing: formValues.config.map((config) => {
              return {
                approvers: config.employees.map((e) => ({
                  approverId: Number(e.selected),
                })),
              };
            }),
            assignedEmployees: formValues.selectedEmployees.map(Number),
            name: formValues.name,
          },
        },
      })
        .then(() => {
          toast({
            variant: 'default',
            title: 'Successfully updated approval routing',
            description:
              'Your employees will now be able to submit the PTO requests',
          });
          onOpenChange(false);
          methods.reset();
        })
        .catch((e: GraphQLError) => {
          toast({
            variant: 'destructive',
            title: 'Failed to update approval routing',
            description: e.message,
          });
        });
    } else {
      createRouting({
        variables: {
          input: {
            routing: formValues.config.map((config) => {
              return {
                approvers: config.employees.map((e) => ({
                  approverId: Number(e.selected),
                })),
              };
            }),
            assignedEmployees: formValues.selectedEmployees.map(Number),
            name: formValues.name,
          },
        },
      })
        .then(() => {
          toast({
            variant: 'default',
            title: 'Successfully created approval routing',
            description:
              'Your employees will now be able to submit the PTO requests',
          });
          onOpenChange(false);
          methods.reset();
        })
        .catch((e: GraphQLError) => {
          toast({
            variant: 'destructive',
            title: 'Failed to create approval routing',
            description: e.message,
          });
        });
    }
  };

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value);
    methods.reset();
  };
  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <Drawer.Trigger asChild>
        <Button>Create</Button>
      </Drawer.Trigger>
      <Drawer.Content onPointerDownOutside={(e) => e.preventDefault()}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-1 flex-col"
        >
          <Drawer.Header>
            <Drawer.Title>
              {approvalRouting
                ? 'Update Approval Routing'
                : 'Create Approval Routing'}
            </Drawer.Title>
            <Drawer.Description>
              {!approvalRouting &&
                'Create rules for approving employee PTO requests. Assign employees to different levels of approval. Approval request will be routed to the next level of approval.'}
            </Drawer.Description>
          </Drawer.Header>
          <FormProvider {...methods}>
            <Drawer.Body>
              <div className="flex flex-col">
                <ApprovalRoutingConfigTimeline />
                <Separator className="my-6" />
                <FormInput field="name" label="Routing Name" />
                <span className="mt-6 font-medium">
                  Assign Routing to Employees
                </span>
                <span className="mb-4 text-gray-500 text-sm">
                  Define to which employees this routing will be applied
                </span>
                <FormMultiSelect
                  searchPlaceholder="Select employees..."
                  field="selectedEmployees"
                  items={selectEmployeeOptions}
                />
              </div>
            </Drawer.Body>
          </FormProvider>
          <Drawer.Footer>
            <Button loading={loading}>
              {approvalRouting ? 'Update' : 'Create'}
            </Button>
          </Drawer.Footer>
        </form>
      </Drawer.Content>
    </Drawer>
  );
};
