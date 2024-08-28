import { Reports } from './_components/reports';

export default async function Page() {
  return <Reports />;
}

const metadata = {
  title: 'Bolagsverket årsredovisningar och deras brister daglig statistik | The Intelligence Company',
  description: 'Följ daglig statistik av digitala och på papper inlämnade årsredovisningar och hur många brister som finns',
  openGraph: {
    images: [
      {
        url: 'https://www.tic.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Intelligence Company - Finansiella rapporter (års- och delårsrapporter)',
      },
    ],
  },
};

export { metadata };
