'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Star } from 'lucide-react';
import { STORE } from '@nutricycle/shared';

const DISMISSED_KEY = 'nc.appbar.dismissed';

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
      setShown(y > window.innerHeight * 0.8 && y <= last);
      last = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 transition-transform duration-400 lg:hidden"
      style={{
        transform: shown ? 'translateY(0)' : 'translateY(150%)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Sized to survive a 390px viewport: at the previous scale the name
          truncated to "Nutri…" and the rating wrapped onto two lines. */}
      <div className="glass-strong m-3 flex items-center gap-3 rounded-[1.5rem] p-3 shadow-xl">
        <Image
          src="/images/brand/app-icon-1024.png"
          alt=""
          width={1024}
          height={1024}
          className="h-12 w-12 shrink-0 rounded-xl shadow-sm"
        />

        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate font-display text-small font-semibold text-ink">
            Nutricycle
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-caption whitespace-nowrap text-muted">
            <Star strokeWidth={2.4} className="h-3.5 w-3.5 shrink-0 text-ovulation-ink" />
            {STORE.rating} · {STORE.price}
          </p>
        </div>

        <a
          href={`${STORE.smart}?src=sticky`}
          className="shrink-0 rounded-full bg-action px-5 py-2.5 font-sans text-caption font-bold text-white shadow-md transition-colors hover:bg-action-hover"
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
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <X strokeWidth={2.2} className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
