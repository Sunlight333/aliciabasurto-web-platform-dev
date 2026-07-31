import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { FEATURES } from '@/data/home';
import { cn } from '@/lib/cn';

/**
 * The AI advisor is flagged `highlight` and rendered first at double width.
 * It is the strongest differentiator against generic period trackers and
 * appears nowhere on the live site (revised-direction.md §8).
 */
export function FeaturesSection() {
  return (
    <Section surface="base">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Lo que incluye</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">
            Todo lo que tu cuerpo{' '}
            <em className="font-display italic text-accent-display">
              ya sabía pedirte
            </em>
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-card bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal
              as="li"
              key={feature.title}
              delay={i * 70}
              className={cn(
                'bg-surface-base p-8 lg:p-10',
                feature.highlight && 'sm:col-span-2',
              )}
            >
              {feature.highlight && (
                <span className="mb-4 inline-block rounded-full bg-luteal px-3 py-1 text-caption font-medium text-luteal-ink">
                  Con IA
                </span>
              )}
              <h3 className="text-h3 text-ink">{feature.title}</h3>
              <p className="mt-3 max-w-md text-small text-muted">{feature.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14" delay={500}>
          <Button href="/funcionalidades" variant="outline">
            Ver todas las funciones
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
