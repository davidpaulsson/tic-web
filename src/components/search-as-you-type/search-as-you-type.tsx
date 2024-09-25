'use client';

import { useState } from 'react';
import { ReactTyped } from 'react-typed';

import { asMoney, asNumber, asPercentage, cn } from '@/lib/utils';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

import { SecionTitle } from '../section-title';
import { Badge } from '../ui/badge';
import { useSearch } from './use-search';

export const SearchAsYouType = () => {
  const [value, setValue] = useState('');
  const { companies, found, searchTimeMs } = useSearch({
    query: value,
  });

  return (
    <div className="container">
      <div className="bg-tic-200 rounded-2xl p-6 md:p-12 md:!pb-6">
        <h3 className="text-lg">Bygg en intuitiv sökupplevelse på nolltid.</h3>
        <p className="mb-24 max-w-prose text-balance opacity-50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa minus cum aliquam doloribus debitis.
        </p>

        <Command className="rounded-xl border shadow-xl" shouldFilter={false}>
          <ReactTyped
            strings={[
              'Sök företagsnamn',
              'Sök organisationsnummer',
              'Sök bankgiro',
              'Sök gatuaddress',
              'Sök e-post',
              'Sök telefonnummer',
              'Sök verksamhetsbeskrivning',
              'Sök LEI-kod',
              'Sök SNI näringsgren (beskrivning)',
              'Sök börsbolag kortnamn',
              'Sök ISIN-kod',
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
                    <CommandGroup heading="Företag">
                      {companies.map((company) => (
                        <CommandItem key={company.document.id} className="grid gap-2 md:gap-4">
                          <div className="text-base">{company.document.names[0]?.nameOrIdentifier || '-'}</div>

                          <div className="grid grid-cols-2 gap-2 space-y-2 md:grid-cols-4 md:gap-4 md:space-y-0">
                            {/* Company Information */}
                            <div>
                              <span className="mb-2 block text-sm leading-none text-slate-500">Registreringsnummer</span>
                              <span className="block text-sm leading-none">{company.document.registrationNumber || '-'}</span>
                            </div>
                            <div>
                              <span className="mb-2 block text-sm leading-none text-slate-500">Registreringsdatum</span>
                              <span className="block text-sm leading-none">
                                {company.document.registrationDate
                                  ? new Date(company.document.registrationDate * 1000).toLocaleDateString('sv-SE')
                                  : '-'}
                              </span>
                            </div>
                            <div>
                              <span className="mb-2 block text-sm leading-none text-slate-500">SNI-kod</span>
                              <span className="block text-sm leading-none">
                                {company.document.sniCodes[0]?.sni_2007Code || '-'} - {company.document.sniCodes[0]?.sni_2007Name || '-'}
                              </span>
                            </div>
                            <div>
                              <span className="mb-2 block text-sm leading-none text-slate-500">Stad</span>
                              <span className="block text-sm leading-none">{company.document.addresses[0]?.city || '-'}</span>
                            </div>

                            {/* Financial Information */}
                            <div>
                              <span className="mb-2 block text-sm leading-none text-slate-500">Omsättning</span>
                              <span className="block text-sm leading-none">
                                {company.document.mostRecentFinancialSummary?.rs_NetSalesK
                                  ? asMoney(company.document.mostRecentFinancialSummary?.rs_NetSalesK * 1000)
                                  : '-'}
                              </span>
                            </div>
                            <div>
                              <span className="mb-2 block text-sm leading-none text-slate-500">Resultat efter finansiella poster</span>
                              <span className="block text-sm leading-none">
                                {company.document.mostRecentFinancialSummary?.rs_ProfitAfterFinancialItemsK
                                  ? asMoney(company.document.mostRecentFinancialSummary?.rs_ProfitAfterFinancialItemsK * 1000)
                                  : '-'}
                              </span>
                            </div>
                            <div>
                              <span className="mb-2 block text-sm leading-none text-slate-500">Vinstmarginal (%)</span>
                              <span className="block text-sm leading-none">
                                {company.document.mostRecentFinancialSummary?.km_NetProfitMargin
                                  ? asPercentage(company.document.mostRecentFinancialSummary?.km_NetProfitMargin)
                                  : '-'}
                              </span>
                            </div>

                            {/* Contact Information */}
                            <div>
                              <span className="mb-2 block text-sm leading-none text-slate-500">Telefonnummer</span>
                              <span className="block text-sm leading-none">{company.document.phoneNumbers[0]?.e164PhoneNumber || '-'}</span>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                ) : (
                  <CommandEmpty className="text-pretty p-4 text-sm text-red-500">No results found.</CommandEmpty>
                )}
              </>
            ) : null}
          </CommandList>
        </Command>

        <div
          className={cn('mt-3 text-sm opacity-75 transition-opacity', {
            'opacity-0': !found,
          })}
        >
          Visar {(found || 0) > 10 ? 10 : found} av {found} resultat på {searchTimeMs} ms
        </div>
      </div>
    </div>
  );
};
