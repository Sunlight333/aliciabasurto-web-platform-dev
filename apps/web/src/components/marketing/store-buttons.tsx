import { STORE } from '@nutricycle/shared';
import { AppleIcon, GooglePlayIcon } from '@/components/icons/store-icons';
import { getDictionary, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/cn';

export function StoreButtons({
  className,
  source,
  locale,
  size = 'md',
}: {
  className?: string;
  source: string;
  locale: Locale;
  size?: 'md' | 'lg';
}) {
  const t = getDictionary(locale);
  const base = cn(
    'group inline-flex items-center gap-3.5 rounded-2xl border transition-all duration-300',
    'shadow-md hover:-translate-y-1 hover:shadow-xl active:translate-y-0',
    size === 'lg' ? 'px-7 py-4' : 'px-6 py-3.5',
  );

  return (
    <div className={cn('flex flex-col gap-3.5 sm:flex-row', className)}>
      <a
        href={`${STORE.iosPath}?src=${encodeURIComponent(source)}`}
        className={cn(base, 'border-ink/10 bg-ink text-white hover:bg-ink/90')}
      >
        <AppleIcon className={size === 'lg' ? 'h-8 w-7' : 'h-7 w-6'} />
        <span className="text-left leading-tight">
          <span className="block text-[0.7rem] font-medium tracking-[0.12em] text-white/70 uppercase">
            {t.store.appStoreTop}
          </span>
          <span className="block font-sans text-h4 font-semibold">{t.store.appStore}</span>
        </span>
      </a>

      <a
        href={`${STORE.androidPath}?src=${encodeURIComponent(source)}`}
        className={cn(
          base,
          'border-hairline-strong bg-white text-ink hover:border-ink/20',
        )}
      >
        <GooglePlayIcon className={size === 'lg' ? 'h-7 w-7' : 'h-6 w-6'} />
        <span className="text-left leading-tight">
          <span className="block text-[0.7rem] font-medium tracking-[0.12em] text-muted uppercase">
            {t.store.googlePlayTop}
          </span>
          <span className="block font-sans text-h4 font-semibold">{t.store.googlePlay}</span>
        </span>
      </a>
    </div>
  );
}
