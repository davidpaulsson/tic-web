import { LogIn, Menu } from 'lucide-react';
import { draftMode } from 'next/headers';
import Link from 'next/link';

import { getContentfulClient } from '@/lib/contentful/get-client';
import type { ContentfulNavigationResponse } from '@/lib/contentful/types';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

  const links = entry?.items?.[0]?.fields?.links.map((link) => ({
    title: link.fields.title,
    slug: link.fields.slug,
  }));

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
          url: '/',
        },
      };
      break;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }

  return (
    <header className="container sticky top-6 md:grid md:place-content-center">
      <nav className="border-tic-stroke flex items-center justify-between rounded-xl border bg-white/30 px-6 py-4 backdrop-blur">
        <div className="flex w-full items-center gap-14">
          <Link href={`/${locale}`}>
            <span className="sr-only">{dict.goToHomepage}</span>
            <Logo className="w-12" />
          </Link>

          {/** md screen and up */}
          <ul className="hidden w-full items-center justify-between gap-14 md:flex">
            {links.map((link) => (
              <li key={link.slug}>
                <Link href={`/${link.slug}`} className="text-nowrap hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <Button asChild variant="outline">
                <Link href={dict.logIn.url} className="group flex gap-2">
                  {dict.logIn.title}
                </Link>
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
                  {links.map((link) => (
                    <li key={link.slug}>
                      <Link href={`/${link.slug}`} className="block text-nowrap py-4 hover:underline">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
            <SheetFooter>
              <ul className="space-y-4">
                <li>
                  <Button className="w-full" asChild>
                    <Link href={dict.logIn.url}>{dict.logIn.title}</Link>
                  </Button>
                </li>
              </ul>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/** Between md and lg screen */}
        <ul className="hidden gap-4 text-white md:max-lg:flex">
          <li className="flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <Link href={dict.logIn.url} className="flex h-10 w-10 items-center justify-center">
                  <span className="sr-only">{dict.logIn.title}</span>
                  <LogIn className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{dict.logIn.title}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </nav>
    </header>
  );
};
