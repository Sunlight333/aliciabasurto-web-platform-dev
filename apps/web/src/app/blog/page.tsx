import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { EmptyState } from '@/components/content/content-pieces';
import { getArticles } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Educación hormonal — artículos',
  description:
    'Artículos sobre el ciclo menstrual, las hormonas y la nutrición cíclica. Qué pasa en cada fase y cómo acompañarlo con la alimentación.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  const articles = getArticles();

  return (
    <>
      <PageHero
        eyebrow="Educación hormonal"
        title="Entender tu ciclo"
        accent="cambia cómo te tratás"
        lead="Artículos sobre lo que hacen tus hormonas, por qué te sentís distinta cada semana y qué hacer al respecto."
        image="/images/heroes/blog.avif"
        focal="center 50%"
        veil={0.45}
      />

      <Section surface="raised">
        <SectionTexture src="/images/textures/papel.avif" />
        <Container className="relative">
          {articles.length === 0 ? (
            <Reveal>
              <EmptyState
                title="Los primeros artículos están en camino"
                body="Mientras tanto, la guía de las cuatro fases explica lo esencial: qué pasa en tu cuerpo cada semana y qué comer en cada una."
                action={{ href: '/ciclo', label: 'Ver las 4 fases' }}
              />
            </Reveal>
          ) : (
            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a, i) => (
                <Reveal as="li" key={a.slug} delay={i * 90} className="h-full">
                  <Link href={`/blog/${a.slug}`} className="card card-hover flex h-full flex-col p-8">
                    <span className="inline-flex w-fit rounded-full bg-surface-sunken px-3.5 py-1.5 font-sans text-caption font-semibold text-muted">
                      {a.category}
                    </span>
                    <h2 className="mt-5 text-h3 text-ink">{a.title}</h2>
                    <p className="mt-3 flex-1 text-small text-muted">{a.excerpt}</p>
                    <span className="mt-6 text-caption text-muted">{a.minutes} min de lectura</span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <CtaBand source="blog" />
    </>
  );
}
