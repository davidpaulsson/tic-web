import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-tic-100 dark:bg-tic-800 animate-pulse rounded-md', className)} {...props} />;
}

export { Skeleton };
