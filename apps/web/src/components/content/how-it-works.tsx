import Image from 'next/image';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { STEPS } from '@/data/home';

export function HowItWorks() {
  return (
    <Section surface="sunken" id="como-funciona">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Cómo funciona</Eyebrow>
              <h2 className="mt-6 text-h2 text-ink">
                Nutrición que se{' '}
                <em className="font-display italic text-accent-display">
                  sincroniza
                </em>{' '}
                a tu cuerpo
              </h2>
              <p className="mt-6 max-w-md text-body text-muted">
                Tres pasos. El resto lo calcula la app cada día por ti.
              </p>

              <div className="mask-arch relative mt-12 hidden aspect-[2/3] max-w-sm overflow-hidden shadow-soft lg:block">
                <Image
                  src="/images/alicia/kitchen-chopping.jpg"
                  alt="Alicia Basurto preparando verduras para una receta por fase del ciclo"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ol className="lg:col-span-7 lg:pt-4">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.number} delay={i * 120}>
                <div className="flex gap-6 border-t border-hairline py-9 first:border-t-0 first:pt-0 md:gap-10">
                  <span
                    aria-hidden
                    className="font-display text-h2 leading-none font-light text-accent-display"
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-h3 text-ink">{step.title}</h3>
                    <p className="mt-3 max-w-lg text-body text-muted">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal as="li" delay={360}>
              <Button href="/como-funciona" variant="outline" className="mt-8">
                Conoce el método
              </Button>
            </Reveal>
          </ol>
        </div>
      </Container>
    </Section>
  );
}
