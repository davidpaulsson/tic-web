import React from 'react';

import { cn } from '@/lib/utils';

export const Hero = ({ children }: { children: React.ReactNode }) => {
  return <div className="container">{children}</div>;
};

export const HeroTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="mb-6 text-pretty text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl">{children}</h1>
);

export const HeroSubtitle = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <p className={cn('text-pretty text-lg text-tic-light sm:max-w-[62ch] md:text-xl', className)}>{children}</p>
);
