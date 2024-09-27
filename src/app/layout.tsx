import type { Metadata } from 'next';
import { Atkinson_Hyperlegible } from 'next/font/google';

import { cn } from '@/lib/utils';

import Intercom from '@/components/intercom';
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import { DotPattern } from '@/components/ui/dot-pattern';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const hyperlegible = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  preload: true,
});

const metadata: Metadata = {
  title: {
    template: '%s | The Intelligence Company',
    default: 'The Intelligence Company',
  },
  icons: {
    icon: [
      {
        type: 'image/svg+xml',
        url: '/icon.svg',
      },
    ],
  },
};

export { metadata };

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string[] };
}>) {
  return (
    <html lang={params?.slug?.[0] || 'sv'}>
      <body className={cn(hyperlegible.className, 'text-base text-tic-950')}>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn('z-[-1] [mask-image:linear-gradient(to_bottom,white,transparent,transparent)]')}
        />

        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>

        <Intercom />
        <Toaster position="bottom-left" />
      </body>
    </html>
  );
}
