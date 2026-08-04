/**
 * Spanish at the root, English under /en — revised-direction.md §3.
 *
 * Spanish keeps the bare paths so the live site's existing URLs and their
 * search equity survive the migration. That asymmetry is deliberate and is
 * why there is no `/es` prefix anywhere.
 */
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@nutricycle/shared';

// Re-exported so app code has one import site for locale things, while the
// type itself stays defined once in the shared package — the phase data and
// the site config need it too, and two definitions would drift.
export { LOCALES, DEFAULT_LOCALE };
export type { Locale };

/** `lang` / `hreflang` values. Not the same strings as the locale keys. */
export const HTML_LANG: Record<Locale, string> = {
  es: 'es',
  en: 'en',
};

/** OpenGraph locale codes. */
export const OG_LOCALE: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_US',
};

export const LOCALE_NAME: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * The locale a pathname belongs to. Everything that is not under `/en` is
 * Spanish, including `/`.
 */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}
