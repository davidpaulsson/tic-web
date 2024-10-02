'use client';

import { Locale } from '@/i18n-config';
import { zodResolver } from '@hookform/resolvers/zod';

import confetti from 'canvas-confetti';
import { usePlausible } from 'next-plausible';
import { startTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { submitForm } from './get-started-for-free.action';

const dict = {
  en: {
    title: 'Get started for free',
    placeholder: 'Email or mobile number',
    invalid: 'Invalid email address or mobile number',
  },
  sv: {
    title: 'Börja kostnadsfritt',
    placeholder: 'E-post eller mobilnummer',
    invalid: 'Ogiltig e-postadress eller mobilnummer',
  },
};

export const GetStartedForFree = ({ region }: { region: Locale }) => {
  const plausible = usePlausible();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const formSchema = z.object({
    contact: z.union([z.string().email(dict[region].invalid), z.string().regex(/^\d+$/, dict[region].invalid)]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    plausible('"Get started for free" form submitted');

    setStatus('submitting');

    startTransition(async () => {
      try {
        const { success, message } = await submitForm(values);
        toast(message);
        setMessage(message);
        if (success) {
          confetti();
          setStatus('submitted');
          form.reset();
        } else {
          setStatus('idle');
        }
      } catch (error) {
        toast('Uh-oh. Något gick fel. Försök igen.');
        setStatus('idle');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-lg gap-x-3 max-md:gap-y-3 md:grid-cols-5">
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="md:col-span-3">
              <FormControl>
                <Input placeholder={dict[region].placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="md:col-span-2" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Skickar...' : dict[region].title}
        </Button>

        {status === 'submitted' && message && <p className="col-span-full mt-2 text-balance text-sm text-tic-500">{message}</p>}
      </form>
    </Form>
  );
};
