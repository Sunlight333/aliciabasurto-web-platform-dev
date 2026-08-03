import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PHASES, getPhase, phaseDays, type PhaseSlug } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { EmptyState, RecipeCard, PhaseFilter } from '@/components/content/content-pieces';
import { getRecipesByPhase } from '@/lib/content';

export function generateStaticParams() {
  return PHASES.map((p) => ({ fase: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ fase: string }>;
}): Promise<Metadata> {
  const { fase } = await params;
  const phase = getPhase(fase as PhaseSlug);
  if (!phase) return {};
  return {
    title: `Recetas para la fase ${phase.name.toLowerCase()}`,
    description: `${phase.nutrition} Recetas pensadas para los días ${phaseDays(phase).toLowerCase()} de tu ciclo.`,
    alternates: { canonical: `/recetas/fase/${phase.slug}` },
  };
}

export default async function RecetasFasePage({
  params,
}: {
  params: Promise<{ fase: string }>;
}) {
  const { fase } = await params;
  const phase = getPhase(fase as PhaseSlug);
  if (!phase) notFound();

  const recipes = getRecipesByPhase(phase.slug);

  return (
    <>
      <PageHero
        eyebrow={`Recetas · ${phaseDays(phase)}`}
        title={`Fase ${phase.name.toLowerCase()},`}
        accent="qué cocinar"
        lead={phase.nutrition}
        image="/images/textures/counter.avif"
        focal="center 40%"
      >
        <PhaseFilter active={phase.slug} />
      </PageHero>

      <Section surface="raised">
        <Container>
          {recipes.length === 0 ? (
            <Reveal>
              <EmptyState
                title={`Aún no hay recetas para la fase ${phase.name.toLowerCase()}`}
                body="Estamos publicando la selección por fases. La biblioteca completa está disponible en la app."
                action={{ href: '/recetas', label: 'Ver todas las recetas' }}
              />
            </Reveal>
          ) : (
            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i * 90} className="h-full">
                  <RecipeCard recipe={r} />
                </Reveal>
              ))}
            </ul>
          )}

          <Reveal className="mt-12 text-center" delay={220}>
            <Link
              href={`/ciclo/${phase.slug}`}
              className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
            >
              Entender la fase {phase.name.toLowerCase()}
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </Reveal>
        </Container>
      </Section>

      <CtaBand source={`recetas-${phase.slug}`} />
    </>
  );
}
