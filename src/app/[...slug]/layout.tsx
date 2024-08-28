/* eslint-disable @next/next/no-page-custom-font */
import { Atkinson_Hyperlegible } from 'next/font/google';

import { Footer } from '@/components/footer';
import { TooltipProvider } from '@/components/ui/tooltip';

import '../globals.css';

const hyperlegible = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  preload: true,
});

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string[] };
}>) {
  return (
    <html lang={params?.slug?.[0] || 'sv'} className={hyperlegible.className}>
      <body>
        <TooltipProvider delayDuration={100}>
          {children}
          <Footer locale={params?.slug?.[0] || 'sv'} />
        </TooltipProvider>
      </body>
    </html>
  );
}
