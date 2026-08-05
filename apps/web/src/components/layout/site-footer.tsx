import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { SITE, SOCIAL, getLegal } from '@nutricycle/shared';
import { getDictionary, localizePath, type Locale } from '@/lib/i18n';
import { Container } from './container';

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const to = (href: string) => localizePath(href, locale);

  const EXPLORE = [
    { label: t.nav.recipes, href: to('/recetas') },
    { label: t.nav.courses, href: to('/cursos') },
    { label: t.footer.phases, href: to('/ciclo') },
    { label: t.footer.videos, href: to('/videos') },
    { label: t.footer.blog, href: to('/blog') },
  ];

  const ABOUT = [
    { label: t.footer.aboutAlicia, href: to('/sobre') },
    { label: t.footer.howItWorks, href: to('/como-funciona') },
    { label: t.footer.faq, href: to('/faq') },
    { label: t.footer.contact, href: to('/contacto') },
  ];

  const LEGAL_LINKS = getLegal(locale).map((l) => ({ ...l, href: to(l.href) }));

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
            <p className="mt-6 max-w-xs text-small text-muted">{t.footer.blurb}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white px-5 py-3 text-caption font-semibold text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Mail strokeWidth={2} className="h-4.5 w-4.5 text-accent" />
              {SITE.email}
            </a>
          </div>

          <FooterColumn title={t.footer.explore} items={EXPLORE} />
          <FooterColumn title={t.footer.company} items={ABOUT} />
          <FooterColumn title={t.footer.legal} items={LEGAL_LINKS} />
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
