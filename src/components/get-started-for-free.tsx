'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { REGIONS } from '@/lib/constants';

import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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

export const GetStartedForFree = ({ region }: { region: (typeof REGIONS)[number] }) => {
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] p-4">
            <code className="text-tic-purple">{JSON.stringify(values, null, 2)}</code>
          </pre>
        ),
      });
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-md gap-3 md:grid-cols-[2fr,1fr]">
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={dict[region].placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : dict[region].title}
        </Button>
      </form>
    </Form>
  );
};
