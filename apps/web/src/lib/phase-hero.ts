import type { PhaseSlug } from '@nutricycle/shared';

/**
 * Hero photography per cycle phase.
 *
 * Chosen as a colour story rather than four illustrations of the same
 * idea: linen warmth for menstrual, new growth for folicular, an open
 * bloom for ovulatoria, banked gold for lutea. Reading the four in order
 * should feel like the month passing.
 *
 * `veil` is per-frame because the frames do not carry the same weight —
 * a pale one erased by the same wash that a busy one needs. Values are
 * measured, not guessed; see image-assets.md §3b.
 *
 * Shared by `/ciclo/[fase]` and `/recetas/fase/[fase]` so the two phase
 * routes cannot drift apart.
 */
export const PHASE_HERO: Record<PhaseSlug, { image: string; veil: number }> = {
  menstrual: { image: '/images/heroes/fase-menstrual.avif', veil: 0.55 },
  folicular: { image: '/images/heroes/fase-folicular.avif', veil: 0.48 },
  ovulatoria: { image: '/images/heroes/fase-ovulatoria.avif', veil: 0.5 },
  lutea: { image: '/images/heroes/fase-lutea.avif', veil: 0.58 },
};
