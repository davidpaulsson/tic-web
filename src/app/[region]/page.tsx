import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { REGIONS } from '@/lib/constants';
import { getContentfulClient } from '@/lib/contentful/get-client';
import {
  ContentfulBlockHero,
  ContentfulBlockProductFeature,
  ContentfulComponentStatic,
  ContentfulPageResponse,
} from '@/lib/contentful/types';
import { cn } from '@/lib/utils';

import { GetStartedForFree } from '@/components/get-started-for-free';
import { Hero, HeroSubtitle, HeroTitle } from '@/components/hero';
import { PlanSelection } from '@/components/plan-selection';
import { PricingTable } from '@/components/pricing-table';
import { ProductFeature } from '@/components/product-feature';
import { Sources } from '@/components/sources';
import { DotPattern } from '@/components/ui/dot-pattern';

export function generateStaticParams() {
  return REGIONS.map((page) => ({
    slug: [page],
  }));
}

export async function generateMetadata({ params }: Readonly<{ params: { region: (typeof REGIONS)[number] } }>) {
  const { isEnabled } = draftMode();
  const cf = getContentfulClient(isEnabled);
  const entry = (await cf.getEntries({
    content_type: 'page',
    'fields.slug': params.region,
    limit: 1,
    include: 10,
    locale: params.region,
  })) as unknown as ContentfulPageResponse;

  if (!entry.items.length) {
    notFound();
  }

  const content = entry.items[0].fields;

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${content.title}`,
          width: 1200,
          height: 630,
          alt: content.description,
        },
      ],
    },
  };
}

export default async function Page({ params }: Readonly<{ params: { region: (typeof REGIONS)[number] } }>) {
  const { isEnabled } = draftMode();
  const cf = getContentfulClient(isEnabled);
  const entry = (await cf.getEntries({
    content_type: 'page',
    'fields.slug': params.region,
    limit: 1,
    include: 10,
    locale: params.region,
  })) as unknown as ContentfulPageResponse;

  if (!entry.items.length) {
    notFound();
  }

  const content = entry.items[0].fields;

  return (
    <main className="mt-16 space-y-16 md:mt-40 md:space-y-40">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn('z-0 [mask-image:linear-gradient(to_bottom,white,transparent,transparent)]')}
      />

      {content.blocks.map((block) => {
        switch (block.sys.contentType.sys.id) {
          case 'blockHero':
            const hero = block.fields as ContentfulBlockHero['fields'];
            return (
              <Hero key={block.sys.id}>
                <HeroTitle>{hero.title}</HeroTitle>
                <HeroSubtitle
                  className={cn({
                    'mb-10': hero.cta?.length > 0,
                  })}
                >
                  {hero.subtitle}
                </HeroSubtitle>

                {hero.cta?.map((cta) => {
                  switch (cta.sys.contentType.sys.id) {
                    case 'componentStatic': {
                      const { component } = cta.fields as ContentfulComponentStatic['fields'];
                      switch (component) {
                        case '"Get started for free" form':
                          return <GetStartedForFree key={cta.sys.id} region={params.region} />;
                        default:
                          return null;
                      }
                    }
                    default:
                      return null;
                  }
                })}
              </Hero>
            );
          case 'blockProductFeature': {
            const feature = block.fields as ContentfulBlockProductFeature['fields'];
            const index = content.blocks.findIndex((b) => b.sys.id === block.sys.id);
            const align = index % 2 === 0 ? 'left' : 'right';
            return <ProductFeature key={block.sys.id} align={align} {...feature} />;
          }
          default:
            return null;
        }
      })}

      <Sources />

      <PlanSelection />
      <PricingTable />
    </main>
  );
}
