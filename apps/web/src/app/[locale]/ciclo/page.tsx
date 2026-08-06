import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, localizePath, alternatesFor, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import { Droplet, Sprout, Sun, Moon, ArrowRight, Info, type LucideIcon } from 'lucide-react';
import { getPhases, phaseDays, type PhaseSlug } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { getPhaseDetail } from '@/data/phase-detail';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return {
    title: t.meta.ciclo.title,
    description: t.meta.ciclo.description,
    alternates: { canonical: '/ciclo', languages: alternatesFor('/ciclo') },
  };
}

const PHASE_ICONS: Record<PhaseSlug, LucideIcon> = {
  menstrual: Droplet,
  folicular: Sprout,
  ovulatoria: Sun,
  lutea: Moon,
};

const STYLES: Record<PhaseSlug, { band: string; chip: string; ink: string }> = {
  menstrual: {
    band: 'from-menstrual to-menstrual-soft',
    chip: 'bg-menstrual-soft text-menstrual-ink',
    ink: 'text-menstrual-ink',
  },
  folicular: {
    band: 'from-follicular to-follicular-soft',
    chip: 'bg-follicular-soft text-follicular-ink',
    ink: 'text-follicular-ink',
  },
  ovulatoria: {
    band: 'from-ovulation to-ovulation-soft',
    chip: 'bg-ovulation-soft text-ovulation-ink',
    ink: 'text-ovulation-ink',
  },
  lutea: {
    band: 'from-luteal to-luteal-soft',
    chip: 'bg-luteal-soft text-luteal-ink',
    ink: 'text-luteal-ink',
  },
};

export default async function CicloPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return (
    <>
      <PageHero
        eyebrow={t.pages.ciclo.eyebrow}
        title={t.pages.ciclo.title}
        accent={t.pages.ciclo.accent}
        lead={t.pages.ciclo.lead}
        image="/images/heroes/ciclo.avif"
        focal="center 50%"
        veil={0.4}
      />

      <Section surface="raised">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.cycle.mapEyebrow}</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              {t.cycle.mapTitle} <span className="text-accent">{t.cycle.mapAccent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-body text-muted">
              {t.cycle.rangeNote}
            </p>
          </Reveal>

          <ul className="mt-16 flex flex-col gap-7">
            {getPhases(locale).map((phase, i) => {
              const Icon = PHASE_ICONS[phase.slug];
              const s = STYLES[phase.slug];
              const detail = getPhaseDetail(locale)[phase.slug];
              return (
                <Reveal as="li" key={phase.slug} delay={i * 100}>
                  <article className="card card-hover overflow-hidden">
                    <div className={`h-3 bg-gradient-to-r ${s.band}`} />

                    <div className="flex flex-col gap-7 p-8 lg:flex-row lg:items-start lg:p-10">
                      <span
                        className={`grid h-20 w-20 shrink-0 place-items-center rounded-2xl ${s.chip}`}
                      >
                        <Icon strokeWidth={1.9} className="h-10 w-10" />
                      </span>

                      <div className="flex-1">
                        <span
                          className={`inline-flex rounded-full px-3.5 py-1.5 font-sans text-caption font-bold ${s.chip}`}
                        >
                          {phaseDays(phase, locale)}
                        </span>
                        <h3 className="mt-4 text-h2 text-ink">{phase.name}</h3>
                        <p className={`mt-1 font-sans text-body font-semibold ${s.ink}`}>
                          {phase.tagline}
                        </p>
                        <p className="mt-5 max-w-2xl text-body text-muted">
                          {detail.summary}
                        </p>

                        <Link
                          href={localizePath(`/ciclo/${phase.slug}`, locale)}
                          className="group mt-7 inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
                        >
                          {t.cycle.detailCtaBefore} {phase.name.toLowerCase()}{t.cycle.detailCtaAfter}
                          <ArrowRight
                            strokeWidth={2.2}
                            className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section surface="base" size="tight">
        <SectionTexture src="/images/textures/calma.avif" />
        <Container className="relative" size="prose">
          <Reveal>
            <div className="card flex items-start gap-5 p-8">
              <span className="icon-chip shrink-0 bg-luteal-soft text-luteal-ink">
                <Info strokeWidth={1.9} className="h-9 w-9" />
              </span>
              <div>
                <h2 className="text-h4 text-ink">{t.cycle.disclaimerTitle}</h2>
                <p className="mt-3 text-small text-muted">
                  {t.cycle.disclaimerBody}
                </p>
                <Link
                  href={localizePath('/aviso-medico', locale)}
                  className="mt-4 inline-block text-caption font-semibold text-accent underline underline-offset-4"
                >
                  {t.cycle.disclaimerLink}
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand source="ciclo" locale={locale} />
    </>
  );
}
