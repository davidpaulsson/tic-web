import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  sv: () => import('../dictionaries/sv.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  switch (locale) {
    case 'en':
      return await dictionaries.en();
    case 'sv':
      return await dictionaries.sv();
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
};
