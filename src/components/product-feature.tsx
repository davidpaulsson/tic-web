import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { ContentfulBlockProductFeature } from '@/lib/contentful/types';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

export const ProductFeature = (props: ContentfulBlockProductFeature['fields'] & { align: 'left' | 'right' }) => (
  <section
    className={cn('py-32 text-tic-blue', {
      'bg-gradient-to-b from-[#F3F2FF] to-[#CDE5F6]': props.align === 'right',
    })}
  >
    <div className="container grid-cols-5 gap-4 md:grid">
      <div className="col-span-2 hidden md:block" />
      <div
        className={cn('col-span-3', {
          'order-[-1]': props.align === 'left',
        })}
      >
        <div className="mb-6 flex items-center gap-4">
          {props.icon?.fields?.file?.url !== undefined && (
            <Image src={'https:' + props.icon.fields.file.url} alt="" width={40} height={40} quality={100} />
          )}
          <div>
            <span className="text-tic-blue/40">TIC /</span> <span className="text-tic-blue">{props.label}</span>
          </div>
        </div>
        <div className="space-y-10">
          <h2 className="text-pretty text-2xl sm:text-3xl md:max-w-[20ch] md:text-4xl lg:text-5xl">{props.title}</h2>
          <p className="text-pretty text-lg md:max-w-[50ch]">{props.description}</p>
          <Button asChild>
            <Link href={props.cta.fields.link.fields.slug} className="group flex gap-2">
              {props.cta.fields.label} <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
