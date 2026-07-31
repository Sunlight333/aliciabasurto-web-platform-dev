/**
 * Ambient orbs — 600–900px radial gradients, blur(120px), 4–8% opacity,
 * drifting on a 28s loop behind content (design-direction.md §6.1).
 *
 * Purely decorative: aria-hidden, pointer-events none, and disabled
 * wholesale under prefers-reduced-motion via globals.css.
 */
export function AmbientOrbs({ variant = 'warm' }: { variant?: 'warm' | 'cool' }) {
  const a = variant === 'warm' ? 'var(--color-sage)' : 'var(--color-accent-display)';
  const b = variant === 'warm' ? 'var(--color-accent-display)' : 'var(--color-sage)';

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="orb animate-drift"
        style={{
          width: 'min(70vw, 820px)',
          height: 'min(70vw, 820px)',
          top: '-18%',
          left: '-12%',
          background: a,
          opacity: 0.07,
        }}
      />
      <div
        className="orb animate-drift"
        style={{
          width: 'min(60vw, 680px)',
          height: 'min(60vw, 680px)',
          bottom: '-22%',
          right: '-10%',
          background: b,
          opacity: 0.06,
          animationDelay: '-14s',
        }}
      />
    </div>
  );
}
