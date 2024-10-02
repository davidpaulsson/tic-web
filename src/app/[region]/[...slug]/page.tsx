import { Locale, i18n } from '@/i18n-config';

import { notFound } from 'next/navigation';

import { getContentfulClient } from '@/lib/contentful/get-client';
import type { ContentfulPageResponse } from '@/lib/contentful/types';

import { Blocks } from '@/components/blocks';
import { Logger } from '@/components/logger';

export async function generateStaticParams() {
  const cf = getContentfulClient();
  const resp = await Promise.all(
    i18n.locales.map(async (region) => {
      return cf.getEntries({
        content_type: 'page',
        limit: 1000,
        include: 0,
        locale: region,
      }) as unknown as ContentfulPageResponse;
    }),
  );

  const pages = resp.map((r) => r.items).flat();

  return pages.map((page) => ({
    slug: page.fields.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: Readonly<{ params: { region: Locale; slug: string[] } }>) {
  const cf = getContentfulClient();
  const entry = (await cf.getEntries({
    content_type: 'page',
    'fields.slug': [params.region, params.slug].flat().join('/'),
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
          url: `/api/og?title=${content.title}&description=${content.description}`,
          width: 1200,
          height: 630,
          alt: content.description,
        },
      ],
    },
  };
}

export default async function Page({ params }: Readonly<{ params: { region: Locale; slug: string[] } }>) {
  const cf = getContentfulClient();
  const entry = (await cf.getEntries({
    content_type: 'page',
    'fields.slug': [params.region, params.slug].flat().join('/'),
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
      <Logger content={content} />
      <Blocks region={params.region} blocks={content.blocks} />
    </main>
  );
}
