import Link from 'next/link';

import { Button } from './ui/button';

export const GetStartedButton = ({ plan }: { plan: 'Free' | 'Basic' | 'Premium' }) => {
  switch (plan) {
    case 'Free':
      return (
        <Button asChild={true} variant="outline">
          <Link href="#" className="mt-4 block text-base">
            Kom igång gratis
          </Link>
        </Button>
      );
    case 'Basic':
      return (
        <Button asChild>
          <Link href="#" className="mt-4 block text-base">
            Skapa ett konto
          </Link>
        </Button>
      );
    case 'Premium':
      return (
        <Button asChild>
          <Link href="#" className="mt-4 block text-base">
            Kontakta sälj
          </Link>
        </Button>
      );
    default:
      return null;
  }
};
