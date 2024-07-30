'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export const TeknikOmraden = () => {
  return (
    <div className="bg-gradient-to-b from-[#CDD4F6] to-[#F3F2FF] py-32">
      <div className="container">
        <h2 className="mb-16 text-pretty text-2xl sm:text-3xl md:max-w-[20ch] md:text-4xl lg:text-5xl">
          Så här driver vi våra tre teknikområden
        </h2>
      </div>

      <Carousel
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
        <CarouselContent className="gap-6">
          <CarouselItem className="max-w-[calc(100vw-3rem)] rounded-3xl bg-white p-6 md:max-w-[520px] md:p-8 lg:p-10">
            <h3 className="mb-8 text-pretty text-xl sm:text-2xl md:max-w-[20ch] md:text-3xl lg:text-4xl">
              Snabb och smart dokumentbearbetning
            </h3>
            <p>
              AI-plattformens dokumentbearbetning (IDP) läser, extraherar, kategoriserar och strukturerar data från dokument, t.ex
              årsredovisningar i både digitalt och icke-digitalt format.
            </p>
          </CarouselItem>
          <CarouselItem className="max-w-[calc(100vw-3rem)] rounded-3xl bg-white p-10 md:max-w-[520px]">
            <h3 className="mb-8 text-pretty text-xl sm:text-2xl md:max-w-[20ch] md:text-3xl lg:text-4xl">Avvikelsedetektion</h3>
            <p>
              AI-plattformen arbetar med stora datamängder och urskiljer data som är ovanliga, annorlunda eller på annat sätt sticker ut
              från mängden. Våra experter bygger metoder och modellering för säkra upplysningar om företagen.
            </p>
          </CarouselItem>
          <CarouselItem className="max-w-[calc(100vw-3rem)] rounded-3xl bg-white p-10 md:max-w-[520px]">
            <h3 className="mb-8 text-pretty text-xl sm:text-2xl md:max-w-[20ch] md:text-3xl lg:text-4xl">Lorem ipsum</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti cupiditate est nihil tempora recusandae! Praesentium, ab
              eaque! Quaerat qui odio doloremque similique adipisci quidem consequuntur mollitia obcaecati. Accusamus, dolorem mollitia!
            </p>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
