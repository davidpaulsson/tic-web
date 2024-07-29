import Facebook from '@/icons/facebook.svg';
import Instagram from '@/icons/instagram.svg';
import LinkedIn from '@/icons/linkedin.svg';
import X from '@/icons/x.svg';

import Image from 'next/image';
import Link from 'next/link';

import { FOOTER_LINKS, SOCIAL_LINKS } from '@/constants';

const SocialLinks = () => (
  <ul className="mb-6 space-x-8">
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
        <li className="inline-block">
          <a href={link.href}>
            <Image src={icon} alt={link.label} />
          </a>
        </li>
      );
    })}
  </ul>
);

export const Footer = () => (
  <footer className="from-tic-blue-light to-tic-blue-dark container bg-gradient-to-b py-20">
    <SocialLinks />
    <div className="flex justify-between border-t border-t-white/10 pt-6">
      <div className="text-white">©{new Date().getFullYear()} The Intelligence Company AB</div>
      <ul className="space-x-4">
        {FOOTER_LINKS.map((link) => (
          <li key={link.slug} className="inline-block">
            <Link href={link.slug} className="text-white hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);
