import { Locale } from '@/i18n-config';

import { InfoIcon, PlusIcon } from 'lucide-react';

import { asMoney } from '@/lib/utils';

import { ListItem } from '@/components/list-item';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { GetStartedButton } from './get-started-button';
import { SecionTitle } from './section-title';

export const PlanSelection = ({ region }: { region: Locale }) => {
  return (
    <div className="container">
      <SecionTitle>Välj abonnemang och kom igång gratis redan idag.</SecionTitle>
      <ul className="grid gap-8 md:grid-cols-3">
        <li>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                Free
                <span className="block text-tic-500">
                  Gratis <span className="text-base">Betalkort krävs ej</span>
                </span>
              </CardTitle>
              <CardDescription>Använd vår snabba sökmotor direkt.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                <ListItem>Sök företagsinformation och gör urval via vår blixtsnabba sökmotor</ListItem>
                <ListItem>Intelligence Score (företagsupplysning / betygssätter brister och fel i både finansiell och annan data)</ListItem>
                <ListItem>Ekonomisk översikt - senaste räkenskapsåret</ListItem>
                <ListItem>Ladda ner digitala årsredovisningar PDF/XBRL/iXBRL</ListItem>
                <ListItem>Aktuella företrädare</ListItem>
                <ListItem>Webhooks/Bevakning (även via e-post)</ListItem>
              </ul>
            </CardContent>
            <CardFooter>
              <GetStartedButton plan="Free" region={region} />
            </CardFooter>
          </Card>
        </li>
        <li>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                Basic
                <span className="block text-tic-500">
                  {asMoney(995)} <span className="text-base">/mån</span>
                </span>
              </CardTitle>
              <CardDescription>För verksamheter med små behov.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                <ListItem>Ekonomisk översikt - senaste fyra räkenskapsåren</ListItem>
                <ListItem>Historisk data och ärendeförteckning (företrädare, adress, namn, SNI-kod m.m)</ListItem>
                <ListItem>Domän- och sociala profiler</ListItem>
                <ListItem>Ladda ner alla årsredovisningar PDF/XBRL/iXBRL/JSON</ListItem>
                <ListItem>Offentliga inköp (kommuner, regioner, myndigheter, universitet, högskolor)</ListItem>
                <ListItem>Telefonnummer och franchisetillhörighet</ListItem>
                <li className="mb-3 flex gap-3 text-tic-500 last:mb-0">
                  <PlusIcon className="mt-1 inline h-4 w-4 flex-shrink-0" /> <span>Samt samma möjligheter som Free</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <GetStartedButton plan="Basic" region={region} />
            </CardFooter>
          </Card>
        </li>

        <li>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                Premium
                <span className="block text-tic-500">
                  Från {asMoney(3995)} <span className="text-base">/mån</span>
                  <Popover>
                    <PopoverTrigger className="ml-2 inline-flex items-center gap-1">
                      <InfoIcon className="h-4 w-4 text-tic-500" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto px-3 py-2 text-sm">Begär offert</PopoverContent>
                  </Popover>
                </span>
              </CardTitle>
              <CardDescription>För verksamheter med stora behov.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                <ListItem>Ekonomiska detaljer (samtliga tillgängliga år)</ListItem>
                <ListItem>Domänförändringar (DNS)</ListItem>
                <ListItem>Tech stack (vilka produkter använder företaget)</ListItem>
                <ListItem>Varumärken och patent</ListItem>
                <ListItem>Sök text i årsredovisningar med vår blixtsnabba sökmotor</ListItem>
                <ListItem>Bidrag</ListItem>
                <li className="mb-3 flex gap-3 text-tic-500 last:mb-0">
                  <PlusIcon className="mt-1 inline h-4 w-4 flex-shrink-0" /> <span>Samt samma möjligheter som Basic</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <GetStartedButton plan="Premium" region={region} />
            </CardFooter>
          </Card>
        </li>
      </ul>
    </div>
  );
};
