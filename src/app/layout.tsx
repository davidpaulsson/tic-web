import localFont from 'next/font/local';

import { Footer } from '@/components/footer';
import { TooltipProvider } from '@/components/ui/tooltip';

import './globals.css';

const hyperlegible = localFont({
  src: [
    {
      path: '../fonts/Atkinson-Hyperlegible-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Atkinson-Hyperlegible-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Atkinson-Hyperlegible-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Atkinson-Hyperlegible-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hyperlegible.className}>
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
        <Footer />
      </body>
    </html>
  );
}
