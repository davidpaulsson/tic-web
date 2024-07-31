import { ChevronRight, LogIn, Menu, Phone } from 'lucide-react';
import Link from 'next/link';

import { getDictionary } from '@/lib/get-dictionary';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { ScrollArea } from './ui/scroll-area';

type Props = {
  theme: 'light' | 'dark';
  lang: string;
};

export const Header = async ({ theme = 'dark', lang }: Props) => {
  const dict = await getDictionary(lang);

  return (
    <header
      className={cn({
        'text-black': theme === 'dark',
        'text-white': theme === 'light',
      })}
    >
      <nav className="container flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={dict.general.links.goToHomepage.url}>
            <span className="sr-only">{dict.general.links.goToHomepage.title}</span>
            <div className="grid h-10 place-items-center rounded bg-red-500 text-white" style={{ width: 68 }}>
              Logo
            </div>
          </Link>

          {/** md screen and up */}
          <ul className="hidden items-center gap-8 md:flex">
            {dict.global.navigation.map((link) => (
              <li key={link.title}>
                <Link href={link.url} className="text-nowrap hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/** up to md screen */}
        <Sheet>
          <SheetTrigger className="flex h-10 w-10 items-center justify-end md:hidden">
            <Menu />
            <span className="sr-only">{dict.general.openMenu}</span>
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <div>
              <SheetHeader>
                <SheetTitle>The Intelligence Company</SheetTitle>
              </SheetHeader>
              <ScrollArea>
                <ul className="divide-y">
                  {dict.global.navigation.map((link) => (
                    <li key={link.title}>
                      <Link href={link.url} className="block text-nowrap py-4 hover:underline">
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
                  <Button className="w-full" variant="secondary" asChild>
                    <Link href={dict.general.links.contactSales.url}>{dict.general.links.contactSales.title}</Link>
                  </Button>
                </li>
                <li>
                  <Button className="w-full" asChild>
                    <Link href={dict.general.links.logIn.url}>{dict.general.links.logIn.title}</Link>
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
                  href={dict.general.links.contactSales.url}
                  className={cn('flex h-10 w-10 items-center justify-center', {
                    'text-white': theme === 'light',
                    'text-tic-blue': theme === 'dark',
                  })}
                >
                  <span className="sr-only">{dict.general.links.contactSales.title}</span>
                  <Phone className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{dict.general.links.contactSales.title}</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li className="flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={dict.general.links.logIn.url}
                  className={cn('flex h-10 w-10 items-center justify-center', {
                    'text-white': theme === 'light',
                    'text-tic-blue': theme === 'dark',
                  })}
                >
                  <span className="sr-only">{dict.general.links.logIn.title}</span>
                  <LogIn className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{dict.general.links.logIn.title}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>

        {/** lg screen and up */}
        <ul className="hidden items-center gap-2 lg:flex">
          <li>
            <Button variant="ghost" asChild>
              <Link
                href={dict.general.links.contactSales.url}
                className={cn('group flex gap-2', {
                  'text-white hover:text-white': theme === 'light',
                })}
              >
                {dict.general.links.contactSales.title}
                <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </li>
          <li>
            <Button variant={theme === 'light' ? 'secondary' : 'default'} asChild>
              <Link href={dict.general.links.logIn.url} className="group flex gap-2">
                {dict.general.links.logIn.title}{' '}
                <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
