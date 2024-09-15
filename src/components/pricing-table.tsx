import { Check, Minus, X } from 'lucide-react';
import React from 'react';

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PLANS = [
  {
    title: 'Total kostnad per månad',
    Free: '0 kr',
    Basic: '995 kr',
    Premium: 'Från 3995 kr > (begär offert)',
  },
  {
    title: 'Betala med',
    Free: 'Kort',
    Basic: 'Kort',
    Premium: 'Kort eller faktura',
  },
  {
    title: 'Max antal API-anrop / frågor per månad',
    Free: '2,000',
    Basic: '5,000',
    Premium: 'Obegränsat',
  },
  {
    title: 'Validera ditt konto med BankID och få fler anrop per månad',
    Free: '4,000',
    Basic: '7,000',
    Premium: 'Obegränsat',
  },
  {
    title: "Maximala antalet företag du kan 'hämta per månad'",
    Free: '200,000',
    Basic: '500,000',
    Premium: 'Obegränsat',
  },
  {
    title: 'Antal API-anrop per sekund',
    Free: '4',
    Basic: '8',
    Premium: '16',
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
    Free: 'Senaste räkenskapsåret',
    Basic: 'Senaste räkenskapsåret',
    Premium: 'Fyra år',
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
    Basic: 'Ja via chatt och e-post',
    Premium: 'Dedikerad resurs telefon, e-post, chatt',
  },
  {
    title: 'Kreditupplysning privatperson / företag (med omfrågekopia)',
    Free: '49 kr',
    Basic: '39 kr',
    Premium: '19 kr',
  },
];

export const PricingTable = () => {
  return (
    <div className="container">
      <Table>
        <TableCaption>Pricing Plans Comparison</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2"></TableHead>
            <TableHead className="!m-0 !p-0">
              <div className="min-h-12 rounded-t-lg border-x border-t border-tic-stroke bg-tic-fill p-8 pb-4 text-center text-2xl text-tic">
                Free
              </div>
            </TableHead>
            <TableHead />
            <TableHead className="!m-0 !p-0">
              <div className="min-h-12 rounded-t-lg border-x border-t border-tic-stroke bg-tic-fill p-8 pb-4 text-center text-2xl text-tic">
                Basic
              </div>
            </TableHead>
            <TableHead />
            <TableHead className="!m-0 !p-0">
              <div className="min-h-12 rounded-t-lg border-x border-t border-tic-stroke bg-tic-fill p-8 pb-4 text-center text-2xl text-tic">
                Premium
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PLANS.map((plan, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{plan.title}</TableCell>
              <TableCell className="border-x border-x-tic-stroke bg-tic-fill text-center">
                {typeof plan.Free === 'boolean' ? plan.Free ? <Check className="h-4 w-4" /> : <Minus className="h-4 w-4" /> : plan.Free}
              </TableCell>
              <TableCell />
              <TableCell className="border-x border-x-tic-stroke bg-tic-fill text-center">
                {typeof plan.Basic === 'boolean' ? plan.Basic ? <Check className="h-4 w-4" /> : <Minus className="h-4 w-4" /> : plan.Basic}
              </TableCell>
              <TableCell />
              <TableCell className="border-x border-x-tic-stroke bg-tic-fill text-center">
                {typeof plan.Premium === 'boolean' ? (
                  plan.Premium ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Minus className="h-4 w-4" />
                  )
                ) : (
                  plan.Premium
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
