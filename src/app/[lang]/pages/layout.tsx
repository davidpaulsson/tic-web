import { Header } from '@/components/header';

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="border-b py-6">
        <Header theme="dark" />
      </div>
      <main className="container py-12">{children}</main>
    </>
  );
}
