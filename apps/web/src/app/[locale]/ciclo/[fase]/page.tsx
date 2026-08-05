import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Droplet,
  Sprout,
  Sun,
  Moon,
  Activity,
  Salad,
  Dumbbell,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react';
import { PHASES, getPhase, phaseDays, type PhaseSlug } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { getPhaseDetail } from '@/data/phase-detail';
import { PHASE_HERO } from '@/lib/phase-hero';

const ICONS: Record<PhaseSlug, LucideIcon> = {
  menstrual: Droplet,
  folicular: Sprout,
  ovulatoria: Sun,
  lutea: Moon,
};

const STYLES: Record<PhaseSlug, { chip: string; ink: string }> = {
  menstrual: { chip: 'bg-menstrual-soft text-menstrual-ink', ink: 'text-menstrual-ink' },
  folicular: { chip: 'bg-follicular-soft text-follicular-ink', ink: 'text-follicular-ink' },
  ovulatoria: { chip: 'bg-ovulation-soft text-ovulation-ink', ink: 'text-ovulation-ink' },
  lutea: { chip: 'bg-luteal-soft text-luteal-ink', ink: 'text-luteal-ink' },
};

/** Prerenders all four at build time — they are a fixed set, not a feed. */
export function generateStaticParams() {
  return PHASES.map((p) => ({ fase: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; fase: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, fase } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const phase = getPhase(fase as PhaseSlug, locale);
  if (!phase) return {};
  return {
    title: `Fase ${phase.name} — qué comer y cómo te sentís`,
    description: `${getPhaseDetail(locale)[phase.slug].summary} Alimentos, movimiento y señales de la fase ${phase.name.toLowerCase()} del ciclo menstrual.`,
    alternates: { canonical: `/ciclo/${phase.slug}` },
  };
}

export default async function FasePage({
  params,
}: {
  params: Promise<{ locale: string; fase: string }>;
}) {
  const { locale: rawLocale, fase } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const phase = getPhase(fase as PhaseSlug, locale);
  if (!phase) notFound();

  const detail = getPhaseDetail(locale)[phase.slug];
  const s = STYLES[phase.slug];
  const hero = PHASE_HERO[phase.slug];
  const Icon = ICONS[phase.slug];

  const index = PHASES.findIndex((p) => p.slug === phase.slug);
  const prev = PHASES[(index - 1 + PHASES.length) % PHASES.length];
  const next = PHASES[(index + 1) % PHASES.length];

  return (
    <>
      <PageHero
        eyebrow={`Fase ${phase.name} · ${phaseDays(phase, locale)}`}
        title={phase.name}
        accent={phase.tagline}
        lead={detail.summary}
        image={hero.image}
        focal="center 50%"
        veil={hero.veil}
      />

      {/* Hormonal state + how it feels */}
      <Section surface="raised">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className={`icon-chip ${s.chip}`}>
                <Activity strokeWidth={1.9} className="h-9 w-9" />
              </span>
              <h2 className="mt-6 text-h2 text-ink">Qué pasa por dentro</h2>
              <p className="mt-5 text-body text-muted">{phase.hormone}</p>
              <p className="mt-4 text-body text-muted">{detail.summary}</p>
            </Reveal>

            <Reveal delay={140}>
              <span className={`icon-chip ${s.chip}`}>
                <Icon strokeWidth={1.9} className="h-9 w-9" />
              </span>
              <h2 className="mt-6 text-h2 text-ink">Cómo suele sentirse</h2>
              <ul className="mt-5 flex flex-col gap-3.5">
                {detail.feels.map((f) => (
                  <li key={f} className="flex gap-3.5 text-body text-muted">
                    <span
                      aria-hidden
                      className={`mt-2.5 h-2 w-2 shrink-0 rounded-full ${s.ink.replace('text-', 'bg-')}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-caption text-muted">
                Son tendencias, no reglas. Cada cuerpo las vive distinto.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What to eat */}
      <Section surface="base">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Alimentación</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              Qué acompaña <span className="text-accent">a tu cuerpo ahora</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-body text-muted">
              {phase.nutrition}
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-7 sm:grid-cols-2">
            {detail.eat.map((item, i) => (
              <Reveal as="li" key={item.label} delay={i * 90} className="h-full">
                <article className="card card-hover flex h-full flex-col p-8">
                  <span
                    className={`inline-flex w-fit rounded-full px-3.5 py-1.5 font-sans text-caption font-bold ${s.chip}`}
                  >
                    {item.label}
                  </span>
                  <p className="mt-4 text-small text-muted">{item.why}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 text-center" delay={380}>
            <Link
              href={`/recetas/fase/${phase.slug}`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-action px-7 py-4 font-sans text-nav font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-action-hover hover:shadow-lg"
            >
              Ver recetas de esta fase
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* Movement + tip */}
      <Section surface="lilac">
        <Container>
          <ul className="grid gap-7 md:grid-cols-2">
            {[
              { icon: Dumbbell, title: 'Movimiento', body: detail.movement },
              { icon: Lightbulb, title: 'Un apunte práctico', body: detail.tip },
            ].map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 120} className="h-full">
                <article className="card card-hover h-full p-9">
                  <span className={`icon-chip ${s.chip}`}>
                    <c.icon strokeWidth={1.9} className="h-9 w-9" />
                  </span>
                  <h2 className="mt-6 text-h3 text-ink">{c.title}</h2>
                  <p className="mt-4 text-body text-muted">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 text-center" delay={260}>
            <p className="mx-auto max-w-xl text-caption text-muted">
              Información general, no diagnóstico.{' '}
              <Link
                href="/aviso-medico"
                className="font-semibold text-accent underline underline-offset-4"
              >
                Leé el aviso médico
              </Link>{' '}
              antes de hacer cambios importantes en tu alimentación.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Prev / next — the cycle is a loop, so this never dead-ends */}
      <Section surface="base" size="tight">
        <SectionTexture src="/images/textures/calma.avif" />
        <Container className="relative">
          <nav aria-label="Otras fases" className="grid gap-5 sm:grid-cols-2">
            <Link
              href={`/ciclo/${prev.slug}`}
              className="group card card-hover flex items-center gap-5 p-7"
            >
              <ArrowLeft
                strokeWidth={2.2}
                className="h-6 w-6 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-x-1.5"
              />
              <span>
                <span className="block text-caption text-muted">Fase anterior</span>
                <span className="mt-0.5 block font-display text-h4 text-ink">
                  {prev.name}
                </span>
              </span>
            </Link>

            <Link
              href={`/ciclo/${next.slug}`}
              className="group card card-hover flex items-center justify-end gap-5 p-7 text-right"
            >
              <span>
                <span className="block text-caption text-muted">Fase siguiente</span>
                <span className="mt-0.5 block font-display text-h4 text-ink">
                  {next.name}
                </span>
              </span>
              <ArrowRight
                strokeWidth={2.2}
                className="h-6 w-6 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </nav>

          <div className="mt-8 text-center">
            <Link
              href="/ciclo"
              className="inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-muted transition-colors hover:text-ink"
            >
              <Salad strokeWidth={2} className="h-5 w-5" />
              Ver las cuatro fases
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand source={`ciclo-${phase.slug}`} />
    </>
  );
}
