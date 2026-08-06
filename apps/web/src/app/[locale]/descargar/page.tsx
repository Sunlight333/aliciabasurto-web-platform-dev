import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, localizePath, alternatesFor, type Locale } from '@/lib/i18n';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { STORE } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { StoreButtons } from '@/components/marketing/store-buttons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return {
    title: t.meta.descargar.title,
    description: t.meta.descargar.description,
    alternates: { canonical: '/descargar', languages: alternatesFor('/descargar') },
  };
}

const points = (t: ReturnType<typeof getDictionary>) => [
  t.download.points[0],
  `${STORE.recipeCount} ${t.download.points[1]}`,
  t.download.points[2],
];

/**
 * Single-purpose conversion page. Also the landing target for /ir/app while
 * store URLs are missing, so it must never be a dead end.
 */
export default async function DescargarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface-blush via-surface-raised to-surface-lilac py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(60vw, 640px)',
            height: 'min(60vw, 640px)',
            top: '-20%',
            right: '-10%',
            background: 'var(--color-luteal)',
            opacity: 0.35,
          }}
        />
      </div>

      <Container className="relative">
        <div className="glass-strong mx-auto max-w-3xl rounded-[2.5rem] px-8 py-14 text-center shadow-xl lg:px-14">
          <Image
            src="/images/brand/app-icon-1024.png"
            alt=""
            width={1024}
            height={1024}
            priority
            className="animate-float mx-auto h-28 w-28 rounded-[1.75rem] shadow-lg"
          />

          <Eyebrow className="mt-9">{t.download.badge}</Eyebrow>

          <h1 className="mt-5 text-h1 text-ink">
            Descarga <span className="text-accent">Nutricycle</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lead text-muted">
            {t.download.lead}
          </p>

          <StoreButtons source="descargar" size="lg" className="mt-10 justify-center" locale={locale} />

          <ul className="mx-auto mt-12 flex max-w-md flex-col gap-4 text-left">
            {points(t).map((point) => (
              <li key={point} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-follicular-soft">
                  <Check strokeWidth={2.6} className="h-4 w-4 text-follicular-ink" />
                </span>
                <span className="text-small text-muted">{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-caption text-muted">
            {t.download.note}
          </p>
        </div>
      </Container>
    </section>
  );
}
