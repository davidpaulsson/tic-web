'use client';

import { useState } from 'react';
import { ReactTyped } from 'react-typed';

import { cn } from '@/lib/utils';

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
      <div className="rounded-2xl bg-[#ECECE7] p-6 md:p-12 md:!pb-6">
        <h3 className="text-lg">Bygg en intuitiv sökupplevelse på nolltid.</h3>
        <p className="mb-24 max-w-prose text-balance opacity-75">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa minus cum aliquam doloribus debitis.
        </p>

        <Command className="rounded-lg border shadow-md dark:border-slate-800" shouldFilter={false}>
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
            <CommandInput placeholder="Testa vår sök" value={value} onValueChange={setValue} />
          </ReactTyped>
          <CommandList className="h-96">
            {value !== '' ? (
              <>
                {companies?.length > 0 ? (
                  <>
                    <CommandGroup heading="Companies">
                      {companies.map((company) => (
                        <CommandItem key={company.document.id} className="grid gap-2 md:gap-4">
                          <div className="block text-sm font-bold">{company.document.names[0]?.nameOrIdentifier || '-'}</div>
                          <div className="grid gap-2 space-y-2 md:grid-cols-3 md:gap-4 md:space-y-0">
                            <div>
                              <span className="mb-2 block text-xs leading-none text-slate-500">Reg. number</span>
                              <span className="block text-sm leading-none">{company.document.registrationNumber}</span>
                            </div>
                            <div>
                              <span className="mb-2 block text-xs leading-none text-slate-500">City</span>
                              <span className="block text-sm leading-none">{company.document.addresses[0]?.city || '-'}</span>
                            </div>
                            <div>
                              <span className="mb-2 block text-xs leading-none text-slate-500">Phone number</span>
                              <span className="block text-sm leading-none">{company.document.phoneNumbers[0]?.e164PhoneNumber || '-'}</span>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                ) : (
                  <CommandEmpty className="text-pretty p-4 text-sm text-red-500 dark:text-red-400">No results found.</CommandEmpty>
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
