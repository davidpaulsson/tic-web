export function generateStaticParams() {
  const pages = ['sv', 'en'];
  return pages.map((page) => ({
    slug: [page],
  }));
}

export default async function Page({ params }: Readonly<{ params: { slug: string[] } }>) {
  return <main>hello</main>;
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
