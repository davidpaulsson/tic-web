'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import confetti from 'canvas-confetti';
import { usePlausible } from 'next-plausible';
import Image from 'next/image';
import Link from 'next/link';
import { startTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { submitForm } from './accountant-form.action';
import placeholder from './placeholder.jpg';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Förnamn måste vara minst 2 tecken.',
  }),
  lastName: z.string().min(2, {
    message: 'Efternamn måste vara minst 2 tecken.',
  }),
  email: z.string().email({
    message: 'Ogiltig e-postadress.',
  }),
  accept: z.boolean().refine((val) => val === true, {
    message: 'Du måste godkänna integritetspolicyn.',
  }),
});

export const AccountantForm = () => {
  const plausible = usePlausible();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    plausible('"Accountant" form submitted');
    setStatus('submitting');

    startTransition(async () => {
      try {
        const { success, message } = await submitForm({
          FirstName: values.firstName,
          LastName: values.lastName,
          Email: values.email,
        });
        setMessage(message);
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
    <div className="container">
      <div className="overflow-hidden rounded-2xl shadow-2xl md:grid md:grid-cols-2">
        <div className="relative max-md:hidden">
          <Image src={placeholder} alt="" placeholder="blur" className="object-cover object-center" fill sizes="50vw" />
        </div>
        <div className="rounded-br-2xl rounded-tr-2xl border-b border-r border-t border-tic-200 bg-tic-50 px-8 py-16 md:px-16 md:py-32">
          <h2 className="mb-2 text-pretty text-2xl">Är du revisor eller auktoriserad redovisningskonsult?</h2>
          <p className="mb-5 text-tic-500">
            Fyll i ditt namn och e-post så får du en kostnadsfri kopia på årsredovisningar som registreras samt vilka brister vi
            identiferar.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Förnamn</FormLabel>
                    <FormControl>
                      <Input placeholder="Förnamn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Efternamn</FormLabel>
                    <FormControl>
                      <Input placeholder="Efternamn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">E-post</FormLabel>
                    <FormControl>
                      <Input placeholder="E-post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Skicka
              </Button>

              {status === 'submitted' && <p className="col-span-full mt-2 text-balance text-sm text-tic-500">{message}</p>}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
