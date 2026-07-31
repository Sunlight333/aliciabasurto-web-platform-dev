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

        {/* The grid reveals as one unit rather than card-by-card: the
            gap-px hairline background would otherwise show through as a
            solid grey block while individual cards sit at opacity 0. */}
        <Reveal>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-card bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <li
                key={feature.title}
                /* Not col-span-2: with 6 features in a 3-col grid, spanning
                   leaves empty cells that show the hairline through. The AI
                   card earns emphasis from its tint and badge instead. */
                className={cn(
                  'p-8 lg:p-10',
                  feature.highlight ? 'bg-luteal/25' : 'bg-surface-base',
                )}
              >
                {feature.highlight && (
                  <span className="mb-4 inline-block rounded-full bg-luteal px-3 py-1 text-caption font-medium text-luteal-ink">
                    Con IA
                  </span>
                )}
                <h3 className="text-h3 text-ink">{feature.title}</h3>
                <p className="mt-3 max-w-md text-small text-muted">{feature.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14" delay={500}>
          <Button href="/funcionalidades" variant="outline">
            Ver todas las funciones
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
