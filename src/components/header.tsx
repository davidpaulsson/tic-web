import { ExternalLink, Menu } from 'lucide-react';
import { draftMode } from 'next/headers';
import Link from 'next/link';

import { getContentfulClient } from '@/lib/contentful/get-client';
import type { ContentfulExternalPage, ContentfulNavigationResponse, ContentfulPage } from '@/lib/contentful/types';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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
      <nav className="flex items-center justify-between rounded-xl border border-tic-stroke/50 bg-white/30 px-6 py-4 backdrop-blur">
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
                      {link.title} <ExternalLink className="h-4 w-4 text-tic-lighter" />
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
        <Sheet>
          <SheetTrigger className="flex h-10 w-10 items-center justify-end md:hidden">
            <Menu />
            <span className="sr-only">{dict.openMenu}</span>
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <div>
              <SheetHeader>
                <SheetTitle>The Intelligence Company</SheetTitle>
              </SheetHeader>
              <ScrollArea>
                <ul className="divide-y">
                  <SheetClose asChild>
                    <Link href="/sv" className="block text-nowrap py-4 hover:underline">
                      Startsida
                    </Link>
                  </SheetClose>
                  {links.map((link) => (
                    <li key={link.slug}>
                      {link.slug.startsWith('http') ? (
                        <a href={link.slug} className="block py-4 hover:underline" target="_blank">
                          {link.title}
                        </a>
                      ) : (
                        <SheetClose asChild>
                          <Link href={`/${link.slug}`} className="block text-nowrap py-4 hover:underline">
                            {link.title}
                          </Link>
                        </SheetClose>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
            <SheetFooter>
              <ul className="space-y-4">
                <li>
                  <Button className="w-full" asChild>
                    <a href={dict.logIn.url}>{dict.logIn.title}</a>
                  </Button>
                </li>
              </ul>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
