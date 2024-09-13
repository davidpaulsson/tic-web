import { Dot } from '@/icons/dot';
import Facebook from '@/icons/facebook.svg';
import Instagram from '@/icons/instagram.svg';
import LinkedIn from '@/icons/linkedin.svg';
import X from '@/icons/x.svg';

import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { getContentfulClient } from '@/lib/contentful/get-client';
import type { ContentfulNavigationResponse } from '@/lib/contentful/types';

import { Logo } from './logo';

const SocialLinks = () => (
  <ul className="flex gap-8">
    {[
      { label: 'Instagram', href: '#', icon: Instagram },
      { label: 'X', href: '#', icon: X },
      { label: 'Facebook', href: '#', icon: Facebook },
      { label: 'LinkedIn', href: '#', icon: LinkedIn },
    ].map((link) => {
      return (
        <li key={link.label}>
          <a href={link.href}>
            <Image src={link.icon} alt={link.label} />
          </a>
        </li>
      );
    })}
  </ul>
);

export const Footer = async ({ locale }: { locale: string }) => {
  const { isEnabled } = draftMode();
  const cf = getContentfulClient(isEnabled);
  const entry = (await cf.getEntries({
    content_type: 'navigation',
    'fields.internalTitle': 'Footer',
    limit: 1,
    locale: locale,
  })) as unknown as ContentfulNavigationResponse;

  const links = entry?.items?.[0]?.fields?.links.map((link) => ({
    title: link.fields.title,
    slug: link.fields.slug,
  }));

  return (
    <footer className="to-tic-purple-light bg-gradient-to-b from-white pb-96 pt-40">
      <div className="container">
        <div className="border-t-tic-stroke space-y-8 border-t pt-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Logo className="w-32" />

            <SocialLinks />
          </div>

          <div className="flex flex-col-reverse border-t border-t-white/10 pt-8 md:flex-row md:justify-between">
            <div>
              <div className="text-tic-light mb-3">©{new Date().getFullYear()} The Intelligence Company AB</div>
              <div className="text-sm">Vi har kreditupplysningstillstånd från Integritetsskyddsmyndigheten.</div>
            </div>

            <ul className="mb-8 flex flex-col gap-2 md:mb-0 md:flex-row md:items-center md:gap-4">
              {links.map((link) => {
                const isLast = link === links[links.length - 1];
                return (
                  <>
                    <li key={link.slug}>
                      <Link href={`/${link.slug}`} className="hover:underline">
                        {link.title}
                      </Link>
                    </li>
                    {!isLast && <Dot width={2} height={2} className="hidden md:block" />}
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
