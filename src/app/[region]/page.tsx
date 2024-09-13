import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { REGIONS } from '@/lib/constants';
import { getContentfulClient } from '@/lib/contentful/get-client';
import { ContentfulBlockHero, ContentfulPageResponse } from '@/lib/contentful/types';

import { Hero, HeroSubtitle, HeroTitle } from '@/components/hero';

export function generateStaticParams() {
  return REGIONS.map((page) => ({
    slug: [page],
  }));
}

export default async function Page({ params }: Readonly<{ params: { region: string } }>) {
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
    <main className="mt-40">
      {content.blocks.map((block) => {
        switch (block.sys.contentType.sys.id) {
          case 'blockHero':
            const hero = block.fields as ContentfulBlockHero['fields'];
            return (
              <Hero key={block.sys.id}>
                <HeroTitle>{hero.title}</HeroTitle>
                <HeroSubtitle>{hero.subtitle}</HeroSubtitle>
              </Hero>
            );
          default:
            return null;
        }
      })}
    </main>
  );
}

const metadata = {
  title: 'The Intelligence Company',
  description: 'The Intelligence Company AB (publ) 559487-1682',
  openGraph: {
    images: [
      {
        url: 'https://www.tic.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Intelligence Company',
      },
    ],
  },
};

export { metadata };
