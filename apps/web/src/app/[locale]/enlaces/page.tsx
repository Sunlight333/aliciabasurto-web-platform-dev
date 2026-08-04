import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { SITE, SOCIAL } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { StoreButtons } from '@/components/marketing/store-buttons';

export const metadata: Metadata = {
  title: 'Enlaces — Nutricycle',
  description:
    'Todos los enlaces de Nutricycle y Alicia Basurto en un solo lugar: la app, recetas por fase, educación hormonal y redes.',
  alternates: { canonical: '/enlaces' },
  robots: { index: false, follow: true },
};

/**
 * Link-in-bio hub, replacing the live site's /instagram.
 *
 * Deliberately excluded from search: it duplicates navigation that
 * already exists and would compete with the real pages for the same
 * queries. It exists to be pasted into a bio, not found on Google.
 */
const LINKS = [
  { href: '/recetas', label: 'Recetas por fase del ciclo', note: 'Qué comer esta semana' },
  { href: '/ciclo', label: 'Las 4 fases de tu ciclo', note: 'Qué le pasa a tu cuerpo' },
  { href: '/funcionalidades', label: 'Qué hace la app', note: 'Todas las funciones' },
  { href: '/blog', label: 'Educación hormonal', note: 'Artículos y guías' },
  { href: '/sobre', label: 'Sobre Alicia', note: 'El método detrás de Nutricycle' },
];

export default function EnlacesPage() {
  const social = SOCIAL.filter((s) => s.href);

  return (
    <section className="relative min-h-svh overflow-hidden bg-gradient-to-b from-surface-lilac via-surface-raised to-surface-blush py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(60vw, 620px)',
            height: 'min(60vw, 620px)',
            top: '-20%',
            left: '-15%',
            background: 'var(--color-luteal)',
            opacity: 0.3,
          }}
        />
      </div>

      <Container className="relative">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <Image
            src="/images/brand/logo-lockup-trimmed.png"
            alt="Nutricycle"
            width={202}
            height={179}
            priority
            className="h-24 w-auto"
          />

          <Eyebrow className="mt-8">Nutrición cíclica</Eyebrow>
          <h1 className="mt-4 text-h2 text-ink">
            Come con tu ciclo, <span className="text-accent">vuelve a sentirte tú</span>
          </h1>

          <StoreButtons source="enlaces" className="mt-9 w-full" />

          <ul className="mt-10 flex w-full flex-col gap-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between gap-4 rounded-card border border-hairline bg-white px-6 py-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <span>
                    <span className="block font-sans text-small font-semibold text-ink">
                      {l.label}
                    </span>
                    <span className="mt-0.5 block text-caption text-muted">
                      {l.note}
                    </span>
                  </span>
                  <ArrowUpRight
                    strokeWidth={2.2}
                    className="h-5.5 w-5.5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Rendered only once real profile URLs exist — blocker #6.
              The live site's footer links point at an internal Wix page
              rather than the actual profiles; that bug is not repeated. */}
          {social.length > 0 && (
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-hairline bg-white px-5 py-2.5 text-caption font-semibold text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <a
            href={`mailto:${SITE.email}`}
            className="mt-8 inline-flex items-center gap-2.5 text-caption font-semibold text-muted transition-colors hover:text-ink"
          >
            <Mail strokeWidth={2} className="h-4.5 w-4.5 text-accent" />
            {SITE.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
