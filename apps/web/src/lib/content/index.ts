import type { PhaseSlug } from '@nutricycle/shared';

/**
 * The content interface every page imports from.
 *
 * Today it is backed by JSON files in `src/content` (see
 * doc/03-architecture/content-stack.md). When Supabase credentials
 * arrive — project-brief.md blocker #1 — add `from-supabase.ts` with
 * the same exports and change the re-export below. No page changes.
 */

export type MealType = 'desayuno' | 'almuerzo' | 'snack' | 'cena';

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
  phase: PhaseSlug | 'general';
  publishedToWeb: boolean;
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
