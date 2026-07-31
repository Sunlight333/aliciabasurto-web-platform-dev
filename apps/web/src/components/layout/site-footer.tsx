import Image from 'next/image';
import Link from 'next/link';
import { SITE, LEGAL, SOCIAL } from '@nutricycle/shared';
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

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface-sunken">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
          <div>
            <Image
              src="/images/brand/logo-lockup.png"
              alt="Nutricycle"
              width={500}
              height={500}
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-xs text-small text-muted">
              Nutrición cíclica para tu salud hormonal. Aprende a comer según tu fase.
            </p>
          </div>

          <FooterColumn title="Explora" items={EXPLORE} />
          <FooterColumn title="Nutricycle" items={ABOUT} />

          <div>
            <h2 className="font-sans text-eyebrow font-medium tracking-[0.2em] uppercase text-muted">
              Legal
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-hairline py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted">
            © {new Date().getFullYear()} {SITE.name} ·{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="transition-colors duration-200 hover:text-ink"
            >
              {SITE.email}
            </a>
          </p>

          {/* Rendered only once real profile URLs exist. The live site points
              these at an internal page — see cta-strategy.md §8. */}
          <ul className="flex gap-6">
            {SOCIAL.filter((s) => s.href).map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-caption text-muted transition-colors duration-200 hover:text-ink"
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
      <h2 className="font-sans text-eyebrow font-medium tracking-[0.2em] uppercase text-muted">
        {title}
      </h2>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-small text-muted transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
