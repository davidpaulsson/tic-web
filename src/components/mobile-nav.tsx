'use client';

import { Locale } from '@/i18n-config';

import { Menu } from 'lucide-react';
import Link from 'next/link';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Logo } from './logo';

type Props = {
  dict: {
    goToHomepage: string;
    openMenu: string;
    logIn: {
      title: string;
      url: string;
    };
  };
  links: {
    title: string;
    slug: string;
  }[];
  region: Locale;
};

export const MobileNav = ({ dict, region, links }: Props) => {
  return (
    <Sheet
      onOpenChange={(open) => {
        if (typeof window !== 'undefined' && window.Intercom) {
          window.Intercom('update', {
            hide_default_launcher: open,
          });
        }
      }}
    >
      <SheetTrigger className="flex h-10 w-10 items-center justify-end md:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">{dict.openMenu}</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <div>
          {/* <SheetHeader>
            <SheetTitle>The Intelligence Company</SheetTitle>
          </SheetHeader> */}
          <ScrollArea className="pt-6">
            <Link href={`/${region}`}>
              <span className="sr-only">{dict.goToHomepage}</span>
              <Logo className="w-12" />
            </Link>
            <ul className="mt-12">
              <SheetClose asChild>
                <Link href="/sv" className="block text-nowrap py-3 text-2xl hover:underline">
                  Hem
                </Link>
              </SheetClose>
              {links.map((link) => (
                <li key={link.slug}>
                  {link.slug.startsWith('http') ? (
                    <a href={link.slug} className="block py-3 text-2xl hover:underline" target="_blank">
                      {link.title}
                    </a>
                  ) : (
                    <SheetClose asChild>
                      <Link href={`/${link.slug}`} className="block text-nowrap py-3 text-2xl hover:underline">
                        {link.title}
                      </Link>
                    </SheetClose>
                  )}
                </li>
              ))}
              <li className="mt-3 border-t pt-3">
                <a className="block py-3 text-2xl" href={dict.logIn.url}>
                  {dict.logIn.title}
                </a>
              </li>
            </ul>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
