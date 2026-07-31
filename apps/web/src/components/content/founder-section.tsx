import Image from 'next/image';
import { ArrowRight, Quote } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';

/**
 * Required, not decorative — the founder bridges the "Nutricycle" product
 * name and the "Alicia Basurto" personal brand (about-page.md §1).
 *
 * ⚠️ Body copy is placeholder; ~80 words needed from the client.
 * No app CTA here by design — the closing band owns the download ask.
 */
export function FounderSection() {
  return (
    <Section surface="lilac" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(50vw, 560px)',
            height: 'min(50vw, 560px)',
            top: '-20%',
            right: '-8%',
            background: 'var(--color-luteal)',
            opacity: 0.35,
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Sobre mí</Eyebrow>

            <h2 className="mt-5 text-h2 text-ink">
              Alicia Basurto: <span className="text-accent">Nutrición Cíclica</span>
            </h2>

            <div className="mt-7 max-w-xl space-y-5 text-body text-muted">
              <p>
                Durante años mi cuerpo fue una espiral de acné, fatiga y
                desequilibrios que afectaban mi calidad de vida.
              </p>
              <p>
                Después de seis años revirtiendo mis propios síntomas, consolidé
                una metodología basada en la alimentación como medicina. Hoy mi
                misión es enseñar a otras mujeres a sincronizar sus hábitos con la
                inteligencia de su ciclo menstrual.
              </p>
            </div>

            <a
              href="/sobre"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 font-sans text-nav font-semibold text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Conóceme
              <ArrowRight
                strokeWidth={2.2}
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={150}>
            <div className="scene">
              <div className="relative mx-auto max-w-md lg:ml-auto">
                <div className="tilt overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/images/alicia/portrait-smiling.jpg"
                      alt="Alicia Basurto, health coach de nutrición hormonal, en su cocina"
                      fill
                      sizes="(min-width: 1024px) 460px, 85vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="glass-strong absolute -bottom-8 -left-6 max-w-[17rem] rounded-2xl p-6 shadow-lg">
                  <Quote strokeWidth={2} className="h-6 w-6 text-accent-display" />
                  <p className="mt-3 font-display text-h4 leading-snug text-ink">
                    La comida correcta en el momento correcto.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
