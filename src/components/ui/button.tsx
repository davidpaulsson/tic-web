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
          'inline-flex items-center justify-center whitespace-nowrap rounded-full transition-colors',
          // Focus
          'focus-visible:ring-tic-blue ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none',
          // Disabled
          'disabled:opacity-50',
          // Size
          'h-12 px-6 py-4',
          {
            // Variants
            'bg-tic-blue hover:bg-tic-blue-light text-white': variant === 'default',
            'text-tic-blue bg-white hover:bg-black/5': variant === 'secondary',
            'text-tic-blue hover:text-tic-blue-light bg-transparent': variant === 'ghost',
          },
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
