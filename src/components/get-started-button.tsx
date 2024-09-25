import { AccountIcon } from '@/icons/account';
import { StartIcon } from '@/icons/start';

import Link from 'next/link';

import { REGIONS } from '@/lib/constants';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { ContactSales } from './contact-sales';
import { GetStartedForFree } from './get-started-for-free';
import { Button } from './ui/button';

export const GetStartedButton = ({ plan, region }: { plan: 'Free' | 'Basic' | 'Premium'; region: (typeof REGIONS)[number] }) => {
  switch (plan) {
    case 'Free':
      return (
        <Dialog>
          <DialogTrigger>
            <Button asChild variant="outline" className="text-base">
              <span>Kom igång gratis</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-0 flex flex-col items-center justify-center text-center text-xl">
                <StartIcon className="mb-2 size-8" />
                Kom igång gratis
              </DialogTitle>
              <DialogDescription className="pb-4 text-center">
                Nu är du bara ett steg ifrån att komma igång med TIC. Fyll i ditt mobilnummer eller din e-postadress nedan så skickar vi en
                länk som hjälper dig vidare. Varmt välkommen!
              </DialogDescription>
              <GetStartedForFree region={region} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    case 'Basic':
      return (
        <Dialog>
          <DialogTrigger>
            <Button asChild className="text-base">
              <span>Skapa ett konto</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-0 flex flex-col items-center justify-center text-center text-xl">
                <AccountIcon className="mb-2 size-8" />
                Skapa ett konto
              </DialogTitle>
              <DialogDescription className="pb-4 text-center">
                Nu är du bara ett steg ifrån att komma igång med TIC. Fyll i ditt mobilnummer eller din e-postadress nedan så skickar vi en
                länk som hjälper dig vidare. Varmt välkommen!
              </DialogDescription>
              <GetStartedForFree region={region} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    case 'Premium':
      return (
        <Dialog>
          <DialogTrigger>
            <Button asChild className="text-base">
              <span>Kontakta sälj</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-0 flex flex-col items-center justify-center text-center text-xl">
                <AccountIcon className="mb-2 size-8" />
                Kontakta sälj
              </DialogTitle>
              <DialogDescription className="pb-4 text-center">
                Nu är du bara ett steg ifrån att komma igång med TIC. Fyll i formuläret nedan så kontaktar vi dig inom kort. Varmt
                välkommen!
              </DialogDescription>
              <ContactSales region={region} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    default:
      return null;
  }
};
