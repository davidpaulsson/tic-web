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
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tic-light focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-tic text-white hover:bg-tic-light': variant === 'default',
            // TODO
            'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90':
              variant === 'destructive',
            // DONE
            'border border-tic-stroke bg-white hover:bg-tic-fill': variant === 'outline',
            // TODO
            'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80':
              variant === 'secondary',
            // TODO
            'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50': variant === 'ghost',
            // TODO
            'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50': variant === 'link',
            'h-10 px-6 py-4': size === 'default',
            // TODO
            'h-9 rounded-lg px-3': size === 'sm',
            // TODO
            'h-11 rounded-lg px-8': size === 'lg',
            // TODO
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
