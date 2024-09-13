import React from 'react';

export const Hero = ({ children }: { children: React.ReactNode }) => {
  return <div className="container">{children}</div>;
};

export const HeroTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="mb-6 text-pretty text-5xl sm:text-6xl md:text-7xl lg:text-8xl">{children}</h1>
);

export const HeroSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-tic-light text-pretty text-lg sm:max-w-[62ch] md:text-xl">{children}</p>
);
