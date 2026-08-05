import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { EmptyState, RecipeCard, PhaseFilter } from '@/components/content/content-pieces';
import { getRecipes } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Recetas por fase del ciclo',
  description:
    'Recetas organizadas por fase del ciclo menstrual: menstrual, folicular, ovulatoria y lútea. Qué cocinar según lo que tu cuerpo necesita esta semana.',
  alternates: { canonical: '/recetas' },
};

export default async function RecetasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  const recipes = getRecipes();

  return (
    <>
      <PageHero
        eyebrow={t.pages.recetas.eyebrow}
        title={t.pages.recetas.title}
        accent={t.pages.recetas.accent}
        lead={t.pages.recetas.lead}
        image="/images/heroes/recetas.avif"
        focal="center 45%"
        veil={0.68}
      >
        <PhaseFilter />
      </PageHero>

      <Section surface="raised">
        <SectionTexture src="/images/textures/counter.avif" />
        <Container className="relative">
          {recipes.length === 0 ? (
            <Reveal>
              <EmptyState
                title={t.pages.recetas.emptyTitle}
                body="Estamos preparando la selección abierta. Mientras tanto, la biblioteca completa está en la app."
                action={{ href: '/funcionalidades', label: 'Ver qué incluye la app' }}
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
        </Container>
      </Section>

      <CtaBand source="recetas" />
    </>
  );
}
