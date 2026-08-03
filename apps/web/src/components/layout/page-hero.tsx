import { Container } from './container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { cn } from '@/lib/cn';

/**
 * Full-viewport header for interior pages.
 *
 * Deliberately the same construction as the home hero — a sharp
 * photograph under a light cream scrim — so every route opens the same
 * way and the site reads as one thing. `/` uses founder photography;
 * interior pages pass their own `image`, and each new page adds one entry
 * to image-assets.md §3b rather than inventing a new header treatment.
 *
 * Without `image` it falls back to the gradient field, which is what a
 * page should look like before its photography is chosen — not a
 * different design.
 *
 * The scrim, the `focal` crop and the closing fade are the whole system.
 * The fade matters: it dissolves the photograph into the first section's
 * surface so the seam never reads as two pages stacked together.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  image,
  /** Flat veil opacity over the photograph. Lower for pale frames that
   *  would otherwise disappear; higher for busy or contrasty ones. */
  veil = 0.55,
  /** object-position for the photograph; defaults to centre */
  focal = 'center',
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  image?: string;
  veil?: number;
  focal?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        // Runs up under the sticky header, exactly as the home hero does —
        // otherwise a band of page background sits above the photograph and
        // the header reads as detached from the page.
        'relative -mt-32 flex min-h-svh flex-col justify-center overflow-hidden pt-32',
        'pb-20 lg:pb-24',
        !image && 'bg-gradient-to-b from-surface-lilac via-surface-raised to-surface-raised',
        className,
      )}
    >
      {image && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: `url('${image}')`, backgroundPosition: focal }}
          />
          {/* A light, even veil, kept deliberately weak. A flat 82% wash
              read fine over the darker frames but erased the pale ones
              entirely — several heroes were invisible. Legibility now
              comes mostly from the radial below, which only covers where
              the copy actually sits, so pale photographs survive. */}
          <div
            className="absolute inset-0 bg-surface-raised"
            style={{ opacity: veil }}
          />
          {/* Brightest exactly under the copy block */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(62% 48% at 50% 50%, rgb(253 252 244 / 0.9) 0%, rgb(253 252 244 / 0.62) 48%, rgb(253 252 244 / 0.18) 78%, rgb(253 252 244 / 0) 100%)',
            }}
          />
        </div>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(50vw, 580px)',
            height: 'min(50vw, 580px)',
            top: '-28%',
            right: '-8%',
            background: 'var(--color-luteal)',
            opacity: image ? 0.22 : 0.35,
          }}
        />
        <div
          className="orb animate-drift"
          style={{
            width: 'min(40vw, 460px)',
            height: 'min(40vw, 460px)',
            bottom: '-28%',
            left: '-6%',
            background: 'var(--color-menstrual)',
            opacity: image ? 0.16 : 0.22,
            animationDelay: '-14s',
          }}
        />
      </div>

      {/* Legibility field for the transparent header sitting over the photo */}
      {image && (
        <div
          aria-hidden
          className="scrim-top pointer-events-none absolute inset-x-0 top-0 h-52"
        />
      )}

      {/* Dissolves into whatever section follows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-raised via-surface-raised/70 to-transparent"
      />

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
