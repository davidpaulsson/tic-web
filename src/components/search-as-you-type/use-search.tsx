import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

import { components } from '@/types/tic';

export const useSearch = ({ query = '*' }: { query?: string }) => {
  const [companies, setCompanies] = useState<components['schemas']['TypesenseCompanyDocumentHit'][]>([]);
  const [found, setFound] = useState<number | undefined>();
  const [searchTimeMs, setSearchTimeMs] = useState<number | undefined>();
  const { data, status } = useQuery({
    queryKey: ['search-as-you-type', query],
    queryFn: async (): Promise<components['schemas']['TypesenseCompanyDocumentTypesenseSearchResponse']> => {
      if (query === '*' || query.trim() === '') {
        // Return an empty response if the query is empty
        return { hits: [] };
      } else {
        try {
          const queryBy = [
            'names.nameOrIdentifier',
            'addresses.street',
            'emailAddresses.emailAddress',
            'phoneNumbers.e164PhoneNumber',
            'mostRecentPurpose',
            'bankAccounts.accountNumber',
            'lei.leiCode',
            'registrationNumber',
            'sniCodes.sni_2007Name',
            'stock.isin',
            'stock.ticker',
          ].join(',');

          const response = await fetch(
            `https://api.tic.io/internal/search?q=${encodeURIComponent(query.trim() || '*')}&query_by=${encodeURIComponent(queryBy)}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_TIC_SEARCH_KEY!,
              },
            },
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }

          const json = await response.json();

          return json;
        } catch (error) {
          console.error('An error occurred while fetching results', error);

          throw error;
        }
      }
    },
  });

  useEffect(() => {
    if (status === 'success') {
      setCompanies(data.hits || []);
      setFound(data.found);
      setSearchTimeMs(data.search_time_ms);
    }
  }, [data, status]);

  return {
    companies,
    found,
    searchTimeMs,
  };
};
