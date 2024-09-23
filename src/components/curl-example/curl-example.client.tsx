'use client';

import { HistoryIcon } from '@/icons/history';
import { IntelligenceIcon } from '@/icons/intelligence';
import { MoreIcon } from '@/icons/more';
import { OverviewIcon } from '@/icons/overview';
import { SaleIcon } from '@/icons/sale';

import { motion } from 'framer-motion';
import { use, useEffect, useRef, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';

import { cn } from '@/lib/utils';

import { SecionTitle } from '../section-title';

const buttonList = [
  {
    id: 'intelligence',
    title: 'Intelligence Score',
    description: 'Vi betygssätter alla brister och fel i information vi hittar.',
    icon: <IntelligenceIcon />,
  },
  {
    id: 'mostRecentFinancialSummary',
    title: 'Ekonomisk översikt',
    description: 'Följ enkelt finansiell data om företaget.',
    icon: <OverviewIcon />,
  },
  {
    id: 'documents',
    title: 'Ärendehistorik',
    description: 'Ladda hem årsredovisningar och följ ärendehistorik.',
    icon: <HistoryIcon />,
  },
  {
    id: 'salesToPublicActors',
    title: 'Offentlig försäljning',
    description: 'Se försäljning till offentliga aktörer, kommuner, myndigheter, mfl.',
    icon: <SaleIcon />,
  },
];

export function CurlExampleClient({ children }: { children: React.ReactNode }) {
  const buttonAreaRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState<string>();
  const { height = 0 } = useResizeObserver({
    ref: buttonAreaRef,
    box: 'border-box',
  });

  useEffect(() => {
    setTimeout(() => {
      setActiveButton(buttonList[0].id);
    }, 1000);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const elements = Array.from(scrollAreaRef.current.querySelectorAll('span'));
      const element = elements.find((el) => el.textContent?.includes(`"${activeButton}"`));
      if (!element) return;
      const scrollAreaTop = scrollAreaRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const offset = elementTop - scrollAreaTop;
      const padding = -10;
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollTop + offset + padding,
        behavior: 'smooth',
      });
    }
  }, [activeButton]);

  const scrollTo = (id: string) => {
    setActiveButton(id);
  };

  return (
    <div className="container">
      <SecionTitle>Det som kan ta timmar löser TIC API på sekunder.</SecionTitle>
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
                  {activeButton === id && (
                    <motion.div
                      className="h-0.5 translate-y-3 rounded-xl bg-slate-300/25"
                      initial={{ width: 0 }}
                      animate={{
                        width: activeButton === id ? '100%' : 0,
                      }}
                      transition={{ duration: 10, ease: 'linear' }}
                      onAnimationComplete={() => {
                        const currentIndex = buttonList.findIndex((button) => button.id === activeButton);
                        const nextIndex = (currentIndex + 1) % buttonList.length;
                        scrollTo(buttonList[nextIndex].id);
                      }}
                    />
                  )}
                </button>
              </li>
            ))}
            <li className="flex w-full items-center justify-between text-pretty px-3 text-slate-50 opacity-50">
              Och mycket mer <MoreIcon />
            </li>
          </ul>
        </div>

        {height > 0 ? (
          <div
            ref={scrollAreaRef}
            id="response"
            className="overflow-hidden scroll-smooth rounded-xl bg-slate-950 p-5 font-mono text-xs lg:col-span-3 [&_span]:whitespace-pre-wrap"
            style={{ height }}
          >
            {children}
          </div>
        ) : (
          <div className="rounded-xl bg-slate-950 lg:col-span-3" />
        )}
      </div>
    </div>
  );
}
