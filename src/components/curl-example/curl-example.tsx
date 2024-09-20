'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';

import { cn } from '@/lib/utils';

import { HistoryIcon } from '@/components/icons/history';
import { IntelligenceIcon } from '@/components/icons/intelligence';
import { OverviewIcon } from '@/components/icons/overview';
import { SaleIcon } from '@/components/icons/sale';

import { MoreIcon } from '../icons/more';
import { json } from './json';

export function CurlExample() {
  const buttonAreaRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState<string>('intelligence');
  const { height = 0 } = useResizeObserver({
    ref: buttonAreaRef,
    box: 'border-box',
  });

  const scrollTo = (id: string) => {
    setActiveButton(id);
    const element = document.getElementById(id);
    if (element && scrollAreaRef.current) {
      const scrollAreaTop = scrollAreaRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const offset = elementTop - scrollAreaTop;
      const padding = -10;
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollTop + offset + padding,
        behavior: 'smooth',
      });
    }
  };

  const buttonList = [
    {
      id: 'intelligence',
      title: 'Intelligence Score',
      description: 'Vi betygssätter alla brister och fel i information vi hittar.',
      icon: <IntelligenceIcon />,
    },
    { id: 'economic', title: 'Ekonomisk översikt', description: 'Följ enkelt finansiell data om företaget.', icon: <OverviewIcon /> },
    {
      id: 'history',
      title: 'Ärendehistorik',
      description: 'Ladda hem årsredovisningar och följ ärendehistorik.',
      icon: <HistoryIcon />,
    },
    {
      id: 'sales',
      title: 'Offentlig försäljning',
      description: 'Se försäljning till offentliga aktörer, kommuner, myndigheter, mfl.',
      icon: <SaleIcon />,
    },
  ];

  return (
    <div className="container space-y-12">
      <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Det som kan ta timmar
        <br /> <span className="text-tic-lighter">löser TIC API på sekunder.</span>
      </h2>
      <div className="lg:grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-5">
        <div ref={buttonAreaRef} className="rounded-xl bg-slate-950 p-5 max-lg:mb-5 lg:col-span-1">
          <ul className="max-lg:grid max-lg:gap-5 max-md:grid-cols-1 lg:space-y-5">
            {buttonList.map(({ id, title, description, icon }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  aria-pressed={activeButton === id}
                  className={cn(
                    'flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-lg bg-slate-800 p-3 text-left transition-opacity',
                    {
                      'opacity-100': activeButton === id,
                      'opacity-50 hover:opacity-75': activeButton !== id,
                    },
                  )}
                >
                  <span className="flex w-full items-center justify-between text-pretty text-slate-50">
                    {title} {icon}
                  </span>
                  <motion.span
                    initial={false}
                    className="block text-pretty pr-6 text-sm text-slate-300"
                    animate={{
                      height: activeButton === id ? 'auto' : 0,
                      opacity: activeButton === id ? 1 : 0,
                    }}
                  >
                    {description}
                  </motion.span>
                </button>
              </li>
            ))}
            <li className="flex w-full items-center justify-between text-pretty px-3 text-slate-50 opacity-50">
              Och mycket mer <MoreIcon />
            </li>
          </ul>
        </div>
        <div
          ref={scrollAreaRef}
          id="response"
          className="h-96 overflow-hidden scroll-smooth rounded-xl bg-slate-950 p-5 font-mono text-sm lg:col-span-3 [&_span]:whitespace-pre-wrap"
          style={{ height }}
          dangerouslySetInnerHTML={{ __html: json }}
        ></div>
      </div>
    </div>
  );
}
