import { MessageCircleHeart } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';

interface Testimonial {
  name: string;
  quote: string;
}

/**
 * ⚠️ Empty until the client supplies testimonials with consent to publish.
 * Renders a real empty state, not a blank region — the live /testimonials
 * page ships as an empty shell and that bug must not be reproduced.
 */
const TESTIMONIALS: readonly Testimonial[] = [];

export function ProofSection() {
  if (TESTIMONIALS.length === 0) {
    return (
      <Section surface="mint" size="tight">
        <Container>
          <Reveal>
            <div className="card mx-auto max-w-xl border-dashed p-11 text-center">
              <span className="icon-chip mx-auto bg-follicular-soft text-follicular-ink">
                <MessageCircleHeart strokeWidth={1.9} className="h-7 w-7" />
              </span>
              <Eyebrow className="mt-6">Testimonios</Eyebrow>
              <p className="mt-4 text-body text-muted">
                Estamos reuniendo las historias de quienes ya sincronizaron su
                alimentación con su ciclo.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    );
  }

  return (
    <Section surface="mint">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Testimonios</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            Lo que cambia cuando{' '}
            <span className="text-accent">escuchas tu ciclo</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-7 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 110} className="h-full">
              <figure className="card card-hover flex h-full flex-col p-8">
                <MessageCircleHeart
                  strokeWidth={1.9}
                  className="h-7 w-7 text-accent-display"
                />
                <blockquote className="mt-5 flex-1 font-display text-h4 text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 font-sans text-caption font-semibold text-muted">
                  {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
