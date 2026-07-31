import { cn } from '@/lib/cn';

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
        'font-sans text-eyebrow font-bold tracking-[0.16em] uppercase text-accent-display',
        className,
      )}
    >
      {children}
    </p>
  );
}
