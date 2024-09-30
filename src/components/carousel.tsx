'use client';

import { ChevronRight } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';

import { ContentfulBlockCarousel } from '@/lib/contentful/types';
import { cn } from '@/lib/utils';

import { type CarouselApi, CarouselDots } from '@/components/ui/carousel';
import { CarouselContent, CarouselItem, Carousel as CarouselRoot } from '@/components/ui/carousel';

export const Carousel = ({ carousel, locale }: { carousel: ContentfulBlockCarousel['fields']; locale: string }) => {
  const [api, setApi] = useState<CarouselApi>();

  let dict;
  switch (locale) {
    case 'en':
      dict = {
        readMore: 'Read more',
      };
      break;
    case 'sv':
      dict = {
        readMore: 'Läs mer',
      };
      break;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }

  return (
    <div className="bg-gradient-to-b from-[#CDD4F6] to-[#F3F2FF] py-32">
      <div className="container">
        <h2 className="mb-16 text-pretty text-2xl sm:text-3xl md:max-w-[20ch] md:text-4xl lg:text-5xl">{carousel.title}</h2>
      </div>

      <CarouselRoot
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
          {carousel.cards.map((card) => (
            <CarouselItem
              key={card.sys.id}
              className={cn(
                'relative flex overflow-hidden rounded-3xl bg-white',
                'basis-9/12 md:basis-7/12 lg:basis-5/12',
                '@container/carousel-item',
              )}
            >
              <div className="p-6 @xl/carousel-item:!pr-[35%] md:p-8 lg:p-10">
                <h3 className="mb-8 text-pretty text-xl sm:text-2xl md:max-w-[20ch] md:text-3xl lg:text-4xl">{card.fields.title}</h3>
                <p className="mb-20 max-w-prose">{card.fields.description}</p>
                <ul>
                  <li className="font-bold">{dict.readMore}</li>
                  {card.fields.links.map((link) => (
                    <li key={link.fields.slug}>
                      <Link
                        href={`/${link.fields.slug}`}
                        className="group flex items-center gap-1 text-[#4E0FD5] transition-colors hover:text-[#4E0FD5]/75"
                      >
                        {link.fields.title}
                        <ChevronRight className="h-4 w-4 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots api={api} />
      </CarouselRoot>
    </div>
  );
};
