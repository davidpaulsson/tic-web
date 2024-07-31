import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  sv: () => import('../dictionaries/sv.json').then((module) => module.default),
  de: () => import('../dictionaries/de.json').then((module) => module.default),
  no: () => import('../dictionaries/no.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  switch (locale) {
    case 'en':
      return await dictionaries.en();
    case 'sv':
      return await dictionaries.sv();
    case 'de':
      return await dictionaries.de();
    case 'no':
      return await dictionaries.no();
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
};
