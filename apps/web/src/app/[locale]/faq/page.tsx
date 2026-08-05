import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, type Locale } from '@/lib/i18n';
import { Smartphone, ShieldCheck, CreditCard, Wrench, Mail } from 'lucide-react';
import { SITE } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { FaqAccordion, type QA } from '@/components/content/faq-accordion';
import { getFaqGroups } from '@/data/faq';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes — Nutricycle',
  description:
    '¿Es gratis? ¿Funciona con ciclos irregulares? ¿Quién ve mis datos de salud? Respuestas sobre la app, la privacidad, la suscripción y el soporte.',
  alternates: { canonical: '/faq' },
};

const ICONS = { Smartphone, ShieldCheck, CreditCard, Wrench };

/**
 * FAQPage structured data. Google renders these as expandable results,
 * which is most of the point of an FAQ page on a site whose job is
 * top-of-funnel search (project-brief.md § Mission).
 */
function faqJsonLd(groups: ReturnType<typeof getFaqGroups>) {
  const all: QA[] = groups.flatMap((g) => g.items);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: all.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(getFaqGroups(locale))) }}
      />

      <PageHero
        eyebrow={t.pages.faq.eyebrow}
        title={t.pages.faq.title}
        accent={t.pages.faq.accent}
        lead={t.pages.faq.lead}
        image="/images/heroes/faq.avif"
        focal="center 45%"
        veil={0.56}
      >
        <ul className="flex flex-wrap justify-center gap-3">
          {getFaqGroups(locale).map((g) => (
            <li key={g.id}>
              <a
                href={`#${g.id}`}
                className="inline-flex rounded-full border border-hairline bg-white/70 px-5 py-2.5 font-sans text-caption font-semibold text-ink shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {getFaqGroups(locale).map((group, i) => {
        const Icon = ICONS[group.icon];
        return (
          <Section
            key={group.id}
            id={group.id}
            surface={i % 2 === 0 ? 'raised' : 'base'}
          >
            {/* Alternating with the surface, so the texture lands on every
                other group rather than every one — the same rhythm the
                tints already carry, not a second competing one. */}
            {i % 2 === 0 && <SectionTexture src="/images/textures/luz.avif" />}
            <Container className="relative" size="prose">
              <Reveal>
                <div className="flex items-center gap-5">
                  <span className={`icon-chip shrink-0 ${group.tint}`}>
                    <Icon strokeWidth={1.9} className="h-9 w-9" />
                  </span>
                  <div>
                    <Eyebrow>Sección {String(i + 1).padStart(2, '0')}</Eyebrow>
                    <h2 className="mt-1.5 text-h2 text-ink">{group.title}</h2>
                  </div>
                </div>
              </Reveal>

              <Reveal className="mt-10" delay={120}>
                <FaqAccordion items={group.items} />
              </Reveal>
            </Container>
          </Section>
        );
      })}

      <Section surface="lilac" size="tight">
        <Container>
          <Reveal>
            <div className="card mx-auto max-w-xl p-10 text-center">
              <span className="icon-chip mx-auto bg-luteal-soft text-luteal-ink">
                <Mail strokeWidth={1.9} className="h-9 w-9" />
              </span>
              <h2 className="mt-6 text-h3 text-ink">¿No encontraste tu respuesta?</h2>
              <p className="mt-3 text-body text-muted">
                Escribinos y te respondemos por correo.
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-action px-7 py-4 font-sans text-nav font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-action-hover hover:shadow-lg"
              >
                {SITE.email}
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand source="faq" />
    </>
  );
}
