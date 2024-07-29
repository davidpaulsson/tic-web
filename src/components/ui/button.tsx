import { Slot } from '@radix-ui/react-slot';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-3xl transition-colors',
          // Focus
          'ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tic-blue focus-visible:ring-offset-2 disabled:pointer-events-none',
          // Disabled
          'disabled:opacity-50',
          // Size
          'h-10 px-6 py-3',
          {
            // Variants
            'bg-tic-blue text-white hover:bg-tic-blue-light': variant === 'default',
            'bg-white text-tic-blue hover:bg-slate-50': variant === 'secondary',
            'bg-transparent text-tic-blue hover:text-tic-blue-light': variant === 'ghost',
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
