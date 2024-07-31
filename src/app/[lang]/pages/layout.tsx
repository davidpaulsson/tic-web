import { Header } from '@/components/header';

export default function PagesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <>
      <div className="border-b py-6">
        <Header theme="dark" lang={params.lang} />
      </div>
      <main className="container py-12">{children}</main>
    </>
  );
}
