'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Container } from './container';
import { LocaleSwitch } from '@/components/ui/locale-switch';
import { getDictionary, localizePath, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/cn';

/**
 * Symmetric around the centred logo:
 *
 *   Método  Tu ciclo  Recetas  ◯  Funciones  Membresía  [ ◍ ◍ ]
 *
 * Symmetry is structural, not hand-tuned. The `1fr auto 1fr` columns are equal
 * by construction. The left nav is `justify-end` and the right column is
 * `justify-between`, so both nav blocks land on their inner column edge and
 * the gap from the logo to the first link is the grid gap on both sides, at
 * every viewport. Measured 40px / 40px at 1280, 1440 and 1920.
 *
 * Anchoring content to the *outer* edges instead is what made this look wrong
 * before: the two sides are not the same width, so all of the slack pooled
 * beside the logo on one side — 100px to its left against 38px to its right.
 *
 * ⚠️ The nav pair is balanced; the *ends* are not, and cannot be. With the
 * search and Descargar buttons removed there is one control left in the bar
 * and it sits on the right, so the far-left of the row is empty by
 * construction. Putting anything there purely for weight would be decoration.
 * If the ends need to match again, the fix is a second control, not a spacer.
 *
 * ⚠️ Breakpoint note: the full bar now needs ~1080px of content width, so it
 * resolves at `xl` (1280) rather than `lg` (1024). Two extra controls do not
 * fit beside the nav at 1024 without shrinking the type below its token size.
 * 1024–1279 gets the compact bar and the sheet, which carry the same controls.
 */
/**
 * Four links left, three right. The language pill is *not* one of the seven
 * and is not counted in this balance — it is a utility control parked at the
 * right edge, outside the nav.
 *
 * The split is by rendered width, not by counting labels. Three-and-three
 * alone did not balance anything: the six labels ran 58px to 95px, so the
 * obvious grouping (método/ciclo/recetas against funciones/membresía/sobre)
 * landed 255px against 336px and left the left side visibly light. The
 * six-link row settled at 287px against 305px, Δ18.
 *
 * ⚠️ `Cursos` (2026-08-05) makes seven, so an even split no longer exists.
 * Measured at 1440: 353px left against 289px right, Δ64. Every alternative
 * arrangement is worse — the labels are 58–97px wide and the total is 642px,
 * so moving any single link swings the balance by ~90px and overshoots. This
 * is the closest split available, not a compromise waiting to be improved.
 *
 * It still reads as two ideas rather than a shuffled list: learn and who
 * (método · tu ciclo · cursos · sobre alicia) on the left, use and buy
 * (recetas · funciones · membresía) on the right, with `Sobre Alicia` resting
 * beside the logo — the person next to the mark.
 *
 * ⚠️ Re-measure if a label changes. The balance is a property of the text,
 * so a longer word silently un-balances the row. An eighth link does not fit
 * at `xl`; the next one to be added forces a different bar, not another
 * re-split.
 */
/**
 * Hrefs are Spanish-canonical and translated at render time by
 * localizePath(), so a nav link never sends an English reader back to the
 * Spanish tree — the single most visible way a language switch breaks.
 */
const LEFT_HREFS = ['/como-funciona', '/ciclo', '/cursos', '/sobre'] as const;
const RIGHT_HREFS = ['/recetas', '/funcionalidades', '/membresia'] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = getDictionary(locale);

  const LABELS: Record<string, string> = {
    '/como-funciona': t.nav.method,
    '/ciclo': t.nav.cycle,
    '/cursos': t.nav.courses,
    '/sobre': t.nav.about,
    '/recetas': t.nav.recipes,
    '/funcionalidades': t.nav.features,
    '/membresia': t.nav.membership,
  };

  const item = (href: string) => ({
    label: LABELS[href],
    href: localizePath(href, locale),
  });

  const LEFT = LEFT_HREFS.map(item);
  const RIGHT = RIGHT_HREFS.map(item);
  const ALL = [...LEFT, ...RIGHT];

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
          {/* ---------- Left: primary links ---------- */}
          <div className="hidden items-center justify-end xl:flex">
            <nav aria-label={t.nav.primaryLeft}>
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
            aria-label={t.nav.openMenu}
            aria-expanded={open}
            className="justify-self-start rounded-full p-2.5 text-ink transition-colors hover:bg-ink/5 xl:hidden"
          >
            <Menu strokeWidth={2} className="h-8 w-8" />
          </button>

          {/* ---------- Centre: logo ---------- */}
          <Link
            href={localizePath("/", locale)}
            aria-label={t.nav.home}
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

          {/* ---------- Right: links + language ---------- */}
          <div className="hidden items-center justify-between gap-8 xl:flex">
            <nav aria-label={t.nav.primaryRight}>
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

            <LocaleSwitch />
          </div>

          {/* Balances the burger on the left so the logo stays centred on
              compact widths, where the grid's third column would otherwise
              collapse and drag the logo off centre. */}
          <div aria-hidden className="h-13 w-13 justify-self-end xl:hidden" />
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
          aria-label={t.nav.closeMenu}
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
              aria-label={t.nav.closeMenu}
              className="rounded-full p-2.5 text-ink transition-colors hover:bg-ink/5"
            >
              <X strokeWidth={2} className="h-8 w-8" />
            </button>
          </div>

          <nav aria-label={t.nav.primaryMobile} className="mt-8">
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

          {/* The language control is the only thing the compact bar has no
              room for. Search and the download CTA were removed from the
              header at every width — the store buttons live in the closing
              CTA band and on /descargar, which is where the decision is
              actually made. */}
          <div className="mt-7 flex items-center">
            <LocaleSwitch />
          </div>
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
