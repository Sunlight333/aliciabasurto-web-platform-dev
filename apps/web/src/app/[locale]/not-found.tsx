import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

/**
 * 404. Offers routes out rather than a dead end — the old site's
 * equivalent was a blank page with a single "back" link
 * (site-audit.md §6).
 */
const SUGGESTIONS = [
  { href: '/ciclo', label: 'Las 4 fases de tu ciclo' },
  { href: '/recetas', label: 'Recetas por fase' },
  { href: '/funcionalidades', label: 'Qué hace la app' },
  { href: '/faq', label: 'Preguntas frecuentes' },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-gradient-to-b from-surface-lilac via-surface-raised to-surface-raised py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(50vw, 560px)',
            height: 'min(50vw, 560px)',
            top: '-25%',
            right: '-8%',
            background: 'var(--color-luteal)',
            opacity: 0.32,
          }}
        />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="icon-chip mx-auto bg-luteal-soft text-luteal-ink">
            <Compass strokeWidth={1.9} className="h-9 w-9" />
          </span>

          <Eyebrow className="mt-8">Error 404</Eyebrow>
          <h1 className="mt-5 text-h1 text-ink">
            Esta página <span className="text-accent">no existe</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lead text-muted">
            Puede que el enlace haya cambiado o que la escribieras distinto.
            Estas son las secciones más buscadas:
          </p>

          <ul className="mx-auto mt-10 flex max-w-md flex-col gap-3">
            {SUGGESTIONS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex items-center justify-between gap-4 rounded-card border border-hairline bg-white px-6 py-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-action px-7 py-4 font-sans text-nav font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-action-hover hover:shadow-lg"
          >
            Volver al inicio
          </Link>
        </div>
      </Container>
    </section>
  );
}
