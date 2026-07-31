/**
 * Landing page copy.
 *
 * Sourced from doc/04-content/app-content-strategy.md (problem framing,
 * feature set) and the live site's existing Spanish copy, which the audit
 * confirmed is well written and worth carrying over.
 *
 * Lives here rather than in Supabase: this is marketing copy, not content.
 * Recipes/articles/videos come from the app's database (revised-direction.md §2).
 */

export interface Problem {
  pain: string;
  answer: string;
}

export const PROBLEMS: readonly Problem[] = [
  {
    pain: 'Me siento distinta cada semana y no sé por qué.',
    answer:
      'Tu ciclo tiene 4 fases. Nutricycle las sigue por ti y te explica qué está pasando en tu cuerpo.',
  },
  {
    pain: 'No sé qué comer para sentirme mejor.',
    answer:
      'Recetas, alimentos clave y plan semanal ajustados al punto exacto de tu ciclo.',
  },
  {
    pain: 'Se me olvida registrar mis síntomas.',
    answer:
      'Recordatorios inteligentes y un registro diario que se completa en menos de un minuto.',
  },
] as const;

export interface Step {
  number: string;
  title: string;
  body: string;
}

export const STEPS: readonly Step[] = [
  {
    number: '01',
    title: 'Ingresa tu ciclo',
    body: 'Registra la fecha de tu último período y la duración de tu ciclo. Nutricycle calcula tu fase actual al instante.',
  },
  {
    number: '02',
    title: 'Recibe tu plan diario',
    body: 'Cada día tienes recetas, alimentos clave y beneficios hormonales personalizados según tu fase.',
  },
  {
    number: '03',
    title: 'Recupera tu equilibrio',
    body: 'Con el tiempo tus síntomas se alivian — acné, fatiga, ciclos irregulares — usando la comida como medicina.',
  },
] as const;

export interface Feature {
  title: string;
  body: string;
  highlight?: boolean;
}

export const FEATURES: readonly Feature[] = [
  {
    title: 'Asesora con IA',
    body: 'Pregunta lo que quieras sobre tu ciclo, síntomas o alimentación. La IA conoce tu fase y tu día exacto, así que responde para ti.',
    highlight: true,
  },
  {
    title: 'Rastreador del ciclo',
    body: 'Calendario visual con arcos de fase, ventana fértil y predicción de tu próximo período.',
  },
  {
    title: 'Gráfico hormonal',
    body: 'Visualiza tu curva de estrógeno y progesterona a lo largo del mes, con tu día actual marcado.',
  },
  {
    title: 'Plan semanal de comidas',
    body: 'Se genera solo según tu fase, con desglose de macros en cada comida.',
  },
  {
    title: 'Lista de compras',
    body: 'Construida automáticamente desde tus alimentos de fase y tu plan de la semana.',
  },
  {
    title: 'Bienestar guiado',
    body: 'Rutinas de yoga, meditación y respiración con temporizador, adaptadas a cada fase.',
  },
] as const;
