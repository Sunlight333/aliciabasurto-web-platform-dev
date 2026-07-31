import Image from 'next/image';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';

/**
 * Required, not decorative — the live site gives this section 1 of its 4
 * home slots, and the founder is the bridge between the "Nutricycle" product
 * name and the "Alicia Basurto" personal brand (about-page.md §1).
 *
 * Layout mirrors the method section above it: text left, portrait right.
 * Lilac surface, as served today.
 *
 * ⚠️ Body copy is placeholder. The live site's SOBRE MÍ contains no
 * biographical detail at all, so nothing could be carried over.
 * ~80 words required from the client — about-page.md §4 item 2.
 *
 * No app CTA here by design: the closing band owns the download ask.
 */
export function FounderSection() {
  return (
    <Section surface="lilac">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Sobre mí</Eyebrow>

            <h2 className="mt-6 text-h2 text-ink">
              Alicia Basurto:{' '}
              <em className="font-display italic text-accent-display">
                Nutrición Cíclica
              </em>
            </h2>

            <div className="mt-7 max-w-prose space-y-5 text-body text-muted">
              <p>
                Durante años mi cuerpo fue una espiral de acné, fatiga y
                desequilibrios que afectaban mi calidad de vida.
              </p>
              <p>
                Después de seis años revirtiendo mis propios síntomas, consolidé
                una metodología basada en la alimentación como medicina. Hoy mi
                misión es enseñar a otras mujeres a sincronizar sus hábitos con
                la inteligencia de su ciclo menstrual.
              </p>
            </div>

            <Button href="/sobre" variant="outline" className="mt-9">
              Conóceme
            </Button>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={140}>
            <div className="mask-arch relative mx-auto aspect-[2/3] max-w-md overflow-hidden shadow-soft lg:ml-auto">
              <Image
                src="/images/alicia/portrait-tea.jpg"
                alt="Alicia Basurto sosteniendo una infusión en su cocina"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
