'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Download, Search } from 'lucide-react';
import { STORE } from '@nutricycle/shared';
import { Container } from './container';
import { LocaleSwitch } from '@/components/ui/locale-switch';
import { cn } from '@/lib/cn';

/**
 * Symmetric around the centred logo:
 *
 *   [ ◍ ◍ ]  Método  Tu ciclo  Recetas  ◯  Funciones  Membresía  [⌕] [ Descargar ]
 *
 * A control bookends each side, and all three share one height (h-14) so
 * neither end outweighs the other.
 *
 * Symmetry is structural, not hand-tuned. The `1fr auto 1fr` columns are
 * equal by construction, and each side is `justify-between` with exactly two
 * children — pill and nav on the left, nav and controls on the right. The nav
 * blocks therefore land on the inner column edges, so the gap from the logo to
 * the first link is the grid gap on both sides, at every viewport.
 *
 * Anchoring content to the *outer* edges instead (justify-start / justify-end)
 * is what made this look wrong before: the left block is ~40px narrower than
 * the right, so all of the slack pooled beside the logo on one side — measured
 * 100px to the left of the logo against 38px to its right.
 *
 * ⚠️ Breakpoint note: the full bar now needs ~1080px of content width, so it
 * resolves at `xl` (1280) rather than `lg` (1024). Two extra controls do not
 * fit beside the nav at 1024 without shrinking the type below its token size.
 * 1024–1279 gets the compact bar and the sheet, which carry the same controls.
 */
const LEFT = [
  { label: 'Método', href: '/como-funciona' },
  { label: 'Tu ciclo', href: '/ciclo' },
  { label: 'Recetas', href: '/recetas' },
];

const RIGHT = [
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
        'sticky top-0 z-50 border border-transparent transition-colors duration-500',
        scrolled ? 'glass-strong shadow-md' : 'bg-transparent',
      )}
    >
      <Container>
        {/* Height is constant. Only the surface changes on scroll — a
            resizing header made the page shift under the reader. */}
        <div className="grid h-32 grid-cols-[1fr_auto_1fr] items-center gap-10">
          {/* ---------- Left: language + primary links ---------- */}
          <div className="hidden items-center justify-between gap-8 xl:flex">
            <LocaleSwitch />

            <nav aria-label="Principal izquierda">
              <ul className="flex items-center gap-7 2xl:gap-9">
                {LEFT.map((item) => (
                  <NavLink
                    key={item.href}
                    {...item}
                    active={pathname === item.href}
                  />
                ))}
              </ul>
            </nav>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="justify-self-start rounded-full p-2.5 text-ink transition-colors hover:bg-ink/5 xl:hidden"
          >
            <Menu strokeWidth={2} className="h-8 w-8" />
          </button>

          {/* ---------- Centre: logo ---------- */}
          <Link
            href="/"
            aria-label="Nutricycle — inicio"
            className="group justify-self-center"
          >
            <Image
              src="/images/brand/logo-lockup-trimmed.png"
              alt="Nutricycle"
              width={202}
              height={179}
              priority
              className="h-16 w-auto transition-transform duration-500 group-hover:scale-105 xl:h-20"
            />
          </Link>

          {/* ---------- Right: links + search + CTA ---------- */}
          <div className="hidden items-center justify-between gap-8 xl:flex">
            <nav aria-label="Principal derecha">
              <ul className="flex items-center gap-7 2xl:gap-9">
                {RIGHT.map((item) => (
                  <NavLink
                    key={item.href}
                    {...item}
                    active={pathname === item.href}
                  />
                ))}
              </ul>
            </nav>

            {/* Grouped so `justify-between` sees exactly two children here as
                it does on the left. Ungrouped, the search and the CTA would be
                spread apart and the nav would drift off the column edge. */}
            <div className="flex items-center gap-7 2xl:gap-9">
              <Link
                href="/buscar"
                aria-label="Buscar en el sitio"
                className={cn(
                  'grid h-14 w-14 shrink-0 place-items-center rounded-full',
                  'border border-hairline-strong bg-white/70 text-ink shadow-sm backdrop-blur-md',
                  'transition-all duration-300 hover:-translate-y-0.5 hover:border-hairline-strong hover:bg-white hover:shadow-md',
                )}
              >
                <Search strokeWidth={2.1} className="h-5.5 w-5.5" />
              </Link>

              <a
                href={`${STORE.smart}?src=header`}
                className={cn(
                  'inline-flex h-14 shrink-0 items-center gap-2.5 rounded-full bg-action px-6',
                  'font-sans text-nav font-semibold text-white shadow-md',
                  'transition-all duration-300 hover:-translate-y-0.5 hover:bg-action-hover hover:shadow-lg',
                )}
              >
                <Download strokeWidth={2.2} className="h-5.5 w-5.5" />
                Descargar
              </a>
            </div>
          </div>

          <a
            href={`${STORE.smart}?src=header-mobile`}
            aria-label="Descargar la app"
            className="justify-self-end rounded-full bg-action p-3.5 text-white shadow-md xl:hidden"
          >
            <Download strokeWidth={2.2} className="h-6 w-6" />
          </a>
        </div>
      </Container>

      {/* ---------- Mobile / tablet sheet ---------- */}
      <div
        className={cn(
          'fixed inset-0 z-50 transition-all duration-400 xl:hidden',
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
              src="/images/brand/logo-lockup-trimmed.png"
              alt="Nutricycle"
              width={202}
              height={179}
              className="h-16 w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="rounded-full p-2.5 text-ink transition-colors hover:bg-ink/5"
            >
              <X strokeWidth={2} className="h-8 w-8" />
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

          {/* The two controls the compact bar has no room for. */}
          <div className="mt-7 flex items-center gap-3">
            {/* Intrinsic width, not flex-1. Stretching it made sense when the
                segments held ES · EN text; two 44px circles in a full-width
                pill just read as an empty bar. Buscar takes the slack. */}
            <LocaleSwitch />

            <Link
              href="/buscar"
              className={cn(
                'inline-flex h-14 flex-1 items-center justify-center gap-2.5 rounded-full',
                'border border-hairline-strong bg-white/70 font-sans text-nav font-medium text-ink shadow-sm',
                'transition-colors hover:bg-white',
              )}
            >
              <Search strokeWidth={2.1} className="h-5.5 w-5.5" />
              Buscar
            </Link>
          </div>

          <a
            href={`${STORE.smart}?src=nav-mobile`}
            className="mt-3 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-action px-6 font-sans text-nav font-semibold text-white shadow-md"
          >
            <Download strokeWidth={2.2} className="h-6 w-6" />
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
          'relative font-sans text-nav font-medium whitespace-nowrap transition-colors duration-300',
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
