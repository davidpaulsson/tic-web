import { Suspense } from 'react';

import { HeroSubtitle, HeroTitle } from '@/components/hero';
import { Skeleton } from '@/components/ui/skeleton';

import { RangeSwitch } from './_components/range-switch';
import { Reports } from './_components/reports';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const range = (searchParams.range as 'daily' | 'monthly') || 'daily';

  return (
    <div className="container my-8 space-y-16 md:space-y-40">
      <div>
        <div>
          <HeroTitle>Bolagsverket statistik årsredovisningar</HeroTitle>
          <HeroSubtitle>
            Statistik över registrerade årsredovisningar (inklusive delårsrapporter) hos Bolagsverket. Uppdateras dagligen runt midnatt.
            Använd vårt kostnadsfria API för att ladda ner mer statistik – läs mer på{' '}
            <a
              className="text-tic-700 no-underline hover:underline"
              href="https://docs.tic.io/api-statistics/bolagsverket/financial-reports-daily"
            >
              docs.tio.io
            </a>
            .
          </HeroSubtitle>
        </div>

        <RangeSwitch range={range} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Suspense
          fallback={
            <>
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
            </>
          }
        >
          <Reports range={range} />
        </Suspense>
      </div>
    </div>
  );
}

const metadata = {
  title: 'Bolagsverket årsredovisningar och deras brister daglig statistik | The Intelligence Company',
  description: 'Följ daglig statistik av digitala och på papper inlämnade årsredovisningar och hur många brister som finns',
  keywords: 'bolagsverket,årsredovisningar,digital inlämning',
  'twitter:title': 'Bolagsverket årsredovisningar och deras brister daglig statistik',
  'twitter:description': 'Följ daglig statistik av digitala och på papper inlämnade årsredovisningar och hur många brister som finns',
  'twitter:creator': '@nylanderjens',
  'twitter:site': '@nylanderjens',
  'twitter:card': 'summary_large_image',
  openGraph: {
    title: 'Bolagsverket årsredovisningar och deras brister daglig statistik',
    description: 'Följ daglig statistik av digitala och på papper inlämnade årsredovisningar och hur många brister som finns',
    type: 'article',
    url: 'https://www.tic.io/sv/statistik/arsredovisningar',
    images: [
      {
        url: 'https://www.tic.io/og-image-statistik.png',
        width: 1200,
        height: 630,
        alt: 'The Intelligence Company - Finansiella rapporter (års- och delårsrapporter)',
      },
    ],
  },
};

export { metadata };
