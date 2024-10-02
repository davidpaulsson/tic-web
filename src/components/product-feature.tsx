import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import type { ContentfulBlockProductFeature, ContentfulExternalPage, ContentfulPage } from '@/lib/contentful/types';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

export const ProductFeature = (props: ContentfulBlockProductFeature['fields'] & { align: 'left' | 'right' }) => (
  <section className="container">
    <div className="grid-cols-12 overflow-hidden rounded-2xl border border-tic-300 bg-tic-100 md:grid">
      <div className="bg-tic-purple-light col-span-7 hidden md:block" />
      <div
        className={cn('col-span-5 p-8 md:p-16', {
          'order-[-1]': props.align === 'left',
        })}
      >
        {props.label && <div className="text-tic-500er mb-4">{props.label}</div>}

        <div>
          <h2 className="mb-2 text-balance text-2xl md:text-3xl">{props.title}</h2>
          <p className={cn('text-pretty text-lg text-tic-500', { 'mb-10': !!props.cta })}>{props.description}</p>

          {props.cta && (
            <Button asChild>
              {props.cta.fields.link.sys.contentType.sys.id === 'externalPage' ? (
                <a href={(props.cta.fields.link as ContentfulExternalPage).fields.url} className="flex items-center gap-2">
                  {props.cta.fields.label} <ChevronRight />
                </a>
              ) : (
                <Link href={(props.cta.fields.link as ContentfulPage).fields.slug}>{props.cta.fields.label}</Link>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  </section>
);
