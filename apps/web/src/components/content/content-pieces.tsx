import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ArrowRight, Inbox, Play } from 'lucide-react';
import { getPhases, getPhase, type PhaseSlug } from '@nutricycle/shared';
import { getDictionary, localizePath, type Locale } from '@/lib/i18n';
import type { Recipe, Video } from '@/lib/content';
import { formatDuration, videoPoster } from '@/lib/media';
import { cn } from '@/lib/cn';

export const PHASE_CHIP: Record<PhaseSlug, string> = {
  menstrual: 'bg-menstrual-soft text-menstrual-ink',
  folicular: 'bg-follicular-soft text-follicular-ink',
  ovulatoria: 'bg-ovulation-soft text-ovulation-ink',
  lutea: 'bg-luteal-soft text-luteal-ink',
};

/**
 * Shown wherever a listing has nothing to show.
 *
 * The live site's /testimonials renders as a blank shell
 * (site-audit.md §12.1). An empty listing should explain itself and
 * offer a way onward — never leave the reader wondering if it broke.
 */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="card mx-auto max-w-xl border-dashed p-11 text-center">
      <span className="icon-chip mx-auto bg-luteal-soft text-luteal-ink">
        <Inbox strokeWidth={1.9} className="h-9 w-9" />
      </span>
      <h2 className="mt-6 text-h3 text-ink">{title}</h2>
      <p className="mt-4 text-body text-muted">{body}</p>
      {action && (
        <Link
          href={action.href}
          className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-action px-7 py-4 font-sans text-nav font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-action-hover hover:shadow-lg"
        >
          {action.label}
          <ArrowRight
            strokeWidth={2.2}
            className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      )}
    </div>
  );
}

export function RecipeCard({ recipe, locale }: { recipe: Recipe; locale: Locale }) {
  const phase = getPhase(recipe.phase, locale);
  const t = getDictionary(locale);
  return (
    <Link href={localizePath(`/recetas/${recipe.slug}`, locale)} className="card card-hover flex h-full flex-col p-8">
      <div className="flex flex-wrap items-center gap-2.5">
        <span
          className={cn(
            'inline-flex rounded-full px-3.5 py-1.5 font-sans text-caption font-bold',
            PHASE_CHIP[recipe.phase],
          )}
        >
          {t.cycle.phaseEyebrow} {phase?.name.toLowerCase()}
        </span>
        <span className="inline-flex rounded-full bg-surface-sunken px-3.5 py-1.5 font-sans text-caption font-medium text-muted capitalize">
          {t.content.mealType[recipe.mealType]}
        </span>
      </div>

      <h3 className="mt-5 text-h3 text-ink">{recipe.title}</h3>
      <p className="mt-3 flex-1 text-small text-muted">{recipe.excerpt}</p>

      <div className="mt-6 flex items-center gap-5 text-caption text-muted">
        <span className="inline-flex items-center gap-2">
          <Clock strokeWidth={2} className="h-4.5 w-4.5 text-accent" />
          {recipe.minutes} min
        </span>
        <span className="inline-flex items-center gap-2">
          <Users strokeWidth={2} className="h-4.5 w-4.5 text-accent" />
          {recipe.servings} porciones
        </span>
      </div>
    </Link>
  );
}

/**
 * Video listing card — poster, duration, title, one line of description.
 *
 * The poster is the whole point of the card, so it goes edge to edge and the
 * text sits under it. That makes this the first component on the site to
 * carry client food photography; `RecipeCard` above is still text-only,
 * because no recipe has an image yet (video-language.md §6).
 */
export function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={`/videos/${video.slug}`}
      className="card card-hover group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-video bg-surface-sunken">
        <Image
          src={videoPoster(video.slug)}
          // Decorative here: the title sits directly below in the same link,
          // so describing the frame again would only make the link name longer
          // to listen to.
          alt=""
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />

        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/85 shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play strokeWidth={2} className="ml-1 h-7 w-7 fill-action text-action" />
          </span>
        </span>

        <span className="absolute right-3 bottom-3 rounded-full bg-ink/70 px-3 py-1 font-sans text-caption font-semibold text-white tabular-nums backdrop-blur-sm">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-h4 text-ink">{video.title}</h3>
        <p className="mt-2.5 flex-1 text-small text-muted">{video.excerpt}</p>
      </div>
    </Link>
  );
}

/** Phase filter row, shared by /recetas and /recetas/fase/[fase]. */
export function PhaseFilter({
  active,
  locale,
}: {
  active?: PhaseSlug;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      <li>
        <Link
          href={localizePath('/recetas', locale)}
          aria-current={!active ? 'page' : undefined}
          className={cn(
            'inline-flex rounded-full border px-5 py-2.5 font-sans text-caption font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
            !active
              ? 'border-transparent bg-action text-white'
              : 'border-hairline bg-white text-ink',
          )}
        >
          {t.recipes.all}
        </Link>
      </li>
      {getPhases(locale).map((p) => (
        <li key={p.slug}>
          <Link
            href={localizePath(`/recetas/fase/${p.slug}`, locale)}
            aria-current={active === p.slug ? 'page' : undefined}
            className={cn(
              'inline-flex rounded-full border px-5 py-2.5 font-sans text-caption font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
              active === p.slug
                ? 'border-transparent bg-action text-white'
                : 'border-hairline bg-white text-ink',
            )}
          >
            {p.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
