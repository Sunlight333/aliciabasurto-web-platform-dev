import Image from 'next/image';
import { CalendarHeart, Utensils, HeartPulse, ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { STEPS } from '@/data/home';

const ICONS = { CalendarHeart, Utensils, HeartPulse };

/**
 * Heading centred, then three equal step cards.
 *
 * The previous 5/7 split put a narrow text column beside a much wider card
 * column, which read as unbalanced. Equal columns in a single row solve it
 * and match the rhythm of the section above.
 */
export function HowItWorks() {
  return (
    <Section surface="base" id="como-funciona">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Cómo funciona</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            Nutrición que se <span className="text-accent">sincroniza</span> a tu cuerpo
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-body text-muted">
            Tres pasos. El resto lo calcula la app cada día por ti.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-7 lg:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = ICONS[step.icon];
            return (
              <Reveal as="li" key={step.number} delay={i * 130} className="h-full">
                <article className="card card-hover flex h-full flex-col p-9">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`icon-chip ${step.tint}`}>
                      <Icon strokeWidth={1.9} className="h-9 w-9" />
                    </span>
                    <span className="font-display text-h2 leading-none font-semibold text-hairline-strong">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-h3 text-ink">{step.title}</h3>
                  <p className="mt-4 text-small text-muted">{step.body}</p>
                </article>
              </Reveal>
            );
          })}
        </ol>

        {/* Full-width band — balanced, and gives the working photograph a
            place now that the hero no longer carries a portrait card. */}
        <Reveal className="mt-16" delay={420}>
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-lg">
            <div className="relative aspect-[21/9]">
              <Image
                src="/images/alicia/kitchen-chopping.jpg"
                alt="Alicia Basurto preparando verduras para una receta por fase del ciclo"
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover object-[center_30%]"
              />
            </div>

            <div className="glass-strong absolute bottom-6 left-6 max-w-md rounded-2xl p-6 shadow-lg sm:bottom-8 sm:left-8">
              <p className="font-display text-h4 text-ink">
                La comida correcta en el momento correcto
              </p>
              <a
                href="/como-funciona"
                className="group mt-4 inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
              >
                Conoce el método
                <ArrowRight
                  strokeWidth={2.2}
                  className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
