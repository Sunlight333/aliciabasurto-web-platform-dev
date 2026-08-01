'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { REVIEWS, type Review } from '@/data/reviews';
import { cn } from '@/lib/cn';

/** Phase tint per card, so reviews stay tied to the product's spine. */
const PHASE = {
  menstrual: {
    chip: 'bg-menstrual-soft text-menstrual-ink',
    halo: 'bg-menstrual',
    label: 'Fase menstrual',
  },
  folicular: {
    chip: 'bg-follicular-soft text-follicular-ink',
    halo: 'bg-follicular',
    label: 'Fase folicular',
  },
  ovulatoria: {
    chip: 'bg-ovulation-soft text-ovulation-ink',
    halo: 'bg-ovulation',
    label: 'Fase ovulatoria',
  },
  lutea: {
    chip: 'bg-luteal-soft text-luteal-ink',
    halo: 'bg-luteal',
    label: 'Fase lútea',
  },
} as const;

/** Shape variation so the row never reads as a grid of identical boxes. */
const SHAPES = [
  'rounded-t-[9999px] rounded-b-[2.5rem]',
  'rounded-t-[9999px] rounded-bl-[5rem] rounded-br-[2rem]',
  'rounded-t-[9999px] rounded-bl-[2rem] rounded-br-[5rem]',
];

export function ReviewsSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const frame = useRef<number>(0);

  /**
   * Scale each card by its distance from the track's centre: smallest at
   * the edges, largest dead centre. Driven off scroll position rather
   * than a fixed index, so it stays continuous during drag, wheel,
   * keyboard and momentum scrolling alike.
   */
  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const rect = track.getBoundingClientRect();
    const mid = rect.left + rect.width / 2;
    const reach = rect.width / 2 || 1;

    for (const el of Array.from(track.children) as HTMLElement[]) {
      if (reduced) {
        el.style.transform = '';
        el.style.opacity = '';
        el.style.zIndex = '';
        continue;
      }
      const r = el.getBoundingClientRect();
      const d = Math.min(Math.abs(r.left + r.width / 2 - mid) / reach, 1);
      // Ease the falloff so the centre card holds its size a little longer
      const t = d * d;
      el.style.transform = `translate3d(0, ${t * 30}px, 0) scale(${1 - t * 0.26})`;
      el.style.opacity = String(1 - t * 0.5);
      el.style.zIndex = String(100 - Math.round(t * 100));
    }
  }, []);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    update();
    // Centre the middle card on first paint instead of starting flush left
    const mid = track.children[Math.floor(REVIEWS.length / 2)] as HTMLElement | undefined;
    if (mid) {
      track.scrollLeft = mid.offsetLeft - (track.clientWidth - mid.clientWidth) / 2;
      update();
    }

    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onScroll, update]);

  const step = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const w = first ? first.clientWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  return (
    <Section surface="mint" className="overflow-hidden">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Testimonios</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            Lo que cambia cuando{' '}
            <span className="text-accent">escuchas tu ciclo</span>
          </h2>
        </Reveal>
      </Container>

      {/* Full-bleed: the track must be able to run past the container edges
          so cards can shrink away rather than stop at a hard margin. */}
      <ul
        ref={trackRef}
        className="no-scrollbar mt-4 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto overscroll-x-contain pt-20 pb-10 [--rc:19rem] sm:[--rc:20rem] lg:[--rc:21rem]"
        style={{ paddingInline: 'max(1.5rem, calc(50% - var(--rc) / 2))' }}
      >
        {REVIEWS.map((review, i) => (
          <li
            key={review.id}
            className="w-[var(--rc)] shrink-0 snap-center will-change-transform"
            style={{ transitionProperty: 'none' }}
          >
            <ReviewCard review={review} shape={SHAPES[i % SHAPES.length]} />
          </li>
        ))}
      </ul>

      <Container>
        <div className="flex items-center justify-center gap-4">
          <NavButton label="Anterior" onClick={() => step(-1)}>
            <ChevronLeft strokeWidth={2.2} className="h-6 w-6" />
          </NavButton>
          <NavButton label="Siguiente" onClick={() => step(1)}>
            <ChevronRight strokeWidth={2.2} className="h-6 w-6" />
          </NavButton>
        </div>
      </Container>
    </Section>
  );
}

function NavButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-14 w-14 place-items-center rounded-full border border-hairline bg-white text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
    >
      {children}
    </button>
  );
}

function ReviewCard({ review, shape }: { review: Review; shape: string }) {
  const phase = PHASE[review.phase];

  return (
    <figure
      className={cn(
        'relative flex flex-col items-center border border-white bg-white px-7 pb-9 text-center shadow-lg',
        // Arch crown echoes the site's mask-arch portraits; the asymmetric
        // base keeps the row from reading as identical boxes.
        shape,
        'pt-24',
      )}
    >
      {/* Avatar breaks out of the arch and is the card's focal point.
          A phase-tinted halo sits outside a white ring, so the colour is
          legible instead of competing with the photograph's edge. */}
      <div className="absolute -top-15 left-1/2 -translate-x-1/2">
        <div className={cn('rounded-full p-1.5 shadow-lg', phase.halo)}>
          <div className="h-28 w-28 overflow-hidden rounded-full bg-surface-sunken ring-4 ring-white">
            {review.avatar ? (
              <Image
                src={review.avatar}
                alt=""
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="grid h-full w-full place-items-center font-display text-h2 text-muted">
                {review.name.charAt(0)}
              </span>
            )}
          </div>
        </div>
      </div>

      <Quote strokeWidth={2} className="h-7 w-7 text-accent-display" aria-hidden />

      <blockquote className="mt-4 flex-1 text-small leading-relaxed text-ink">
        “{review.quote}”
      </blockquote>

      <figcaption className="mt-6">
        <p className="font-display text-h4 font-semibold text-ink">{review.name}</p>
        {review.location && (
          <p className="mt-0.5 text-caption text-muted">{review.location}</p>
        )}

        <span
          className={cn(
            'mt-4 inline-flex rounded-full px-3.5 py-1.5 font-sans text-caption font-bold',
            phase.chip,
          )}
        >
          {phase.label}
        </span>
      </figcaption>

      <div
        className="mt-5 flex gap-1"
        aria-label={`${review.rating} de 5 estrellas`}
        role="img"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            aria-hidden
            strokeWidth={2}
            className={cn(
              'h-4.5 w-4.5',
              i < review.rating
                ? 'fill-ovulation text-ovulation-ink'
                : 'text-hairline-strong',
            )}
          />
        ))}
      </div>
    </figure>
  );
}
