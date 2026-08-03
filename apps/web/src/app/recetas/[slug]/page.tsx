import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Users, ArrowLeft, ArrowRight, Sparkles, Info } from 'lucide-react';
import { getPhase, phaseDays } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { PHASE_CHIP } from '@/components/content/content-pieces';
import { getRecipe, getRecipes } from '@/lib/content';
import { cn } from '@/lib/cn';

export function generateStaticParams() {
  return getRecipes().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};
  return {
    title: recipe.title,
    description: recipe.excerpt,
    alternates: { canonical: `/recetas/${recipe.slug}` },
  };
}

/**
 * Recipe structured data. Google surfaces these with times, servings and
 * ingredients — worth having on a page whose whole purpose is long-tail
 * search ("qué comer en fase lútea").
 */
function recipeJsonLd(recipe: NonNullable<ReturnType<typeof getRecipe>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.excerpt,
    recipeYield: `${recipe.servings} porciones`,
    totalTime: `PT${recipe.minutes}M`,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((s) => ({
      '@type': 'HowToStep',
      name: s.title,
      text: s.body,
    })),
    author: { '@type': 'Person', name: 'Alicia Basurto' },
  };
}

export default async function RecetaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const phase = getPhase(recipe.phase);
  const others = getRecipes().filter((r) => r.slug !== recipe.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd(recipe)) }}
      />

      <PageHero
        eyebrow={`Receta · Fase ${phase?.name.toLowerCase()}`}
        title={recipe.title}
        lead={recipe.excerpt}
        image="/images/textures/counter.avif"
        focal="center 45%"
      >
        <ul className="flex flex-wrap justify-center gap-3">
          {[
            { icon: Clock, label: `${recipe.minutes} min` },
            { icon: Users, label: `${recipe.servings} porciones` },
          ].map((m) => (
            <li
              key={m.label}
              className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white/70 px-5 py-2.5 font-sans text-caption font-semibold text-ink shadow-sm backdrop-blur-sm"
            >
              <m.icon strokeWidth={2} className="h-4.5 w-4.5 text-accent" />
              {m.label}
            </li>
          ))}
          {phase && (
            <li
              className={cn(
                'inline-flex items-center rounded-full px-5 py-2.5 font-sans text-caption font-bold',
                PHASE_CHIP[phase.slug],
              )}
            >
              {phaseDays(phase)}
            </li>
          )}
        </ul>
      </PageHero>

      <Section surface="raised">
        <Container size="prose">
          <Reveal>
            <p className="text-lead text-muted">{recipe.intro}</p>
          </Reveal>

          <Reveal className="mt-14" delay={80}>
            <h2 className="text-h2 text-ink">Ingredientes</h2>
            <ul className="mt-7 flex flex-col gap-3">
              {recipe.ingredients.map((ing) => (
                <li key={ing} className="card flex gap-4 p-5">
                  <span
                    aria-hidden
                    className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent-display"
                  />
                  <span className="text-body text-muted">{ing}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14" delay={120}>
            <h2 className="text-h2 text-ink">Preparación</h2>
            <ol className="mt-7 flex flex-col gap-6">
              {recipe.steps.map((step, i) => (
                <li key={step.title} className="card flex gap-6 p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface-sunken font-display text-h4 font-semibold text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-h4 text-ink">{step.title}</h3>
                    <p className="mt-2 text-body text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-14" delay={160}>
            <h2 className="text-h2 text-ink">Consejos</h2>
            <ul className="mt-7 flex flex-col gap-3">
              {recipe.tips.map((t) => (
                <li key={t} className="flex gap-4 text-body text-muted">
                  <Sparkles
                    aria-hidden
                    strokeWidth={2}
                    className="mt-1 h-5 w-5 shrink-0 text-accent-display"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14" delay={200}>
            <div className={cn('rounded-card p-8', phase && PHASE_CHIP[phase.slug])}>
              <h2 className="font-display text-h3">Por qué acompaña a esta fase</h2>
              <p className="mt-4 text-body">{recipe.benefits}</p>
            </div>
          </Reveal>

          <Reveal className="mt-14 grid gap-10 sm:grid-cols-2" delay={240}>
            <div>
              <h2 className="text-h3 text-ink">Para acompañar</h2>
              <ul className="mt-5 flex flex-col gap-2.5">
                {recipe.pairings.map((p) => (
                  <li key={p} className="text-small text-muted">
                    · {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-h3 text-ink">Variaciones</h2>
              <ul className="mt-5 flex flex-col gap-2.5">
                {recipe.variations.map((v) => (
                  <li key={v} className="text-small text-muted">
                    · {v}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="mt-14" delay={280}>
            <p className="flex items-start gap-3.5 rounded-card border border-hairline bg-white p-6 text-caption text-muted">
              <Info aria-hidden strokeWidth={2} className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>
                Información general de nutrición, no consejo médico.{' '}
                <Link
                  href="/aviso-medico"
                  className="font-semibold text-accent underline underline-offset-4"
                >
                  Leé el aviso médico
                </Link>
                .
              </span>
            </p>
          </Reveal>

          {/* Never a dead end — the live /post pages have no way onward
              (site-audit.md §12.1 item 2). */}
          <Reveal className="mt-14 border-t border-hairline pt-9" delay={320}>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <Link
                href={`/recetas/fase/${recipe.phase}`}
                className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
              >
                <ArrowLeft
                  strokeWidth={2.2}
                  className="h-5.5 w-5.5 transition-transform duration-300 group-hover:-translate-x-1.5"
                />
                Más de la fase {phase?.name.toLowerCase()}
              </Link>
              <Link
                href="/recetas"
                className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-muted transition-colors hover:text-ink"
              >
                Todas las recetas
                <ArrowRight
                  strokeWidth={2.2}
                  className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </div>

            {others.length > 0 && (
              <>
                <Eyebrow className="mt-12">También te puede servir</Eyebrow>
                <ul className="mt-5 flex flex-col gap-3">
                  {others.slice(0, 3).map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/recetas/${o.slug}`}
                        className="card card-hover block p-6 font-display text-h4 text-ink"
                      >
                        {o.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        </Container>
      </Section>

      <CtaBand source={`receta-${recipe.slug}`} />
    </>
  );
}
