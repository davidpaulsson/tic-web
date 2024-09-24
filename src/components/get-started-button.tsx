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
              <DialogTitle>Kom igång gratis</DialogTitle>
              <DialogDescription>
                <GetStartedForFree region={region} />
              </DialogDescription>
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
              <DialogTitle>Skapa ett konto</DialogTitle>
              <DialogDescription>
                <GetStartedForFree region={region} />
              </DialogDescription>
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
              <DialogTitle>Kontakta sälj</DialogTitle>
              <DialogDescription>
                <ContactSales region={region} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    default:
      return null;
  }
};
