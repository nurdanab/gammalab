export const locales = ['ru', 'kz', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export const localeNames: Record<Locale, string> = {
  ru: 'Русский',
  kz: 'Қазақша',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  ru: 'RUS',
  kz: 'KAZ',
  en: 'ENG',
};
