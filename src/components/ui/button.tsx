import { Slot } from '@radix-ui/react-slot';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'focus:ring-tic-900 inline-flex items-center justify-center whitespace-nowrap rounded-lg ring-offset-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tic-light focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-tic-900 text-tic-50 hover:bg-tic-700': variant === 'default',
            'text-tic-950 bg-red-500 hover:bg-red-500/90': variant === 'destructive',
            'text-tic-950 hover:bg-tic-100 bg-tic-50 border-tic-200 border': variant === 'outline',
            'bg-tic-50 text-tic-950 hover:bg-tic-300': variant === 'secondary',
            'bg-tic-50 hover:bg-tic-300 text-tic-950': variant === 'ghost',
            'text-tic-950 underline-offset-4 hover:underline': variant === 'link',
            'h-10 px-6 py-4': size === 'default',
            'h-9 rounded-lg px-3': size === 'sm',
            'h-11 rounded-lg px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
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

export { Button };
