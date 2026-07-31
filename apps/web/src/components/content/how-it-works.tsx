import Image from 'next/image';
import { CalendarHeart, Utensils, HeartPulse, ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { STEPS } from '@/data/home';

const ICONS = { CalendarHeart, Utensils, HeartPulse };

export function HowItWorks() {
  return (
    <Section surface="base" id="como-funciona">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Cómo funciona</Eyebrow>
              <h2 className="mt-5 text-h2 text-ink">
                Nutrición que se <span className="text-accent">sincroniza</span> a tu
                cuerpo
              </h2>
              <p className="mt-6 max-w-md text-body text-muted">
                Tres pasos. El resto lo calcula la app cada día por ti.
              </p>

              <div className="scene mt-12 hidden lg:block">
                <div className="tilt relative overflow-hidden rounded-[2rem] border-4 border-white shadow-lg">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/images/alicia/kitchen-chopping.jpg"
                      alt="Alicia Basurto preparando verduras para una receta por fase del ciclo"
                      fill
                      sizes="420px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <ol className="flex flex-col gap-6 lg:col-span-7">
            {STEPS.map((step, i) => {
              const Icon = ICONS[step.icon];
              return (
                <Reveal as="li" key={step.number} delay={i * 130}>
                  <article className="card card-hover flex items-start gap-6 p-7 lg:p-9">
                    <span className={`icon-chip shrink-0 ${step.tint}`}>
                      <Icon strokeWidth={1.9} className="h-7 w-7" />
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
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </a>
            </Reveal>
          </ol>
        </div>
      </Container>
    </Section>
  );
}
