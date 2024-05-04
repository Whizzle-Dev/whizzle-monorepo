import { useGetProjectsQuery } from '@/generated';
import React, { useState } from 'react';
import { FormSelect } from '@/components/ui/form/form-select';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/ui/icons';
import { CreateProjectDrawer } from '@/domain/time-tracking/CreateProjectDrawer';
import { useFormContext } from 'react-hook-form';

type ProjectSelectProps = {
  label?: string;
};
export const ProjectSelect = ({ label = '' }: ProjectSelectProps) => {
  const { setValue } = useFormContext();
  const { data } = useGetProjectsQuery();
  const items = data?.projects.map((project) => ({
    value: project.id,
    label: project.name,
  }));

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <FormSelect
        open={open}
        onOpenChange={setOpen}
        placeholder="Select Project"
        field="projectId"
        label={label}
        items={items || []}
        onChange={() => {
          setValue('taskId', '');
        }}
        renderItem={(item) => (
          <FormSelect.Item
            key={item.value.toString() + 'project'}
            value={item.value.toString()}
          >
            {item.label}
          </FormSelect.Item>
        )}
        renderFooter={() => {
          return (
            <>
              <Separator />
              <div
                className="flex flex-row justify-between items-center p-2 text-sm w-[250px] cursor-pointer"
                onClick={() => {
                  setDrawerOpen(true);
                  setOpen(false);
                }}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">
                    Don&apos;t see your project?
                  </span>
                  <div className="flex flex-row gap-2 items-center">
                    <span>Create a New Project</span>
                  </div>
                </div>
                <Icons.ArrowRightCircle size={16} />
              </div>
            </>
          );
        }}
      />
      <CreateProjectDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};
