import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { EmptyState } from '@/components/content/content-pieces';
import { getVideos } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Videos — recetas y educación hormonal',
  description:
    'Recetas en video de 30 a 90 segundos y videos educativos sobre el ciclo menstrual y las hormonas.',
  alternates: { canonical: '/videos' },
};

export default function VideosPage() {
  const videos = getVideos();

  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="Verlo una vez"
        accent="y ya saber hacerlo"
        lead="Recetas en video cortas y explicaciones sobre tu ciclo, sin tecnicismos."
        image="/images/textures/calma.avif"
        focal="center 35%"
      />

      <Section surface="raised">
        <Container>
          {videos.length === 0 ? (
            <Reveal>
              <EmptyState
                title="La videoteca está en preparación"
                body="Los videos por fase viven hoy dentro de la app, junto con las recetas y el plan semanal."
                action={{ href: '/funcionalidades', label: 'Ver qué incluye la app' }}
              />
            </Reveal>
          ) : (
            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v, i) => (
                <Reveal as="li" key={v.slug} delay={i * 90} className="h-full">
                  <article className="card card-hover h-full p-8">
                    <h2 className="text-h3 text-ink">{v.title}</h2>
                    <p className="mt-3 text-small text-muted">{v.excerpt}</p>
                  </article>
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
