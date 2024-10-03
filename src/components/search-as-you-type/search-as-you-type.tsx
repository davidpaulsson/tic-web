'use client';

import uniqBy from 'lodash/uniqBy';
import { Fragment, useState } from 'react';
import { ReactTyped } from 'react-typed';

import { asMoney, asPercentage, cn } from '@/lib/utils';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';

import { Skeleton } from '../ui/skeleton';
import { useSearch } from './use-search';

export const SearchAsYouType = () => {
  const [value, setValue] = useState('');
  const { companies, found, searchTimeMs } = useSearch({
    query: value,
  });

  return (
    <div className="container">
      <div className="relative rounded-2xl bg-tic-200 px-6 pb-6 pt-8 md:pt-16">
        <h2 className="mb-1 text-balance text-xl md:text-center md:text-3xl">Bygg en intuitiv sökupplevelse på nolltid.</h2>
        <p className="mb-6 text-pretty text-base text-tic-500 sm:max-w-[62ch] md:m-auto md:mb-16 md:text-balance md:px-2 md:text-center md:text-lg">
          Att söka i offentliga register kan vara både tidskrävande och kostsamt. Med vår blixtsnabba sökmotor får du tillgång till relevant
          information på ett ögonblick – och till en bråkdel av vad du normalt betalar.
        </p>

        <Command className="rounded-xl border shadow-xl" shouldFilter={false}>
          <ReactTyped
            strings={[
              'Sök företagsnamn',
              'Sök org. nummer',
              'Sök bankgiro',
              'Sök address',
              'Sök e-post',
              'Sök telefonnummer',
              'Sök LEI',
              'Sök verksamhetsbeskrivning',
              'Sök SNI',
              'Sök börsbolag',
              'Sök ISIN',
            ]}
            typeSpeed={40}
            backSpeed={50}
            attr="placeholder"
            loop
          >
            <CommandInput placeholder="Sök" value={value} onValueChange={setValue} />
          </ReactTyped>
          <CommandList className="h-96">
            {value !== '' ? (
              <>
                {companies?.length > 0 ? (
                  <>
                    <CommandGroup>
                      {companies.map((company) => {
                        if (!company.document) return null;

                        return (
                          <>
                            <CommandItem key={company.document.id} className="grid gap-2">
                              <div>
                                <div className="text-base">
                                  {(company.document.names || []).length > 0
                                    ? uniqBy(company.document.names, 'nameOrIdentifier').map((name, index) => {
                                        if (!company.document) return null;
                                        return (
                                          <Fragment key={index}>
                                            {name.nameOrIdentifier || '-'}
                                            {index < uniqBy(company.document.names, 'nameOrIdentifier').length - 1 && ', '}
                                          </Fragment>
                                        );
                                      })
                                    : null}
                                </div>

                                {(company.document.sniCodes || []).length > 0
                                  ? (() => {
                                      const uniqueSniCodes = uniqBy(company.document.sniCodes, 'sni_2007Name');
                                      const sniNames = uniqueSniCodes
                                        .map((sniCode) => sniCode.sni_2007Name)
                                        .filter((name): name is string => Boolean(name));
                                      const formattedSniNames = new Intl.ListFormat('sv-SE', {
                                        style: 'long',
                                        type: 'conjunction',
                                      }).format(sniNames);
                                      return (
                                        <div className="text-pretty text-sm lowercase text-tic-600 first-letter:uppercase">
                                          {formattedSniNames}.
                                        </div>
                                      );
                                    })()
                                  : null}
                              </div>

                              <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
                                <div className="space-y-1">
                                  <span className="block text-sm leading-tight text-slate-500">Reg. nummer</span>
                                  <div className="text-sm leading-tight">{company.document.registrationNumber || '-'}</div>
                                </div>

                                <div className="space-y-1">
                                  <span className="block text-sm leading-tight text-slate-500">Reg. datum</span>
                                  <div className="text-sm leading-tight">
                                    {company.document.registrationDate
                                      ? new Date(company.document.registrationDate * 1000).toLocaleDateString('sv-SE')
                                      : '-'}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <span className="block text-sm leading-tight text-slate-500">Omsättning</span>
                                  <div className="text-sm leading-tight">
                                    {company.document.mostRecentFinancialSummary?.rs_NetSalesK
                                      ? asMoney(company.document.mostRecentFinancialSummary?.rs_NetSalesK * 1000)
                                      : '-'}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <span className="block text-sm leading-tight text-slate-500">Resultat</span>
                                  <div
                                    className={cn('text-sm leading-tight', {
                                      'text-green-600':
                                        company.document.mostRecentFinancialSummary?.rs_ProfitAfterFinancialItemsK &&
                                        company.document.mostRecentFinancialSummary?.rs_ProfitAfterFinancialItemsK > 0,
                                      'text-red-600':
                                        company.document.mostRecentFinancialSummary?.rs_ProfitAfterFinancialItemsK &&
                                        company.document.mostRecentFinancialSummary?.rs_ProfitAfterFinancialItemsK < 0,
                                    })}
                                  >
                                    {company.document.mostRecentFinancialSummary?.rs_ProfitAfterFinancialItemsK
                                      ? asMoney(company.document.mostRecentFinancialSummary?.rs_ProfitAfterFinancialItemsK * 1000)
                                      : '-'}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <span className="flex gap-1 text-sm leading-tight text-slate-500">Vinstmarginal</span>
                                  <div
                                    className={cn('text-sm leading-tight', {
                                      'text-green-600':
                                        company.document.mostRecentFinancialSummary?.km_NetProfitMargin &&
                                        company.document.mostRecentFinancialSummary?.km_NetProfitMargin > 0,
                                      'text-red-600':
                                        company.document.mostRecentFinancialSummary?.km_NetProfitMargin &&
                                        company.document.mostRecentFinancialSummary?.km_NetProfitMargin < 0,
                                    })}
                                  >
                                    {company.document.mostRecentFinancialSummary?.km_NetProfitMargin
                                      ? asPercentage(company.document.mostRecentFinancialSummary?.km_NetProfitMargin * 100)
                                      : '-'}
                                  </div>
                                </div>

                                {/* Contact Information */}
                                {/* <div>
                                  <div className="space-y-1">
                                    <span className="block text-sm leading-tight text-slate-500">Stad</span>
                                    <div className="text-sm leading-tight">
                                      {company.document.addresses.length > 0
                                        ? uniqBy(company.document.addresses, 'city').map((address, index) => (
                                            <span key={index}>
                                              {address.city || '-'}
                                              {index < uniqBy(company.document.addresses, 'city').length - 1 && ', '}
                                            </span>
                                          ))
                                        : '-'}
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <span className="block text-sm leading-tight text-slate-500">Telefonnummer</span>
                                    <div className="text-sm leading-tight">
                                      {company.document.phoneNumbers.length > 0
                                        ? uniqBy(company.document.phoneNumbers, 'e164PhoneNumber').map((phoneNumber, index) => (
                                            <span key={index}>
                                              {phoneNumber.e164PhoneNumber || '-'}
                                              {index < uniqBy(company.document.phoneNumbers, 'e164PhoneNumber').length - 1 && ', '}
                                            </span>
                                          ))
                                        : '-'}
                                    </div>
                                  </div>
                                </div> */}
                              </div>
                            </CommandItem>
                            <CommandSeparator />
                          </>
                        );
                      })}
                    </CommandGroup>
                  </>
                ) : (
                  <CommandEmpty className="text-pretty p-4 text-sm text-tic-500">Inga resultat hittades.</CommandEmpty>
                )}
              </>
            ) : (
              <>
                <Skeleton className="m-1 h-28 rounded-lg" />
                <Skeleton className="m-1 h-28 rounded-lg" />
              </>
            )}
          </CommandList>
        </Command>

        <div
          className={cn('ml-4 mt-3 text-sm text-tic-500 transition-opacity', {
            'opacity-0': !found,
          })}
        >
          Visar {(found || 0) > 10 ? 10 : found} av {found} resultat på {searchTimeMs} ms
        </div>
      </div>
    </div>
  );
};
