import { PHASES, phaseDays, type Phase } from '@nutricycle/shared';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';

/**
 * Phase colours come from the app (revised-direction.md §4). Tints are
 * background-only — each has a darker ink sibling for text, because the
 * app palette measures 1.25–2.20:1 as type and would be unreadable.
 */
const TINT: Record<string, string> = {
  menstrual: 'bg-menstrual',
  follicular: 'bg-follicular',
  ovulation: 'bg-ovulation',
  luteal: 'bg-luteal',
};

const INK: Record<string, string> = {
  'menstrual-ink': 'text-menstrual-ink',
  'follicular-ink': 'text-follicular-ink',
  'ovulation-ink': 'text-ovulation-ink',
  'luteal-ink': 'text-luteal-ink',
};

export function PhasesSection() {
  return (
    <Section surface="raised">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Las 4 fases</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">
            Un plan diferente para cada{' '}
            <em className="font-display italic text-accent-display">
              momento de tu ciclo
            </em>
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase, i) => (
            <Reveal as="li" key={phase.slug} delay={i * 90}>
              <PhaseCard phase={phase} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14" delay={400}>
          <Button href="/ciclo" variant="outline">
            Explora las fases
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  return (
    <article className="flex h-full flex-col">
      <div
        aria-hidden
        className={`h-28 rounded-card ${TINT[phase.tint]}`}
      />

      <p className={`mt-6 text-eyebrow font-medium tracking-[0.2em] uppercase ${INK[phase.ink]}`}>
        {phaseDays(phase)}
      </p>

      <h3 className="mt-3 text-h3 text-ink">{phase.name}</h3>
      <p className="mt-1 text-caption text-muted">{phase.tagline}</p>

      <p className="mt-4 text-small text-muted">{phase.nutrition}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {phase.foods.map((food) => (
          <li
            key={food}
            className="rounded-full border border-hairline px-3 py-1 text-caption text-muted"
          >
            {food}
          </li>
        ))}
      </ul>
    </article>
  );
}
