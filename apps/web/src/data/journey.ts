/**
 * /como-funciona — the five steps from opening the app to seeing patterns.
 *
 * Source: app-content-strategy.md § "Page 3: How It Works". Held here
 * rather than in the page because it is content, and because it was one of
 * the arrays keeping the English route in Spanish.
 */

import type { Locale } from '@nutricycle/shared';

export interface JourneyStep {
  n: string;
  icon: 'UserPlus' | 'CalendarHeart' | 'LayoutDashboard' | 'NotebookPen' | 'LineChart';
  title: string;
  body: string;
  /** The reassurance under each step — why it costs the reader nothing. */
  detail: string;
  tint: string;
}

const TINTS = [
  'bg-luteal-soft text-luteal-ink',
  'bg-menstrual-soft text-menstrual-ink',
  'bg-ovulation-soft text-ovulation-ink',
  'bg-follicular-soft text-follicular-ink',
  'bg-luteal-soft text-luteal-ink',
];

const ICONS: JourneyStep['icon'][] = [
  'UserPlus',
  'CalendarHeart',
  'LayoutDashboard',
  'NotebookPen',
  'LineChart',
];

const TEXT: Record<Locale, { title: string; body: string; detail: string }[]> = {
  es: [
    {
      title: 'Creá tu cuenta',
      body: 'Con tu correo, con Google o con Apple ID.',
      detail: 'Toma unos 30 segundos. No hace falta tarjeta.',
    },
    {
      title: 'Registrá tu ciclo',
      body: 'La fecha de tu último período y cuánto suele durar tu ciclo.',
      detail: 'Nutricycle calcula tu fase actual al instante y predice la siguiente.',
    },
    {
      title: 'Recibí tu plan',
      body: 'Tu panel muestra tu fase de hoy, tu gráfico hormonal, los alimentos que te convienen y un plan semanal.',
      detail: 'Todo ajustado al punto exacto en el que estás.',
    },
    {
      title: 'Registrá y aprendé',
      body: 'Anotá tus síntomas y tu energía. Preguntale a la asesora con IA. Probá las recetas de tu fase.',
      detail: 'Mientras más registrás, más se ajusta la app a vos.',
    },
    {
      title: 'Mirá tus patrones',
      body: 'Revisá tu historial en el calendario y vas viendo cómo cambian tu ánimo y tu energía mes a mes.',
      detail: 'Lo que parecía aleatorio empieza a tener forma.',
    },
  ],
  en: [
    {
      title: 'Create your account',
      body: 'With your email, with Google or with Apple ID.',
      detail: 'It takes about 30 seconds. No card needed.',
    },
    {
      title: 'Log your cycle',
      body: 'The date of your last period and how long your cycle usually lasts.',
      detail: 'Nutricycle works out your current phase instantly and predicts the next one.',
    },
    {
      title: 'Get your plan',
      body: 'Your dashboard shows today’s phase, your hormone chart, the foods that suit you and a weekly plan.',
      detail: 'All adjusted to exactly where you are.',
    },
    {
      title: 'Log and learn',
      body: 'Note your symptoms and your energy. Ask the AI coach. Try the recipes for your phase.',
      detail: 'The more you log, the more the app adjusts to you.',
    },
    {
      title: 'See your patterns',
      body: 'Look back over your calendar history and watch how your mood and energy shift month to month.',
      detail: 'What looked random starts to take shape.',
    },
  ],
};

export function getJourney(locale: Locale): readonly JourneyStep[] {
  const text = TEXT[locale] ?? TEXT.es;
  return text.map((step, i) => ({
    n: String(i + 1).padStart(2, '0'),
    icon: ICONS[i],
    tint: TINTS[i],
    ...step,
  }));
}
