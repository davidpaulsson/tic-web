import { ChevronRight, LogIn, Menu, Phone } from 'lucide-react';
import Link from 'next/link';

import { HEADER_LINKS } from '@/constants';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { ScrollArea } from './ui/scroll-area';

type Props = {
  theme: 'light' | 'dark';
};

export const Header = ({ theme = 'dark' }: Props) => (
  <header
    className={cn({
      'text-black': theme === 'dark',
      'text-white': theme === 'light',
    })}
  >
    <nav className="container flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <span className="sr-only">Gå till startsidan</span>
          <div className="grid h-10 place-items-center rounded bg-red-500 text-white" style={{ width: 68 }}>
            Logo
          </div>
        </Link>

        {/** md screen and up */}
        <ul className="hidden items-center gap-8 md:flex">
          {HEADER_LINKS.map((link) => (
            <li key={link.slug}>
              <Link href={link.slug} className="text-nowrap hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/** up to md screen */}
      <Sheet>
        <SheetTrigger className="flex h-10 w-10 items-center justify-center md:hidden">
          <Menu />
          <span className="sr-only">Öppna menyn</span>
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <div>
            <SheetHeader>
              <SheetTitle>The Intelligence Company</SheetTitle>
            </SheetHeader>
            <ScrollArea>
              <ul className="divide-y">
                {HEADER_LINKS.map((link) => (
                  <li key={link.slug}>
                    <Link href={link.slug} className="block text-nowrap py-4 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
          <SheetFooter>
            <ul className="space-y-4">
              <li>
                <Button className="w-full" variant="secondary" asChild>
                  <Link href="/kontakta-oss">Kontakta säljteamet</Link>
                </Button>
              </li>
              <li>
                <Button className="w-full" asChild>
                  <Link href="/login">Logga in</Link>
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
              <Link
                href="/kontakta-oss"
                className={cn('flex h-10 w-10 items-center justify-center', {
                  'text-white': theme === 'light',
                  'text-tic-blue': theme === 'dark',
                })}
              >
                <span className="sr-only">Kontakta säljteamet</span>
                <Phone className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Kontakta säljteamet</p>
            </TooltipContent>
          </Tooltip>
        </li>
        <li className="flex items-center justify-center">
          <Tooltip>
            <TooltipTrigger>
              <Link
                href="/login"
                className={cn('flex h-10 w-10 items-center justify-center', {
                  'text-white': theme === 'light',
                  'text-tic-blue': theme === 'dark',
                })}
              >
                <span className="sr-only">Logga in</span>
                <LogIn className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logga in</p>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>

      {/** lg screen and up */}
      <ul className="hidden items-center gap-2 lg:flex">
        <li>
          <Button variant="ghost" asChild>
            <Link
              href="/kontakta-oss"
              className={cn('group flex gap-2', {
                'text-white hover:text-white': theme === 'light',
              })}
            >
              Kontakta säljteamet
              <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </li>
        <li>
          <Button variant={theme === 'light' ? 'secondary' : 'default'} asChild>
            <Link href="/login" className="group flex gap-2">
              Logga in <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  </header>
);
