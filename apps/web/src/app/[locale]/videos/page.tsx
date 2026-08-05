import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, type Locale } from '@/lib/i18n';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { EmptyState, VideoCard } from '@/components/content/content-pieces';
import { getVideos } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Videos — recetas paso a paso',
  description:
    'Diez recetas en video de 6 a 25 segundos: cámara cenital, manos a la obra y el plato terminado. Sin locución y sin vueltas.',
  alternates: { canonical: '/videos' },
};

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  const videos = getVideos();

  return (
    <>
      <PageHero
        eyebrow={t.pages.videos.eyebrow}
        title={t.pages.videos.title}
        accent={t.pages.videos.accent}
        lead={t.pages.videos.lead}
        image="/images/heroes/videos.avif"
        focal="center 50%"
        veil={0.45}
      />

      <Section surface="raised">
        <SectionTexture src="/images/textures/luz.avif" />
        <Container className="relative">
          {videos.length === 0 ? (
            <Reveal>
              <EmptyState
                title={t.pages.videos.emptyTitle}
                body="Los videos por fase viven hoy dentro de la app, junto con las recetas y el plan semanal."
                action={{ href: '/funcionalidades', label: 'Ver qué incluye la app' }}
              />
            </Reveal>
          ) : (
            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v, i) => (
                // Stagger is capped: at 90ms a step the tenth card would wait
                // most of a second after the first, which reads as lag rather
                // than choreography once the grid is this long.
                <Reveal as="li" key={v.slug} delay={Math.min(i, 5) * 90} className="h-full">
                  <VideoCard video={v} />
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <CtaBand source="videos" />
    </>
  );
}
