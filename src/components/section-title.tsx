import { cn } from '@/lib/utils';

export const SecionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn('mb-14 text-balance text-2xl sm:text-3xl md:max-w-2xl md:text-4xl lg:text-5xl', className)}>{children}</h2>
);
