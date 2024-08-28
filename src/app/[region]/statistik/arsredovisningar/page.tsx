import { Reports } from './_components/reports';

export default async function Page() {
  return <Reports />;
}

const metadata = {
  title: 'Finansiella rapporter (års- och delårsrapporter) | The Intelligence Company',
  description: 'Statistik om registrerade finansiella rapporter (års- och delårsrapporter) hos Bolagsverket. Uppdateras varje dag.',
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
