'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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
};

export const MobileNav = ({ dict, links }: Props) => {
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
                    <a href={link.slug} className="hover:underli</SheetClose>ne block py-4" target="_blank">
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
  );
};
