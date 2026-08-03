'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Spanish at the root, English under /en — doc/00-overview/revised-direction.md §3.
 *
 * ⚠️ The English locale is Phase 6 work and no /en route exists yet. While this
 * is false the EN segment renders inert instead of linking to a 404. Flip it
 * when the locale ships; nothing else in this file changes.
 */
const EN_ENABLED = false;

type Locale = 'es' | 'en';

const LOCALES: readonly { code: Locale; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
] as const;

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
 * Segmented ES · EN control. Height is locked to the Descargar CTA (h-14) so
 * the two ends of the header carry the same weight.
 */
export function LocaleSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const current: Locale =
    pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';

  return (
    <div
      role="group"
      aria-label="Idioma"
      className={cn(
        'inline-flex h-14 items-center gap-1 rounded-full border border-hairline-strong',
        'bg-white/70 px-1.5 shadow-sm backdrop-blur-md',
        className,
      )}
    >
      <Globe
        strokeWidth={2}
        aria-hidden="true"
        className="mr-0.5 ml-2.5 h-5 w-5 shrink-0 text-muted"
      />

      {LOCALES.map(({ code, label, name }) => {
        const active = code === current;
        const inert = code === 'en' && !EN_ENABLED;

        const segment = cn(
          'grid h-11 min-w-11 place-items-center rounded-full px-3.5',
          'font-sans text-caption font-semibold transition-colors duration-300',
          active && 'bg-action text-white shadow-sm',
          !active && !inert && 'text-muted hover:bg-ink/5 hover:text-ink',
          inert && 'cursor-not-allowed text-muted/45',
        );

        if (inert) {
          return (
            <span
              key={code}
              aria-disabled="true"
              title="Versión en inglés próximamente"
              className={segment}
            >
              {label}
            </span>
          );
        }

        return (
          <Link
            key={code}
            href={localePath(pathname, code)}
            hrefLang={code}
            lang={code}
            aria-label={name}
            aria-current={active ? 'true' : undefined}
            className={segment}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
