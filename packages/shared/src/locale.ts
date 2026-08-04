/**
 * The locale type lives here rather than in the web app because the phase
 * data, the site config and the app both need it. Defining it twice would
 * let the two drift.
 */
export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

/** A value that differs per language. */
export type Localized<T> = Record<Locale, T>;

/** Pick the value for a locale, falling back to Spanish. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[DEFAULT_LOCALE];
}
