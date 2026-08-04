import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { SITE, LEGAL, SOCIAL } from '@nutricycle/shared';
import type { Locale } from '@/lib/i18n';
import { Container } from './container';

const EXPLORE = [
  { label: 'Recetas', href: '/recetas' },
  { label: 'Las 4 fases', href: '/ciclo' },
  { label: 'Videos', href: '/videos' },
  { label: 'Blog', href: '/blog' },
];

const ABOUT = [
  { label: 'Sobre Alicia', href: '/sobre' },
  { label: 'Cómo funciona', href: '/como-funciona' },
  { label: 'Preguntas frecuentes', href: '/faq' },
  { label: 'Contacto', href: '/contacto' },
];

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-hairline bg-surface-raised">
      <Container>
        <div className="grid gap-12 py-18 md:grid-cols-2 lg:grid-cols-4 lg:py-24">
          <div>
            <Image
              src="/images/brand/logo-lockup-trimmed.png"
              alt="Nutricycle"
              width={202}
              height={179}
              className="h-24 w-auto"
            />
            <p className="mt-6 max-w-xs text-small text-muted">
              Nutrición cíclica para tu salud hormonal. Aprende a comer según tu
              fase.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white px-5 py-3 text-caption font-semibold text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Mail strokeWidth={2} className="h-4.5 w-4.5 text-accent" />
              {SITE.email}
            </a>
          </div>

          <FooterColumn title="Explora" items={EXPLORE} />
          <FooterColumn title="Nutricycle" items={ABOUT} />
          <FooterColumn title="Legal" items={LEGAL} />
        </div>

        <div className="flex flex-col gap-5 border-t border-hairline py-9 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted">
            © {new Date().getFullYear()} {SITE.name}
          </p>

          {/* Rendered only once real profile URLs exist. */}
          <ul className="flex gap-6">
            {SOCIAL.filter((s) => s.href).map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-caption font-medium text-muted transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="font-sans text-eyebrow font-bold tracking-[0.16em] uppercase text-accent-display">
        {title}
      </h2>
      <ul className="mt-6 flex flex-col gap-3.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-small text-muted transition-colors duration-300 hover:text-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
