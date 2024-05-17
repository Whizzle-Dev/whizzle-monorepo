import { useFormContext, useWatch } from 'react-hook-form';
import React, { useState } from 'react';
import { useGetTasksQuery } from '@/generated';
import { FormSelect } from '@/components/ui/form/form-select';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/ui/icons';
import { ManageTaskDrawer } from '@/domain/project-management/ManageTaskDrawer';

type TaskSelectProps = {
  label?: string;
  onChange?: (value: string) => void;
};
export const TaskSelect = ({ label = '', onChange }: TaskSelectProps) => {
  const { control } = useFormContext();
  const projectId = useWatch({
    control,
    name: 'projectId',
  });

  const { data } = useGetTasksQuery({
    variables: {
      projectId: (projectId ? Number(projectId) : null) as number,
    },
    skip: !projectId,
  });

  const items = data?.tasks.map((task) => ({
    value: task.id,
    label: task.name,
  }));

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!projectId) {
    return null;
  }
  return (
    <>
      <FormSelect
        open={open}
        onOpenChange={setOpen}
        placeholder="Select Task"
        field="taskId"
        onChange={onChange}
        label={label}
        items={items || []}
        renderItem={(item) => (
          <FormSelect.Item
            key={item.value.toString() + 'task'}
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
                  setOpen(false);
                  setDrawerOpen(true);
                }}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">
                    Don&apos;t see your task?
                  </span>
                  <div className="flex flex-row gap-2 items-center">
                    <span>Create a New Task</span>
                  </div>
                </div>
                <Icons.ArrowRightCircle size={16} />
              </div>
            </>
          );
        }}
      />
      <ManageTaskDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        projectId={projectId}
      />
    </>
  );
};
