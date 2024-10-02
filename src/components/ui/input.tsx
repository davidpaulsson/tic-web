import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'placeholder:text-tic-500er flex h-10 w-full rounded-lg border border-tic-300 bg-white px-3 py-2 ring-offset-white file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tic-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-md:text-base',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
