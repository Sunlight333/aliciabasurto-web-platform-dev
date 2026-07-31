import { HelpCircle, Salad, BellRing } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { PROBLEMS } from '@/data/home';

const ICONS = { HelpCircle, Salad, BellRing };

export function ProblemSection() {
  return (
    <Section surface="raised">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Por qué cuesta tanto</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            No es falta de disciplina.{' '}
            <span className="text-accent">Es falta de contexto.</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-7 md:grid-cols-3">
          {PROBLEMS.map((problem, i) => {
            const Icon = ICONS[problem.icon];
            return (
              <Reveal as="li" key={problem.pain} delay={i * 110}>
                <article className="card card-hover h-full p-8 lg:p-9">
                  <span className={`icon-chip ${problem.tint}`}>
                    <Icon strokeWidth={1.9} className="h-7 w-7" />
                  </span>

                  <h3 className="mt-6 text-h4 text-ink">“{problem.pain}”</h3>

                  <p className="mt-4 text-small text-muted">{problem.answer}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
