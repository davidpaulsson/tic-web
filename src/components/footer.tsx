import Facebook from '@/icons/facebook.svg';
import Instagram from '@/icons/instagram.svg';
import LinkedIn from '@/icons/linkedin.svg';
import TIC from '@/icons/tic.svg';
import X from '@/icons/x.svg';

import Image from 'next/image';
import Link from 'next/link';

import { FOOTER_LINKS, SOCIAL_LINKS } from '@/constants';

const SocialLinks = () => (
  <ul className="flex gap-4">
    {SOCIAL_LINKS.map((link) => {
      let icon;
      switch (link.label) {
        case 'Instagram':
          icon = Instagram;
          break;
        case 'Facebook':
          icon = Facebook;
          break;
        case 'LinkedIn':
          icon = LinkedIn;
          break;
        default:
          icon = X;
      }
      return (
        <li key={link.href}>
          <a href={link.href}>
            <Image src={icon} alt={link.label} />
          </a>
        </li>
      );
    })}
  </ul>
);

export const Footer = () => (
  <footer className="container space-y-8 bg-gradient-to-b from-tic-blue-light to-tic-blue-dark py-20">
    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <Image src={TIC} alt="The Information Company" />
      <SocialLinks />
    </div>

    <div className="flex flex-col-reverse border-t border-t-white/10 pt-8 md:flex-row md:justify-between">
      <div className="text-white">©{new Date().getFullYear()} The Intelligence Company AB</div>

      <ul className="mb-8 flex flex-col gap-2 md:mb-0 md:flex-row md:gap-4">
        {FOOTER_LINKS.map((link) => (
          <li key={link.slug}>
            <Link href={link.slug} className="text-white hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);
