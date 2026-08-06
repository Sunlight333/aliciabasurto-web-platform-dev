import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, localizePath, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPhases, getPhase, phaseDays, type PhaseSlug } from '@nutricycle/shared';
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
  return getPhases(DEFAULT_LOCALE).map((p) => ({ fase: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; fase: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, fase } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
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
  const t = getDictionary(locale);
  const phase = getPhase(fase as PhaseSlug, locale);
  if (!phase) notFound();

  const recipes = getRecipesByPhase(phase.slug, locale);

  return (
    <>
      <PageHero
        eyebrow={`${t.pages.recetas.eyebrow} · ${phaseDays(phase, locale)}`}
        title={`${t.cycle.phaseEyebrow} ${phase.name.toLowerCase()},`}
        accent={t.pages.recetas.phaseAccent}
        lead={phase.nutrition}
        image={PHASE_HERO[phase.slug].image}
        focal="center 50%"
        veil={PHASE_HERO[phase.slug].veil}
      >
        <PhaseFilter active={phase.slug} locale={locale} />
      </PageHero>

      <Section surface="raised">
        <SectionTexture src="/images/textures/counter.avif" />
        <Container className="relative">
          {recipes.length === 0 ? (
            <Reveal>
              <EmptyState
                title={`${t.content.recipesPhaseEmptyTitleBefore} ${phase.name.toLowerCase()}`}
                body={t.content.recipesPhaseEmptyBody}
                action={{ href: localizePath('/recetas', locale), label: t.recipes.seeAll }}
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
              href={localizePath(`/ciclo/${phase.slug}`, locale)}
              className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
            >
              {t.recipes.understandPhase} {phase.name.toLowerCase()}
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </Reveal>
        </Container>
      </Section>

      <CtaBand source={`recetas-${phase.slug}`} locale={locale} />
    </>
  );
}
