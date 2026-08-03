'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface QA {
  q: string;
  a: string;
}

/**
 * Accordion built on native <details>, so every answer is present in the
 * DOM and findable with the browser's own find-in-page — which matters
 * on a page whose whole job is answering a specific question. The plus
 * icon rotates via a data attribute rather than :open, so the animation
 * works while the element is being toggled.
 */
export function FaqAccordion({ items }: { items: readonly QA[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, i) => (
        <li key={item.q}>
          <details
            open={open === item.q}
            onToggle={(e) =>
              setOpen((e.currentTarget as HTMLDetailsElement).open ? item.q : null)
            }
            className="card overflow-hidden"
          >
            <summary
              className={cn(
                'flex cursor-pointer list-none items-start justify-between gap-5 p-7',
                'font-display text-h4 text-ink transition-colors hover:text-accent',
                '[&::-webkit-details-marker]:hidden',
              )}
            >
              <span className="flex gap-4">
                <span
                  aria-hidden
                  className="font-sans text-caption font-bold text-accent-display"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.q}
              </span>
              <Plus
                aria-hidden
                strokeWidth={2.2}
                className={cn(
                  'mt-1 h-6 w-6 shrink-0 text-accent transition-transform duration-400',
                  open === item.q && 'rotate-45',
                )}
              />
            </summary>
            <p className="px-7 pb-7 pl-[3.6rem] text-body text-muted">{item.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
