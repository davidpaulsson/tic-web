import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, INLINES } from '@contentful/rich-text-types';

import Link from 'next/link';
import { Suspense } from 'react';

import { REGIONS } from '@/lib/constants';
import {
  ContentfulBlockContent,
  ContentfulBlockHero,
  ContentfulBlockProductFeature,
  ContentfulBlockStatic,
  ContentfulComponentStatic,
  ContentfulPageResponse,
} from '@/lib/contentful/types';
import { cn } from '@/lib/utils';

import { GetStartedForFree } from '@/components/get-started-for-free';
import { Hero, HeroSubtitle, HeroTitle } from '@/components/hero';
import { ProductFeature } from '@/components/product-feature';

import { CurlExample } from './curl-example';
import { PlanSelection } from './plan-selection';
import { PricingTable } from './pricing-table';
import { SaferAndEasierBusiness } from './safer-and-easier-business';
import { Sources } from './sources';

type Props = {
  region: (typeof REGIONS)[number];
  blocks: ContentfulPageResponse['items'][number]['fields']['blocks'];
};

export const Blocks = ({ blocks, region }: Props) => {
  return blocks.map((block) => {
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
                      return <GetStartedForFree key={cta.sys.id} region={region} />;
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
        const index = blocks.findIndex((b) => b.sys.id === block.sys.id);
        const align = index % 2 === 0 ? 'left' : 'right';
        return <ProductFeature key={block.sys.id} align={align} {...feature} />;
      }
      case 'blockContent': {
        const { content } = block.fields as ContentfulBlockContent['fields'];

        return (
          <div key={block.sys.id} className="container my-8">
            <div key={block.sys.id} className="prose mx-auto max-w-prose prose-headings:text-pretty prose-headings:font-normal">
              {documentToReactComponents(content as unknown as Document, {
                renderNode: {
                  [INLINES.ENTRY_HYPERLINK]: (node) => {
                    const slug = node.data.target.fields.slug;
                    // @ts-expect-error weak typing
                    const target = node.content[0].value;

                    return (
                      <Link
                        key={node.data.target.sys.id}
                        href={`/${slug}`}
                        className="text-tic-purple underline transition-colors hover:text-tic-purple-light hover:no-underline"
                      >
                        {target}
                      </Link>
                    );
                  },
                },
              })}
            </div>
          </div>
        );
      }
      case 'blockStatic':
        const component = block.fields as ContentfulBlockStatic['fields'];
        switch (component.block) {
          case 'Data sources':
            return <Sources key={block.sys.id} />;
          case 'Plan selection':
            return <PlanSelection key={block.sys.id} />;
          case 'Pricing table':
            return <PricingTable key={block.sys.id} />;
          case 'Safer and easier business':
            return <SaferAndEasierBusiness key={block.sys.id} />;
          case 'API example':
            return <CurlExample key={block.sys.id} />;
          default:
            return null;
        }
      default:
        return null;
    }
  });
};
