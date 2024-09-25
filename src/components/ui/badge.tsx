import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-tic-200 px-2.5 py-0.5 text-sm tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-tic-950 focus:ring-offset-2 dark:border-tic-800 dark:focus:ring-tic-300',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-tic-900 text-tic-50 hover:bg-tic-900/80 dark:bg-tic-50 dark:text-tic-900 dark:hover:bg-tic-50/80',
        secondary:
          'border-transparent bg-tic-100 text-tic-900 hover:bg-tic-100/80 dark:bg-tic-800 dark:text-tic-50 dark:hover:bg-tic-800/80',
        destructive:
          'border-transparent bg-red-500 text-tic-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-tic-50 dark:hover:bg-red-900/80',
        outline: 'text-tic-950 dark:text-tic-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
