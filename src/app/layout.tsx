import type { Metadata } from 'next';
import { Atkinson_Hyperlegible } from 'next/font/google';

import { cn } from '@/lib/utils';

import { FrontChat } from '@/components/front-chat';
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

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
      <body className={cn(hyperlegible.className, 'text-base text-tic')}>
        <TooltipProvider delayDuration={100}>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </TooltipProvider>
        <FrontChat />
        <Toaster />
      </body>
    </html>
  );
}