import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import { getContentfulClient } from '@/lib/contentful/get-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');

  if (!secret) {
    return new Response('Missing secret', { status: 401 });
  }

  if (!slug) {
    return new Response('Missing slug', { status: 401 });
  }

  if (!locale) {
    return new Response('Missing locale', { status: 401 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  const cf = getContentfulClient(true);
  const entry = await cf.getEntries({
    content_type: 'page',
    'fields.slug': slug,
    locale,
  });

  if (!entry.items.length) {
    return new Response('Invalid slug', { status: 401 });
  }

  const content = entry.items[0].fields;

  if (!content) {
    return new Response('Invalid slug', { status: 401 });
  }

  draftMode().enable();
  redirect(`/${content.slug}`);
}
