import { Dot } from '@/icons/dot';
import { FacebookIcon } from '@/icons/facebook';
import { InstagramIcon } from '@/icons/instagram';
import { LinkedinIcon } from '@/icons/linkedin';
import { XIcon } from '@/icons/x';

import { draftMode } from 'next/headers';
import Link from 'next/link';

import { getContentfulClient } from '@/lib/contentful/get-client';
import type { ContentfulExternalPage, ContentfulNavigationResponse, ContentfulPage } from '@/lib/contentful/types';

import { Logo } from './logo';

const SocialLinks = () => (
  <ul className="flex gap-8">
    {[
      { label: 'Instagram', href: '#', icon: <InstagramIcon /> },
      { label: 'X', href: '#', icon: <XIcon /> },
      { label: 'Facebook', href: '#', icon: <FacebookIcon /> },
      { label: 'LinkedIn', href: '#', icon: <LinkedinIcon /> },
    ].map((link) => {
      return (
        <li key={link.label}>
          <a href={link.href} className="text-xl">
            {link.icon}
            <span className="sr-only">{link.label}</span>
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

  return (
    <footer className="mt-16 flex h-full items-end bg-tic-900 text-tic-50 md:mt-40">
      <div className="container pb-16 pt-32">
        <div className="space-y-8 pt-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Logo className="w-24 md:w-32" />
            <SocialLinks />
          </div>

          <div className="flex flex-col-reverse items-start border-t border-t-tic-800 pt-8 md:flex-row md:justify-between">
            <div>
              <div className="mb-1">©{new Date().getFullYear()} The Intelligence Company AB</div>
              <div className="text-sm text-tic-300">Vi har kreditupplysningstillstånd från Integritetsskyddsmyndigheten.</div>
            </div>

            <ul className="mb-8 flex flex-col gap-2 md:mb-0 md:flex-row md:items-center md:gap-4">
              {links.map((link) => {
                const isLast = link === links[links.length - 1];
                return (
                  <>
                    <li key={link.slug}>
                      {link.slug.startsWith('http') ? (
                        <a href={link.slug} className="hover:underline" target="_blank">
                          {link.title}
                        </a>
                      ) : (
                        <Link href={`/${link.slug}`} className="hover:underline">
                          {link.title}
                        </Link>
                      )}
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
