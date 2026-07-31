import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { PROBLEMS } from '@/data/home';

export function ProblemSection() {
  return (
    <Section surface="raised">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Por qué cuesta tanto</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">
            No es falta de disciplina.{' '}
            <em className="font-display italic text-accent-display">
              Es falta de contexto.
            </em>
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
          {PROBLEMS.map((problem, i) => (
            <Reveal as="li" key={problem.pain} delay={i * 100}>
              <p className="font-display text-h3 text-ink italic">
                “{problem.pain}”
              </p>
              <hr className="my-6 w-12 border-t border-hairline-strong" />
              <p className="text-body text-muted">{problem.answer}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
