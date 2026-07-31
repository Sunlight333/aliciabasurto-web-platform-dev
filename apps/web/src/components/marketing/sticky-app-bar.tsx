'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { STORE } from '@nutricycle/shared';

const DISMISSED_KEY = 'nc.appbar.dismissed';

/**
 * Mobile-only persistent install CTA.
 * Appears once the hero has scrolled out, hides on scroll-up, and is
 * dismissible (remembered). Respects the iOS home indicator inset.
 */
export function StickyAppBar() {
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(window.localStorage.getItem(DISMISSED_KEY) === '1');
  }, []);

  useEffect(() => {
    if (dismissed) return;
    let last = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const past = y > window.innerHeight * 0.8;
      setShown(past && y <= last);
      last = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out lg:hidden"
      style={{
        transform: shown ? 'translateY(0)' : 'translateY(120%)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="m-3 flex items-center gap-3 rounded-card bg-action p-3 shadow-lift">
        <Image
          src="/images/brand/app-icon-1024.png"
          alt=""
          width={1024}
          height={1024}
          className="h-11 w-11 rounded-xl"
        />

        <div className="min-w-0 flex-1 leading-tight text-white">
          <p className="truncate font-sans text-small font-medium">Nutricycle</p>
          <p className="truncate text-caption text-white/80">
            ★ {STORE.rating} · {STORE.price}
          </p>
        </div>

        <a
          href={`${STORE.smart}?src=sticky`}
          className="rounded-button bg-white px-5 py-2.5 font-sans text-small font-medium tracking-[0.08em] text-ink uppercase transition-colors duration-200 hover:bg-surface-raised"
        >
          Instalar
        </a>

        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem(DISMISSED_KEY, '1');
            setDismissed(true);
          }}
          aria-label="Cerrar"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
        >
          <span aria-hidden className="text-lg leading-none">
            ×
          </span>
        </button>
      </div>
    </div>
  );
}
