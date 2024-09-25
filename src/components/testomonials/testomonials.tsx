import Image from 'next/image';

import { asNumber } from '@/lib/utils';

import john from './john.jpeg';

export const Testomonials = () => {
  const { quote, image, title, name } = {
    name: 'John Severinson',
    title: 'Chief Digital Officer, Parks and Resorts Scandinavia',
    quote: 'Snabbheten och integrationen av olika datakällor imponerar. Det här har all potential att bli API:ernas API.',
    image: john,
  };

  const data = [
    {
      amountM: 9.8,
      label: 'företagsdokument',
    },
    {
      amountM: 48,
      label: 'datapunkter',
    },
    {
      amountM: 2.6,
      label: 'företag',
    },
    {
      amountM: 6.9,
      label: 'svenskar (+15 år)',
    },
  ];

  return (
    <div className="container">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="bg-tic-100 border-tic-200 rounded-2xl border p-6 md:p-10">
          <div className="space-y-6">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image className="aspect-square h-full w-full" src={image} alt={name} />
            </span>

            <blockquote className="max-w-prose text-pretty text-xl md:text-2xl">{quote}</blockquote>

            <div className="flex items-center space-x-4">
              <div>
                <p className="mb-1 leading-tight">{name}</p>
                <p className="text-tic-500 text-pretty leading-tight">{title}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {data.map(({ amountM, label }) => (
            <div key={label} className="text-center">
              <span className="block text-5xl md:text-7xl">{asNumber(amountM)}M</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
