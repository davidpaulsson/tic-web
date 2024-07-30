import Image from 'next/image';

import { Header } from '@/components/header';

import { Hero } from './hero';
import HeroBackground from './hero-background.jpg';

export default function Home() {
  return (
    <>
      <title>The Information Company</title>
      <meta
        name="description"
        content="Upptäck en AI-revolution inom affärsinsikter. Högre kvalitet och 10X mer företagsinfo. Vår AI-plattform Ormeo bäddar för säkrare affärsbeslut och identifierar nya kunder och möjligheter snabbare än någonsin."
      />

      <div className="relative overflow-hidden py-6">
        <Image src={HeroBackground} alt="" fill={true} priority={true} placeholder="blur" className="z-[-1] object-cover" />
        <Header theme="light" />
        <Hero />
      </div>

      <main className="container py-6">
        <p>Note: Logo needs to be replaced with actual SVG, the Figma file contains a bitmap.</p>
      </main>
    </>
  );
}
