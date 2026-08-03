import { Quote } from 'lucide-react';
import { Container } from '@/components/layout/container';

/**
 * Full-bleed pull-quote over a photograph.
 *
 * The one net-new component `/sobre` needs (about-page.md §3), and
 * reusable anywhere a page wants a breath between two dense sections.
 *
 * Same light-scrim construction as PageHero: no dark surfaces, ink stays
 * high-contrast, the photograph reads through.
 */
export function FullBleedQuote({
  quote,
  attribution,
  image,
  focal = 'center 40%',
}: {
  quote: string;
  attribution?: string;
  image: string;
  focal?: string;
}) {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url('${image}')`, backgroundPosition: focal }}
        />
        <div className="absolute inset-0 bg-surface-raised/[0.86]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-surface-raised to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface-raised to-transparent" />
      </div>

      <Container className="relative">
        <figure className="mx-auto max-w-3xl text-center">
          <Quote
            aria-hidden
            strokeWidth={2}
            className="mx-auto h-10 w-10 text-accent-display"
          />
          <blockquote className="mt-7 font-display text-h1 leading-tight text-ink italic">
            {quote}
          </blockquote>
          {attribution && (
            <figcaption className="mt-7 font-sans text-caption font-bold tracking-[0.16em] text-accent-display uppercase">
              {attribution}
            </figcaption>
          )}
        </figure>
      </Container>
    </section>
  );
}
