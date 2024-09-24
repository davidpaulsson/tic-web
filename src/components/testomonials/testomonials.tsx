import Image from 'next/image';

import { asNumber } from '@/lib/utils';

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
  // {
  //   name: 'Kai Ytterberg',
  //   title: 'CTO, Aprello',
  //   quote: 'Tic Intelligence har hjälpt oss att förstå våra kunder och deras behov på en helt ny nivå.',
  //   image: kai,
  // },
];

export const Testomonials = () => {
  const data = [
    { amount: 2600008, amount2: asNumber(2.6) + 'M', what: 'företag' },
    { amount: 9782721, amount2: asNumber(9.7) + 'M', what: 'dokument' },
    { amount: 48000000, amount2: asNumber(48) + 'M', what: 'datapunkter' },
  ];

  return (
    <div className="container">
      <div className="md:flex md:justify-between md:gap-8">
        {people.map(({ name, title, quote, image }) => (
          <div key={name} className="space-y-5 max-md:mb-8">
            <p className="max-w-prose text-balance text-xl">
              <q>{quote}</q>
            </p>
            <div className="flex items-center space-x-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image className="aspect-square h-full w-full" src={image} alt={name} />
              </span>
              <div>
                <p className="mb-1 leading-none">{name}</p>
                <p className="text-pretty text-slate-500">{title}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-16 max-md:justify-evenly md:justify-end">
          {data.map(({ amount, amount2, what }) => (
            <div key={what}>
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                {/* <NumberTicker value={amount} /> */}
                {amount2}
              </p>
              <p className="text-base text-slate-500">{what}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
