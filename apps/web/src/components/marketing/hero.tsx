import { Sparkles, Star, ChefHat, CircleDashed } from 'lucide-react';
import { STORE } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { StoreButtons } from './store-buttons';
import { getDictionary, type Locale } from '@/lib/i18n';

/**
 * Hero — kitchen-wide.avif, sharp throughout. No blur anywhere.
 *
 * Alicia sits right of centre; the copy occupies a left column that stops
 * well short of her. The scrim runs horizontally, so it lightens only the
 * text side and leaves her completely unveiled. She is neither covered nor
 * washed out, and the column still reads as a deliberate two-part
 * composition rather than an off-centre block.
 *
 * Small screens cannot hold two columns from a landscape frame, so mobile
 * becomes a photo band with the copy centred beneath it.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    // Mobile flows: the copy starts directly beneath the photo band, so the
    // section is only as tall as its contents. Forcing a min-height with
    // bottom-aligned content left a large dead gap between the two.
    <section className="relative -mt-32 flex flex-col overflow-hidden pt-[65vh] sm:pt-[62vh] lg:min-h-screen lg:justify-center lg:pt-32">
      <div className="hero-bg absolute inset-0" />
      <div className="scrim-light pointer-events-none absolute inset-0" />
      <div className="scrim-foot pointer-events-none absolute inset-0" />

      {/* Legibility field for the transparent menu */}
      <div className="scrim-top pointer-events-none absolute inset-x-0 top-0 h-56" />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(48vw, 580px)',
            height: 'min(48vw, 580px)',
            bottom: '4%',
            left: '-12%',
            background: 'var(--color-luteal)',
            opacity: 0.22,
          }}
        />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center pb-20 text-center lg:max-w-[24rem] lg:items-start xl:max-w-[24rem] 2xl:max-w-[23rem] lg:pb-0 lg:text-left">
          <span className="glass-strong inline-flex items-center gap-2.5 rounded-full px-6 py-3 shadow-md">
            <Sparkles strokeWidth={2} className="h-5.5 w-5.5 text-accent" />
            <span className="font-sans text-caption font-semibold tracking-wide text-ink">
              {t.home.hero.badge}
            </span>
          </span>

          {/* Sized to the column, not the viewport — at full display scale
              the headline would run straight across Alicia. */}
          <h1 className="mt-8 font-display text-[clamp(2rem,2.7vw,2.875rem)] leading-[1.06] font-semibold tracking-[-0.02em] text-ink">
            {t.home.hero.title}{' '}
            <span className="text-accent">{t.home.hero.accent}</span>
          </h1>

          <p className="mt-6 max-w-md text-body font-medium text-muted lg:text-lead">
            {t.home.hero.lead}
          </p>

          {/* Stacked in the narrow column — side by side the labels wrap. */}
          <StoreButtons
            source="home-hero"
            className="mt-9 w-full max-w-xs justify-center sm:max-w-lg lg:max-w-none lg:flex-col lg:items-stretch"
          />

          <p className="mt-5 text-caption font-medium text-muted">
            {t.home.hero.note}
          </p>

          {/* One grouped card rather than three pills: three separate cards
              overflow a column this narrow. */}
          <ul className="glass-strong mt-9 flex w-full max-w-xs items-stretch rounded-2xl shadow-md sm:max-w-md lg:max-w-none">
            <Stat
              icon={<Star strokeWidth={2.2} className="h-5 w-5 text-ovulation-ink" />}
              value={STORE.rating}
              label="Valoración"
            />
            <li aria-hidden className="my-3 w-px bg-hairline" />
            <Stat
              icon={<ChefHat strokeWidth={2} className="h-5 w-5 text-menstrual-ink" />}
              value={STORE.recipeCount}
              label="Recetas"
            />
            <li aria-hidden className="my-3 w-px bg-hairline" />
            <Stat
              icon={
                <CircleDashed strokeWidth={2} className="h-5 w-5 text-luteal-ink" />
              }
              value={STORE.phaseCount}
              label="Fases"
            />
          </ul>
        </div>
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
    <li className="flex flex-1 flex-col items-center gap-1 px-3 py-4">
      {icon}
      <span className="font-display text-h4 leading-none font-semibold text-ink">
        {value}
      </span>
      <span className="text-center text-caption leading-tight text-muted">
        {label}
      </span>
    </li>
  );
}
