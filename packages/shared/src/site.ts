import { type Locale, type Localized, pick } from './locale';

export const SITE = {
  name: 'Nutricycle',
  founder: 'Alicia Basurto',
  email: 'hola@aliciabasurto.com',
  url: 'https://www.aliciabasurto.com',
} as const;

const TAGLINE: Localized<string> = {
  es: 'Nutrición cíclica para tu salud hormonal',
  en: 'Cyclical nutrition for your hormonal health',
};

export function siteTagline(locale: Locale): string {
  return pick(TAGLINE, locale);
}

/**
 * ⚠️ BLOCKER: real store URLs do not exist yet.
 *
 * Every CTA routes through /ir/app rather than linking a store directly —
 * that gives click tracking, one place to change the URL, and a QR target
 * that never needs reprinting (doc/02-design/cta-strategy.md §2).
 *
 * When the URLs arrive, fill them in here and nothing else changes.
 */
export const STORE = {
  ios: '' as string,
  android: '' as string,
  /** Internal redirect — always safe to link, even while the above are empty */
  smart: '/ir/app',
  iosPath: '/ir/app/ios',
  androidPath: '/ir/app/android',
  /** ⚠️ Unverified — confirm this is real App Store data before shipping */
  rating: '4.8',
  recipeCount: '40+',
  phaseCount: '4',
} as const;

const PRICE: Localized<string> = { es: 'Gratis', en: 'Free' };

export function storePrice(locale: Locale): string {
  return pick(PRICE, locale);
}

export interface NavItem {
  label: string;
  /** Spanish-canonical path. Localize with localizePath() at render time. */
  href: string;
}

const NAV_LABELS: Localized<string[]> = {
  es: ['Método', 'Ciclo', 'Recetas', 'Funciones', 'Membresía'],
  en: ['Method', 'Cycle', 'Recipes', 'Features', 'Membership'],
};

const NAV_HREFS = [
  '/como-funciona',
  '/ciclo',
  '/recetas',
  '/funcionalidades',
  '/membresia',
] as const;

export function getNav(locale: Locale): readonly NavItem[] {
  const labels = pick(NAV_LABELS, locale);
  return NAV_HREFS.map((href, i) => ({ href, label: labels[i] }));
}

/** ⚠️ BLOCKER: the live site points these at an internal Wix page, not real
 *  profiles. Replace with actual URLs before launch. */
export const SOCIAL: readonly NavItem[] = [
  { label: 'Instagram', href: '' },
  { label: 'YouTube', href: '' },
  { label: 'Facebook', href: '' },
] as const;

const LEGAL_LABELS: Localized<string[]> = {
  es: [
    'Términos y Condiciones',
    'Política de Privacidad',
    'Política de Cookies',
    'Aviso Médico',
  ],
  en: ['Terms and Conditions', 'Privacy Policy', 'Cookie Policy', 'Medical Disclaimer'],
};

const LEGAL_HREFS = ['/terminos', '/privacidad', '/cookies', '/aviso-medico'] as const;

export function getLegal(locale: Locale): readonly NavItem[] {
  const labels = pick(LEGAL_LABELS, locale);
  return LEGAL_HREFS.map((href, i) => ({ href, label: labels[i] }));
}

/** @deprecated Spanish-only. Use `getNav(locale)`. */
export const NAV: readonly NavItem[] = getNav('es');

/** @deprecated Spanish-only. Use `getLegal(locale)`. */
export const LEGAL: readonly NavItem[] = getLegal('es');
