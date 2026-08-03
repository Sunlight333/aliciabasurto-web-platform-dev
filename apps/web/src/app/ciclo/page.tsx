import type { Metadata } from 'next';
import Link from 'next/link';
import { Droplet, Sprout, Sun, Moon, ArrowRight, Info, type LucideIcon } from 'lucide-react';
import { PHASES, phaseDays, type PhaseSlug } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { PHASE_DETAIL } from '@/data/phase-detail';

export const metadata: Metadata = {
  title: 'Las 4 fases de tu ciclo menstrual',
  description:
    'Menstrual, folicular, ovulatoria y lútea: qué le pasa a tus hormonas en cada fase, cómo suele sentirse y qué alimentos acompañan mejor a tu cuerpo.',
  alternates: { canonical: '/ciclo' },
};

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

export default function CicloPage() {
  return (
    <>
      <PageHero
        eyebrow="Tu ciclo"
        title="Cuatro fases,"
        accent="cuatro cuerpos distintos"
        lead="Tus hormonas suben y bajan en un patrón que se repite cada mes. Entenderlo cambia lo que esperás de vos misma cada semana."
        image="/images/heroes/ciclo.avif"
        focal="center 50%"
        veil={0.4}
      />

      <Section surface="raised">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>El mapa</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              Un ciclo completo, <span className="text-accent">de principio a fin</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-body text-muted">
              Los rangos de días son de un ciclo de 28 días. El tuyo puede durar
              entre 21 y 35 y seguir siendo perfectamente sano.
            </p>
          </Reveal>

          <ul className="mt-16 flex flex-col gap-7">
            {PHASES.map((phase, i) => {
              const Icon = PHASE_ICONS[phase.slug];
              const s = STYLES[phase.slug];
              const detail = PHASE_DETAIL[phase.slug];
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
                          {phaseDays(phase)}
                        </span>
                        <h3 className="mt-4 text-h2 text-ink">{phase.name}</h3>
                        <p className={`mt-1 font-sans text-body font-semibold ${s.ink}`}>
                          {phase.tagline}
                        </p>
                        <p className="mt-5 max-w-2xl text-body text-muted">
                          {detail.summary}
                        </p>

                        <Link
                          href={`/ciclo/${phase.slug}`}
                          className="group mt-7 inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
                        >
                          Ver la fase {phase.name.toLowerCase()} en detalle
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
                <h2 className="text-h4 text-ink">Esto es información, no diagnóstico</h2>
                <p className="mt-3 text-small text-muted">
                  Lo que leés acá describe tendencias generales del ciclo menstrual.
                  No reemplaza el consejo de un profesional de salud, y hay
                  situaciones —embarazo, SOP, endometriosis, medicación hormonal— en
                  las que conviene consultarlo antes de cambiar tu alimentación.
                </p>
                <Link
                  href="/aviso-medico"
                  className="mt-4 inline-block text-caption font-semibold text-accent underline underline-offset-4"
                >
                  Leer el aviso médico completo
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand source="ciclo" />
    </>
  );
}
