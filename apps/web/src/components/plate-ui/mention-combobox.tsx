import React from 'react';
import { ComboboxProps } from '@udecode/plate-combobox';
import { getPluginOptions, useEditorRef } from '@udecode/plate-common';
import {
  ELEMENT_MENTION,
  getMentionOnSelectItem,
  MentionPlugin,
} from '@udecode/plate-mention';
import { Combobox } from './combobox';

type MentionComboboxProps = {
  onMention: (item: any) => void;
  pluginKey?: string;
} & Partial<ComboboxProps>;

export function MentionCombobox({
  pluginKey = ELEMENT_MENTION,
  id = pluginKey,
  onMention,
  ...props
}: MentionComboboxProps) {
  const editor = useEditorRef();

  const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey);

  const handler = getMentionOnSelectItem({
    key: pluginKey,
  });
  return (
    <div>
      <Combobox
        id={id}
        trigger={trigger || '@'}
        controlled
        onSelectItem={(editor, item) => {
          onMention?.(item);
          return handler(editor, item);
        }}
        {...props}
      />
    </div>
  );
}
