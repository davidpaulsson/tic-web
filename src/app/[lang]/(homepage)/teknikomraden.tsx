'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { type CarouselApi, CarouselDots } from '@/components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import bg1 from './teknikomraden-bg-1.png';

export const TeknikOmraden = () => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className="bg-gradient-to-b from-[#CDD4F6] to-[#F3F2FF] py-32">
      <div className="container">
        <h2 className="mb-16 text-pretty text-2xl sm:text-3xl md:max-w-[20ch] md:text-4xl lg:text-5xl">
          Så här driver vi våra tre teknikområden
        </h2>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          containScroll: false,
          align: (viewSize) => {
            const containerMaxWidth = 1280;
            const paddingInPixels = 32;

            if (viewSize > containerMaxWidth) {
              const offset = (viewSize - containerMaxWidth) / 2 + paddingInPixels;
              return offset;
            }

            return paddingInPixels;
          },
        }}
      >
        <CarouselContent className="gap-6 text-tic-blue">
          <CarouselItem
            className={cn(
              'relative flex overflow-hidden rounded-3xl bg-white',
              'basis-9/12 md:basis-7/12 lg:basis-5/12',
              '@container/carousel-item',
            )}
          >
            <div className="@xl/carousel-item:!pr-[35%] p-6 md:p-8 lg:p-10">
              <h3 className="mb-8 text-pretty text-xl sm:text-2xl md:max-w-[20ch] md:text-3xl lg:text-4xl">
                Snabb och smart dokumentbearbetning
              </h3>
              <p className="mb-20 max-w-prose">
                AI-plattformens dokumentbearbetning (IDP) läser, extraherar, kategoriserar och strukturerar data från dokument, t.ex
                årsredovisningar i både digitalt och icke-digitalt format.
              </p>
              <ul>
                <li className="font-bold">Läs mer om</li>
                <li>
                  <Link href="#" className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75">
                    Låg kostnadströskel
                    <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75">
                    Avancerad bildanalys
                    <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75">
                    Hög tillförlitlighet
                    <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              </ul>
            </div>

            <Image src={bg1} alt="" className="@xl/carousel-item:block absolute inset-0 hidden h-full w-[35] object-contain object-right" />
          </CarouselItem>

          <CarouselItem className={cn('overflow-hidden rounded-3xl bg-white p-6 md:p-8 lg:p-10', 'basis-9/12 md:basis-7/12 lg:basis-5/12')}>
            <h3 className="mb-8 text-pretty text-xl sm:text-2xl md:max-w-[20ch] md:text-3xl lg:text-4xl">Avvikelsedetektion</h3>
            <p className="mb-20">
              AI-plattformen arbetar med stora datamängder och urskiljer data som är ovanliga, annorlunda eller på annat sätt sticker ut
              från mängden. Våra experter bygger metoder och modellering för säkra upplysningar om företagen.
            </p>
            <ul>
              <li className="font-bold">Läs mer om</li>
              <li>
                <Link href="#" className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75">
                  Domänexperter
                  <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link href="#" className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75">
                  Metodexperter
                  <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link href="#" className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75">
                  Avancerad avvikelsedetektion
                  <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </CarouselItem>

          <CarouselItem className={cn('overflow-hidden rounded-3xl bg-white p-6 md:p-8 lg:p-10', 'basis-9/12 md:basis-7/12 lg:basis-5/12')}>
            <h3 className="mb-8 text-pretty text-xl sm:text-2xl md:max-w-[20ch] md:text-3xl lg:text-4xl">Lorem ipsum</h3>
            <p className="mb-20">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti cupiditate est nihil tempora recusandae! Praesentium, ab
              eaque! Quaerat qui odio doloremque similique adipisci quidem consequuntur mollitia obcaecati. Accusamus, dolorem mollitia!
            </p>
            <ul>
              <li className="font-bold">Läs mer om</li>
              <li>
                <Link href="#" className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75">
                  Foo
                  <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link href="#" className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75">
                  Bar
                  <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link href="#" className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75">
                  Baz
                  <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </CarouselItem>
        </CarouselContent>
        <CarouselDots api={api} />
      </Carousel>
    </div>
  );
};
