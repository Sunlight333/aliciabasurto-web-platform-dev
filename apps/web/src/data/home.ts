/**
 * Landing page copy + icon assignments.
 * Icon names map to lucide-react exports, resolved in each section.
 */

export interface Problem {
  icon: 'HelpCircle' | 'Salad' | 'BellRing';
  pain: string;
  answer: string;
  tint: string;
}

export const PROBLEMS: readonly Problem[] = [
  {
    icon: 'HelpCircle',
    pain: 'Me siento distinta cada semana y no sé por qué.',
    answer:
      'Tu ciclo tiene 4 fases. Nutricycle las sigue por ti y te explica qué está pasando en tu cuerpo.',
    tint: 'bg-luteal-soft text-luteal-ink',
  },
  {
    icon: 'Salad',
    pain: 'No sé qué comer para sentirme mejor.',
    answer:
      'Recetas, alimentos clave y plan semanal ajustados al punto exacto de tu ciclo.',
    tint: 'bg-follicular-soft text-follicular-ink',
  },
  {
    icon: 'BellRing',
    pain: 'Se me olvida registrar mis síntomas.',
    answer:
      'Recordatorios inteligentes y un registro diario que se completa en menos de un minuto.',
    tint: 'bg-menstrual-soft text-menstrual-ink',
  },
] as const;

export interface Step {
  number: string;
  icon: 'CalendarHeart' | 'Utensils' | 'HeartPulse';
  title: string;
  body: string;
  tint: string;
}

export const STEPS: readonly Step[] = [
  {
    number: '01',
    icon: 'CalendarHeart',
    title: 'Ingresa tu ciclo',
    body: 'Registra la fecha de tu último período y la duración de tu ciclo. Nutricycle calcula tu fase actual al instante.',
    tint: 'bg-menstrual-soft text-menstrual-ink',
  },
  {
    number: '02',
    icon: 'Utensils',
    title: 'Recibe tu plan diario',
    body: 'Cada día tienes recetas, alimentos clave y beneficios hormonales personalizados según tu fase.',
    tint: 'bg-ovulation-soft text-ovulation-ink',
  },
  {
    number: '03',
    icon: 'HeartPulse',
    title: 'Recupera tu equilibrio',
    body: 'Con el tiempo tus síntomas se alivian — acné, fatiga, ciclos irregulares — usando la comida como medicina.',
    tint: 'bg-follicular-soft text-follicular-ink',
  },
] as const;

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

export const FEATURES: readonly Feature[] = [
  {
    icon: 'Sparkles',
    title: 'Asesora con IA',
    body: 'Pregunta lo que quieras sobre tu ciclo, síntomas o alimentación. La IA conoce tu fase y tu día exacto, así que responde para ti.',
    tint: 'bg-luteal-soft text-luteal-ink',
    highlight: true,
  },
  {
    icon: 'CalendarDays',
    title: 'Rastreador del ciclo',
    body: 'Calendario visual con arcos de fase, ventana fértil y predicción de tu próximo período.',
    tint: 'bg-menstrual-soft text-menstrual-ink',
  },
  {
    icon: 'Activity',
    title: 'Gráfico hormonal',
    body: 'Visualiza tu curva de estrógeno y progesterona a lo largo del mes, con tu día actual marcado.',
    tint: 'bg-ovulation-soft text-ovulation-ink',
  },
  {
    icon: 'UtensilsCrossed',
    title: 'Plan semanal de comidas',
    body: 'Se genera solo según tu fase, con desglose de macros en cada comida.',
    tint: 'bg-follicular-soft text-follicular-ink',
  },
  {
    icon: 'ShoppingBasket',
    title: 'Lista de compras',
    body: 'Construida automáticamente desde tus alimentos de fase y tu plan de la semana.',
    tint: 'bg-luteal-soft text-luteal-ink',
  },
  {
    icon: 'Flower2',
    title: 'Bienestar guiado',
    body: 'Rutinas de yoga, meditación y respiración con temporizador, adaptadas a cada fase.',
    tint: 'bg-menstrual-soft text-menstrual-ink',
  },
] as const;
