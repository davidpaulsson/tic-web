'use client';

import React, { forwardRef, useRef } from 'react';

import { cn } from '@/lib/utils';

import { AnimatedBeam } from '@/components/ui/animated-beam';

import { Logo } from './logo';

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'z-10 flex items-center justify-center rounded-lg border border-tic-stroke bg-white p-6 text-sm text-tic-lighter',
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = 'Circle';

export const Sources = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="container relative flex w-full items-center justify-center" ref={containerRef}>
      <div className="flex size-full flex-col items-stretch justify-between gap-10 px-16">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>Skatteverket</Circle>
          <Circle ref={div5Ref}>Bolagsverket</Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>Arbetsförmedlingen</Circle>
          <Circle ref={div4Ref} className="size-32 rounded-full border-2">
            <Logo className="h-auto w-24 text-tic" />
          </Circle>
          <Circle ref={div6Ref}>Länsstyrelsen</Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>Statistiska centralbyrån</Circle>
          <Circle ref={div7Ref}>Google/Bing</Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div4Ref} curvature={-75} endYOffset={-10} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div4Ref} curvature={75} endYOffset={10} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div4Ref} curvature={-75} endYOffset={-10} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div7Ref} toRef={div4Ref} curvature={75} endYOffset={10} reverse />
    </div>
  );
};
