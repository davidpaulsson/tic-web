/* eslint-disable @next/next/no-page-custom-font */
import { Atkinson_Hyperlegible } from 'next/font/google';

import { cn } from '@/lib/utils';

import { Footer } from '@/components/footer';
import { FrontChat } from '@/components/front-chat';
import { Header } from '@/components/header';
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
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
    <html lang={params?.slug?.[0] || 'sv'}>
      <body className={cn(hyperlegible.className, 'text-tic')}>
        <TooltipProvider delayDuration={100}>
          <ReactQueryClientProvider>
            <main>{children}</main>
            <Footer locale={params?.slug?.[0] || 'sv'} />
          </ReactQueryClientProvider>
        </TooltipProvider>
        <FrontChat />
      </body>
    </html>
  );
}
