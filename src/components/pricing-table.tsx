import { Locale } from '@/i18n-config';
import { CheckIcon } from '@/icons/check';

import { InfoIcon, Minus } from 'lucide-react';
import React from 'react';

import { asMoney, asNumber, cn } from '@/lib/utils';

import { ListItem } from '@/components/list-item';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { GetStartedButton } from './get-started-button';
import { SecionTitle } from './section-title';

const PLANS = [
  {
    title: 'Total kostnad per månad',
    Free: '0 kr',
    Basic: asMoney(995),
    Premium: (
      <Popover>
        <PopoverTrigger className="inline-flex items-center gap-1">
          Från {asMoney(3995)}
          <InfoIcon className="h-4 w-4 text-tic-500" />
        </PopoverTrigger>
        <PopoverContent className="w-auto px-3 py-2 text-sm">
          <p>Begär offert</p>
        </PopoverContent>
      </Popover>
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
    title: (
      <>
        Sök företagsinformation och gör urval via vår blixtsnabba sökmotor
        <Dialog>
          <DialogTrigger>
            <InfoIcon className="ml-1 h-4 w-4 text-tic-500" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sök företagsinformation och gör urval via vår blixtsnabba sökmotor</DialogTitle>
              <DialogDescription>
                <ul>
                  <ListItem>Namn, bifirma</ListItem>
                  <ListItem>Telefonnummer</ListItem>
                  <ListItem>Address</ListItem>
                  <ListItem>SNI-koder och verksamhetsbeskrivning</ListItem>
                  <ListItem>Webblänkar till hemsida</ListItem>
                  <ListItem>Momsregistrering</ListItem>
                  <ListItem>Registrerad som arbetsgivare</ListItem>
                  <ListItem>Registrerad för F-skatt</ListItem>
                  <ListItem>Bankgiro- och Plusgiro-uppgifter</ListItem>
                  <ListItem>
                    Omsättning, rörelseresultat, finansiella intäkter&kostnader, resultat efter finansiella kostnader och intäkter,
                    tillgångar, anställda, rörelsemarginal, vinstmarginal, soliditet, bruttomarginal, revisor (ja/nej)
                  </ListItem>
                </ul>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    ),
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
      <Popover>
        <PopoverTrigger className="inline-flex items-center gap-1">
          1 år
          <InfoIcon className="h-4 w-4 text-tic-500" />
        </PopoverTrigger>
        <PopoverContent className="w-auto px-3 py-2 text-sm">
          <p>Senaste räkenskapsåret</p>
        </PopoverContent>
      </Popover>
    ),
    Basic: (
      <Popover>
        <PopoverTrigger className="inline-flex items-center gap-1">
          1 år
          <InfoIcon className="h-4 w-4 text-tic-500" />
        </PopoverTrigger>
        <PopoverContent className="w-auto px-3 py-2 text-sm">
          <p>Senaste räkenskapsåret</p>
        </PopoverContent>
      </Popover>
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
  {
    title: 'Köp till fler anrop +2000',
    Free: asMoney(1000),
    Basic: asMoney(500),
    Premium: 'Obegränsat',
  },
  {
    title: 'Köp till fler anrop +10000',
    Free: asMoney(3000),
    Basic: asMoney(1500),
    Premium: 'Obegränsat',
  },
];

export const PricingTable = ({ region }: { region: Locale }) => {
  return (
    <div className="container">
      <SecionTitle>Jämför detaljerna.</SecionTitle>
      <Table>
        <TableHeader>
          <TableRow className="!border-b-0 hover:bg-transparent">
            <TableHead className="w-3/6"></TableHead>
            <TableHead className="!m-0 w-1/6 !p-0">
              <div className="text-tic min-h-12 rounded-t-lg border-x border-t border-tic-100 bg-[#F6F6F7]/40 p-8 pb-6 text-center text-2xl">
                <div className="mb-4">Free</div>
                <GetStartedButton plan="Free" region={region} />
              </div>
            </TableHead>
            <TableHead />
            <TableHead className="!m-0 w-1/6 !p-0">
              <div className="text-tic min-h-12 rounded-t-lg border-x border-t border-tic-100 bg-[#F6F6F7]/40 p-8 pb-6 text-center text-2xl">
                <div className="mb-4">Basic</div>
                <GetStartedButton plan="Basic" region={region} />
              </div>
            </TableHead>
            <TableHead />
            <TableHead className="!m-0 w-1/6 !p-0">
              <div className="text-tic min-h-12 rounded-t-lg border-x border-t border-tic-100 bg-[#F6F6F7]/40 p-8 pb-6 text-center text-2xl">
                <div className="mb-4">Premium</div>
                <GetStartedButton plan="Premium" region={region} />
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
                <TableCell>{plan.title}</TableCell>

                <TableCell className="border-x border-tic-100 bg-[#F6F6F7]/40 text-center">
                  {typeof plan.Free === 'boolean' ? (
                    plan.Free ? (
                      <CheckIcon className="inline h-4 w-4 flex-shrink-0" />
                    ) : (
                      <Minus className="inline h-4 w-4 flex-shrink-0 text-tic-500" />
                    )
                  ) : (
                    plan.Free
                  )}
                </TableCell>

                <TableCell />

                <TableCell className="border-x border-tic-100 bg-[#F6F6F7]/40 text-center">
                  {typeof plan.Basic === 'boolean' ? (
                    plan.Basic ? (
                      <CheckIcon className="inline h-4 w-4 flex-shrink-0" />
                    ) : (
                      <Minus className="inline h-4 w-4 flex-shrink-0 text-tic-500" />
                    )
                  ) : (
                    plan.Basic
                  )}
                </TableCell>

                <TableCell />

                <TableCell className="border-x border-tic-100 bg-[#F6F6F7]/40 text-center">
                  {typeof plan.Premium === 'boolean' ? (
                    plan.Premium ? (
                      <CheckIcon className="inline h-4 w-4 flex-shrink-0" />
                    ) : (
                      <Minus className="inline h-4 w-4 flex-shrink-0 text-tic-500" />
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
              <div className="h-8 rounded-b-lg border-x border-b border-tic-100 bg-[#F6F6F7]/40 text-center text-2xl" />
            </TableCell>
            <TableCell />
            <TableCell className="!m-0 !p-0">
              <div className="h-8 rounded-b-lg border-x border-b border-tic-100 bg-[#F6F6F7]/40 text-center text-2xl" />
            </TableCell>
            <TableCell />
            <TableCell className="!m-0 !p-0">
              <div className="h-8 rounded-b-lg border-x border-b border-tic-100 bg-[#F6F6F7]/40 text-center text-2xl" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
