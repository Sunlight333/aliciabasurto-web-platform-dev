/**
 * The four cycle phases — single source of truth.
 *
 * ⚠️ BLOCKER: these day ranges are PROVISIONAL.
 * Three contradictory definitions exist across the live site and the app
 * strategy doc (see doc/00-overview/revised-direction.md §6). The website
 * must display the same phase the app computes for the same cycle day —
 * a mismatch breaks trust at the exact moment a reader is converting.
 *
 * Resolve against the app's phase-calculation code, then update here only.
 */

export type PhaseSlug = 'menstrual' | 'folicular' | 'ovulatoria' | 'lutea';

export interface Phase {
  slug: PhaseSlug;
  /** Display name, Spanish */
  name: string;
  /** Two-word mood, as used on the app landing page */
  tagline: string;
  dayStart: number;
  dayEnd: number;
  /** Short line describing the hormonal state */
  hormone: string;
  /** What to eat, one sentence */
  nutrition: string;
  /** Sample foods — kept short, these are chips not prose */
  foods: string[];
  /** Tailwind token names from tokens.css */
  tint: string;
  ink: string;
}

export const PHASES: readonly Phase[] = [
  {
    slug: 'menstrual',
    name: 'Menstrual',
    tagline: 'Descanso y restauración',
    dayStart: 1,
    dayEnd: 5,
    hormone: 'Hormonas en su punto más bajo. El cuerpo pide calma.',
    nutrition: 'Hierro, omega-3 y alimentos antiinflamatorios para reponer energía.',
    foods: ['Sopa de raíces', 'Arroz con cúrcuma', 'Té de jengibre'],
    tint: 'menstrual',
    ink: 'menstrual-ink',
  },
  {
    slug: 'folicular',
    name: 'Folicular',
    tagline: 'Energía y renovación',
    dayStart: 6,
    dayEnd: 13,
    hormone: 'El estrógeno sube. Vuelve la claridad y la fuerza.',
    nutrition: 'Crucíferas, semillas de linaza y proteínas ligeras.',
    foods: ['Granola', 'Avena matcha', 'Ensalada de garbanzos'],
    tint: 'follicular',
    ink: 'follicular-ink',
  },
  {
    slug: 'ovulatoria',
    name: 'Ovulatoria',
    tagline: 'Pico y vitalidad',
    dayStart: 14,
    dayEnd: 16,
    hormone: 'Máxima energía. El estrógeno alcanza su pico.',
    nutrition: 'Frutas antioxidantes, zinc y alimentos antiinflamatorios.',
    foods: ['Mousse de chocolate', 'Pizza de pollo', 'Okonomiyaki'],
    tint: 'ovulation',
    ink: 'ovulation-ink',
  },
  {
    slug: 'lutea',
    name: 'Lútea',
    tagline: 'Calma y preparación',
    dayStart: 17,
    dayEnd: 28,
    hormone: 'La progesterona se activa. Aparecen los antojos y el SPM.',
    nutrition: 'Magnesio, triptófano y carbohidratos complejos.',
    foods: ['Brownies de almendra', 'Tortilla de naranja', 'Pudding de chía'],
    tint: 'luteal',
    ink: 'luteal-ink',
  },
] as const;

export function getPhase(slug: PhaseSlug): Phase | undefined {
  return PHASES.find((p) => p.slug === slug);
}

/** Day range as a display string, e.g. "Días 6–13" */
export function phaseDays(phase: Phase): string {
  return `Días ${phase.dayStart}–${phase.dayEnd}`;
}
