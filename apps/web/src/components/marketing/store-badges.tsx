import { STORE } from '@nutricycle/shared';
import { cn } from '@/lib/cn';

/**
 * ⚠️ PLACEHOLDER ARTWORK.
 *
 * Apple and Google both require their *official* badge artwork, in the
 * correct localisation, at their stated minimum size and clear space.
 * Redrawing or approximating those badges violates both programs' terms,
 * so nothing here imitates them — these are plain labelled links.
 *
 * Drop the official ES assets into /public/badges/ and swap the inner
 * markup for <Image>. Everything else (hrefs, tracking, a11y) stays.
 *
 * Tracked as gap #5 in doc/04-content/image-assets.md §5.
 */
export function StoreBadges({
  className,
  tone = 'light',
  source,
}: {
  className?: string;
  tone?: 'light' | 'dark';
  source: string;
}) {
  const base =
    'inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-button px-6 py-3 transition-colors duration-200 ease-out sm:flex-initial';

  const tones = {
    light: 'bg-ink text-white hover:bg-ink/85 active:bg-ink/95',
    dark: 'bg-white text-ink hover:bg-surface-raised active:bg-surface-sunken',
  };

  return (
    <div className={cn('flex w-full flex-col gap-3 sm:flex-row', className)}>
      <a
        href={`${STORE.iosPath}?src=${encodeURIComponent(source)}`}
        className={cn(base, tones[tone])}
      >
        <span className="text-left leading-tight">
          <span className="block text-[0.625rem] tracking-[0.14em] uppercase opacity-75">
            Descárgalo en el
          </span>
          <span className="block font-sans text-h4 font-medium">App Store</span>
        </span>
      </a>

      <a
        href={`${STORE.androidPath}?src=${encodeURIComponent(source)}`}
        className={cn(base, tones[tone])}
      >
        <span className="text-left leading-tight">
          <span className="block text-[0.625rem] tracking-[0.14em] uppercase opacity-75">
            Disponible en
          </span>
          <span className="block font-sans text-h4 font-medium">Google Play</span>
        </span>
      </a>
    </div>
  );
}
