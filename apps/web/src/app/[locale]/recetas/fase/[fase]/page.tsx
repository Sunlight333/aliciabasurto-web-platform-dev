import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PHASES, getPhase, phaseDays, type PhaseSlug } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { EmptyState, RecipeCard, PhaseFilter } from '@/components/content/content-pieces';
import { getRecipesByPhase } from '@/lib/content';
import { PHASE_HERO } from '@/lib/phase-hero';

export function generateStaticParams() {
  return PHASES.map((p) => ({ fase: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; fase: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, fase } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const phase = getPhase(fase as PhaseSlug, locale);
  if (!phase) return {};
  return {
    title: `Recetas para la fase ${phase.name.toLowerCase()}`,
    description: `${phase.nutrition} Recetas pensadas para los días ${phaseDays(phase, locale).toLowerCase()} de tu ciclo.`,
    alternates: { canonical: `/recetas/fase/${phase.slug}` },
  };
}

export default async function RecetasFasePage({
  params,
}: {
  params: Promise<{ locale: string; fase: string }>;
}) {
  const { locale: rawLocale, fase } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const phase = getPhase(fase as PhaseSlug, locale);
  if (!phase) notFound();

  const recipes = getRecipesByPhase(phase.slug);

  return (
    <>
      <PageHero
        eyebrow={`Recetas · ${phaseDays(phase, locale)}`}
        title={`Fase ${phase.name.toLowerCase()},`}
        accent="qué cocinar"
        lead={phase.nutrition}
        image={PHASE_HERO[phase.slug].image}
        focal="center 50%"
        veil={PHASE_HERO[phase.slug].veil}
      >
        <PhaseFilter active={phase.slug} />
      </PageHero>

      <Section surface="raised">
        <SectionTexture src="/images/textures/counter.avif" />
        <Container className="relative">
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
                  <RecipeCard recipe={r} locale={locale} />
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
