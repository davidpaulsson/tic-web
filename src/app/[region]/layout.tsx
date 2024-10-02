import { Locale, i18n } from '@/i18n-config';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string[] };
}>) {
  const region = (params?.slug?.[0] || i18n.defaultLocale) as Locale;
  return (
    <>
      <Header region={region} />
      <main className="mt-16 md:mt-40">{children}</main>
      <Footer region={region} />
    </>
  );
}
