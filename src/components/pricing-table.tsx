import { Check, InfoIcon, Minus, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { asMoney, asNumber, cn } from '@/lib/utils';

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Button } from './ui/button';

const PLANS = [
  {
    title: 'Total kostnad per månad',
    Free: '0 kr',
    Basic: asMoney(995),
    Premium: (
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center gap-1">
          Från {asMoney(3995)}
          <InfoIcon className="h-3 w-3 text-tic-light" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Begär offert</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    title: 'Betala med',
    Free: 'Kort',
    Basic: 'Kort',
    Premium: 'Kort eller faktura',
  },
  {
    title: 'Max antal API-anrop / frågor per månad',
    Free: asNumber(2000),
    Basic: asNumber(5000),
    Premium: 'Obegränsat',
  },
  {
    title: 'Validera ditt konto med BankID och få fler anrop per månad',
    Free: asNumber(4000),
    Basic: asNumber(7000),
    Premium: 'Obegränsat',
  },
  {
    title: "Maximala antalet företag du kan 'hämta per månad'",
    Free: asNumber(200000),
    Basic: asNumber(500000),
    Premium: 'Obegränsat',
  },
  {
    title: 'Antal API-anrop per sekund',
    Free: asNumber(4),
    Basic: asNumber(8),
    Premium: asNumber(16),
  },
  {
    title: 'Sök företagsinformation och gör urval via vår blixtsnabba sökmotor',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Namn, bifirma',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Telefonnummer',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Address',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'SNI-koder och verksamhetsbeskrivning',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Webblänkar till hemsida',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Momsregistrering',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Registrerad som arbetsgivare',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Registrerad för F-skatt',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Bankgiro- och plusgiro uppgifter',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title:
      'Omsättning, rörelseresultat, finansiella intäkter&kostnader, resultat efter finansiella kostnader och intäkter, tillgångar, anställda, rörelsemarginal, vinstmarginal, soliditet, bruttomarginal, revisor (ja/nej)',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Intelligence Score (företagsupplysning / betygssätter brister och fel i både finansiell och annan data)',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Ekonomisk översikt',
    Free: (
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center gap-1">
          1 år
          <InfoIcon className="h-3 w-3 text-tic-light" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Senaste räkenskapsåret</p>
        </TooltipContent>
      </Tooltip>
    ),
    Basic: (
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center gap-1">
          1 år
          <InfoIcon className="h-3 w-3 text-tic-light" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Senaste räkenskapsåret</p>
        </TooltipContent>
      </Tooltip>
    ),
    Premium: '4 år',
  },
  {
    title: 'Ekonomiska detaljer (samtliga tillgängliga år)',
    Free: false,
    Basic: false,
    Premium: true,
  },
  {
    title: 'Ladda ner digitala årsredovisningar PDF/XBRL/iXBRL',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Ladda ner alla årsredovisningar PDF/XBRL/iXBRL/JSON',
    Free: false,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Sök text i årsredovisningar med vår blixtsnabba sökmotor',
    Free: false,
    Basic: false,
    Premium: true,
  },
  {
    title: 'Verklig huvudman',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Aktuella företrädare',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Historisk data och ärendeförteckning (företrädare, adress, namn, SNI-kod m.m)',
    Free: false,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Domän- och sociala profiler',
    Free: false,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Domänförändringar (DNS)',
    Free: false,
    Basic: false,
    Premium: true,
  },
  {
    title: 'Tech stack (vilka produkter använder företaget)',
    Free: false,
    Basic: false,
    Premium: true,
  },
  {
    title: 'Telefonnummer och porteringar',
    Free: false,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Franchisetillhörighet',
    Free: false,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Offentliga inköp (kommuner, regioner, myndigheter, universitet, högskolor)',
    Free: false,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Varumärken och patent',
    Free: false,
    Basic: false,
    Premium: true,
  },
  {
    title: 'LEI och andra registreringar',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Anställningsstöd',
    Free: false,
    Basic: false,
    Premium: true,
  },
  {
    title: 'Bidrag',
    Free: false,
    Basic: false,
    Premium: true,
  },
  {
    title: 'Webhooks/Bevakning (även via e-post)',
    Free: true,
    Basic: true,
    Premium: true,
  },
  {
    title: 'Support',
    Free: false,
    Basic: 'Chatt och e-post',
    Premium: 'Dedikerad resurs telefon, e-post, chatt',
  },
  {
    title: 'Kreditupplysning privatperson / företag (med omfrågekopia)',
    Free: asMoney(49),
    Basic: asMoney(39),
    Premium: asMoney(19),
  },
];

export const PricingTable = () => {
  return (
    <div className="container">
      <h2 className="mb-14 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Jämför detaljerna.</h2>
      <Table>
        {/* <TableCaption>Pricing Plans Comparison</TableCaption> */}
        <TableHeader>
          <TableRow className="!border-b-0 hover:bg-transparent">
            <TableHead className="w-1/2"></TableHead>
            <TableHead className="!m-0 !p-0">
              <div className="min-h-12 rounded-t-lg border-x border-t border-tic-stroke bg-tic-fill p-8 pb-6 text-center text-2xl text-tic">
                <div>Free</div>
                <Button asChild variant="outline">
                  <Link href="#" className="mt-4 block text-base">
                    Kom igång gratis
                  </Link>
                </Button>
              </div>
            </TableHead>
            <TableHead />
            <TableHead className="!m-0 !p-0">
              <div className="min-h-12 rounded-t-lg border-x border-t border-tic-stroke bg-tic-fill p-8 pb-6 text-center text-2xl text-tic">
                <div>Basic</div>
                <Button asChild>
                  <Link href="#" className="mt-4 block text-base">
                    Skapa konto
                  </Link>
                </Button>
              </div>
            </TableHead>
            <TableHead />
            <TableHead className="!m-0 !p-0">
              <div className="min-h-12 rounded-t-lg border-x border-t border-tic-stroke bg-tic-fill p-8 pb-6 text-center text-2xl text-tic">
                <div>Premium</div>
                <Button asChild>
                  <Link href="#" className="mt-4 block text-base">
                    Kontakta sälj
                  </Link>
                </Button>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {PLANS.map((plan, index) => {
            const isLast = index === PLANS.length - 1;

            return (
              <TableRow
                key={index}
                className={cn({
                  '!border-b-0': isLast,
                })}
              >
                <TableCell className="font-medium">{plan.title}</TableCell>

                <TableCell className="border-x border-x-tic-stroke bg-tic-fill text-center">
                  {typeof plan.Free === 'boolean' ? (
                    plan.Free ? (
                      <Check className="inline h-4 w-4 text-tic-purple" />
                    ) : (
                      <Minus className="inline h-4 w-4 text-tic-purple" />
                    )
                  ) : (
                    plan.Free
                  )}
                </TableCell>

                <TableCell />

                <TableCell className="border-x border-x-tic-stroke bg-tic-fill text-center">
                  {typeof plan.Basic === 'boolean' ? (
                    plan.Basic ? (
                      <Check className="inline h-4 w-4 text-tic-purple" />
                    ) : (
                      <Minus className="inline h-4 w-4 text-tic-purple" />
                    )
                  ) : (
                    plan.Basic
                  )}
                </TableCell>

                <TableCell />

                <TableCell className="border-x border-x-tic-stroke bg-tic-fill text-center">
                  {typeof plan.Premium === 'boolean' ? (
                    plan.Premium ? (
                      <Check className="inline h-4 w-4 text-tic-purple" />
                    ) : (
                      <Minus className="inline h-4 w-4 text-tic-purple" />
                    )
                  ) : (
                    plan.Premium
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow className="hover:bg-transparent">
            <TableCell className="w-1/2"></TableCell>
            <TableCell className="!m-0 !p-0">
              <div className="h-8 rounded-b-lg border-x border-b border-tic-stroke bg-tic-fill text-center text-2xl text-tic" />
            </TableCell>
            <TableCell />
            <TableCell className="!m-0 !p-0">
              <div className="h-8 rounded-b-lg border-x border-b border-tic-stroke bg-tic-fill text-center text-2xl text-tic" />
            </TableCell>
            <TableCell />
            <TableCell className="!m-0 !p-0">
              <div className="h-8 rounded-b-lg border-x border-b border-tic-stroke bg-tic-fill text-center text-2xl text-tic" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
