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
      <div className="glass-strong m-3.5 flex items-center gap-3.5 rounded-[1.5rem] p-3.5 shadow-xl">
        <Image
          src="/images/brand/app-icon-1024.png"
          alt=""
          width={1024}
          height={1024}
          className="h-13 w-13 rounded-2xl shadow-sm"
        />

        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate font-display text-h4 font-semibold text-ink">
            Nutricycle
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-caption text-muted">
            <Star strokeWidth={2.4} className="h-3.5 w-3.5 text-ovulation-ink" />
            {STORE.rating} · {STORE.price}
          </p>
        </div>

        <a
          href={`${STORE.smart}?src=sticky`}
          className="rounded-full bg-action px-6 py-3 font-sans text-caption font-bold tracking-wide text-white uppercase shadow-md transition-colors hover:bg-action-hover"
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
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <X strokeWidth={2.2} className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
