import React from 'react';

import { cn } from '@/lib/utils';

export const Hero = ({ children }: { children: React.ReactNode }) => {
  return <div className="container">{children}</div>;
};

export const HeroTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="mb-6 max-w-[18ch] text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl">{children}</h1>
);

export const HeroSubtitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn('text-tic-muted text-pretty text-lg sm:max-w-[62ch] md:text-xl', className)}>{children}</p>
);
