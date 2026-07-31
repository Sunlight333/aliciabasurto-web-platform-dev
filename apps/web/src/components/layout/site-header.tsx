'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, STORE } from '@nutricycle/shared';
import { Container } from './container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline/60 bg-surface-raised/72 backdrop-blur-xl">
      <Container>
        <div className="flex h-18 items-center justify-between gap-6 py-3">
          <Link href="/" className="shrink-0" aria-label="Nutricycle — inicio">
            <Image
              src="/images/brand/logo-lockup.png"
              alt="Nutricycle"
              width={500}
              height={500}
              priority
              className="h-11 w-auto"
            />
          </Link>

          {/* Desktop nav — 15px, down from the live site's 26px.
              Chrome recedes so content leads (design-direction.md §3.3). */}
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'font-sans text-small transition-colors duration-200 ease-out',
                        active ? 'text-ink' : 'text-muted hover:text-ink',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href={`${STORE.smart}?src=header`}
              className="hidden px-5 sm:inline-flex"
            >
              Descargar
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="grid h-11 w-11 place-items-center rounded-button text-ink transition-colors duration-200 hover:bg-ink/5 lg:hidden"
            >
              <span aria-hidden className="relative block h-4 w-5">
                <span
                  className={cn(
                    'absolute left-0 h-px w-full bg-current transition-all duration-200',
                    open ? 'top-2 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute top-2 left-0 h-px w-full bg-current transition-opacity duration-200',
                    open && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 h-px w-full bg-current transition-all duration-200',
                    open ? 'top-2 -rotate-45' : 'top-4',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div id="menu-movil" className="border-t border-hairline/60 bg-surface-raised lg:hidden">
          <Container>
            <nav aria-label="Principal móvil" className="py-6">
              <ul className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-button px-3 py-3 font-display text-h3 text-ink transition-colors duration-200 hover:bg-ink/5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button href={`${STORE.smart}?src=nav-mobile`} className="mt-4 w-full">
                Descargar gratis
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
