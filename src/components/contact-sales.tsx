'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import confetti from 'canvas-confetti';
import { startTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { REGIONS } from '@/lib/constants';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { submitForm } from './contact-sales.action';

export const ContactSales = ({ region }: { region: (typeof REGIONS)[number] }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  const formSchema = z
    .object({
      FirstName: z.string().min(2, {
        message: 'Förnamn måste vara minst 2 tecken.',
      }),
      LastName: z.string().min(2, {
        message: 'Efternamn måste vara minst 2 tecken.',
      }),
      CompanyName: z.string().optional(),
      EmailAddress: z
        .string()
        .email({
          message: 'Ogiltig e-postadress.',
        })
        .optional(),
      E164MobilePhoneNumber: z
        .string()
        .regex(/^\d+$/, {
          message: 'Ogiltigt mobilnummer.',
        })
        .optional(),
    })
    .refine((data) => data.EmailAddress || data.E164MobilePhoneNumber, {
      message: 'Antingen e-postadress eller mobilnummer måste anges.',
      path: ['EmailAddress', 'E164MobilePhoneNumber'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: '',
      LastName: '',
      CompanyName: '',
      EmailAddress: '',
      E164MobilePhoneNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus('submitting');

    startTransition(async () => {
      try {
        const { success, message } = await submitForm(values);
        toast(message);
        if (success) {
          confetti();
          setStatus('submitted');
          form.reset();
        }
      } catch (error) {
        toast('Uh-oh. Något gick fel. Försök igen.');
        setStatus('idle');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-lg gap-3">
        <FormField
          control={form.control}
          name="FirstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Förnamn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="LastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Efternamn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CompanyName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Företagsnamn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="EmailAddress"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="E-postadress" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="E164MobilePhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Mobilnummer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Skickar...' : 'Skicka'}
        </Button>

        {status === 'submitted' && <p className="text-tic-500 col-span-full mt-2 text-balance text-sm">Tack! Du blir snart kontaktad.</p>}
      </form>
    </Form>
  );
};
