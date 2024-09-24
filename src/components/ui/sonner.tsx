'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-tic-950 group-[.toaster]:border-tic-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-tic-950 dark:group-[.toaster]:text-tic-50 dark:group-[.toaster]:border-tic-800',
          description: 'group-[.toast]:text-tic-500 dark:group-[.toast]:text-tic-400',
          actionButton:
            'group-[.toast]:bg-tic-900 group-[.toast]:text-tic-50 dark:group-[.toast]:bg-tic-50 dark:group-[.toast]:text-tic-900',
          cancelButton:
            'group-[.toast]:bg-tic-100 group-[.toast]:text-tic-500 dark:group-[.toast]:bg-tic-800 dark:group-[.toast]:text-tic-400',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
