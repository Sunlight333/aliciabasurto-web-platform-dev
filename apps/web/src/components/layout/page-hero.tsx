import { Container } from './container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { cn } from '@/lib/cn';

/**
 * Standard header for interior pages.
 *
 * `/` gets a full-bleed photograph; every other route uses this — a light
 * gradient field with drifting orbs, so subpages share the home page's
 * atmosphere without needing founder imagery the project doesn't have
 * (image-assets.md §5 gap #6).
 *
 * The site header is sticky, not fixed, so it occupies layout space and
 * this needs no negative offset.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  /** Trailing fragment rendered in the accent colour */
  accent?: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-surface-lilac via-surface-raised to-surface-raised',
        'pt-16 pb-20 lg:pt-24 lg:pb-28',
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(50vw, 580px)',
            height: 'min(50vw, 580px)',
            top: '-30%',
            right: '-8%',
            background: 'var(--color-luteal)',
            opacity: 0.35,
          }}
        />
        <div
          className="orb animate-drift"
          style={{
            width: 'min(40vw, 460px)',
            height: 'min(40vw, 460px)',
            bottom: '-30%',
            left: '-6%',
            background: 'var(--color-menstrual)',
            opacity: 0.22,
            animationDelay: '-14s',
          }}
        />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-h1 text-ink">
            {title}
            {accent && (
              <>
                {' '}
                <span className="text-accent">{accent}</span>
              </>
            )}
          </h1>
          {lead && <p className="mx-auto mt-7 max-w-2xl text-lead text-muted">{lead}</p>}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
