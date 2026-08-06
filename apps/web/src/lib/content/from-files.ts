import { DEFAULT_LOCALE, type Locale, type PhaseSlug } from '@nutricycle/shared';
import type { Article, Recipe, Video } from './index';
import cremaDeZapallo from '@/content/recipes/crema-de-zapallo.json';
import videos from '@/content/videos.json';

/**
 * File-backed implementation of the content interface.
 *
 * Imports are static and explicit rather than a directory glob: it keeps
 * the module bundler-safe, makes every published item visible in one
 * place, and means a malformed file fails the build instead of silently
 * vanishing from a listing.
 *
 * Adding a recipe = one JSON file + one line here.
 */
const RECIPES: Recipe[] = [cremaDeZapallo as Recipe];

/**
 * ⚠️ Empty by design, not by oversight.
 *
 * Articles have no content yet. Titles are proposed in
 * app-content-strategy.md §5, but nothing has been supplied. The listing
 * renders a real empty state rather than a blank region — the bug the live
 * /testimonials page ships (site-audit.md §12.1).
 */
const ARTICLES: Article[] = [];

/**
 * The ten recipe videos the client supplied, transcoded and named by
 * `scripts/transcode-videos.mjs`. Unlike the recipes these are one file
 * rather than one-file-per-item: a video entry is five fields of metadata,
 * not a document, and keeping them in a single array makes the running
 * order — which is the client's own #21…#31 sequence — visible at a glance.
 *
 * The media itself is not in the repo; see `lib/media.ts` for how it is
 * addressed.
 */
const VIDEOS: Video[] = videos as Video[];

const published = <T extends { publishedToWeb: boolean }>(items: T[]) =>
  items.filter((i) => i.publishedToWeb);

/**
 * Merge an item's English overlay when the locale asks for it.
 *
 * The overlay is spread over the Spanish item rather than replacing it, so
 * untranslated fields keep their Spanish value instead of coming back
 * undefined and rendering a blank card.
 */
const localize = <T extends { en?: object }>(item: T, locale: Locale): T =>
  locale === 'en' && item.en ? { ...item, ...item.en } : item;

export function getRecipes(locale: Locale = DEFAULT_LOCALE): Recipe[] {
  return published(RECIPES).map((r) => localize(r, locale));
}

export function getRecipe(slug: string, locale: Locale = DEFAULT_LOCALE): Recipe | undefined {
  return getRecipes(locale).find((r) => r.slug === slug);
}

export function getRecipesByPhase(phase: PhaseSlug, locale: Locale = DEFAULT_LOCALE): Recipe[] {
  return getRecipes(locale).filter((r) => r.phase === phase);
}

export function getArticles(): Article[] {
  return published(ARTICLES);
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function getVideos(locale: Locale = DEFAULT_LOCALE): Video[] {
  return published(VIDEOS).map((v) => localize(v, locale));
}

export interface SearchHit {
  kind: 'receta' | 'articulo' | 'video';
  slug: string;
  title: string;
  excerpt: string;
  href: string;
}

/** Substring match over title and excerpt — adequate at this corpus size. */
export function search(query: string, locale: Locale = DEFAULT_LOCALE): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const hit = (text: string) => text.toLowerCase().includes(q);

  return [
    ...getRecipes(locale)
      .filter((r) => hit(r.title) || hit(r.excerpt))
      .map((r): SearchHit => ({
        kind: 'receta',
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        href: `/recetas/${r.slug}`,
      })),
    ...getArticles()
      .filter((a) => hit(a.title) || hit(a.excerpt))
      .map((a): SearchHit => ({
        kind: 'articulo',
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        href: `/blog/${a.slug}`,
      })),
    ...getVideos(locale)
      .filter((v) => hit(v.title) || hit(v.excerpt))
      .map((v): SearchHit => ({
        kind: 'video',
        slug: v.slug,
        title: v.title,
        excerpt: v.excerpt,
        href: `/videos/${v.slug}`,
      })),
  ];
}
