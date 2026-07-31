import { cn } from '@/lib/cn';

/** All surfaces are light — no dark backgrounds anywhere on the site. */
type Surface = 'none' | 'base' | 'raised' | 'sunken' | 'lilac' | 'blush' | 'mint';

const SURFACES: Record<Surface, string> = {
  none: '',
  base: 'bg-surface-base',
  raised: 'bg-surface-raised',
  sunken: 'bg-surface-sunken',
  lilac: 'bg-surface-lilac',
  blush: 'bg-surface-blush',
  mint: 'bg-surface-mint',
};

export function Section({
  children,
  className,
  surface = 'none',
  size = 'standard',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  surface?: Surface;
  size?: 'standard' | 'feature' | 'tight';
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        SURFACES[surface],
        size === 'standard' && 'py-20 md:py-24 lg:py-32',
        size === 'feature' && 'py-24 md:py-32 lg:py-40',
        size === 'tight' && 'py-14 md:py-18 lg:py-24',
        className,
      )}
    >
      {children}
    </section>
  );
}
