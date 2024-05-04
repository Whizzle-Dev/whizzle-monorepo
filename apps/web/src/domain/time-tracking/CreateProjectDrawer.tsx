import * as z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { GetProjectsDocument, useCreateProjectMutation } from '@/generated';
import { Drawer } from '@/components/ui/Drawer';
import { FormInput } from '@/components/ui/form/form-input';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FormColorPicker } from '@/components/ui/form/FormColorPicker';
import { FormTextArea } from '@/components/ui/form/form-textarea';

type CreateProjectDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const projectSchema = z.object({
  name: z.string().min(3, 'Required').max(255),
  color: z.string().min(3, 'Required').max(255).default('#000000'),
  description: z.string().max(255, 'Max 255 characters').optional(),
});
type ProjectFormValues = z.infer<typeof projectSchema>;
export const CreateProjectDrawer = ({
  open,
  onOpenChange,
}: CreateProjectDrawerProps) => {
  const methods = useForm<ProjectFormValues>({
    // @ts-expect-error todo: fix this
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      color: '#000000',
      description: '',
    },
  });
  const { toast } = useToast();
  const [create, { loading }] = useCreateProjectMutation({
    refetchQueries: [GetProjectsDocument],
    awaitRefetchQueries: true,
  });
  const handleSubmit = (data: ProjectFormValues) => {
    create({
      variables: {
        name: data.name,
        color: data.color,
        description: data.description,
      },
    })
      .then(() => {
        toast({
          title: 'Project Created',
          description: 'Project has been created',
          variant: 'default',
        });
        onOpenChange(false);
      })
      .catch((e) => {
        toast({
          title: 'Failed to create project',
          description: e.message,
          variant: 'destructive',
        });
      });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <Drawer.Content onPointerDownOutside={(e) => e.preventDefault()}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-1 flex-col"
        >
          <Drawer.Header>
            <Drawer.Title>Create a Project</Drawer.Title>
            <Drawer.Description>
              Projects are used to organize your work and track time spent on
              specific tasks.
            </Drawer.Description>
          </Drawer.Header>
          <FormProvider {...methods}>
            <Drawer.Body>
              <div className="grid gap-4">
                <FormInput field="name" label="Project Name" />
                <FormColorPicker field="color" label="Select Color" />
                <FormTextArea
                  field="description"
                  label="Project Description (Optional)"
                />
              </div>
            </Drawer.Body>
          </FormProvider>
          <Drawer.Footer>
            <Button loading={loading}>Create</Button>
          </Drawer.Footer>
        </form>
      </Drawer.Content>
    </Drawer>
  );
};
