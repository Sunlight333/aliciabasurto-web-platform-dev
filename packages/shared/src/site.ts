export const SITE = {
  name: 'Nutricycle',
  founder: 'Alicia Basurto',
  tagline: 'Nutrición cíclica para tu salud hormonal',
  email: 'hola@aliciabasurto.com',
  url: 'https://www.aliciabasurto.com',
  locale: 'es',
} as const;

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
  price: 'Gratis',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV: readonly NavItem[] = [
  { label: 'Método', href: '/como-funciona' },
  { label: 'Ciclo', href: '/ciclo' },
  { label: 'Recetas', href: '/recetas' },
  { label: 'Funciones', href: '/funcionalidades' },
  { label: 'Membresía', href: '/membresia' },
] as const;

/** ⚠️ BLOCKER: the live site points these at an internal Wix page, not real
 *  profiles. Replace with actual URLs before launch. */
export const SOCIAL: readonly NavItem[] = [
  { label: 'Instagram', href: '' },
  { label: 'YouTube', href: '' },
  { label: 'Facebook', href: '' },
] as const;

export const LEGAL: readonly NavItem[] = [
  { label: 'Términos y Condiciones', href: '/terminos' },
  { label: 'Política de Privacidad', href: '/privacidad' },
  { label: 'Política de Cookies', href: '/cookies' },
  { label: 'Aviso Médico', href: '/aviso-medico' },
] as const;
