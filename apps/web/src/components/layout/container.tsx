import { cn } from '@/lib/cn';

export function Container({
  children,
  className,
  size = 'content',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'content' | 'prose';
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 sm:px-8 lg:px-10',
        size === 'content' ? 'max-w-[78rem]' : 'max-w-[62ch]',
        className,
      )}
    >
      {children}
    </div>
  );
}
