import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';

interface Testimonial {
  name: string;
  quote: string;
}

/**
 * ⚠️ Empty until the client supplies testimonials with consent to publish
 * (about-page.md §4 item 5).
 *
 * This renders a real empty state rather than a blank region — the live
 * /testimonials page ships as an empty shell linked from every footer,
 * and that bug must not be reproduced (site-audit.md §12.1).
 */
const TESTIMONIALS: readonly Testimonial[] = [];

export function ProofSection() {
  if (TESTIMONIALS.length === 0) {
    return (
      <Section surface="raised" size="tight">
        <Container>
          <Reveal className="mx-auto max-w-xl rounded-card border border-dashed border-hairline-strong p-10 text-center">
            <Eyebrow>Testimonios</Eyebrow>
            <p className="mt-4 text-body text-muted">
              Estamos reuniendo las historias de quienes ya sincronizaron su
              alimentación con su ciclo.
            </p>
          </Reveal>
        </Container>
      </Section>
    );
  }

  return (
    <Section surface="raised">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Testimonios</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">
            Lo que cambia cuando{' '}
            <em className="font-display italic text-accent-display">escuchas tu ciclo</em>
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col">
                <blockquote className="font-display text-h4 text-ink italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-caption text-muted">{t.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
