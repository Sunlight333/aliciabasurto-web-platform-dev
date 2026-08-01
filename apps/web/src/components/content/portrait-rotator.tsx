'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export interface Portrait {
  src: string;
  /** Per-asset alt text, defined once in doc/04-content/image-assets.md §3 */
  alt: string;
}

/**
 * Portrait rotator with a flash-free dissolve.
 *
 * A naive cross-fade animates both frames at once, so mid-transition both
 * sit near 50% opacity and the light surface behind them shows through —
 * the composite brightens and reads as a flash. Here the outgoing frame
 * stays fully opaque underneath while the incoming one fades in above it,
 * so the stack is never less than fully covered and there is nothing to
 * flash through.
 *
 * Timing is deliberately unhurried: a long dissolve on a short hold, so
 * the change registers as movement rather than a cut. Both are props.
 *
 * Pauses on hover, on focus, and while off-screen.
 * prefers-reduced-motion swaps instantly and stops auto-advancing.
 */
export function PortraitRotator({
  images,
  /** Time a frame is held before the next dissolve begins */
  hold = 3600,
  /** Length of the dissolve itself */
  fade = 1800,
  className,
}: {
  images: readonly Portrait[];
  hold?: number;
  fade?: number;
  className?: string;
}) {
  // `base` is the frame currently covering the stack; `top` is the one
  // dissolving in above it. Once the dissolve ends, top becomes base.
  const [base, setBase] = useState(0);
  const [top, setTop] = useState<number | null>(null);

  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const onScreen = useRef(true);
  const settle = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const node = hostRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => (onScreen.current = e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (next === base && top === null) return;
      window.clearTimeout(settle.current);

      if (reduced) {
        setTop(null);
        setBase(next);
        return;
      }

      setTop(next);
      // Promote to base only after the dissolve has fully covered, so the
      // outgoing frame is never removed while still visible.
      settle.current = window.setTimeout(() => {
        setBase(next);
        setTop(null);
      }, fade + 40);
    },
    [base, top, reduced, fade],
  );

  useEffect(() => {
    if (images.length < 2 || paused || reduced) return;
    const id = window.setInterval(() => {
      if (onScreen.current) goTo((base + 1) % images.length);
    }, hold + fade);
    return () => window.clearInterval(id);
  }, [images.length, paused, reduced, base, hold, fade, goTo]);

  useEffect(() => () => window.clearTimeout(settle.current), []);

  const current = top ?? base;

  return (
    <div
      ref={hostRef}
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {images.map((img, i) => {
        const isBase = i === base;
        const isTop = i === top;
        // Covered frames stay at full opacity beneath the stack; only the
        // incoming frame animates, and only upward.
        const opacity = isTop ? 1 : isBase ? 1 : 0;
        return (
          <Image
            key={img.src}
            src={img.src}
            alt={i === current ? img.alt : ''}
            aria-hidden={i !== current}
            fill
            sizes="(min-width: 1024px) 440px, 90vw"
            priority={i === 0}
            draggable={false}
            style={{
              opacity,
              zIndex: isTop ? 2 : isBase ? 1 : 0,
              transform: reduced ? undefined : `scale(${isTop || isBase ? 1 : 1.03})`,
              transitionProperty: reduced ? 'none' : 'opacity, transform',
              transitionDuration: `${fade}ms`,
              // Sine ease-in-out: no sharp onset, no abrupt finish
              transitionTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
            }}
            className="object-cover"
          />
        );
      })}

      {images.length > 1 && (
        <div className="absolute right-4 bottom-4 z-10 flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver foto ${i + 1} de ${images.length}`}
              aria-current={i === current}
              className={cn(
                'h-2.5 rounded-full ring-1 ring-ink/10 backdrop-blur-sm',
                'transition-all duration-500 ease-out',
                i === current ? 'w-7 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/85',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
