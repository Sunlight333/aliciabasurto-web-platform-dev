import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, alternatesFor, type Locale, localizePath } from '@/lib/i18n';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { EmptyState, RecipeCard, PhaseFilter } from '@/components/content/content-pieces';
import { getRecipes } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return {
    title: t.meta.recetas.title,
    description: t.meta.recetas.description,
    alternates: { canonical: '/recetas', languages: alternatesFor('/recetas') },
  };
}

export default async function RecetasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  const recipes = getRecipes(locale);

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
        <PhaseFilter locale={locale} />
      </PageHero>

      <Section surface="raised">
        <SectionTexture src="/images/textures/counter.avif" />
        <Container className="relative">
          {recipes.length === 0 ? (
            <Reveal>
              <EmptyState
                title={t.pages.recetas.emptyTitle}
                body={t.content.recipesEmptyBody}
                action={{ href: localizePath('/funcionalidades', locale), label: t.content.recipesEmptyAction }}
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

      <CtaBand source="recetas" locale={locale} />
    </>
  );
}
