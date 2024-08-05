import React from 'react';

import { cn } from '@/lib/utils';

export const Hero = ({ children }: { children: React.ReactNode }) => {
  return <div className="container pb-32 pt-20">{children}</div>;
};

export const HeroTitle = ({ children, isDark }: { children: React.ReactNode; isDark: boolean }) => (
  <h1
    className={cn('mb-6 text-balance text-4xl sm:text-5xl md:max-w-[14ch] md:text-6xl lg:text-7xl', {
      'text-tic-blue': !isDark,
      'text-white': isDark,
    })}
  >
    {children}
  </h1>
);

export const HeroSubtitle = ({ children, isDark }: { children: React.ReactNode; isDark: boolean }) => (
  <p
    className={cn('mb-10 text-pretty text-lg sm:max-w-[40ch] md:text-xl', {
      'text-tic-blue-light': !isDark,
      'text-[#DCCFED]': isDark,
    })}
  >
    {children}
  </p>
);
