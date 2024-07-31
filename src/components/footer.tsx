import { Dot } from '@/icons/dot';
import Facebook from '@/icons/facebook.svg';
import Instagram from '@/icons/instagram.svg';
import LinkedIn from '@/icons/linkedin.svg';
import X from '@/icons/x.svg';

import Image from 'next/image';
import Link from 'next/link';

import { getDictionary } from '@/lib/get-dictionary';

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

export const Footer = async ({ lang }: { lang: string }) => {
  const dict = await getDictionary(lang);

  return (
    <footer className="bg-gradient-to-b from-tic-blue-light to-tic-blue-dark pb-20 pt-40">
      <div className="container space-y-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="grid place-items-center rounded bg-red-500 text-white" style={{ width: 134, height: 64 }}>
            Logo
          </div>

          <SocialLinks />
        </div>

        <div className="flex flex-col-reverse border-t border-t-white/10 pt-8 md:flex-row md:justify-between">
          <div className="text-white">©{new Date().getFullYear()} The Intelligence Company AB</div>

          <ul className="mb-8 flex flex-col gap-2 text-white md:mb-0 md:flex-row md:items-center md:gap-4">
            {dict.global.footer.links.map((link) => {
              const isLast = link === dict.global.footer.links[dict.global.footer.links.length - 1];
              return (
                <>
                  <li key={link.title}>
                    <Link href={link.url} className="text-white hover:underline">
                      {link.title}
                    </Link>
                  </li>
                  {!isLast && <Dot width={2} height={2} className="hidden fill-white md:block" />}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};
