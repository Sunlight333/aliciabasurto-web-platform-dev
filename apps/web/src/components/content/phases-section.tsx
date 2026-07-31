import { PHASES, phaseDays, type Phase } from '@nutricycle/shared';
import { Droplet, Sprout, Sun, Moon, ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';

/**
 * Phase tints come from the app. They are background-only — each has a
 * darker ink sibling so labels stay readable (revised-direction.md §4).
 */
const STYLES: Record<
  string,
  { band: string; chip: string; ink: string; icon: typeof Droplet }
> = {
  menstrual: {
    band: 'from-menstrual to-menstrual-soft',
    chip: 'bg-menstrual-soft text-menstrual-ink',
    ink: 'text-menstrual-ink',
    icon: Droplet,
  },
  folicular: {
    band: 'from-follicular to-follicular-soft',
    chip: 'bg-follicular-soft text-follicular-ink',
    ink: 'text-follicular-ink',
    icon: Sprout,
  },
  ovulatoria: {
    band: 'from-ovulation to-ovulation-soft',
    chip: 'bg-ovulation-soft text-ovulation-ink',
    ink: 'text-ovulation-ink',
    icon: Sun,
  },
  lutea: {
    band: 'from-luteal to-luteal-soft',
    chip: 'bg-luteal-soft text-luteal-ink',
    ink: 'text-luteal-ink',
    icon: Moon,
  },
};

export function PhasesSection() {
  return (
    <Section surface="sunken">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Las 4 fases</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            Un plan diferente para cada{' '}
            <span className="text-accent">momento de tu ciclo</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {PHASES.map((phase, i) => (
            <Reveal as="li" key={phase.slug} delay={i * 100} className="h-full">
              <PhaseCard phase={phase} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 text-center" delay={440}>
          <a
            href="/ciclo"
            className="group inline-flex items-center gap-2.5 rounded-full border border-hairline-strong bg-white px-7 py-4 font-sans text-nav font-semibold text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Explora las fases
            <ArrowRight
              strokeWidth={2.2}
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const s = STYLES[phase.slug];
  const Icon = s.icon;

  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      <div className={`relative h-32 bg-gradient-to-br ${s.band}`}>
        <span className="absolute -bottom-8 left-7 grid h-16 w-16 place-items-center rounded-2xl border border-white bg-white shadow-md">
          <Icon strokeWidth={1.9} className={`h-8 w-8 ${s.ink}`} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-8 pt-12">
        <span
          className={`inline-flex w-fit rounded-full px-3.5 py-1.5 font-sans text-caption font-bold tracking-wide ${s.chip}`}
        >
          {phaseDays(phase)}
        </span>

        <h3 className="mt-4 text-h3 text-ink">{phase.name}</h3>
        <p className={`mt-1 font-sans text-caption font-semibold ${s.ink}`}>
          {phase.tagline}
        </p>

        <p className="mt-4 text-small text-muted">{phase.nutrition}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {phase.foods.map((food) => (
            <li
              key={food}
              className="rounded-full bg-surface-sunken px-3.5 py-1.5 text-caption font-medium text-muted"
            >
              {food}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
