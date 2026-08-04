import { type Locale, type Localized, pick } from '@nutricycle/shared';

/**
 * Landing page copy + icon assignments.
 * Icon names map to lucide-react exports, resolved in each section.
 *
 * Shape throughout this file: everything language-independent (icon, tint,
 * ordering, flags) sits in a base array; everything a reader sees sits in a
 * TEXT record keyed by locale and id. Adding a language cannot reorder a
 * list or change a tint, and a missing translation is a compile error.
 */

export interface Problem {
  icon: 'HelpCircle' | 'Salad' | 'BellRing';
  pain: string;
  answer: string;
  tint: string;
}

const PROBLEM_BASE = [
  { id: 'weekly', icon: 'HelpCircle', tint: 'bg-luteal-soft text-luteal-ink' },
  { id: 'whatToEat', icon: 'Salad', tint: 'bg-follicular-soft text-follicular-ink' },
  { id: 'forget', icon: 'BellRing', tint: 'bg-menstrual-soft text-menstrual-ink' },
] as const;

type ProblemId = (typeof PROBLEM_BASE)[number]['id'];

const PROBLEM_TEXT: Localized<Record<ProblemId, { pain: string; answer: string }>> = {
  es: {
    weekly: {
      pain: 'Me siento distinta cada semana y no sé por qué.',
      answer:
        'Tu ciclo tiene 4 fases. Nutricycle las sigue por ti y te explica qué está pasando en tu cuerpo.',
    },
    whatToEat: {
      pain: 'No sé qué comer para sentirme mejor.',
      answer:
        'Recetas, alimentos clave y plan semanal ajustados al punto exacto de tu ciclo.',
    },
    forget: {
      pain: 'Se me olvida registrar mis síntomas.',
      answer:
        'Recordatorios inteligentes y un registro diario que se completa en menos de un minuto.',
    },
  },
  en: {
    weekly: {
      pain: 'I feel different every week and I don’t know why.',
      answer:
        'Your cycle has four phases. Nutricycle tracks them for you and explains what is happening in your body.',
    },
    whatToEat: {
      pain: 'I don’t know what to eat to feel better.',
      answer:
        'Recipes, key foods and a weekly plan tuned to exactly where you are in your cycle.',
    },
    forget: {
      pain: 'I keep forgetting to log my symptoms.',
      answer:
        'Smart reminders and a daily log that takes less than a minute to fill in.',
    },
  },
};

export function getProblems(locale: Locale): readonly Problem[] {
  const text = pick(PROBLEM_TEXT, locale);
  return PROBLEM_BASE.map((b) => ({ icon: b.icon, tint: b.tint, ...text[b.id] }));
}

export interface Step {
  number: string;
  icon: 'CalendarHeart' | 'Utensils' | 'HeartPulse';
  title: string;
  body: string;
  tint: string;
}

const STEP_BASE = [
  { id: 'enter', number: '01', icon: 'CalendarHeart', tint: 'bg-menstrual-soft text-menstrual-ink' },
  { id: 'plan', number: '02', icon: 'Utensils', tint: 'bg-ovulation-soft text-ovulation-ink' },
  { id: 'balance', number: '03', icon: 'HeartPulse', tint: 'bg-follicular-soft text-follicular-ink' },
] as const;

type StepId = (typeof STEP_BASE)[number]['id'];

const STEP_TEXT: Localized<Record<StepId, { title: string; body: string }>> = {
  es: {
    enter: {
      title: 'Ingresa tu ciclo',
      body: 'Registra la fecha de tu último período y la duración de tu ciclo. Nutricycle calcula tu fase actual al instante.',
    },
    plan: {
      title: 'Recibe tu plan diario',
      body: 'Cada día tienes recetas, alimentos clave y beneficios hormonales personalizados según tu fase.',
    },
    balance: {
      title: 'Recupera tu equilibrio',
      body: 'Con el tiempo tus síntomas se alivian — acné, fatiga, ciclos irregulares — usando la comida como medicina.',
    },
  },
  en: {
    enter: {
      title: 'Enter your cycle',
      body: 'Log the date of your last period and how long your cycle runs. Nutricycle works out your current phase instantly.',
    },
    plan: {
      title: 'Get your daily plan',
      body: 'Every day you get recipes, key foods and hormonal benefits chosen for the phase you are in.',
    },
    balance: {
      title: 'Find your balance again',
      body: 'Over time your symptoms ease — acne, fatigue, irregular cycles — using food as medicine.',
    },
  },
};

export function getSteps(locale: Locale): readonly Step[] {
  const text = pick(STEP_TEXT, locale);
  return STEP_BASE.map((b) => ({
    number: b.number,
    icon: b.icon,
    tint: b.tint,
    ...text[b.id],
  }));
}

export interface Feature {
  icon:
    | 'Sparkles'
    | 'CalendarDays'
    | 'Activity'
    | 'UtensilsCrossed'
    | 'ShoppingBasket'
    | 'Flower2';
  title: string;
  body: string;
  tint: string;
  highlight?: boolean;
}

const FEATURE_BASE = [
  { id: 'ai', icon: 'Sparkles', tint: 'bg-luteal-soft text-luteal-ink', highlight: true },
  { id: 'tracker', icon: 'CalendarDays', tint: 'bg-menstrual-soft text-menstrual-ink' },
  { id: 'chart', icon: 'Activity', tint: 'bg-ovulation-soft text-ovulation-ink' },
  { id: 'meals', icon: 'UtensilsCrossed', tint: 'bg-follicular-soft text-follicular-ink' },
  { id: 'shopping', icon: 'ShoppingBasket', tint: 'bg-luteal-soft text-luteal-ink' },
  { id: 'wellness', icon: 'Flower2', tint: 'bg-menstrual-soft text-menstrual-ink' },
] as const;

type FeatureId = (typeof FEATURE_BASE)[number]['id'];

const FEATURE_TEXT: Localized<Record<FeatureId, { title: string; body: string }>> = {
  es: {
    ai: {
      title: 'Asesora con IA',
      body: 'Pregunta lo que quieras sobre tu ciclo, síntomas o alimentación. La IA conoce tu fase y tu día exacto, así que responde para ti.',
    },
    tracker: {
      title: 'Rastreador del ciclo',
      body: 'Calendario visual con arcos de fase, ventana fértil y predicción de tu próximo período.',
    },
    chart: {
      title: 'Gráfico hormonal',
      body: 'Visualiza tu curva de estrógeno y progesterona a lo largo del mes, con tu día actual marcado.',
    },
    meals: {
      title: 'Plan semanal de comidas',
      body: 'Se genera solo según tu fase, con desglose de macros en cada comida.',
    },
    shopping: {
      title: 'Lista de compras',
      body: 'Construida automáticamente desde tus alimentos de fase y tu plan de la semana.',
    },
    wellness: {
      title: 'Bienestar guiado',
      body: 'Rutinas de yoga, meditación y respiración con temporizador, adaptadas a cada fase.',
    },
  },
  en: {
    ai: {
      title: 'AI coach',
      body: 'Ask anything about your cycle, your symptoms or what to eat. The AI knows your phase and the exact day you are on, so it answers for you.',
    },
    tracker: {
      title: 'Cycle tracker',
      body: 'A visual calendar with phase arcs, your fertile window and a prediction for your next period.',
    },
    chart: {
      title: 'Hormone chart',
      body: 'See your oestrogen and progesterone curve across the month, with today marked.',
    },
    meals: {
      title: 'Weekly meal plan',
      body: 'Builds itself around your phase, with a macro breakdown on every meal.',
    },
    shopping: {
      title: 'Shopping list',
      body: 'Put together automatically from your phase foods and the plan for your week.',
    },
    wellness: {
      title: 'Guided wellbeing',
      body: 'Yoga, meditation and breathing routines with a timer, adapted to each phase.',
    },
  },
};

export function getFeatures(locale: Locale): readonly Feature[] {
  const text = pick(FEATURE_TEXT, locale);
  return FEATURE_BASE.map((b) => ({
    icon: b.icon,
    tint: b.tint,
    ...('highlight' in b ? { highlight: b.highlight } : {}),
    ...text[b.id],
  }));
}

/** @deprecated Spanish-only. Use getProblems(locale). */
export const PROBLEMS = getProblems('es');
/** @deprecated Spanish-only. Use getSteps(locale). */
export const STEPS = getSteps('es');
/** @deprecated Spanish-only. Use getFeatures(locale). */
export const FEATURES = getFeatures('es');
