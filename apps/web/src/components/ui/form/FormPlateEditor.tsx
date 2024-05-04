'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { PlateEditor } from '@/domain/documents/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { TasksDescriptionToolbarButtons } from '@/components/plate-ui/toolbar-buttons';
import { Editor } from '@/components/plate-ui/editor';
import React from 'react';
import { MentionEmployees } from '@/components/plate-ui/mention-employees';

export const FormPlateEditor = ({ field: name }: FormikPlateEditorProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value;
        console.log({ value });
        return (
          <div className="flex flex-col">
            <PlateEditor
              content={
                typeof value === 'object'
                  ? value
                  : [
                      {
                        id: '1',
                        type: 'p',
                        children: [{ text: '' }],
                      },
                    ]
              }
              onChange={field.onChange}
            >
              <FixedToolbar className="border-1 border-b-0 border-collapse z-[9999]">
                <TasksDescriptionToolbarButtons />
              </FixedToolbar>
              <Editor
                placeholder="Description..."
                variant="taskInput"
                size="sm"
                className="min-h-[400px]"
              />
              <MentionEmployees />
            </PlateEditor>
          </div>
        );
      }}
    />
  );
};

type FormikPlateEditorProps = {
  field: string;
};

export const tryParse = (value: string | null | undefined) => {
  try {
    if (!value) return [{ type: 'p', children: [{ text: '' }], id: '1' }];
    return JSON.parse(value);
  } catch (e) {
    return [{ type: 'p', children: [{ text: '' }], id: '1' }];
  }
};
