import { DeviationIcon } from '@/icons/deviation';
import { DocumentIcon } from '@/icons/document';
import { HistoryIcon } from '@/icons/history';
import { IntelligenceIcon } from '@/icons/intelligence';
import { MoreIcon } from '@/icons/more';
import { OverviewIcon } from '@/icons/overview';
import { SaleIcon } from '@/icons/sale';
import { SearchIcon } from '@/icons/search';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, INLINES } from '@contentful/rich-text-types';

import Link from 'next/link';

import { REGIONS } from '@/lib/constants';
import {
  ContentfulBlockCarousel,
  ContentfulBlockContent,
  ContentfulBlockHero,
  ContentfulBlockProductFeature,
  ContentfulBlockStatic,
  ContentfulComponentStatic,
  ContentfulPageResponse,
} from '@/lib/contentful/types';
import { cn } from '@/lib/utils';

import { AccountantForm } from '@/components/accountant-form';
import { CurlExample } from '@/components/curl-example';
import { GetStartedForFree } from '@/components/get-started-for-free';
import { Hero, HeroSubtitle, HeroTitle } from '@/components/hero';
import { PlanSelection } from '@/components/plan-selection';
import { PricingTable } from '@/components/pricing-table';
import { ProductFeature } from '@/components/product-feature';
import { SaferAndEasierBusiness } from '@/components/safer-and-easier-business';
import { SecionTitle } from '@/components/section-title';
import { Sources } from '@/components/sources';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  region: (typeof REGIONS)[number];
  blocks: ContentfulPageResponse['items'][number]['fields']['blocks'];
};

export const Blocks = ({ blocks, region }: Props) => {
  if (!blocks) {
    return null;
  }

  return blocks.map(async (block) => {
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
            return <PlanSelection key={block.sys.id} region={region} />;
          case 'Pricing table':
            return <PricingTable key={block.sys.id} region={region} />;
          case 'Safer and easier business':
            return <SaferAndEasierBusiness key={block.sys.id} region={region} />;
          case 'API example':
            return <CurlExample key={block.sys.id} />;
          case 'Accountant form':
            return <AccountantForm key={block.sys.id} />;
          default:
            return null;
        }
      // "blockCarousel" is "Block: Columns" in Contentful
      case 'blockCarousel': {
        const { cards, title } = block.fields as ContentfulBlockCarousel['fields'];
        return (
          <div key={block.sys.id} className="container">
            {title && <SecionTitle>{title}</SecionTitle>}
            <div
              className="grid gap-8 max-md:!grid-cols-1"
              style={{
                gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))`,
              }}
            >
              {cards.map((card) => {
                return (
                  <Card key={card.sys.id}>
                    <CardHeader>
                      {!!card.fields.icon &&
                        (() => {
                          switch (card.fields.icon) {
                            case 'check':
                              return <SearchIcon className="mb-8 h-11 w-11" />;
                            case 'deviation':
                              return <DeviationIcon className="mb-8 h-11 w-11" />;
                            case 'document':
                              return <DocumentIcon className="mb-8 h-11 w-11" />;
                            case 'history':
                              return <HistoryIcon className="mb-8 h-11 w-11" />;
                            case 'intelligence':
                              return <IntelligenceIcon className="mb-8 h-11 w-11" />;
                            case 'more':
                              return <MoreIcon className="mb-8 h-11 w-11" />;
                            case 'overview':
                              return <OverviewIcon className="mb-8 h-11 w-11" />;
                            case 'sale':
                              return <SaleIcon className="mb-8 h-11 w-11" />;
                            case 'search':
                              return <SearchIcon className="mb-8 h-11 w-11" />;
                            default:
                              return null;
                          }
                        })()}
                      <CardTitle>{card.fields.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-tic-light">{card.fields.description}</p>
                    </CardContent>
                    {card.fields.links && card.fields.links.length > 0 && (
                      <CardFooter>
                        <ul>
                          {card.fields.links
                            .filter((link) => link.fields?.slug !== undefined)
                            .map((link) => {
                              return (
                                <li key={link.fields.slug}>
                                  <Link href={link.fields.slug}>{link.fields?.title}</Link>
                                </li>
                              );
                            })}
                        </ul>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  });
};
