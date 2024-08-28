import { Logo } from '@/components/logo';

export function generateStaticParams() {
  const pages = ['sv', 'no', 'de', 'en'];
  return pages.map((page) => ({
    slug: [page],
  }));
}

export default async function Page({ params }: Readonly<{ params: { slug: string[] } }>) {
  return (
    <main className="p-8 text-base text-slate-950 md:p-16">
      <Logo className="mb-16 h-auto w-16" />
      <h1 className="mb-2 text-2xl">The Intelligence Company AB (publ) 559487-1682</h1>
      <address className="max-w-prose text-base not-italic text-slate-600">
        Press, questions, or general inquiries please contact
        <br />
        <a href="https://www.linkedin.com/in/nylanderjens/">Jens Nylander</a>, CEO
        <br />
        <a href="tel:0046733670882" className="text-tic-blue transition-colors hover:text-tic-blue-light">
          +46 73-367 08 82
        </a>
        <br />
        <a href="mailto:info@tic.io" className="text-tic-blue transition-colors hover:text-tic-blue-light">
          info@tic.io
        </a>
      </address>
    </main>
  );
}

const metadata = {
  title: 'The Intelligence Company',
  description: 'The Intelligence Company AB (publ) 559487-1682',
  openGraph: {
    images: [
      {
        url: 'https://www.tic.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Intelligence Company',
      },
    ],
  },
};

export { metadata };
