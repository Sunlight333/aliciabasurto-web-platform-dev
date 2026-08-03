import { cn } from '@/lib/cn';

/** All surfaces are light — no dark backgrounds anywhere on the site. */
type Surface = 'none' | 'base' | 'raised' | 'sunken' | 'lilac' | 'blush' | 'mint';

/** Flat fills. Neutrals only — these sit next to each other harmlessly. */
const FLAT: Record<Surface, string> = {
  none: '',
  base: 'bg-surface-base',
  raised: 'bg-surface-raised',
  sunken: '',
  lilac: '',
  blush: '',
  mint: '',
};

/**
 * Tinted surfaces are rendered as a vertical gradient rather than a flat
 * fill: transparent at both edges, full tint through the middle.
 *
 * A flat tint between two cream sections leaves a hard line top and
 * bottom — measured at 11–17 luminance steps across the site, which is
 * exactly the "patchwork" seam that made long pages feel assembled
 * rather than designed. Fading the tint in and out removes the line
 * while keeping the colour, so the rhythm survives and the joins don't
 * announce themselves.
 */
const TINTS: Partial<Record<Surface, string>> = {
  sunken: 'var(--color-surface-sunken)',
  lilac: 'var(--color-surface-lilac)',
  blush: 'var(--color-surface-blush)',
  mint: 'var(--color-surface-mint)',
};

export function Section({
  children,
  className,
  surface = 'none',
  size = 'standard',
  /** Opt out where a hard edge is wanted (none currently). */
  blend = true,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  surface?: Surface;
  size?: 'standard' | 'feature' | 'tight';
  blend?: boolean;
  id?: string;
}) {
  const tint = TINTS[surface];

  return (
    <section
      id={id}
      className={cn(
        'relative',
        tint ? 'bg-surface-raised' : FLAT[surface],
        size === 'standard' && 'py-20 md:py-24 lg:py-32',
        size === 'feature' && 'py-24 md:py-32 lg:py-40',
        size === 'tight' && 'py-14 md:py-18 lg:py-24',
        className,
      )}
      // Applied as a background-image, not an overlay element: an absolutely
      // positioned div would paint above any statically positioned child,
      // and not every page wraps its content in a relative Container.
      style={
        tint
          ? {
              backgroundImage: blend
                ? `linear-gradient(to bottom, transparent 0%, ${tint} 18%, ${tint} 82%, transparent 100%)`
                : `linear-gradient(${tint}, ${tint})`,
            }
          : undefined
      }
    >
      {children}
    </section>
  );
}
