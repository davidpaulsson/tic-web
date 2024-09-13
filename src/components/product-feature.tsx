import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import type { ContentfulBlockProductFeature } from '@/lib/contentful/types';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

export const ProductFeature = (props: ContentfulBlockProductFeature['fields'] & { align: 'left' | 'right' }) => (
  <section className="container">
    <div className="grid-cols-12 overflow-hidden rounded-lg border border-tic-stroke bg-tic-fill md:grid">
      <div className="col-span-7 hidden bg-tic-purple-light md:block" />
      <div
        className={cn('col-span-5 p-8 md:p-16', {
          'order-[-1]': props.align === 'left',
        })}
      >
        {props.label && <div className="mb-4 text-tic-lighter">{props.label}</div>}

        <div>
          <h2 className="mb-2 text-balance text-2xl md:text-3xl">{props.title}</h2>
          <p className={cn('text-pretty text-lg text-tic-light', { 'mb-10': !!props.cta })}>{props.description}</p>

          {props.cta && (
            <Button asChild>
              <Link href={props.cta.fields.link.fields.slug}>{props.cta.fields.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  </section>
);
