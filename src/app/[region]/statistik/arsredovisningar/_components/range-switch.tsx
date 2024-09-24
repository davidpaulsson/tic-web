'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Switch } from '@/components/ui/switch';

export const RangeSwitch = ({ range }: { range: 'daily' | 'monthly' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleQueryParams = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('range', range === 'daily' ? 'monthly' : 'daily');
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="my-4 flex items-center gap-2">
      <Switch className="mr-2" onClick={toggleQueryParams} checked={range !== 'daily'} />

      <button
        onClick={toggleQueryParams}
        className={cn('text-sm', {
          'text-black': range === 'daily',
          'text-tic-500': range !== 'daily',
        })}
      >
        Dagligen
      </button>

      <button
        onClick={toggleQueryParams}
        className={cn('text-sm', {
          'text-black': range === 'monthly',
          'text-tic-400': range !== 'monthly',
        })}
      >
        Månatlig
      </button>
    </div>
  );
};
