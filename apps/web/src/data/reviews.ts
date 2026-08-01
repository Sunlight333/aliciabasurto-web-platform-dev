/**
 * ⚠️ PLACEHOLDER CONTENT — NOT REAL CUSTOMER REVIEWS.
 *
 * Every quote and name below is invented to build and demonstrate the
 * carousel. None of it may ship publicly.
 *
 * Nutricycle sells paid health guidance, so fabricated social proof is
 * both a trust problem and a legal one (advertising standards treat
 * invented testimonials as deceptive). Before launch each entry must be
 * replaced with a real review plus the reviewer's consent to publish —
 * tracked as item 5 in doc/04-content/about-page.md §4.
 *
 * The avatars are licensed placeholder portraits from pravatar.cc, not
 * photographs of these (non-existent) people. Real client photos need
 * separate consent; if none is given, drop `avatar` and the card falls
 * back to a monogram.
 */

export interface Review {
  id: string;
  name: string;
  quote: string;
  /** Required: an absent line would break vertical alignment across cards */
  location: string;
  /** Ties the review to the product's spine — must match a PhaseSlug */
  phase: 'menstrual' | 'folicular' | 'ovulatoria' | 'lutea';
  rating: number;
  avatar?: string;
}

/**
 * Quotes are kept within a narrow length band (~120–130 characters) so no
 * card has to stretch. The card also enforces a fixed quote block, but
 * matching the copy means nothing is ever clipped to achieve it.
 * `location` is required, not optional — an absent line would shift every
 * element below it out of alignment with its neighbours.
 */
export const REVIEWS: readonly Review[] = [
  {
    id: 'r1',
    name: 'Camila Restrepo',
    location: 'Medellín',
    quote:
      'Llevaba años culpándome por no tener disciplina. Resulta que solo necesitaba comer distinto cada semana.',
    phase: 'lutea',
    rating: 5,
    avatar: '/images/reviews/avatar-1.jpg',
  },
  {
    id: 'r2',
    name: 'Valentina Ortiz',
    location: 'Ciudad de México',
    quote:
      'La app me dice qué cocinar según el día de mi ciclo. Dejé de improvisar y mi energía por las mañanas cambió.',
    phase: 'folicular',
    rating: 5,
    avatar: '/images/reviews/avatar-2.jpg',
  },
  {
    id: 'r3',
    name: 'Daniela Ruiz',
    location: 'Bogotá',
    quote:
      'El acné hormonal era mi mayor inseguridad. Cuatro meses siguiendo las recetas por fase y mi piel es otra.',
    phase: 'menstrual',
    rating: 5,
    avatar: '/images/reviews/avatar-3.jpg',
  },
  {
    id: 'r4',
    name: 'Mariana Peña',
    location: 'Lima',
    quote:
      'Lo que más valoro es que no me prohíbe nada. Me enseña cuándo mi cuerpo aprovecha mejor cada alimento.',
    phase: 'ovulatoria',
    rating: 5,
    avatar: '/images/reviews/avatar-4.jpg',
  },
  {
    id: 'r5',
    name: 'Sofía Aguirre',
    location: 'Buenos Aires',
    quote:
      'Entender por qué me sentía distinta cada semana me quitó un peso enorme. Ya no peleo con mi cuerpo.',
    phase: 'lutea',
    rating: 5,
    avatar: '/images/reviews/avatar-5.jpg',
  },
  {
    id: 'r6',
    name: 'Lucía Fernández',
    location: 'Santiago',
    quote:
      'La lista de compras me ahorra la peor parte. Llego al súper y ya sé exactamente qué necesita mi fase.',
    phase: 'folicular',
    rating: 5,
    avatar: '/images/reviews/avatar-6.jpg',
  },
] as const;
