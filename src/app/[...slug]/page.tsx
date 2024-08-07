import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import { ChevronRight } from 'lucide-react';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getContentfulClient } from '@/lib/contentful/get-client';
import type {
  ContentfulBlockCarousel,
  ContentfulBlockContent,
  ContentfulBlockHero,
  ContentfulBlockProductFeature,
  ContentfulPageResponse,
} from '@/lib/contentful/types';
import { cn } from '@/lib/utils';

import { Carousel } from '@/components/carousel';
import { Header } from '@/components/header';
import { Hero, HeroSubtitle, HeroTitle } from '@/components/hero';
import { ProductFeature } from '@/components/product-feature';
import { Button } from '@/components/ui/button';

import HeroBackground from './hero-background.jpg';

export async function generateStaticParams() {
  const cf = getContentfulClient();

  const [swedish, english] = await Promise.all([
    cf.getEntries({
      content_type: 'page',
      limit: 1000,
      include: 0,
      locale: 'sv',
    }) as unknown as ContentfulPageResponse,
    cf.getEntries({
      content_type: 'page',
      limit: 1000,
      include: 0,
      locale: 'en',
    }) as unknown as ContentfulPageResponse,
  ]);

  const pages = [...swedish.items, ...english.items];

  return pages.map((page) => ({
    slug: page.fields.slug.split('/'),
  }));
}

export default async function Page({ params }: Readonly<{ params: { slug: string[] } }>) {
  const locale = params?.slug?.[0] || 'sv';
  const { isEnabled } = draftMode();
  const cf = getContentfulClient(isEnabled);
  const entry = (await cf.getEntries({
    content_type: 'page',
    'fields.slug': params.slug.join('/'),
    limit: 1,
    include: 10,
    locale,
  })) as unknown as ContentfulPageResponse;

  if (!entry.items.length) {
    notFound();
  }

  const content = entry.items[0].fields;
  const isHomepage = params.slug.length === 1;
  const firstBlockIsHero = (content.blocks || [])[0]?.sys?.contentType?.sys?.id === 'blockHero';

  return (
    <>
      <title>{`${content.title} | TIC`}</title>

      <div className="relative overflow-hidden py-6">
        {isHomepage && firstBlockIsHero && (
          <Image src={HeroBackground} alt="" fill={true} priority={true} placeholder="blur" quality={100} className="z-[-1] object-cover" />
        )}

        <Header theme={isHomepage && firstBlockIsHero ? 'light' : 'dark'} locale={params?.slug?.[0]} />

        {firstBlockIsHero &&
          [content.blocks[0]].map((block) => {
            switch (block.sys.contentType.sys.id) {
              case 'blockHero': {
                const hero = (block as ContentfulBlockHero).fields;
                return (
                  <Hero key={block.sys.id}>
                    <HeroTitle isDark={isHomepage}>{hero.title}</HeroTitle>
                    <HeroSubtitle isDark={isHomepage}>{hero.subtitle}</HeroSubtitle>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {hero.cta.map((link, index) => (
                        <Button key={link.sys.id} variant={index === 0 ? 'secondary' : 'ghost'} asChild>
                          <Link
                            href={link.fields.link.fields.slug}
                            className={cn('group flex gap-2', {
                              'text-white hover:text-white': index === 1,
                            })}
                          >
                            {link.fields.label}
                            <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </Hero>
                );
              }
              default:
                return null;
            }
          })}
      </div>

      {(content.blocks || []).map((block, index) => {
        switch (block.sys.contentType.sys.id) {
          case 'blockProductFeature': {
            const feature = (block as ContentfulBlockProductFeature).fields;
            const productFeatures = content.blocks.filter((block) => block.sys.contentType.sys.id === 'blockProductFeature');
            const index = productFeatures.indexOf(block);
            const align = index % 2 === 0 ? 'left' : 'right';
            return <ProductFeature key={block.sys.id} align={align} {...feature} />;
          }
          case 'blockHero': {
            if (firstBlockIsHero && index === 0) {
              return null;
            }

            const hero = (block as ContentfulBlockHero).fields;

            return (
              <Hero key={block.sys.id}>
                <HeroTitle isDark={false}>{hero.title}</HeroTitle>
                <HeroSubtitle isDark={false}>{hero.subtitle}</HeroSubtitle>
                <div className="flex flex-col gap-4 sm:flex-row">
                  {hero.cta.map((link, index) => (
                    <Button key={link.sys.id} variant={index === 0 ? 'default' : 'secondary'} asChild>
                      <Link href={link.fields.link.fields.slug} className={cn('group flex gap-2')}>
                        {link.fields.label}
                        <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </Hero>
            );
          }
          case 'blockCarousel': {
            return <Carousel key={block.sys.id} carousel={(block as ContentfulBlockCarousel).fields} locale={locale} />;
          }
          case 'blockContent': {
            // @ts-expect-error weak typing
            const content = block.fields.content;
            return (
              <div className="my-8">
                <div key={block.sys.id} className="container prose text-tic-blue">
                  {documentToReactComponents(content, {
                    renderNode: {
                      [INLINES.ENTRY_HYPERLINK]: (node) => {
                        const slug = node.data.target.fields.slug;
                        // @ts-expect-error weak typing
                        const target = node.content[0].value;

                        return (
                          <Link
                            key={node.data.target.sys.id}
                            href={`/${slug}`}
                            className="font-bold text-tic-blue-light underline transition-colors hover:text-tic-blue hover:no-underline"
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
          default:
            return null;
        }
      })}
    </>
  );
}
