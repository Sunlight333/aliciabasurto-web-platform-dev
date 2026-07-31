import { cn } from '@/lib/cn';

/** 12px, 0.2em tracking, uppercase. Wide letterspacing is the
 *  luxury-editorial signal (design-direction.md §3.3). */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-sans text-eyebrow font-medium tracking-[0.2em] uppercase text-muted',
        className,
      )}
    >
      {children}
    </p>
  );
}
