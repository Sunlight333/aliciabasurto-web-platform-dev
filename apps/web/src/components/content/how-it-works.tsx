import Image from 'next/image';
import { CalendarHeart, Utensils, HeartPulse, ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { STEPS } from '@/data/home';

const ICONS = { CalendarHeart, Utensils, HeartPulse };

/**
 * Two columns, as originally laid out — text and photograph left, the
 * three steps stacked right.
 *
 * The imbalance was proportional, not structural: it ran 5/7, so the text
 * column was noticeably narrower than the cards beside it. Now 6/6, with
 * both columns stretched to equal height and the photograph filling
 * whatever space the copy above it leaves.
 */
export function HowItWorks() {
  return (
    <Section surface="base" id="como-funciona">
      <Container>
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal className="flex flex-col">
            <Eyebrow>Cómo funciona</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              Nutrición que se <span className="text-accent">sincroniza</span> a tu
              cuerpo
            </h2>
            <p className="mt-6 max-w-md text-body text-muted">
              Tres pasos. El resto lo calcula la app cada día por ti.
            </p>

            <div className="scene mt-9 flex-1">
              <div className="tilt relative h-full min-h-[22rem] overflow-hidden rounded-[2rem] border-4 border-white shadow-lg">
                <Image
                  src="/images/alicia/kitchen-chopping.jpg"
                  alt="Alicia Basurto preparando verduras para una receta por fase del ciclo"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover object-[center_28%]"
                />
              </div>
            </div>
          </Reveal>

          <ol className="flex flex-col gap-6">
            {STEPS.map((step, i) => {
              const Icon = ICONS[step.icon];
              return (
                <Reveal as="li" key={step.number} delay={i * 130} className="flex-1">
                  <article className="card card-hover flex h-full items-start gap-6 p-8">
                    <span className={`icon-chip shrink-0 ${step.tint}`}>
                      <Icon strokeWidth={1.9} className="h-9 w-9" />
                    </span>

                    <div>
                      <span className="font-sans text-caption font-bold tracking-[0.16em] text-accent-display uppercase">
                        Paso {step.number}
                      </span>
                      <h3 className="mt-2 text-h3 text-ink">{step.title}</h3>
                      <p className="mt-3 text-small text-muted">{step.body}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}

            <Reveal as="li" delay={420}>
              <a
                href="/como-funciona"
                className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
              >
                Conoce el método
                <ArrowRight
                  strokeWidth={2.2}
                  className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </a>
            </Reveal>
          </ol>
        </div>
      </Container>
    </Section>
  );
}
