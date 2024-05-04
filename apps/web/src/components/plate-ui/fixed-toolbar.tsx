import { withCn } from '@udecode/cn';

import { Toolbar } from './toolbar';

export const FixedToolbar = withCn(
  Toolbar,
  'max-w-screen-lg  sticky left-0 top-0 z-50 w-full justify-between overflow-x-auto rounded-t-lg  bg-background/95 bg-white border-b border-border',
);
