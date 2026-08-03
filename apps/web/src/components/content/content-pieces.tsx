import Link from 'next/link';
import { Clock, Users, ArrowRight, Inbox } from 'lucide-react';
import { PHASES, getPhase, type PhaseSlug } from '@nutricycle/shared';
import type { Recipe } from '@/lib/content';
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

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const phase = getPhase(recipe.phase);
  return (
    <Link href={`/recetas/${recipe.slug}`} className="card card-hover flex h-full flex-col p-8">
      <div className="flex flex-wrap items-center gap-2.5">
        <span
          className={cn(
            'inline-flex rounded-full px-3.5 py-1.5 font-sans text-caption font-bold',
            PHASE_CHIP[recipe.phase],
          )}
        >
          Fase {phase?.name.toLowerCase()}
        </span>
        <span className="inline-flex rounded-full bg-surface-sunken px-3.5 py-1.5 font-sans text-caption font-medium text-muted capitalize">
          {recipe.mealType}
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

/** Phase filter row, shared by /recetas and /recetas/fase/[fase]. */
export function PhaseFilter({ active }: { active?: PhaseSlug }) {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      <li>
        <Link
          href="/recetas"
          aria-current={!active ? 'page' : undefined}
          className={cn(
            'inline-flex rounded-full border px-5 py-2.5 font-sans text-caption font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
            !active
              ? 'border-transparent bg-action text-white'
              : 'border-hairline bg-white text-ink',
          )}
        >
          Todas
        </Link>
      </li>
      {PHASES.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/recetas/fase/${p.slug}`}
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
