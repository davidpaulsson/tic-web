import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <div className="container pb-32 pt-20">
      <h1 className="mb-6 text-balance text-4xl text-white sm:text-5xl md:max-w-[14ch] md:text-6xl lg:text-7xl">
        Upptäck en AI-revolution inom affärsinsikter
      </h1>
      <p className="mb-10 text-pretty text-lg text-[#DCCFED] sm:max-w-[40ch] md:text-xl">
        Högre kvalitet och 10X mer företagsinfo. Vår AI-plattform Ormeo bäddar för säkrare affärsbeslut och identifierar nya kunder och
        möjligheter snabbare än någonsin.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="secondary" asChild>
          <Link href="/kontakta-oss" className="group flex gap-2">
            Börja kostnadsfritt <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/kontakta-oss" className="group flex gap-2 text-white hover:text-white">
            Kontakta säljteamet
            <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
