import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string[] };
}>) {
  return (
    <>
      <Header locale={params?.slug?.[0] || 'sv'} />
      <main>{children}</main>
      <Footer locale={params?.slug?.[0] || 'sv'} />
    </>
  );
}
