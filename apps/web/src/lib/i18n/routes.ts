import type { Locale } from './config';

/**
 * Route slug map, Spanish key → target-locale slug.
 *
 * ⚠️ Slugs are currently **shared**, so English is a prefix: `/recetas` pairs
 * with `/en/recetas`. revised-direction.md §3 asks for localized slugs
 * (`/en/recipes`), and this table is the seam where that lands — the
 * translation machinery below already handles differing slugs, and the route
 * test covers both directions.
 *
 * It is not switched on yet because the page directories under `app/[locale]`
 * carry Spanish names, so `/en/recipes` would 404. Turning it on means either
 * English-named directories or a rewrite per route, and shipping a *working*
 * switch on shared slugs beats shipping prettier URLs that 404. Tracked as a
 * follow-up rather than silently dropped.
 *
 * Keys are the Spanish path with no leading slash. Dynamic segments are
 * written as `:param` and carried across untouched unless they appear in
 * PHASE_SLUGS below.
 */
const ROUTE_MAP: Record<string, string> = {
  '': '',
  'como-funciona': 'como-funciona',
  ciclo: 'ciclo',
  'ciclo/:phase': 'ciclo/:phase',
  recetas: 'recetas',
  'recetas/:slug': 'recetas/:slug',
  'recetas/fase/:phase': 'recetas/fase/:phase',
  funcionalidades: 'funcionalidades',
  cursos: 'cursos',
  membresia: 'membresia',
  sobre: 'sobre',
  faq: 'faq',
  contacto: 'contacto',
  blog: 'blog',
  'blog/:slug': 'blog/:slug',
  videos: 'videos',
  'videos/:slug': 'videos/:slug',
  descargar: 'descargar',
  enlaces: 'enlaces',
  privacidad: 'privacidad',
  terminos: 'terminos',
  cookies: 'cookies',
  'aviso-medico': 'aviso-medico',
};

/**
 * Phase slugs travel unchanged for the same reason as the routes above.
 */
export const PHASE_SLUGS: Record<string, string> = {
  menstrual: 'menstrual',
  folicular: 'folicular',
  ovulatoria: 'ovulatoria',
  lutea: 'lutea',
};

const EN_TO_ES_PHASE = Object.fromEntries(
  Object.entries(PHASE_SLUGS).map(([es, en]) => [en, es]),
);

/**
 * Segment-level reverse map, derived by zipping each pattern pair rather
 * than written by hand.
 *
 * Deriving it matters: `recetas/fase/:phase` pairs with `recipes/phase/:phase`,
 * so `fase → phase` only exists *inside* a pattern and never as a standalone
 * route. A hand-written first-segment map misses it, and every
 * `/en/recipes/phase/*` URL then fails to translate back and lands on `/`.
 */
const EN_TO_ES_SEGMENT: Record<string, string> = {};
for (const [es, en] of Object.entries(ROUTE_MAP)) {
  const esParts = es.split('/').filter(Boolean);
  const enParts = en.split('/').filter(Boolean);
  if (esParts.length !== enParts.length) continue;
  esParts.forEach((seg, i) => {
    if (!seg.startsWith(':') && !enParts[i].startsWith(':')) {
      EN_TO_ES_SEGMENT[enParts[i]] = seg;
    }
  });
}

/** Canonical phase slug (Spanish) for a segment in either language. */
export function canonicalPhase(segment: string): string {
  return EN_TO_ES_PHASE[segment] ?? segment;
}

/** Phase slug as it appears in a URL for the given locale. */
export function phaseSlug(canonical: string, locale: Locale): string {
  return locale === 'en' ? (PHASE_SLUGS[canonical] ?? canonical) : canonical;
}

/** Strip the locale prefix and return the Spanish-canonical path. */
function toCanonical(pathname: string): string {
  const raw = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const parts = raw.split('/').filter(Boolean);
  if (!parts.length) return '';

  // Translate any English segment back to its Spanish key so the pattern
  // match below works from either direction.
  const es = parts.map((p) => EN_TO_ES_SEGMENT[p] ?? EN_TO_ES_PHASE[p] ?? p);
  return es.join('/');
}

/**
 * Translate any in-app path into its equivalent for `to`.
 *
 * Falls back to the locale root rather than guessing when a path has no
 * mapping — a wrong guess here is a 404 in the reader's face, and the
 * homepage is at least somewhere they can continue from.
 */
export function localizePath(pathname: string, to: Locale): string {
  const canonical = toCanonical(pathname);
  const parts = canonical.split('/').filter(Boolean);

  const build = (segments: string[]) => {
    const path = segments.filter(Boolean).join('/');
    if (to === 'es') return '/' + path;
    return path ? `/en/${path}` : '/en';
  };

  if (!parts.length) return build([]);

  // Longest-first so `recetas/fase/:phase` wins over `recetas/:slug`.
  const patterns = Object.keys(ROUTE_MAP).sort(
    (a, b) => b.split('/').length - a.split('/').length,
  );

  for (const pattern of patterns) {
    const pat = pattern.split('/').filter(Boolean);
    if (pat.length !== parts.length) continue;

    const params: string[] = [];
    const matches = pat.every((seg, i) => {
      if (seg.startsWith(':')) {
        params.push(parts[i]);
        return true;
      }
      return seg === parts[i];
    });
    if (!matches) continue;

    const target = (to === 'en' ? ROUTE_MAP[pattern] : pattern).split('/').filter(Boolean);
    let p = 0;
    const out = target.map((seg) => {
      if (!seg.startsWith(':')) return seg;
      const value = params[p++];
      return seg === ':phase' ? phaseSlug(canonicalPhase(value), to) : value;
    });
    return build(out);
  }

  return build([]);
}

/** Both locale URLs for a path, for `alternates.languages`. */
export function alternatesFor(pathname: string) {
  return {
    es: localizePath(pathname, 'es'),
    en: localizePath(pathname, 'en'),
  };
}

/** Path for a Spanish-canonical route in the given locale. */
export function routePath(canonical: string, locale: Locale): string {
  return localizePath('/' + canonical.replace(/^\//, ''), locale);
}
