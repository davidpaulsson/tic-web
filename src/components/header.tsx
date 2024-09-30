import { draftMode } from 'next/headers';
import Link from 'next/link';

import { getContentfulClient } from '@/lib/contentful/get-client';
import type { ContentfulExternalPage, ContentfulNavigationResponse, ContentfulPage } from '@/lib/contentful/types';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

import { MobileNav } from './mobile-nav';

type Props = {
  locale: string;
};

export const Header = async ({ locale }: Props) => {
  const { isEnabled } = draftMode();
  const cf = getContentfulClient(isEnabled);
  const entry = (await cf.getEntries({
    content_type: 'navigation',
    'fields.internalTitle': 'Header',
    limit: 1,
    locale: locale,
  })) as unknown as ContentfulNavigationResponse;

  const links = entry?.items?.[0]?.fields?.links.map((link) => {
    switch (link.sys.contentType.sys.id) {
      case 'externalPage':
        const externalPage = link as ContentfulExternalPage;
        return {
          title: externalPage.fields.title,
          slug: externalPage.fields.url,
        };
      case 'page':
        const page = link as ContentfulPage;
        return {
          title: page.fields.title,
          slug: page.fields.slug,
        };
    }
  });

  let dict;
  switch (locale) {
    case 'en':
      dict = {
        goToHomepage: 'Go to homepage',
        openMenu: 'Open menu',
        logIn: {
          title: 'Log in',
          url: '/',
        },
      };
      break;
    case 'sv':
      dict = {
        goToHomepage: 'Gå till startsidan',
        openMenu: 'Öppna meny',
        logIn: {
          title: 'Logga in',
          url: 'https://app.tic.io/',
        },
      };
      break;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }

  return (
    <header className="container sticky top-6 z-20 md:grid md:place-content-center">
      <nav className="flex items-center justify-between rounded-2xl border border-tic-300/50 bg-tic-50/50 px-6 py-3 backdrop-blur">
        <div className="flex w-full items-center gap-14">
          <Link href={`/${locale}`}>
            <span className="sr-only">{dict.goToHomepage}</span>
            <Logo className="w-12" />
          </Link>

          {/** md screen and up */}
          <ul className="hidden w-full items-center justify-between gap-14 md:flex">
            {links.map((link) => {
              if (link.slug.startsWith('http')) {
                return (
                  <li key={link.slug}>
                    <a href={link.slug} className="flex items-center gap-2 text-nowrap hover:underline" target="_blank">
                      {link.title}
                    </a>
                  </li>
                );
              }
              return (
                <li key={link.slug}>
                  <Link href={`/${link.slug}`} className="text-nowrap hover:underline">
                    {link.title}
                  </Link>
                </li>
              );
            })}
            <li>
              <Button asChild variant="outline">
                <a href={dict.logIn.url} className="group flex gap-2">
                  {dict.logIn.title}
                </a>
              </Button>
            </li>
          </ul>
        </div>

        {/** up to md screen */}
        <MobileNav dict={dict} links={links} />
      </nav>
    </header>
  );
};
