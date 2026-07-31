'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Download } from 'lucide-react';
import { STORE } from '@nutricycle/shared';
import { Container } from './container';
import { cn } from '@/lib/cn';

/** Split around the centred logo — 2 left, 3 right. */
const LEFT = [
  { label: 'Método', href: '/como-funciona' },
  { label: 'Tu ciclo', href: '/ciclo' },
];

const RIGHT = [
  { label: 'Recetas', href: '/recetas' },
  { label: 'Funciones', href: '/funcionalidades' },
  { label: 'Membresía', href: '/membresia' },
];

const ALL = [...LEFT, ...RIGHT];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass shadow-sm'
          : 'bg-gradient-to-b from-surface-raised/90 to-transparent',
      )}
    >
      <Container>
        <div
          className={cn(
            'grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500',
            scrolled ? 'py-3' : 'py-5',
          )}
        >
          {/* Left nav */}
          <nav aria-label="Principal izquierda" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {LEFT.map((item) => (
                <NavLink key={item.href} {...item} active={pathname === item.href} />
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="justify-self-start rounded-full p-2.5 text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            <Menu strokeWidth={1.75} className="h-7 w-7" />
          </button>

          {/* Centred logo — large */}
          <Link
            href="/"
            aria-label="Nutricycle — inicio"
            className="group justify-self-center"
          >
            <Image
              src="/images/brand/logo-lockup.png"
              alt="Nutricycle"
              width={500}
              height={500}
              priority
              /* The lockup is a square: rings stacked above the wordmark.
                 It has to be this large for the wordmark to read at all. */
              className={cn(
                'w-auto drop-shadow-sm transition-all duration-500 group-hover:scale-105',
                scrolled ? 'h-24' : 'h-32 lg:h-44',
              )}
            />
          </Link>

          {/* Right nav + CTA */}
          <div className="hidden items-center justify-end gap-9 lg:flex">
            <nav aria-label="Principal derecha">
              <ul className="flex items-center gap-9">
                {RIGHT.map((item) => (
                  <NavLink key={item.href} {...item} active={pathname === item.href} />
                ))}
              </ul>
            </nav>

            <a
              href={`${STORE.smart}?src=header`}
              className="inline-flex items-center gap-2.5 rounded-full bg-action px-6 py-3 font-sans text-nav font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-action-hover hover:shadow-lg"
            >
              <Download strokeWidth={2.2} className="h-5 w-5" />
              Descargar
            </a>
          </div>

          <a
            href={`${STORE.smart}?src=header-mobile`}
            aria-label="Descargar la app"
            className="justify-self-end rounded-full bg-action p-3 text-white shadow-md lg:hidden"
          >
            <Download strokeWidth={2.2} className="h-5 w-5" />
          </a>
        </div>
      </Container>

      {/* Mobile sheet */}
      <div
        className={cn(
          'fixed inset-0 z-50 transition-all duration-400 lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-ink/20 backdrop-blur-sm"
        />

        <div
          className={cn(
            'glass-strong absolute inset-x-0 top-0 rounded-b-[2rem] px-7 pt-7 pb-10 shadow-xl transition-transform duration-400',
            open ? 'translate-y-0' : '-translate-y-full',
          )}
        >
          <div className="flex items-center justify-between">
            <Image
              src="/images/brand/logo-lockup.png"
              alt="Nutricycle"
              width={500}
              height={500}
              className="h-16 w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="rounded-full p-2.5 text-ink transition-colors hover:bg-ink/5"
            >
              <X strokeWidth={1.75} className="h-7 w-7" />
            </button>
          </div>

          <nav aria-label="Principal móvil" className="mt-8">
            <ul className="flex flex-col">
              {ALL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block border-b border-hairline py-4 font-display text-h3 text-ink transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={`${STORE.smart}?src=nav-mobile`}
            className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-action px-6 py-4 font-sans text-nav font-semibold text-white shadow-md"
          >
            <Download strokeWidth={2.2} className="h-5 w-5" />
            Descargar gratis
          </a>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'relative font-sans text-nav font-medium transition-colors duration-300',
          'after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full',
          'after:bg-accent after:transition-all after:duration-300 hover:after:w-full',
          active ? 'text-ink after:w-full' : 'text-muted hover:text-ink',
        )}
      >
        {label}
      </Link>
    </li>
  );
}
