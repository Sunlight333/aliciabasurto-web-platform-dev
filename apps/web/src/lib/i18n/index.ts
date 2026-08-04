import { es, type Dictionary } from './dictionaries/es';
import { en } from './dictionaries/en';
import type { Locale } from './config';

const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

/**
 * UI strings for a locale.
 *
 * Synchronous and statically imported on purpose: both dictionaries together
 * are a few kilobytes, and every page needs one. Loading them dynamically
 * would buy nothing and make every page component async.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES.es;
}

export type { Dictionary };
export * from './config';
export * from './routes';
