import React from 'react';

export const Hero = ({ children }: { children: React.ReactNode }) => {
  return <div className="container pb-32 pt-20">{children}</div>;
};

export const HeroTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="mb-6 text-balance text-4xl text-white sm:text-5xl md:max-w-[14ch] md:text-6xl lg:text-7xl">{children}</h1>
);

export const HeroSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-10 text-pretty text-lg text-[#DCCFED] sm:max-w-[40ch] md:text-xl">{children}</p>
);
