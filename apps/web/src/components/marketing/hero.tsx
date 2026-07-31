import Image from 'next/image';
import { Sparkles, Star, ChefHat, CircleDashed } from 'lucide-react';
import { STORE } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { StoreButtons } from './store-buttons';

/**
 * Hero — kitchen-wide.avif full-bleed behind a light scrim.
 *
 * The scrim is cream, not dark: ink stays at 14:1+ over the left half
 * while the photograph shows through on the right. The founder portrait
 * floats over it in a 3D-tilted glass frame.
 */
export function Hero() {
  return (
    <section className="relative -mt-40 overflow-hidden pt-40">
      {/* Background photograph */}
      <div className="absolute inset-0">
        {/* Blurred and scaled: the photograph is ambience here, not a
            subject. Left sharp it competes with the portrait card. */}
        <Image
          src="/images/alicia/kitchen-wide.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover object-center blur-[3px]"
        />
        <div className="scrim-veil absolute inset-0" />
        <div className="scrim-light absolute inset-0" />
        <div className="scrim-bottom absolute inset-0" />
      </div>

      {/* Ambient colour */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(60vw, 700px)',
            height: 'min(60vw, 700px)',
            top: '-15%',
            left: '-10%',
            background: 'var(--color-luteal)',
            opacity: 0.28,
          }}
        />
        <div
          className="orb animate-drift"
          style={{
            width: 'min(45vw, 520px)',
            height: 'min(45vw, 520px)',
            bottom: '-10%',
            left: '35%',
            background: 'var(--color-menstrual)',
            opacity: 0.18,
            animationDelay: '-13s',
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 pt-14 pb-24 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-32">
          <div className="lg:col-span-7">
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 shadow-sm">
              <Sparkles strokeWidth={2} className="h-4.5 w-4.5 text-accent" />
              <span className="font-sans text-caption font-semibold tracking-wide text-ink">
                Nutrición cíclica con IA
              </span>
            </span>

            <h1 className="mt-7 text-display text-ink">
              Come con tu ciclo.
              <br />
              <span className="text-accent">Vuelve a sentirte tú.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lead text-muted">
              Nutricycle adapta tu alimentación, tus recetas y tus rutinas a cada
              fase de tu ciclo menstrual — automáticamente.
            </p>

            <StoreButtons source="home-hero" size="lg" className="mt-10" />

            <p className="mt-5 text-caption text-muted">
              Gratis · iOS y Android · Sin tarjeta
            </p>

            {/* Glass stat pills */}
            <ul className="mt-12 flex flex-wrap gap-3.5">
              <StatPill
                icon={<Star strokeWidth={2.2} className="h-5 w-5 text-ovulation-ink" />}
                value={STORE.rating}
                label="Valoración"
              />
              <StatPill
                icon={<ChefHat strokeWidth={2} className="h-5 w-5 text-menstrual-ink" />}
                value={STORE.recipeCount}
                label="Recetas"
              />
              <StatPill
                icon={
                  <CircleDashed strokeWidth={2} className="h-5 w-5 text-luteal-ink" />
                }
                value={STORE.phaseCount}
                label="Fases"
              />
            </ul>
          </div>

          {/* Floating portrait, tilted in 3D */}
          <div className="scene lg:col-span-5">
            <div className="animate-float relative mx-auto max-w-sm lg:ml-auto">
              <div className="tilt relative overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/alicia/portrait-tea.jpg"
                    alt="Alicia Basurto sosteniendo una infusión en su cocina"
                    fill
                    priority
                    sizes="(min-width: 1024px) 400px, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="glass-strong absolute -bottom-7 -left-7 max-w-[15rem] rounded-2xl p-5 shadow-lg">
                <p className="font-display text-h4 text-ink">Alicia Basurto</p>
                <p className="mt-1 text-caption text-muted">
                  Health coach de nutrición hormonal
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatPill({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <li className="glass flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-sm">
      {icon}
      <span>
        <span className="block font-display text-h4 font-semibold text-ink">
          {value}
        </span>
        <span className="block text-caption text-muted">{label}</span>
      </span>
    </li>
  );
}
