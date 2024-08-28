import { Reports } from './_components/reports';

export default async function Page() {
  return <Reports />;
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
