import { Sparkles, Star, ChefHat, CircleDashed } from 'lucide-react';
import { STORE } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { StoreButtons } from './store-buttons';

/**
 * Hero — kitchen-wide.avif, sharp and pinned.
 *
 * The photograph is a CSS background with `fixed` attachment, so it never
 * travels with the scroll or ends in a hard cut. The only soft-focus is a
 * blur strip at the very bottom, which dissolves the hero into the next
 * section.
 *
 * Content is centred, echoing the centred logo above it.
 */
export function Hero() {
  return (
    <section className="relative -mt-32 overflow-hidden pt-32">
      <div className="hero-bg absolute inset-0" />
      <div className="scrim-light absolute inset-0" />
      <div className="scrim-spot pointer-events-none absolute inset-0" />

      {/* Bottom-only transition into the section below */}
      <div className="fade-blur pointer-events-none absolute inset-x-0 bottom-0 h-72" />
      <div className="scrim-bottom pointer-events-none absolute inset-0" />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(55vw, 640px)',
            height: 'min(55vw, 640px)',
            top: '-18%',
            left: '-8%',
            background: 'var(--color-luteal)',
            opacity: 0.22,
          }}
        />
        <div
          className="orb animate-drift"
          style={{
            width: 'min(45vw, 520px)',
            height: 'min(45vw, 520px)',
            bottom: '-5%',
            right: '-6%',
            background: 'var(--color-menstrual)',
            opacity: 0.16,
            animationDelay: '-13s',
          }}
        />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center py-20 text-center lg:py-28">
          <span className="glass-strong inline-flex items-center gap-2.5 rounded-full px-6 py-3 shadow-md">
            <Sparkles strokeWidth={2} className="h-5.5 w-5.5 text-accent" />
            <span className="font-sans text-caption font-semibold tracking-wide text-ink">
              Nutrición cíclica con IA
            </span>
          </span>

          <h1 className="mt-9 max-w-5xl text-display text-ink">
            Come con tu ciclo.
            <br />
            <span className="text-accent">Vuelve a sentirte tú.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lead font-medium text-muted">
            Nutricycle adapta tu alimentación, tus recetas y tus rutinas a cada fase
            de tu ciclo menstrual — automáticamente.
          </p>

          <StoreButtons
            source="home-hero"
            size="lg"
            className="mt-11 justify-center sm:inline-flex"
          />

          <p className="mt-6 text-caption font-medium text-muted">
            Gratis · iOS y Android · Sin tarjeta
          </p>

          <ul className="mt-14 flex flex-wrap justify-center gap-4">
            <StatPill
              icon={<Star strokeWidth={2.2} className="h-6 w-6 text-ovulation-ink" />}
              value={STORE.rating}
              label="Valoración"
            />
            <StatPill
              icon={<ChefHat strokeWidth={2} className="h-6 w-6 text-menstrual-ink" />}
              value={STORE.recipeCount}
              label="Recetas"
            />
            <StatPill
              icon={
                <CircleDashed strokeWidth={2} className="h-6 w-6 text-luteal-ink" />
              }
              value={STORE.phaseCount}
              label="Fases del ciclo"
            />
          </ul>
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
    <li className="glass-strong flex items-center gap-3.5 rounded-2xl px-6 py-4 shadow-md">
      {icon}
      <span className="text-left">
        <span className="block font-display text-h4 font-semibold text-ink">
          {value}
        </span>
        <span className="block text-caption text-muted">{label}</span>
      </span>
    </li>
  );
}
