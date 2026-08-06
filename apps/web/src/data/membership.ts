/**
 * /membresia content — plans, the comparison table and the billing facts.
 *
 * This lived as three literal arrays inside the page, which is why the
 * English route rendered a Spanish pricing table: nothing about the page
 * was locale-aware below the hero.
 *
 * ⚠️ Prices are quoted in USD as supplied and are still pending confirmation
 * that they are live in each store (revised-direction.md §10 item 8). The
 * stores localise currency per region, so these are reference figures with
 * the store named as the authority — the note under the cards says so in
 * both languages.
 */

import type { Locale } from '@nutricycle/shared';

export interface Plan {
  id: string;
  name: string;
  /** USD as supplied. Not translated — the store shows local currency. */
  price: string;
  unit: string;
  note: string;
  badge?: string;
  featured: boolean;
}

export interface ComparisonRow {
  feature: string;
  /** `true` renders a tick; a string renders as text ("Limitada", "—"). */
  free: string | true;
  premium: string | true;
}

export interface BillingFact {
  icon: 'Store' | 'Sparkles' | 'Check';
  title: string;
  body: string;
  tint: string;
}

const ES = {
  plans: [
    {
      id: 'mensual',
      name: 'Mensual',
      price: '$14.99',
      unit: '/ mes',
      note: 'Cancelás cuando quieras',
      featured: false,
    },
    {
      id: 'anual',
      name: 'Anual',
      price: '$84.99',
      unit: '/ año',
      note: 'Equivale a $7.08 por mes',
      badge: 'Ahorrás 53%',
      featured: true,
    },
  ] as Plan[],

  comparison: [
    { feature: 'Seguimiento del ciclo y calendario', free: true, premium: true },
    { feature: 'Recetas por fase', free: true, premium: true },
    { feature: 'Registro diario (síntomas, ánimo, energía)', free: true, premium: true },
    { feature: 'Plan semanal de comidas', free: true, premium: true },
    { feature: 'Lista de compras', free: true, premium: true },
    { feature: 'Guía de alimentos clave', free: true, premium: true },
    { feature: 'Artículos y videos', free: true, premium: true },
    { feature: 'Registro de hidratación', free: true, premium: true },
    { feature: 'Actividades de bienestar', free: true, premium: true },
    { feature: 'Asesora Nutricycle AI', free: 'Limitada', premium: 'Sin límite' },
    { feature: 'Predictor de ciclo con IA', free: '—', premium: 'Incluido' },
    { feature: 'Recetas guardadas', free: 'Limitadas', premium: 'Sin límite' },
    { feature: 'Soporte prioritario', free: '—', premium: 'Incluido' },
  ] as ComparisonRow[],

  billing: [
    {
      icon: 'Store',
      title: 'App Store o Google Play',
      body: 'El cobro lo procesa la tienda de tu dispositivo, con sus condiciones y su moneda.',
      tint: 'bg-luteal-soft text-luteal-ink',
    },
    {
      icon: 'Sparkles',
      title: 'Cancelás cuando quieras',
      body: 'Desde los ajustes de tu cuenta en la tienda. Sigue activa hasta el final del período pagado.',
      tint: 'bg-follicular-soft text-follicular-ink',
    },
    {
      icon: 'Check',
      title: 'Sin cargos ocultos',
      body: 'Restaurar una compra anterior está disponible dentro de la app.',
      tint: 'bg-menstrual-soft text-menstrual-ink',
    },
  ] as BillingFact[],
};

const EN = {
  plans: [
    {
      id: 'mensual',
      name: 'Monthly',
      price: '$14.99',
      unit: '/ month',
      note: 'Cancel whenever you want',
      featured: false,
    },
    {
      id: 'anual',
      name: 'Yearly',
      price: '$84.99',
      unit: '/ year',
      note: 'Works out at $7.08 a month',
      badge: 'Save 53%',
      featured: true,
    },
  ] as Plan[],

  comparison: [
    { feature: 'Cycle tracking and calendar', free: true, premium: true },
    { feature: 'Recipes by phase', free: true, premium: true },
    { feature: 'Daily log (symptoms, mood, energy)', free: true, premium: true },
    { feature: 'Weekly meal plan', free: true, premium: true },
    { feature: 'Shopping list', free: true, premium: true },
    { feature: 'Key foods guide', free: true, premium: true },
    { feature: 'Articles and videos', free: true, premium: true },
    { feature: 'Hydration log', free: true, premium: true },
    { feature: 'Wellness activities', free: true, premium: true },
    { feature: 'Nutricycle AI coach', free: 'Limited', premium: 'Unlimited' },
    { feature: 'AI cycle predictor', free: '—', premium: 'Included' },
    { feature: 'Saved recipes', free: 'Limited', premium: 'Unlimited' },
    { feature: 'Priority support', free: '—', premium: 'Included' },
  ] as ComparisonRow[],

  billing: [
    {
      icon: 'Store',
      title: 'App Store or Google Play',
      body: 'Your device store processes the payment, under its own terms and in its own currency.',
      tint: 'bg-luteal-soft text-luteal-ink',
    },
    {
      icon: 'Sparkles',
      title: 'Cancel whenever you want',
      body: 'From your account settings in the store. It stays active until the end of the period you paid for.',
      tint: 'bg-follicular-soft text-follicular-ink',
    },
    {
      icon: 'Check',
      title: 'No hidden charges',
      body: 'Restoring an earlier purchase is available inside the app.',
      tint: 'bg-menstrual-soft text-menstrual-ink',
    },
  ] as BillingFact[],
};

/**
 * The row counts must match across locales or the table would render a
 * different product in each language — the same guard the other data
 * files use.
 */
function assertParity() {
  if (ES.plans.length !== EN.plans.length) {
    throw new Error('membership.ts: plan counts differ between locales');
  }
  if (ES.comparison.length !== EN.comparison.length) {
    throw new Error('membership.ts: comparison row counts differ between locales');
  }
  if (ES.billing.length !== EN.billing.length) {
    throw new Error('membership.ts: billing fact counts differ between locales');
  }
}
assertParity();

export function getPlans(locale: Locale): readonly Plan[] {
  return locale === 'en' ? EN.plans : ES.plans;
}

export function getComparison(locale: Locale): readonly ComparisonRow[] {
  return locale === 'en' ? EN.comparison : ES.comparison;
}

export function getBillingFacts(locale: Locale): readonly BillingFact[] {
  return locale === 'en' ? EN.billing : ES.billing;
}
