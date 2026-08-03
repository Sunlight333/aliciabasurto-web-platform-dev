import type { PhaseSlug } from '@nutricycle/shared';
import type { Article, Recipe, Video } from './index';
import cremaDeZapallo from '@/content/recipes/crema-de-zapallo.json';

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
 * Articles and videos have no content yet. Titles are proposed in
 * app-content-strategy.md §5 and six `<video>` elements exist on the
 * live site, but neither has been supplied. Every listing renders a real
 * empty state rather than a blank region — the bug the live
 * /testimonials page ships (site-audit.md §12.1).
 */
const ARTICLES: Article[] = [];
const VIDEOS: Video[] = [];

const published = <T extends { publishedToWeb: boolean }>(items: T[]) =>
  items.filter((i) => i.publishedToWeb);

export function getRecipes(): Recipe[] {
  return published(RECIPES);
}

export function getRecipe(slug: string): Recipe | undefined {
  return getRecipes().find((r) => r.slug === slug);
}

export function getRecipesByPhase(phase: PhaseSlug): Recipe[] {
  return getRecipes().filter((r) => r.phase === phase);
}

export function getArticles(): Article[] {
  return published(ARTICLES);
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function getVideos(): Video[] {
  return published(VIDEOS);
}

export interface SearchHit {
  kind: 'receta' | 'articulo' | 'video';
  slug: string;
  title: string;
  excerpt: string;
  href: string;
}

/** Substring match over title and excerpt — adequate at this corpus size. */
export function search(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const hit = (text: string) => text.toLowerCase().includes(q);

  return [
    ...getRecipes()
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
    ...getVideos()
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
