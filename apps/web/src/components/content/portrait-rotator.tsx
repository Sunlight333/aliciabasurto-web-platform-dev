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
 * Cross-fading portrait rotator.
 *
 * Flexible by construction: it takes any number of frames and the timing
 * is a prop, so adding a photo is one line in the caller. With a single
 * frame it degrades to a plain image — no controls, no timer.
 *
 * Behaviour:
 * - pauses while off-screen, so an unseen section is not burning timers
 * - pauses on hover and while focused, so it can't swap mid-read
 * - prefers-reduced-motion disables auto-rotation entirely and drops the
 *   cross-fade; the dots still work, so the other frames stay reachable
 */
export function PortraitRotator({
  images,
  interval = 5200,
  className,
}: {
  images: readonly Portrait[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

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
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (images.length < 2 || paused || reduced) return;
    const id = window.setInterval(() => {
      if (visible.current) setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [images.length, interval, paused, reduced]);

  const go = useCallback((i: number) => setIndex(i), []);

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
        const active = i === index;
        return (
          <Image
            key={img.src}
            src={img.src}
            alt={active ? img.alt : ''}
            aria-hidden={!active}
            fill
            sizes="(min-width: 1024px) 440px, 90vw"
            priority={i === 0}
            className={cn(
              'object-cover',
              !reduced &&
                'transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
              active ? 'opacity-100' : 'opacity-0',
              !reduced && (active ? 'scale-100' : 'scale-105'),
            )}
          />
        );
      })}

      {images.length > 1 && (
        <div className="absolute right-4 bottom-4 z-10 flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ver foto ${i + 1} de ${images.length}`}
              aria-current={i === index}
              className={cn(
                'h-2.5 rounded-full transition-all duration-500',
                'ring-1 ring-ink/10 backdrop-blur-sm',
                i === index ? 'w-7 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/85',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
