import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost' | 'outline' | 'inverse';

/**
 * Contrast improves on interaction — the live site did the reverse,
 * going 3.62:1 -> 2.27:1 on hover (site-audit.md §10.1).
 *
 * Always renders as <a>. The live site's store CTAs are <button> with no
 * href, which is why they are dead (cta-strategy.md).
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-action text-white hover:bg-action-hover active:bg-action-active shadow-soft',
  ghost:
    'text-ink hover:bg-ink/5 active:bg-ink/10 border border-transparent',
  outline:
    'border border-action text-action hover:bg-action hover:text-white active:bg-action-active active:border-action-active',
  inverse:
    'bg-white text-ink hover:bg-surface-raised active:bg-surface-sunken',
};

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  external,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'href' | 'className'>) {
  const classes = cn(
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-button px-7 py-3.5',
    'font-sans text-small font-medium tracking-[0.1em] uppercase',
    'transition-colors duration-200 ease-out',
    VARIANTS[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes} rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
