import type { Metadata } from 'next';
import Link from 'next/link';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { EmptyState } from '@/components/content/content-pieces';
import { search } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Buscar',
  description: 'Buscá recetas, artículos y videos en Nutricycle.',
  robots: { index: false, follow: true },
};

/**
 * Server-rendered search over a GET form.
 *
 * No JavaScript needed: the form submits, the server filters, the page
 * renders. At this corpus size a client-side index would be more code
 * for a worse result, and this works with JS disabled — which the reveal
 * fallback already taught us to care about.
 *
 * Not indexed: search result pages are thin duplicates of the content
 * they point at.
 */
const SUGGESTIONS = [
  { href: '/recetas', label: 'Todas las recetas' },
  { href: '/ciclo', label: 'Las 4 fases del ciclo' },
  { href: '/funcionalidades', label: 'Funciones de la app' },
  { href: '/faq', label: 'Preguntas frecuentes' },
];

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const query = q.trim();
  const results = query ? search(query) : [];

  return (
    <>
      <PageHero eyebrow="Buscar" title="¿Qué estás" accent="buscando?">
        <form action="/buscar" method="get" role="search" className="mx-auto max-w-xl">
          <label htmlFor="q" className="sr-only">
            Buscar en Nutricycle
          </label>
          <div className="flex items-center gap-3 rounded-full border border-hairline bg-white p-2 pl-6 shadow-md">
            <SearchIcon
              aria-hidden
              strokeWidth={2}
              className="h-5.5 w-5.5 shrink-0 text-accent"
            />
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Recetas, fases, hormonas…"
              className="min-w-0 flex-1 bg-transparent py-3 font-sans text-body text-ink outline-none placeholder:text-muted/70"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-action px-6 py-3 font-sans text-caption font-bold text-white shadow-sm transition-colors hover:bg-action-hover"
            >
              Buscar
            </button>
          </div>
        </form>
      </PageHero>

      <Section surface="raised">
        <Container>
          {!query ? (
            <Reveal>
              <div className="mx-auto max-w-xl text-center">
                <Eyebrow>Sugerencias</Eyebrow>
                <ul className="mt-7 flex flex-col gap-3">
                  {SUGGESTIONS.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="group card card-hover flex items-center justify-between gap-4 p-6 text-left"
                      >
                        <span className="font-sans text-small font-semibold text-ink">
                          {s.label}
                        </span>
                        <ArrowRight
                          strokeWidth={2.2}
                          className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : results.length === 0 ? (
            <Reveal>
              <EmptyState
                title={`Nada coincide con «${query}»`}
                body="Probá con una palabra más corta, o mirá las secciones principales del sitio."
                action={{ href: '/recetas', label: 'Ver las recetas' }}
              />
            </Reveal>
          ) : (
            <>
              <Reveal>
                <p className="text-body text-muted">
                  {results.length}{' '}
                  {results.length === 1 ? 'resultado' : 'resultados'} para{' '}
                  <span className="font-semibold text-ink">«{query}»</span>
                </p>
              </Reveal>

              <ul className="mt-9 flex flex-col gap-4">
                {results.map((r, i) => (
                  <Reveal as="li" key={`${r.kind}-${r.slug}`} delay={i * 70}>
                    <Link href={r.href} className="card card-hover block p-7">
                      <span className="inline-flex rounded-full bg-surface-sunken px-3.5 py-1.5 font-sans text-caption font-semibold text-muted capitalize">
                        {r.kind}
                      </span>
                      <h2 className="mt-4 text-h3 text-ink">{r.title}</h2>
                      <p className="mt-2 text-small text-muted">{r.excerpt}</p>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
