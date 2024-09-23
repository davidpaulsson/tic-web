'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import { HeroSubtitle, HeroTitle } from '@/components/hero';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';

import { useFinancialReports } from '../hooks/use-financial-reports';
import { Arsredovisningar } from './arsredovisningar';
import { Arsredovisningsbrister } from './arsredovisningsbrister';
import { Bokslutsprogram } from './bokslutsprogram';

export function Reports() {
  const [range, setRange] = useState<'daily' | 'monthly'>('daily');
  const { data, error, status } = useFinancialReports({ range });

  return (
    <div className="container my-8 space-y-16 md:space-y-40">
      <div className="md:flex md:items-start md:justify-between">
        <div>
          <HeroTitle>Bolagsverket statistik årsredovisningar</HeroTitle>
          <HeroSubtitle>
            Statistik om registrerade årsredovisningar (även delårsrapporter) hos Bolagsverket. Uppdateras varje dag runt 00:00. Använd vårt
            fria API om du vill själv ladda ner innehållet med mer statistik härifrån{' '}
            <a href="https://docs.tic.io/api-statistics/bolagsverket/financial-reports-daily">docs.tio.io</a>. En tjänst från The
            Intelligence Company AB (publ) som övervakar årsredovisningar och deras brister.
          </HeroSubtitle>
        </div>

        <div className="flex items-center gap-2 max-md:mb-4">
          <Switch className="mr-2" onClick={() => setRange(range === 'daily' ? 'monthly' : 'daily')} checked={range !== 'daily'} />

          <button
            onClick={() => setRange(range === 'daily' ? 'monthly' : 'daily')}
            className={cn('text-sm', {
              'text-black': range === 'daily',
              'text-slate-500': range !== 'daily',
            })}
          >
            Dagligen
          </button>

          <button
            onClick={() => setRange(range === 'daily' ? 'monthly' : 'daily')}
            className={cn('text-sm', {
              'text-black': range === 'monthly',
              'text-slate-400': range !== 'monthly',
            })}
          >
            Månatlig
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {status === 'pending' && (
          <>
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </>
        )}
        {status === 'error' && <div>Error: {error?.message}</div>}
        {status === 'success' && data && (
          <>
            <Arsredovisningar eReportsData={data.eReportsData} pReportsData={data.pReportsData} range={range} />
            <Arsredovisningsbrister discrepanciesData={data.discrepanciesData} range={range} />
            <Bokslutsprogram softwareData={data.softwareData} />
          </>
        )}
      </div>
    </div>
  );
}
