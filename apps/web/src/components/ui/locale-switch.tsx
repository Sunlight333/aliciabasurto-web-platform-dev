'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

/**
 * Spanish at the root, English under /en — doc/00-overview/revised-direction.md §3.
 *
 * Both locales now exist: every page is generated twice from `app/[locale]`,
 * and Spanish keeps its bare URLs through a rewrite in next.config.mjs.
 */
import type { Locale } from '@/lib/i18n';
import { localizePath } from '@/lib/i18n';

/**
 * The flag is the *market*, not the language's country of origin — the same
 * choice the reference control makes by pairing PT with Brazil rather than
 * Portugal. `es` matches the `es_ES` OG locale declared in layout.tsx; if the
 * audience is confirmed as Latin American, swap the file here and nothing else
 * in the component changes.
 *
 * Icons: HatScripts/circle-flags, MIT — see image-assets.md §3c.
 */
const LOCALES: readonly { code: Locale; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '/images/flags/es.svg' },
  { code: 'en', name: 'English', flag: '/images/flags/us.svg' },
] as const;

/**
 * Path translation lives in lib/i18n/routes.ts, which is covered by
 * `npm run test:i18n-routes` — 55 cases over both directions, every route,
 * phase segments, idempotence and full round trips. The hand-rolled prefix
 * swap that used to live here had no test and no slug awareness.
 */
export { localizePath as localePath };

/**
 * Segmented language control — two circular flags, no text.
 *
 * The flags carry the whole message, so every segment needs an `aria-label`:
 * with the codes gone there is no accessible name left in the markup, and a
 * screen reader would otherwise announce two unlabelled links.
 *
 * The SVGs are masked to a circle at the source, so no `rounded-full` clip is
 * needed on the image itself — the shape is the asset. They are served as
 * plain `<img>` rather than `next/image`: at 28px a static, already-optimal
 * 700-byte SVG has nothing to gain from the optimiser, and routing SVG through
 * it would mean enabling `dangerouslyAllowSVG` for the whole site.
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
        'inline-flex h-14 shrink-0 items-center gap-1 rounded-full border border-hairline-strong',
        'bg-white/70 px-1.5 shadow-sm backdrop-blur-md',
        className,
      )}
    >
      {LOCALES.map(({ code, name, flag }) => {
        const active = code === current;

        const segment = cn(
          'grid h-11 w-11 shrink-0 place-items-center rounded-full',
          'transition-all duration-300',
          active && 'bg-action shadow-sm',
          !active && 'hover:bg-ink/5',
        );

        // 24px inside a 44px segment. At 28px the flag filled the segment and
        // the green ring behind the active one vanished at header scale —
        // there was no visible selected state left. The ring is the indicator,
        // so it needs room to be seen.
        const icon = (
          // eslint-disable-next-line @next/next/no-img-element -- see doc comment
          <img
            src={flag}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        );

        return (
          <Link
            key={code}
            href={localizePath(pathname, code)}
            hrefLang={code}
            lang={code}
            aria-label={name}
            aria-current={active ? 'true' : undefined}
            className={segment}
          >
            {icon}
          </Link>
        );
      })}
    </div>
  );
}
