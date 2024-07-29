import TIC from '@/icons/tic.svg';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { HEADER_LINKS } from '@/constants';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

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
          <Image src={TIC} height={40} alt="The Information Company" />
        </Link>
        <ul className="flex items-center gap-8">
          {HEADER_LINKS.map((link) => (
            <li key={link.slug}>
              <Link href={link.slug} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex items-center gap-2">
        <li>
          <Button variant="ghost" asChild>
            <Link href="/kontakta-oss" className="flex gap-2 text-white hover:text-white">
              Kontakta säljteamet
              <ChevronRight className="h-5 w-5 text-[#C8B8DC]" />
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="secondary" asChild>
            <Link href="/login" className="flex gap-2">
              Logga in <ChevronRight className="h-5 w-5 text-[#C8B8DC]" />
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  </header>
);
