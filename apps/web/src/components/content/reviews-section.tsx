'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { getDictionary, type Locale } from '@/lib/i18n';
import { getReviews, type Review } from '@/data/reviews';
import { cn } from '@/lib/cn';

/** Pixels per second. Slow enough to read a card as it passes. */
const SPEED = 42;

/** Copies of the list rendered back to back. Three lets the scroll wrap
 *  in either direction without ever reaching a rendered edge. */
const SETS = 3;

/**
 * Colour only. The phase *label* comes from the dictionary
 * (`home.phaseLabel`) rather than living here — it used to be four Spanish
 * literals, which is how "Fase lútea" kept appearing on the English page.
 */
const PHASE = {
  menstrual: {
    chip: 'bg-menstrual-soft text-menstrual-ink',
    halo: 'bg-menstrual',
  },
  folicular: {
    chip: 'bg-follicular-soft text-follicular-ink',
    halo: 'bg-follicular',
  },
  ovulatoria: {
    chip: 'bg-ovulation-soft text-ovulation-ink',
    halo: 'bg-ovulation',
  },
  lutea: {
    chip: 'bg-luteal-soft text-luteal-ink',
    halo: 'bg-luteal',
  },
} as const;

/** Shape variation so the row never reads as identical boxes. */
const SHAPES = [
  'rounded-t-[9999px] rounded-b-[2.5rem]',
  'rounded-t-[9999px] rounded-bl-[5rem] rounded-br-[2rem]',
  'rounded-t-[9999px] rounded-bl-[2rem] rounded-br-[5rem]',
];

/**
 * `arch` is the landing page's domed card with the portrait breaking out
 * of the top edge. `ficha` is the Sobre variant: a wider, quieter card
 * that keeps its portrait inside the frame. Both ride the same marquee —
 * only the card and the track's metrics change.
 */
type Variant = 'arch' | 'ficha';

const TRACK: Record<Variant, string> = {
  // The tall top padding is headroom for the portrait that overhangs the card.
  arch: 'pt-20 pb-10 [--rc:19rem] sm:[--rc:20rem] lg:[--rc:21rem]',
  ficha: 'pt-10 pb-12 [--rc:20rem] sm:[--rc:22rem] lg:[--rc:23.5rem]',
};

export function ReviewsSection({
  locale,
  variant = 'arch',
  eyebrow,
  title,
}: {
  locale: Locale;
  variant?: Variant;
  eyebrow?: string;
  title?: React.ReactNode;
}) {
  const t = getDictionary(locale);
  const reviews = getReviews(locale);
  const count = reviews.length;
  const trackRef = useRef<HTMLUListElement>(null);
  const [dragging, setDragging] = useState(false);

  // Mutable refs rather than state: these change every frame and must not
  // trigger React renders.
  const paused = useRef(false);
  const onScreen = useRef(true);
  const drag = useRef<{ active: boolean; startX: number; startLeft: number }>({
    active: false,
    startX: 0,
    startLeft: 0,
  });
  /** Eased offset consumed by the arrow buttons, so they blend into the
   *  same loop instead of fighting it with native smooth scrolling. */
  const boost = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /** Exact width of one copy of the list, measured from the DOM so gaps
     *  and padding can never make it drift. */
    const setWidth = () => {
      const kids = track.children as HTMLCollectionOf<HTMLElement>;
      if (kids.length <= count) return 0;
      return kids[count].offsetLeft - kids[0].offsetLeft;
    };

    // Start in the middle copy so there is runway in both directions.
    let w = setWidth();
    if (w > 0) track.scrollLeft = w;

    /** Keep scrollLeft inside the middle copy. Because every copy is
     *  pixel-identical, shifting by exactly one copy is invisible — this
     *  is what makes the loop seamless rather than snapping back. */
    const wrap = () => {
      w = setWidth();
      if (w <= 0) return;
      if (track.scrollLeft >= w * 2) track.scrollLeft -= w;
      else if (track.scrollLeft < w) track.scrollLeft += w;
    };

    /** Scale each card by distance from the track centre. */
    const paint = () => {
      const rect = track.getBoundingClientRect();
      const mid = rect.left + rect.width / 2;
      const reach = rect.width / 2 || 1;
      for (const el of Array.from(track.children) as HTMLElement[]) {
        const r = el.getBoundingClientRect();
        // Skip anything far outside the viewport — cheap win with 18 cards
        if (r.right < rect.left - 400 || r.left > rect.right + 400) continue;
        const d = Math.min(Math.abs(r.left + r.width / 2 - mid) / reach, 1);
        const t = d * d;
        el.style.transform = `translate3d(0,${t * 30}px,0) scale(${1 - t * 0.26})`;
        el.style.opacity = String(1 - t * 0.5);
        // Kept well below the header's z-50. The section is also isolated,
        // but a low range means nothing here can ever outrank site chrome
        // even if that isolation is lost to a future refactor.
        el.style.zIndex = String(1 + Math.round((1 - t) * 20));
      }
    };

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000; // clamp after tab-switch
      last = now;

      if (boost.current !== 0) {
        const step = boost.current * 0.14;
        track.scrollLeft += step;
        boost.current -= step;
        if (Math.abs(boost.current) < 0.5) boost.current = 0;
      } else if (!reduced && !paused.current && !drag.current.active && onScreen.current) {
        // Sub-pixel accumulation keeps motion smooth at low speed instead
        // of stepping a whole pixel at a time.
        track.scrollLeft += SPEED * dt;
      }

      wrap();
      paint();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([e]) => (onScreen.current = e.isIntersecting), {
            threshold: 0,
          })
        : null;
    io?.observe(track);

    const onResize = () => {
      w = setWidth();
      paint();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [count]);

  // ----- pointer drag (mouse only; touch keeps native momentum scrolling)
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse') return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, startX: e.clientX, startLeft: track.scrollLeft };
    setDragging(true);
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    track.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    trackRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const step = (dir: -1 | 1) => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    boost.current += dir * (first ? first.clientWidth + 24 : 320);
  };

  const items = Array.from({ length: SETS }, () => reviews).flat();

  return (
    // `isolate` gives this section its own stacking context, so the cards'
    // z-index is scoped here and cannot paint over the sticky header when
    // the section scrolls underneath it.
    <Section surface="mint" className="isolate overflow-hidden">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow ?? t.home.reviews.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            {title ?? (
              <>
                {t.home.reviews.titleBefore}{' '}
                <span className="text-accent">{t.home.reviews.accent}</span>
              </>
            )}
          </h2>
        </Reveal>
      </Container>

      <ul
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        aria-label={t.home.reviews.listLabel}
        className={cn(
          'no-scrollbar mt-4 flex items-start gap-6 overflow-x-auto overscroll-x-contain',
          'px-6',
          TRACK[variant],
          // Vertical panning stays native on touch; horizontal is ours.
          'touch-pan-y',
          dragging ? 'cursor-grabbing select-none' : 'cursor-grab',
        )}
      >
        {items.map((review, i) => (
          <li
            key={`${review.id}-${i}`}
            aria-hidden={i >= count}
            className="w-[var(--rc)] shrink-0 will-change-transform"
          >
            {variant === 'ficha' ? (
              <FichaCard
                review={review}
                phaseLabel={t.home.phaseLabel[review.phase]}
                starsOf={t.home.reviews.starsOf}
              />
            ) : (
              <ReviewCard
                review={review}
                phaseLabel={t.home.phaseLabel[review.phase]}
                starsOf={t.home.reviews.starsOf}
                shape={SHAPES[i % SHAPES.length]}
              />
            )}
          </li>
        ))}
      </ul>

      <Container>
        <div className="flex items-center justify-center gap-4">
          <NavButton label={t.home.reviews.previous} onClick={() => step(-1)}>
            <ChevronLeft strokeWidth={2.2} className="h-6 w-6" />
          </NavButton>
          <NavButton label={t.home.reviews.next} onClick={() => step(1)}>
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

function Stars({ rating, starsOf }: { rating: number; starsOf: string }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} ${starsOf}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          strokeWidth={2}
          className={cn(
            'h-4.5 w-4.5',
            i < rating ? 'fill-ovulation text-ovulation-ink' : 'text-hairline-strong',
          )}
        />
      ))}
    </div>
  );
}

/**
 * The Sobre card. Where the landing card is a dome with the portrait
 * lifted out of it, this one is a plain rectangle read top to bottom:
 * the quote leads, the person signs it at the base. The phase lives in
 * the coloured edge and a dot beside the location rather than a chip, so
 * the two designs never look like the same card resized.
 */
function FichaCard({
  review,
  phaseLabel,
  starsOf,
}: {
  review: Review;
  phaseLabel: string;
  starsOf: string;
}) {
  const phase = PHASE[review.phase];

  return (
    <figure
      className={cn(
        // Fixed height for the same reason as the arch card: the marquee
        // scales each card, and uneven heights break the row's rhythm.
        'relative flex h-[23rem] flex-col overflow-hidden text-left sm:h-[22rem]',
        'rounded-[2rem] border border-hairline bg-white px-7 pt-7 pb-6 shadow-md',
      )}
    >
      <span aria-hidden className={cn('absolute inset-x-0 top-0 h-1.5', phase.halo)} />

      <div className="flex items-start justify-between gap-4">
        <Quote
          strokeWidth={2}
          className="h-6 w-6 shrink-0 text-accent-display"
          aria-hidden
        />
        <Stars rating={review.rating} starsOf={starsOf} />
      </div>

      <blockquote className="mt-5 line-clamp-5 text-small leading-relaxed text-ink">
        “{review.quote}”
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-4 border-t border-hairline pt-5">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-surface-sunken">
          {review.avatar ? (
            <Image
              src={review.avatar}
              alt=""
              width={512}
              height={512}
              draggable={false}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center font-display text-h4 text-muted">
              {review.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <p className="line-clamp-1 font-display text-body font-semibold text-ink">
            {review.name}
          </p>
          <p className="mt-1 flex items-center gap-2 text-caption text-muted">
            <span
              aria-hidden
              className={cn('h-2 w-2 shrink-0 rounded-full', phase.halo)}
            />
            <span className="line-clamp-1">
              {review.location} · {phaseLabel}
            </span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

function ReviewCard({
  review,
  phaseLabel,
  starsOf,
  shape,
}: {
  review: Review;
  phaseLabel: string;
  starsOf: string;
  shape: string;
}) {
  const phase = PHASE[review.phase];

  return (
    <figure
      className={cn(
        // Fixed height: cards must not resize with content, or the row
        // scales unevenly and the internal bands stop lining up.
        'relative flex h-[35rem] flex-col items-center sm:h-[34rem]',
        'border border-white bg-white px-7 pt-24 pb-9 text-center shadow-lg',
        shape,
      )}
    >
      <div className="absolute -top-15 left-1/2 -translate-x-1/2">
        <div className={cn('rounded-full p-1.5 shadow-lg', phase.halo)}>
          <div className="h-28 w-28 overflow-hidden rounded-full bg-surface-sunken ring-4 ring-white">
            {review.avatar ? (
              <Image
                src={review.avatar}
                alt=""
                width={400}
                height={400}
                draggable={false}
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

      <Quote
        strokeWidth={2}
        className="h-7 w-7 shrink-0 text-accent-display"
        aria-hidden
      />

      {/* Fixed band, vertically centred. Every element below therefore
          starts at the same offset on every card, whatever the quote's
          length. line-clamp is a backstop — the copy is length-matched. */}
      <div className="mt-4 flex h-40 shrink-0 items-center sm:h-36">
        <blockquote className="line-clamp-6 text-small leading-relaxed text-ink">
          “{review.quote}”
        </blockquote>
      </div>

      {/* Pinned to the base so name, phase and stars align across the row */}
      <figcaption className="mt-auto flex shrink-0 flex-col items-center">
        <p className="line-clamp-1 font-display text-h4 font-semibold text-ink">
          {review.name}
        </p>
        <p className="mt-0.5 line-clamp-1 text-caption text-muted">
          {review.location}
        </p>

        <span
          className={cn(
            'mt-4 inline-flex rounded-full px-3.5 py-1.5 font-sans text-caption font-bold whitespace-nowrap',
            phase.chip,
          )}
        >
          {phaseLabel}
        </span>

        <div className="mt-5">
          <Stars rating={review.rating} starsOf={starsOf} />
        </div>
      </figcaption>
    </figure>
  );
}
