import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

type Props = {
  topIcon: React.ReactNode;
  topTitle: string;
  title: string;
  content: string;
  linkHref: string;
  linkLabel: string;
  align?: 'left' | 'right';
  className?: string;
};

export const FeatureSection = ({ topIcon, topTitle, title, content, linkHref, linkLabel, align = 'left', className }: Props) => (
  <section className={cn('py-32 text-tic-blue', className)}>
    <div className="container grid-cols-5 gap-4 md:grid">
      <div className="col-span-2 hidden md:block" />
      <div
        className={cn('col-span-3', {
          'order-[-1]': align === 'left',
        })}
      >
        <div className="mb-6 flex items-center gap-4">
          {topIcon}
          <div>
            <span className="text-tic-blue/40">TIC /</span> <span className="text-tic-blue">{topTitle}</span>
          </div>
        </div>
        <div className="space-y-10">
          <h2 className="text-pretty text-2xl sm:text-3xl md:max-w-[20ch] md:text-4xl lg:text-5xl">{title}</h2>
          <p className="text-pretty text-lg md:max-w-[50ch]">{content}</p>
          <Button asChild>
            <Link href={linkHref} className="group flex gap-2">
              {linkLabel} <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
