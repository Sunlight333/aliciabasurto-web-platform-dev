import type { Locale, PhaseSlug } from '@nutricycle/shared';

/**
 * The content interface every page imports from.
 *
 * Today it is backed by JSON files in `src/content` (see
 * doc/03-architecture/content-stack.md). When Supabase credentials
 * arrive — project-brief.md blocker #1 — add `from-supabase.ts` with
 * the same exports and change the re-export below. No page changes.
 */

export type MealType = 'desayuno' | 'almuerzo' | 'snack' | 'cena';

/**
 * English overlay for a piece of content.
 *
 * Client content arrives in Spanish. Rather than duplicate whole files per
 * locale — which drifts the moment one side is edited — each item carries an
 * optional `en` block with only the translatable fields, and the loader
 * merges it when the locale is English. A missing overlay falls back to
 * Spanish, so a new recipe is publishable before it is translated.
 *
 * ⚠️ The English text is a translation of the client's Spanish, made here
 * and not reviewed by them. It should be read back before launch — it is
 * their culinary voice, not ours.
 */
export interface RecipeEn {
  title: string;
  excerpt: string;
  intro: string;
  ingredients: string[];
  steps: { title: string; body: string }[];
  tips: string[];
  benefits: string;
  pairings: string[];
  variations: string[];
}

export interface Recipe {
  slug: string;
  title: string;
  excerpt: string;
  phase: PhaseSlug;
  mealType: MealType;
  minutes: number;
  servings: number;
  intro: string;
  ingredients: string[];
  steps: { title: string; body: string }[];
  tips: string[];
  benefits: string;
  pairings: string[];
  variations: string[];
  /** The teaser gate from revised-direction.md §7 */
  publishedToWeb: boolean;
  /** Provenance, so migrated content is distinguishable from new */
  source?: string;
  /** English overlay; absent means "not translated yet, show Spanish". */
  en?: RecipeEn;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  minutes: number;
  publishedToWeb: boolean;
}

export interface Video {
  slug: string;
  title: string;
  excerpt: string;
  /**
   * `general` until the client assigns one. The ten supplied videos are
   * recipes with no phase attached, and inferring one from the ingredients
   * would be inventing a nutrition claim on the client's behalf — see
   * doc/04-content/video-language.md §7.
   */
  phase: PhaseSlug | 'general';
  /** Seconds, measured from the master. Drives the badge and schema.org. */
  duration: number;
  publishedToWeb: boolean;
  /** Provenance, so client media is distinguishable from anything new */
  source?: string;
  en?: { title: string; excerpt: string };
}

export {
  getRecipes,
  getRecipe,
  getRecipesByPhase,
  getArticles,
  getArticle,
  getVideos,
  search,
} from './from-files';
