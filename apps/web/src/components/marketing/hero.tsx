import Image from 'next/image';
import { STORE } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { AmbientOrbs } from '@/components/motion/ambient-orbs';

/**
 * ⚠️ The design called for an app mockup here. Zero app screenshots exist
 * in the repo (image-assets.md §5 gap #4), so the hero uses the strongest
 * founder frame instead — arch-masked, per design-direction.md §7.
 * Swap in the device mockup when screenshots arrive.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
      <AmbientOrbs />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* 7/5 rather than 6/6 — at 6 columns the display line breaks
              after "sentirte", orphaning "tú." onto a third line. */}
          <div className="lg:col-span-7">
            <Eyebrow>Nutrición cíclica</Eyebrow>

            <h1 className="mt-7 text-display text-ink">
              Come con tu ciclo.
              <br />
              <em className="font-display italic text-accent-display">
                Vuelve a sentirte tú.
              </em>
            </h1>

            <p className="mt-8 max-w-lg text-lead text-muted">
              Nutricycle adapta tu alimentación, tus recetas y tus rutinas a cada
              fase de tu ciclo menstrual — automáticamente.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={`${STORE.smart}?src=home-hero`}>Descargar gratis</Button>
              <Button href="#como-funciona" variant="ghost">
                Ver cómo funciona
              </Button>
            </div>

            <p className="mt-6 text-caption text-muted">
              Gratis · iOS y Android · Sin tarjeta
            </p>

            <dl className="mt-12 flex items-center gap-8 border-t border-hairline pt-8">
              <Stat value={`★ ${STORE.rating}`} label="Valoración" />
              <span aria-hidden className="h-9 w-px bg-hairline" />
              <Stat value={STORE.recipeCount} label="Recetas" />
              <span aria-hidden className="h-9 w-px bg-hairline" />
              <Stat value={STORE.phaseCount} label="Fases del ciclo" />
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:ml-auto lg:max-w-none">
              <div className="mask-arch relative aspect-[2/3] overflow-hidden shadow-soft">
                <Image
                  src="/images/alicia/portrait-smiling.jpg"
                  alt="Alicia Basurto, health coach de nutrición hormonal, en su cocina"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block font-display text-h3 font-normal text-ink">{value}</span>
        <span className="mt-1 block text-caption text-muted">{label}</span>
      </dd>
    </div>
  );
}
