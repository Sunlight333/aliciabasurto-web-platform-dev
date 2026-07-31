import { cn } from '@/lib/cn';

type Surface = 'none' | 'base' | 'raised' | 'sunken' | 'lilac' | 'inverse';

const SURFACES: Record<Surface, string> = {
  none: '',
  base: 'bg-surface-base',
  raised: 'bg-surface-raised',
  sunken: 'bg-surface-sunken',
  lilac: 'bg-surface-lilac',
  inverse: 'bg-surface-inverse text-white',
};

/**
 * Section rhythm from design-direction.md §4:
 * mobile 64 / tablet 96 / desktop 160 — `feature` goes to 200.
 * "Loose" is fewer things per screen, not more padding on each.
 */
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
        size === 'standard' && 'py-16 md:py-24 lg:py-40',
        size === 'feature' && 'py-20 md:py-30 lg:py-50',
        size === 'tight' && 'py-12 md:py-16 lg:py-24',
        className,
      )}
    >
      {children}
    </section>
  );
}
