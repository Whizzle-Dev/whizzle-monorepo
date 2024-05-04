import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground :hover:cursor-pointer hover:bg-primary/10',
        primary:
          'border-transparent bg-emerald-500 text-primary-foreground shadow hover:bg-emerald-600',
        warning:
          'border-transparent bg-amber-500 text-primary-foreground shadow hover:bg-amber-600',
        warning_mild:
          'border-transparent bg-amber-300 text-primary-foreground shadow hover:bg-amber-500',
        destructive_mild:
          'border-transparent bg-red-400 text-destructive-foreground shadow hover:bg-destructive/80',
      },
      size: {
        xl: 'px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: null,
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
