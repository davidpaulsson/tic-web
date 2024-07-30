import { ChevronRight, LogIn, Menu, Phone } from 'lucide-react';
import Link from 'next/link';

import { HEADER_LINKS } from '@/constants';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
          <div className="grid place-items-center rounded bg-red-500 text-white" style={{ width: 67, height: 32 }}>
            Logo
          </div>
        </Link>

        {/** up to md screen */}
        <Menu />

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

      {/** Between md and lg screen */}
      <ul className="hidden gap-2 text-white md:max-lg:flex">
        <li>
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
        <li>
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
            <Link href="/kontakta-oss" className="group flex gap-2 text-white hover:text-white">
              Kontakta säljteamet
              <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="secondary" asChild>
            <Link href="/login" className="group flex gap-2">
              Logga in <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  </header>
);
