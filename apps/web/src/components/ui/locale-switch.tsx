'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Spanish at the root, English under /en — doc/00-overview/revised-direction.md §3.
 *
 * ⚠️ The English locale is Phase 6 work and no /en route exists yet. While this
 * is false the control renders as an indicator rather than linking to a 404.
 * Flip it when the locale ships; nothing else in this file changes.
 */
const EN_ENABLED = false;

type Locale = 'es' | 'en';

const LOCALES: Record<Locale, { code: string; name: string }> = {
  es: { code: 'ES', name: 'Español' },
  en: { code: 'EN', name: 'English' },
};

/**
 * ⚠️ Prefix swap only. §3 also specifies *localised slugs* — /recetas pairs
 * with /en/recipes, not /en/recetas. This rule is correct for `/` and for any
 * route whose slug is identical in both languages; everything else needs a
 * slug map once the English locale is built.
 */
export function localePath(pathname: string, to: Locale): string {
  const base = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (to === 'es') return base;
  return base === '/' ? '/en' : `/en${base}`;
}

/**
 * Language control — the left bookend of the header.
 *
 * One solid pill in the CTA's own green, not a segmented ES · EN strip. The
 * bar has exactly two controls that should read as "ends", and giving them the
 * same fill, height and shadow is what makes the header look deliberately
 * balanced rather than merely centred.
 *
 * The glyph carries the *meaning* (this switches language) and the code
 * carries the *state* (you are reading Spanish). An icon alone was tempting
 * and half the width, but nothing on the page would then say which language
 * you are in — the one thing a language control exists to answer.
 */
export function LocaleSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const current: Locale =
    pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
  const other: Locale = current === 'es' ? 'en' : 'es';

  const shell = cn(
    'inline-flex h-14 shrink-0 items-center gap-2.5 rounded-full bg-action px-6',
    'font-sans text-nav font-semibold text-white shadow-md',
    className,
  );

  const content = (
    <>
      <Languages strokeWidth={2.2} aria-hidden="true" className="h-5.5 w-5.5" />
      {LOCALES[current].name}
    </>
  );

  // No /en yet: an indicator, not a control. It keeps the visual weight the
  // header's symmetry depends on without offering a link that would 404.
  if (!EN_ENABLED) {
    return (
      <span
        aria-label={`Idioma: ${LOCALES[current].name}`}
        title="Versión en inglés próximamente"
        className={cn(shell, 'cursor-default')}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={localePath(pathname, other)}
      hrefLang={other}
      lang={other}
      aria-label={`Cambiar a ${LOCALES[other].name}`}
      className={cn(
        shell,
        'transition-all duration-300 hover:-translate-y-0.5 hover:bg-action-hover hover:shadow-lg',
      )}
    >
      {content}
    </Link>
  );
}
