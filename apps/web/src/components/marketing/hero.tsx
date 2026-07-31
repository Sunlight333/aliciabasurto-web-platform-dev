import { Sparkles, Star, ChefHat, CircleDashed } from 'lucide-react';
import { STORE } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { StoreButtons } from './store-buttons';

/**
 * Hero — kitchen-wide.avif, pinned, sharp on top.
 *
 * Composition: the photograph is positioned high so Alicia sits in the
 * upper band, fully visible and unblurred. The copy lives in the lower
 * half, where a stepped blur and a deepening veil make it legible. The
 * subject is therefore never covered by centred content, and the layout
 * stays symmetric rather than being pushed off to one side.
 *
 * The background uses fixed attachment, so it neither travels with the
 * scroll nor ends in a hard cut. It runs up underneath the menu — the
 * header is transparent at rest and only frosts once scrolled.
 */
export function Hero() {
  return (
    <section className="relative -mt-32 flex min-h-[168vh] flex-col justify-end overflow-hidden pt-32 sm:min-h-[150vh] lg:min-h-[116vh]">
      <div className="hero-bg absolute inset-0" />
      <div className="scrim-light pointer-events-none absolute inset-0" />

      {/* Blur builds only downward — the top stays perfectly sharp. */}
      <div className="blur-step blur-1" />
      <div className="blur-step blur-2" />
      <div className="blur-step blur-3" />

      {/* Legibility field for the transparent menu */}
      <div className="scrim-top pointer-events-none absolute inset-x-0 top-0 h-56" />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(50vw, 600px)',
            height: 'min(50vw, 600px)',
            bottom: '2%',
            left: '-8%',
            background: 'var(--color-luteal)',
            opacity: 0.24,
          }}
        />
        <div
          className="orb animate-drift"
          style={{
            width: 'min(42vw, 500px)',
            height: 'min(42vw, 500px)',
            bottom: '-6%',
            right: '-6%',
            background: 'var(--color-menstrual)',
            opacity: 0.18,
            animationDelay: '-13s',
          }}
        />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center pb-20 text-center lg:pb-24">
          <span className="glass-strong inline-flex items-center gap-2.5 rounded-full px-6 py-3 shadow-md">
            <Sparkles strokeWidth={2} className="h-5.5 w-5.5 text-accent" />
            <span className="font-sans text-caption font-semibold tracking-wide text-ink">
              Nutrición cíclica con IA
            </span>
          </span>

          <h1 className="mt-8 max-w-5xl text-display text-ink">
            Come con tu ciclo.
            <br />
            <span className="text-accent">Vuelve a sentirte tú.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lead font-medium text-muted">
            Nutricycle adapta tu alimentación, tus recetas y tus rutinas a cada fase
            de tu ciclo menstrual — automáticamente.
          </p>

          <StoreButtons
            source="home-hero"
            size="lg"
            className="mt-10 justify-center sm:inline-flex"
          />

          <p className="mt-6 text-caption font-medium text-muted">
            Gratis · iOS y Android · Sin tarjeta
          </p>

          <ul className="mt-12 flex flex-wrap justify-center gap-4">
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
