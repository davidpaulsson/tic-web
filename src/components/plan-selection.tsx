import { CheckIcon } from 'lucide-react';
import Link from 'next/link';

import { asMoney } from '@/lib/utils';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from './ui/button';

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mb-3 flex gap-3 last:mb-0">
    <CheckIcon className="mt-1 inline h-4 w-4 flex-shrink-0 text-tic-purple" /> {children}
  </li>
);

export const PlanSelection = () => {
  return (
    <div className="container">
      <h2 className="mb-14 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Välj abonnemang och kom igång gratis redan idag.</h2>
      <ul className="grid gap-8 md:grid-cols-3">
        <li>
          <Card>
            <CardHeader>
              <CardTitle>
                Free
                <span className="block text-tic-lighter">
                  Gratis <span className="text-base">Betalkort krävs ej</span>
                </span>
              </CardTitle>
              <CardDescription>Använd vår snabba sökmotor direkt.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                <ListItem>Sök företagsinfo med namn, adress, bankkonto, telefonnummer och mer</ListItem>
                <ListItem>Ekonomisk översikt senaste räkenskapsåret</ListItem>
                <ListItem>Företrädare</ListItem>
                <ListItem>Ladda ner alla digitalt inlämnade årsredovisningar i PDF-, XBRL-, iXBRL- eller JSON-format</ListItem>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild={true} variant="outline">
                <Link href="#" className="mt-4 block text-base">
                  Kom igång gratis
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </li>
        <li>
          <Card>
            <CardHeader>
              <CardTitle>
                Basic
                <span className="block text-tic-lighter">
                  {asMoney(995)} <span className="text-base">/mån</span>
                </span>
              </CardTitle>
              <CardDescription>Använd vår snabba sökmotor direkt.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                <ListItem>Sök företagsinfo med namn, adress, bankkonto, telefonnummer och mer</ListItem>
                <ListItem>Ekonomisk översikt senaste räkenskapsåret</ListItem>
                <ListItem>Företrädare</ListItem>
                <ListItem>Ladda ner alla digitalt inlämnade årsredovisningar i PDF-, XBRL-, iXBRL- eller JSON-format</ListItem>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="#" className="mt-4 block text-base">
                  Skapa ett konto
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </li>

        <li>
          <Card>
            <CardHeader>
              <CardTitle>
                Premium
                <span className="block text-tic-lighter">
                  Från {asMoney(3995)} <span className="text-base">/mån</span>
                </span>
              </CardTitle>
              <CardDescription>Använd vår snabba sökmotor direkt.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                <ListItem>Sök företagsinfo med namn, adress, bankkonto, telefonnummer och mer</ListItem>
                <ListItem>Ekonomisk översikt senaste räkenskapsåret</ListItem>
                <ListItem>Företrädare</ListItem>
                <ListItem>Ladda ner alla digitalt inlämnade årsredovisningar i PDF-, XBRL-, iXBRL- eller JSON-format</ListItem>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="#" className="mt-4 block text-base">
                  Kontakta sälj
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </li>
      </ul>
    </div>
  );
};
