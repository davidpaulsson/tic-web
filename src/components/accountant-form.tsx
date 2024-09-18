'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

import { Checkbox } from './ui/checkbox';

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
    message: 'Du måste acceptera villkoren.',
  }),
});

export const AccountantForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      accept: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="container">
      <div className="grid grid-cols-2 overflow-hidden rounded-lg">
        <div className="bg-tic-purple-light" />
        <div className="bg-tic-fill p-16">
          <h2 className="mb-2 text-pretty text-4xl">Är du revisor eller auktoriserad redovisningskonsult?</h2>
          <p className="mb-5 text-tic-light">
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
              <FormField
                control={form.control}
                name="accept"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-tic-light">
                      Jag godkänner{' '}
                      <Link href="/sv/integritetspolicy" className="text-tic underline transition-colors hover:no-underline">
                        integritetspolicyn
                      </Link>
                      .
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting} className="!w-full">
                Skicka
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
