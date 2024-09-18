import { match as matchLocale } from '@formatjs/intl-localematcher';

import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  if (
    [
      '/og-image.png',
      '/og-image-statistik.png',
      // ...other files in `public`
    ].includes(pathname)
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  // -------------------------------
  const pathnameHasLocale = i18n.locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  // -------------------------------

  // Redirect to the same URL with the locale based on the user's IP country
  const country = (request.geo && request.geo.country) || null;
  if (country !== null) {
    let locale;
    switch (country) {
      case 'SE':
        locale = 'sv';
        break;
    }
    if (locale) {
      return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url));
    }
  }

  // Redirect to the same URL with the locale based on the user's language preference
  const locale = getLocale(request); // Fallbacks to default locale (i18n.defaultLocale) if no match
  return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url));
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
