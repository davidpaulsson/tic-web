export const i18n = {
  defaultLocale: 'sv',
  locales: ['sv', 'en', 'no', 'de'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
