import { Header } from '@/components/header';

export default function Home() {
  return (
    <>
      <div className="bg-tic-blue-dark py-6">
        <Header theme="light" />
      </div>

      <main className="container py-6">
        <p>Note: Logo needs to be replaced with actual SVG, the Figma file contains a bitmap.</p>
      </main>
    </>
  );
}
