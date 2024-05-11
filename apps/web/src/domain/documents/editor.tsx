'use client';

import { withProps } from '@udecode/cn';
import {
  createPlugins,
  Plate,
  RenderAfterEditable,
  PlateLeaf,
  TElement,
} from '@udecode/plate-common';
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from '@udecode/plate-paragraph';
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from '@udecode/plate-block-quote';
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from '@udecode/plate-code-block';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import {
  createTodoListPlugin,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
} from '@udecode/plate-list';
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
  createCodePlugin,
  MARK_CODE,
} from '@udecode/plate-basic-marks';
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
} from '@udecode/plate-heading';
import {
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createFontSizePlugin,
} from '@udecode/plate-font';
import {
  createHighlightPlugin,
  MARK_HIGHLIGHT,
} from '@udecode/plate-highlight';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createLineHeightPlugin } from '@udecode/plate-line-height';
import { createComboboxPlugin } from '@udecode/plate-combobox';
import { createDndPlugin } from '@udecode/plate-dnd';
import {
  createCommentsPlugin,
  CommentsProvider,
  MARK_COMMENT,
} from '@udecode/plate-comments';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { TodoListElement } from '@/components/plate-ui/todo-list-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { CommentLeaf } from '@/components/plate-ui/comment-leaf';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';
import { withDraggables } from '@/components/plate-ui/with-draggables';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { MentionInputElement } from '@/components/plate-ui/mention-input-element';
import {
  createMentionPlugin,
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
} from '@udecode/plate-mention';
import { MentionElement } from '@/components/plate-ui/mention-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { BlockquoteElement } from '@/components/plate-ui/blockquote-element';
import { ListElement } from '@/components/plate-ui/list-element';
import { createIndentListPlugin } from '@udecode/plate-indent-list';
import { EmojiCombobox } from '@/components/plate-ui/emoji-combobox';

import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  AutoformatRule,
  autoformatSmartQuotes,
  createAutoformatPlugin,
} from '@udecode/plate-autoformat';

import { autoformatBlocks } from '@/lib/plate/autoformatBlocks';
import { autoformatIndentLists } from '@/lib/plate/autoformatIndentLists';
import { autoformatMarks } from '@/lib/plate/autoformatMarks';
import { createEmojiPlugin } from '@udecode/plate-emoji';

export const autoformatRules: AutoformatRule[] = [
  ...autoformatBlocks,
  ...autoformatIndentLists,
  ...autoformatMarks,
  ...autoformatSmartQuotes,
  ...autoformatPunctuation,
  ...autoformatLegal,
  ...autoformatLegalHtml,
  ...autoformatArrow,
  ...autoformatMath,
];

const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createTodoListPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            // ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createComboboxPlugin(),
    createDndPlugin({
      options: { enableScroller: true },
    }),
    createCommentsPlugin(),
    createMentionPlugin({
      enabled: true,
      options: {
        triggerPreviousCharPattern: /^$|^[\s"']$/,
        insertSpaceAfterMention: true,
      },
    }),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
          ],
        },
      },
    }),
    createAutoformatPlugin({
      options: {
        rules: autoformatRules,
        enableUndoOnDelete: true,
      },
    }),
    createEmojiPlugin({
      renderAfterEditable: EmojiCombobox as RenderAfterEditable,
    }),
  ],
  {
    components: withDraggables({
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_CODE_LINE]: CodeLineElement,
      [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_TODO_LI]: TodoListElement,
      [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
      [MARK_CODE]: CodeLeaf,
      [MARK_COMMENT]: CommentLeaf,
      [MARK_HIGHLIGHT]: HighlightLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
      [ELEMENT_MENTION_INPUT]: MentionInputElement,
      [ELEMENT_MENTION]: MentionElement,
      [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
      [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
      [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
      [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
    }),
  },
);

type PlateEditorProps = {
  onChange: (value: TElement[]) => void;
  content: TElement[];
  children: React.ReactNode;
};

export function PlateEditor({ onChange, content, children }: PlateEditorProps) {
  return (
    <TooltipProvider>
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider users={{}} myUserId="1">
          <Plate plugins={plugins} initialValue={content} onChange={onChange}>
            {children}
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </TooltipProvider>
  );
}
