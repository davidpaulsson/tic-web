'use client';

import React, { forwardRef, useRef } from 'react';

import { cn } from '@/lib/utils';

import { AnimatedBeam } from '@/components/ui/animated-beam';

import { Logo } from '../logo';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ArbetsformedlingenLogo } from './logos/arbetsformedlingen-logo';
import { BolagsverketLogo } from './logos/bolagsverket-logo';
import { ForsakringskassanLogo } from './logos/forsakringskassan-logo';
import { GoogleLogo } from './logos/google-logo';
import { KronofogdenLogo } from './logos/kronofogden-logo';
import { PrvLogo } from './logos/prv-logo';
import { ScbLogo } from './logos/scb-logo';
import { SkatteverketLogo } from './logos/skatteverket-logo';

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(({ className, children }, ref) => {
  return (
    <div ref={ref} className={cn('z-10 flex size-16 items-center justify-center rounded-full border bg-white p-4 md:size-20', className)}>
      {children}
    </div>
  );
});

Circle.displayName = 'Circle';

export const Sources = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skatteverketRef = useRef<HTMLDivElement>(null);
  const arbetsformedlingenRef = useRef<HTMLDivElement>(null);
  const scbRef = useRef<HTMLDivElement>(null);
  const ticRef = useRef<HTMLDivElement>(null);
  const bolagsverketRef = useRef<HTMLDivElement>(null);
  const googleRef = useRef<HTMLDivElement>(null);
  const kronofogdenRef = useRef<HTMLDivElement>(null);
  const forsakringskassanRef = useRef<HTMLDivElement>(null);
  const prvRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container py-40">
      <h2 className="mb-2 text-balance text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Dokument och data från mängder med källor.
      </h2>
      <p className="mb-20 text-balance text-center text-base text-tic-lighter sm:text-lg md:text-xl lg:text-2xl">
        Avvikelser, brister och felaktigheter blir vad vi kallar &quot;Intelligence Score&quot;.
      </p>

      <div className="relative" ref={containerRef}>
        <div className="flex justify-evenly">
          <Circle ref={skatteverketRef}>
            <SkatteverketLogo />
          </Circle>
          <Circle ref={bolagsverketRef}>
            <BolagsverketLogo />
          </Circle>
          <Circle ref={arbetsformedlingenRef}>
            <ArbetsformedlingenLogo />
          </Circle>
          <Circle ref={scbRef}>
            <ScbLogo />
          </Circle>
        </div>

        <div className="my-16 flex justify-center md:my-20">
          <div ref={ticRef} className="z-10 flex items-center gap-8 rounded-lg border border-tic-stroke bg-white p-8 text-2xl shadow-lg">
            <Logo className="h-auto w-16 text-tic md:w-24" />
          </div>
        </div>

        <div className="flex justify-evenly">
          <Circle ref={googleRef}>
            <GoogleLogo />
          </Circle>
          <Circle ref={kronofogdenRef}>
            <KronofogdenLogo />
          </Circle>
          <Circle ref={forsakringskassanRef}>
            <ForsakringskassanLogo />
          </Circle>
          <Circle ref={prvRef}>
            <PrvLogo />
          </Circle>
        </div>

        <AnimatedBeam containerRef={containerRef} fromRef={skatteverketRef} curvature={-160} toRef={ticRef} />
        <AnimatedBeam containerRef={containerRef} fromRef={bolagsverketRef} curvature={-100} toRef={ticRef} />
        <AnimatedBeam containerRef={containerRef} fromRef={arbetsformedlingenRef} curvature={-100} toRef={ticRef} reverse />
        <AnimatedBeam containerRef={containerRef} fromRef={scbRef} toRef={ticRef} curvature={-160} reverse />
        <AnimatedBeam containerRef={containerRef} fromRef={googleRef} toRef={ticRef} curvature={160} />
        <AnimatedBeam containerRef={containerRef} fromRef={kronofogdenRef} toRef={ticRef} curvature={100} />
        <AnimatedBeam containerRef={containerRef} fromRef={forsakringskassanRef} toRef={ticRef} curvature={100} reverse />
        <AnimatedBeam containerRef={containerRef} fromRef={prvRef} toRef={ticRef} curvature={160} reverse />
      </div>
    </div>
  );
};
