import { Star, ChefHat, CircleDashed } from 'lucide-react';
import Image from 'next/image';
import { STORE } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { StoreButtons } from './store-buttons';
import { CtaBackdrop } from './cta-backdrop';
import { Reveal } from '@/components/motion/reveal';

/**
 * Closing conversion band — light, per the no-dark-backgrounds rule.
 * A glass card floats over a rotating photographic backdrop.
 *
 * Layer order is load-bearing, back to front: photography, tint, orbs,
 * top fade, card. The fade must stay after the orbs — the top orb is
 * positioned above the band and clipped by `overflow-hidden`, so painting
 * it over the fade turns its clipped edge into a hard line across the left
 * gutter (see image-assets.md §Section seams).
 *
 * Reused verbatim at the foot of /ciclo/[fase] and /recetas/[slug].
 */
export function CtaBand({ source = 'closing' }: { source?: string }) {
  return (
    <section className="relative overflow-hidden bg-surface-raised py-24 lg:py-36">
      <CtaBackdrop />

      {/* The band's blush→lilac identity, kept but demoted. At full strength
          it fought the photography underneath; at this weight it tints the
          frames rather than competing with them. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-surface-blush/70 via-transparent to-surface-lilac/70"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(55vw, 640px)',
            height: 'min(55vw, 640px)',
            top: '-25%',
            left: '-5%',
            background: 'var(--color-menstrual)',
            opacity: 0.3,
          }}
        />
        <div
          className="orb animate-drift"
          style={{
            width: 'min(50vw, 580px)',
            height: 'min(50vw, 580px)',
            bottom: '-25%',
            right: '-5%',
            background: 'var(--color-luteal)',
            opacity: 0.35,
            animationDelay: '-11s',
          }}
        />
      </div>

      {/* The band's tint met the preceding section on a hard line. This fades
          it in from cream so the page closes rather than switches.
          It must paint *after* the orbs: the top orb is positioned above the
          band and clipped by `overflow-hidden`, so when the fade sat first the
          orb was drawn over it and its clipped edge became a hard 13-step line
          across the left gutter — a seam the measurement kept finding on every
          page precisely because this band closes all of them. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-surface-raised via-surface-raised/60 to-transparent"
      />

      <Container className="relative">
        <Reveal>
          <div className="glass-strong mx-auto max-w-4xl rounded-[2.5rem] px-8 py-14 text-center shadow-xl lg:px-16 lg:py-16">
            <Image
              src="/images/brand/app-icon-1024.png"
              alt=""
              width={1024}
              height={1024}
              className="animate-float mx-auto h-24 w-24 rounded-[1.5rem] shadow-lg"
            />

            <Eyebrow className="mt-8">Disponible en iOS y Android</Eyebrow>

            <h2 className="mt-5 text-h1 text-ink">
              Tu ciclo, tu guía —{' '}
              <span className="text-accent">en tu bolsillo</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lead text-muted">
              Cada día, los alimentos y recetas que tu cuerpo necesita según tu
              fase. Sin dietas, sin restricciones.
            </p>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Stat
                icon={<Star strokeWidth={2.2} className="h-5 w-5 text-ovulation-ink" />}
                value={STORE.rating}
                label="Valoración"
              />
              <Stat
                icon={<ChefHat strokeWidth={2} className="h-5 w-5 text-menstrual-ink" />}
                value={STORE.recipeCount}
                label="Recetas"
              />
              <Stat
                icon={
                  <CircleDashed strokeWidth={2} className="h-5 w-5 text-luteal-ink" />
                }
                value={STORE.phaseCount}
                label="Fases"
              />
            </ul>

            <StoreButtons
              source={source}
              size="lg"
              className="mt-10 justify-center sm:inline-flex"
            />

            <p className="mt-6 text-caption text-muted">
              Descarga gratis · Plan Hormonal desde la app
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-hairline bg-white/70 px-5 py-3 shadow-sm">
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
