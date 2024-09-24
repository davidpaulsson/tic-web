import Image from 'next/image';

import { asNumber, cn } from '@/lib/utils';

import { Card, CardContent } from '../ui/card';
import { NumberTicker } from '../ui/number-ticker';
import john from './john.jpeg';
import kai from './kai.jpeg';

const people = [
  {
    name: 'John Severinson',
    title: 'Chief Digital Officer, Parks and Resorts Scandinavia',
    quote: 'Är impad över snabbheten i API:et och hur det integrerar olika datakällor. Det här har ju all potential att bli API:ernas API.',
    image: john,
  },
  {
    name: 'Kai Ytterberg',
    title: 'CTO, Aprello',
    quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, eius tenetur.',
    image: kai,
  },
];

export const Testomonials = () => {
  return (
    <div className="container">
      <div className="grid gap-6 md:grid-cols-3">
        {people.map(({ name, title, quote, image }, index) => (
          <div
            key={name}
            className={cn('space-y-5', {
              'col-span-2': index === 0,
            })}
          >
            <p className="max-w-prose text-pretty text-xl">
              <q>{quote}</q>
            </p>
            <div className="flex items-center space-x-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image className="aspect-square h-full w-full" src={image} alt={name} />
              </span>
              <div>
                <p className="mb-1 leading-none">{name}</p>
                <p className="text-tic-muted text-pretty">{title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
