/**
 * Feature inventory for /funcionalidades.
 *
 * Source: doc/04-content/app-content-strategy.md § "Page 2: Features",
 * translated to Spanish (the site's primary locale).
 *
 * ⚠️ The source spec lists an **Admin Panel** under Account & Settings.
 * It is deliberately omitted: it is internal tooling for coaches and
 * content managers, not something the women this page addresses can use,
 * and publishing it advertises the back office to no benefit.
 *
 * `premium` marks features gated behind the Plan Hormonal
 * ($14.99/mo · $84.99/yr, billed in-store — project-brief.md).
 */

import type { Locale } from '@nutricycle/shared';

export type Surface = 'base' | 'raised' | 'sunken' | 'lilac' | 'mint' | 'blush';

export interface Feature {
  icon: string;
  title: string;
  body: string;
  tint: string;
  premium?: boolean;
  /** Rendered as a subtle footnote under the body */
  note?: string;
}

export interface FeatureGroup {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  surface: Surface;
  /** Optional photographic texture behind the section (see page.tsx) */
  bgImage?: string;
  /** Cards per row at lg. Groups vary so six sections don't read identically. */
  columns: 2 | 3;
  features: Feature[];
}

const FEATURE_GROUPS_ES: readonly FeatureGroup[] = [
  {
    id: 'ciclo',
    eyebrow: 'Inteligencia del ciclo',
    title: 'Tu ciclo,',
    accent: 'calculado por ti',
    lead: 'Registra una fecha y Nutricycle se encarga del resto: en qué fase estás, qué viene después y qué está haciendo tu cuerpo.',
    surface: 'raised',
    columns: 2,
    features: [
      {
        icon: 'Wand2',
        title: 'Configuración en 2 minutos',
        body: 'Ingresa la fecha de tu último período, la duración de tu ciclo y tu objetivo de salud. Nada más.',
        tint: 'bg-luteal-soft text-luteal-ink',
      },
      {
        icon: 'CalendarDays',
        title: 'Calendario del ciclo',
        body: 'Fases con código de color, ventana fértil, días de período y un punto por cada registro diario.',
        tint: 'bg-menstrual-soft text-menstrual-ink',
      },
      {
        icon: 'Calculator',
        title: 'Calculadora de período',
        body: 'Predice tu próximo período y tu ventana fértil en cualquier momento, sin esperar al final del ciclo.',
        tint: 'bg-ovulation-soft text-ovulation-ink',
      },
      {
        icon: 'Activity',
        title: 'Gráfico hormonal',
        body: 'Tu curva de estrógeno y progesterona a lo largo del mes, con tu día actual marcado.',
        tint: 'bg-follicular-soft text-follicular-ink',
      },
    ],
  },
  {
    id: 'nutricion',
    eyebrow: 'Nutrición y recetas',
    title: 'Qué comer,',
    accent: 'decidido por tu fase',
    lead: 'Nada de improvisar frente a la nevera. Cada receta y cada alimento está elegido por lo que le hace a tus hormonas esta semana.',
    surface: 'base',
    bgImage: '/images/textures/counter.avif',
    columns: 3,
    features: [
      {
        icon: 'UtensilsCrossed',
        title: 'Recetas por fase',
        body: 'Cada receta etiquetada por fase del ciclo y por tipo de comida: desayuno, almuerzo, snack o cena.',
        tint: 'bg-menstrual-soft text-menstrual-ink',
      },
      {
        icon: 'CalendarCheck',
        title: 'Plan semanal de comidas',
        body: 'Un plan de 7 días generado según tu fase actual, con desglose de proteína, carbohidratos y grasa en cada comida.',
        tint: 'bg-follicular-soft text-follicular-ink',
      },
      {
        icon: 'Leaf',
        title: 'Guía de alimentos clave',
        body: 'Explora los alimentos que apoyan tus hormonas, con etiquetas de estrógeno, progesterona, antiinflamatorio y energía.',
        tint: 'bg-ovulation-soft text-ovulation-ink',
      },
      {
        icon: 'ShoppingBasket',
        title: 'Lista de compras',
        body: 'Se arma sola desde tus alimentos de fase y tu plan semanal. Añade lo tuyo y ve tachando en el súper.',
        tint: 'bg-luteal-soft text-luteal-ink',
      },
      {
        icon: 'Bookmark',
        title: 'Recetas guardadas',
        body: 'Guarda tus favoritas y tenlas a mano cuando las necesites.',
        tint: 'bg-menstrual-soft text-menstrual-ink',
      },
    ],
  },
  {
    id: 'ia',
    eyebrow: 'Con inteligencia artificial',
    title: 'Una asesora que',
    accent: 'ya sabe en qué día estás',
    lead: 'La diferencia entre buscar en internet y preguntarle a alguien que conoce tu ciclo.',
    surface: 'lilac',
    columns: 2,
    features: [
      {
        icon: 'Sparkles',
        title: 'Asesora Nutricycle AI',
        body: 'Pregunta lo que quieras sobre tu ciclo, tus síntomas o tu alimentación. Conoce tu fase y tu día exacto, así que la respuesta es para ti — no genérica.',
        tint: 'bg-luteal-soft text-luteal-ink',
        note: 'Con Google Gemini 2.0',
      },
      {
        icon: 'TrendingUp',
        title: 'Predictor de ciclo con IA',
        body: 'Predicciones e insights generados a partir de tu historial de ciclos y los síntomas que has registrado.',
        tint: 'bg-ovulation-soft text-ovulation-ink',
        premium: true,
      },
    ],
  },
  {
    id: 'registro',
    eyebrow: 'Registro diario',
    title: 'Un minuto al día,',
    accent: 'meses de patrones',
    lead: 'Mientras más registras, más se ajusta la app a ti — y más claro ves lo que tu cuerpo repite cada mes.',
    surface: 'base',
    bgImage: '/images/textures/calma.avif',
    columns: 3,
    features: [
      {
        icon: 'NotebookPen',
        title: 'Registro diario',
        body: 'Síntomas, ánimo en 4 niveles, energía en 3 y notas propias. Revisa tu historial cuando quieras.',
        tint: 'bg-menstrual-soft text-menstrual-ink',
      },
      {
        icon: 'Droplets',
        title: 'Hidratación',
        body: 'Registra tu consumo de agua con atajos rápidos: vaso, botella o termo.',
        tint: 'bg-follicular-soft text-follicular-ink',
      },
      {
        icon: 'Flower2',
        title: 'Bienestar guiado',
        body: 'Rutinas de yoga, meditación y respiración con temporizador integrado, adaptadas a cada fase.',
        tint: 'bg-luteal-soft text-luteal-ink',
      },
    ],
  },
  {
    id: 'aprende',
    eyebrow: 'Contenido y aprendizaje',
    title: 'Entiende',
    accent: 'lo que te está pasando',
    lead: 'Educación hormonal en un lenguaje que se entiende, dentro de la misma app.',
    surface: 'raised',
    columns: 3,
    features: [
      {
        icon: 'BookOpen',
        title: 'Biblioteca de artículos',
        body: 'Artículos con base científica sobre salud hormonal y nutrición cíclica, traducidos a tu idioma.',
        tint: 'bg-follicular-soft text-follicular-ink',
      },
      {
        icon: 'PlayCircle',
        title: 'Videoteca',
        body: 'Videos de bienestar por fase, con búsqueda y filtros para encontrar lo que necesitas hoy.',
        tint: 'bg-ovulation-soft text-ovulation-ink',
      },
      {
        icon: 'Bell',
        title: 'Notificaciones inteligentes',
        body: 'Avisos cuando cambias de fase, recetas recomendadas y recordatorios para registrar tu día.',
        tint: 'bg-menstrual-soft text-menstrual-ink',
      },
    ],
  },
  {
    id: 'cuenta',
    eyebrow: 'Tu cuenta',
    title: 'Tuya,',
    accent: 'en tu idioma',
    lead: '',
    surface: 'base',
    bgImage: '/images/textures/papel.avif',
    columns: 2,
    features: [
      {
        icon: 'UserCircle',
        title: 'Perfil personalizado',
        body: 'Tu foto y tu nombre, para que la app se sienta tuya desde el primer día.',
        tint: 'bg-luteal-soft text-luteal-ink',
      },
      {
        icon: 'Languages',
        title: 'Español e inglés',
        body: 'Cambia de idioma en cualquier momento, sin perder tu historial ni tu configuración.',
        tint: 'bg-follicular-soft text-follicular-ink',
      },
    ],
  },
] as const;

/**
 * English text, parallel to the Spanish structure above.
 *
 * Text only — no icons, tints, surfaces or column counts. Those live once,
 * in FEATURE_GROUPS_ES, because a tint duplicated per language is a tint
 * that will eventually disagree with itself. The getter zips the two and
 * asserts they line up, so a group or card added to one language and not
 * the other fails the build instead of silently dropping a card from /en.
 */
interface FeatureTextEn {
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  features: { title: string; body: string; note?: string }[];
}

const FEATURE_TEXT_EN: readonly FeatureTextEn[] = [
  {
    eyebrow: 'Cycle intelligence',
    title: 'Your cycle,',
    accent: 'worked out for you',
    lead: 'Log one date and Nutricycle handles the rest: which phase you are in, what comes next, and what your body is doing.',
    features: [
      {
        title: 'Set up in 2 minutes',
        body: 'Enter the date of your last period, how long your cycle runs and your health goal. Nothing else.',
      },
      {
        title: 'Cycle calendar',
        body: 'Colour-coded phases, fertile window, period days and a dot for every daily log.',
      },
      {
        title: 'Period calculator',
        body: 'Predicts your next period and your fertile window at any moment, without waiting for the cycle to end.',
      },
      {
        title: 'Hormone chart',
        body: 'Your oestrogen and progesterone curve across the month, with today marked.',
      },
    ],
  },
  {
    eyebrow: 'Nutrition and recipes',
    title: 'What to eat,',
    accent: 'decided by your phase',
    lead: 'No more improvising in front of the fridge. Every recipe and every food is chosen for what it does for your hormones this week.',
    features: [
      {
        title: 'Recipes by phase',
        body: 'Every recipe tagged by cycle phase and by meal: breakfast, lunch, snack or dinner.',
      },
      {
        title: 'Weekly meal plan',
        body: 'A 7-day plan built around the phase you are in, with a protein, carbohydrate and fat breakdown for every meal.',
      },
      {
        title: 'Key food guide',
        body: 'Browse the foods that support your hormones, tagged for oestrogen, progesterone, anti-inflammatory and energy.',
      },
      {
        title: 'Shopping list',
        body: 'Builds itself from your phase foods and your weekly plan. Add your own and tick things off in the shop.',
      },
      {
        title: 'Saved recipes',
        body: 'Keep your favourites and have them to hand when you need them.',
      },
    ],
  },
  {
    eyebrow: 'With artificial intelligence',
    title: 'A coach who',
    accent: 'already knows the day you are on',
    lead: 'The difference between searching the internet and asking someone who knows your cycle.',
    features: [
      {
        title: 'Nutricycle AI coach',
        body: 'Ask anything about your cycle, your symptoms or what you eat. It knows your phase and the exact day you are on, so the answer is for you — not a generic one.',
        note: 'Powered by Google Gemini 2.0',
      },
      {
        title: 'AI cycle predictor',
        body: 'Predictions and insights drawn from your cycle history and the symptoms you have logged.',
      },
    ],
  },
  {
    eyebrow: 'Daily log',
    title: 'A minute a day,',
    accent: 'months of patterns',
    lead: 'The more you log, the more the app adjusts to you — and the more clearly you see what your body repeats each month.',
    features: [
      {
        title: 'Daily log',
        body: 'Symptoms, mood across 4 levels, energy across 3, and your own notes. Look back over your history whenever you like.',
      },
      {
        title: 'Hydration',
        body: 'Log your water intake with quick shortcuts: glass, bottle or flask.',
      },
      {
        title: 'Guided wellbeing',
        body: 'Yoga, meditation and breathing routines with a built-in timer, adapted to each phase.',
      },
    ],
  },
  {
    eyebrow: 'Content and learning',
    title: 'Understand',
    accent: 'what is happening to you',
    lead: 'Hormonal education in language that makes sense, inside the same app.',
    features: [
      {
        title: 'Article library',
        body: 'Evidence-based articles on hormonal health and cyclical nutrition, translated into your language.',
      },
      {
        title: 'Video library',
        body: 'Wellbeing videos by phase, with search and filters to find what you need today.',
      },
      {
        title: 'Smart notifications',
        body: 'Alerts when you move into a new phase, recommended recipes, and reminders to log your day.',
      },
    ],
  },
  {
    eyebrow: 'Your account',
    title: 'Yours,',
    accent: 'in your language',
    lead: '',
    features: [
      {
        title: 'Personalised profile',
        body: 'Your photo and your name, so the app feels like yours from day one.',
      },
      {
        title: 'Spanish and English',
        body: 'Switch language at any time without losing your history or your settings.',
      },
    ],
  },
];

/**
 * Merge the shared structure with the text for one locale.
 *
 * The assertions are deliberate. A missing group or card would otherwise
 * render an English page with a Spanish card in it, or silently drop a
 * feature — both worse than a build that refuses to finish.
 */
export function getFeatureGroups(locale: Locale): readonly FeatureGroup[] {
  if (locale === 'es') return FEATURE_GROUPS_ES;

  if (FEATURE_TEXT_EN.length !== FEATURE_GROUPS_ES.length) {
    throw new Error(
      `features.ts: ${FEATURE_GROUPS_ES.length} Spanish groups but ${FEATURE_TEXT_EN.length} English`,
    );
  }

  return FEATURE_GROUPS_ES.map((group, i) => {
    const text = FEATURE_TEXT_EN[i];
    if (text.features.length !== group.features.length) {
      throw new Error(
        `features.ts: group "${group.id}" has ${group.features.length} Spanish cards but ${text.features.length} English`,
      );
    }
    return {
      ...group,
      eyebrow: text.eyebrow,
      title: text.title,
      accent: text.accent,
      lead: text.lead,
      features: group.features.map((f, j) => ({
        ...f,
        title: text.features[j].title,
        body: text.features[j].body,
        ...(text.features[j].note !== undefined ? { note: text.features[j].note } : {}),
      })),
    };
  });
}

/** @deprecated Spanish-only. Use getFeatureGroups(locale). */
export const FEATURE_GROUPS = FEATURE_GROUPS_ES;
