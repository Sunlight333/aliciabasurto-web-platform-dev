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
 * The avatars are Pexels stock portraits cropped in
 * doc/assets/candidates/cta-band-latam-avatars — real people who are not
 * clients and never said any of this. That combination is the risky one:
 * the Pexels licence permits commercial use but forbids implying that an
 * identifiable person endorses a product, which is exactly what a face
 * beside an invented quote does. They are here to build the layout.
 * Before launch, either pair each portrait with a real reviewer who has
 * consented to both the quote and the photo, or drop `avatar` and let the
 * card fall back to a monogram.
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
    avatar: '/images/reviews/01-camisa-rosa.webp',
  },
  {
    id: 'r2',
    name: 'Valentina Ortiz',
    location: 'Ciudad de México',
    quote:
      'La app me dice qué cocinar según el día de mi ciclo. Dejé de improvisar y mi energía por las mañanas cambió.',
    phase: 'folicular',
    rating: 5,
    avatar: '/images/reviews/02-cocina-marmol.webp',
  },
  {
    id: 'r3',
    name: 'Daniela Ruiz',
    location: 'Bogotá',
    quote:
      'El acné hormonal era mi mayor inseguridad. Cuatro meses siguiendo las recetas por fase y mi piel es otra.',
    phase: 'menstrual',
    rating: 5,
    avatar: '/images/reviews/03-jersey-gris.webp',
  },
  {
    id: 'r4',
    name: 'Mariana Peña',
    location: 'Lima',
    quote:
      'Lo que más valoro es que no me prohíbe nada. Me enseña cuándo mi cuerpo aprovecha mejor cada alimento.',
    phase: 'ovulatoria',
    rating: 5,
    avatar: '/images/reviews/04-sofa-crema.webp',
  },
  {
    id: 'r5',
    name: 'Sofía Aguirre',
    location: 'Buenos Aires',
    quote:
      'Entender por qué me sentía distinta cada semana me quitó un peso enorme. Ya no peleo con mi cuerpo.',
    phase: 'lutea',
    rating: 5,
    avatar: '/images/reviews/05-jersey-verde.webp',
  },
  {
    id: 'r6',
    name: 'Lucía Fernández',
    location: 'Santiago',
    quote:
      'La lista de compras me ahorra la peor parte. Llego al súper y ya sé exactamente qué necesita mi fase.',
    phase: 'folicular',
    rating: 5,
    avatar: '/images/reviews/06-retrato-calido.webp',
  },
  {
    id: 'r7',
    name: 'Regina Salazar',
    location: 'Guadalajara',
    quote:
      'Antes cenaba lo mismo todo el mes. Ahora ajusto la cena a la fase y duermo de un tirón desde la tercera semana.',
    phase: 'ovulatoria',
    rating: 5,
    avatar: '/images/reviews/07-camisa-azul.webp',
  },
  {
    id: 'r8',
    name: 'Paulina Navarro',
    location: 'Ciudad de México',
    quote:
      'Los primeros días ya no me tumban. Como lo que toca, me caliento con caldos y sigo con mi semana normal.',
    phase: 'menstrual',
    rating: 5,
    avatar: '/images/reviews/08-cocina-tulipanes.webp',
  },
  {
    id: 'r9',
    name: 'Fernanda Cruz',
    location: 'Monterrey',
    quote:
      'Los antojos de la semana previa dejaron de ganarme. No es fuerza de voluntad, es comer lo que esa fase pide.',
    phase: 'lutea',
    rating: 5,
    avatar: '/images/reviews/09-encimera-verduras.webp',
  },
  {
    id: 'r10',
    name: 'Andrea Molina',
    location: 'Quito',
    quote:
      'Empecé por curiosidad y me quedé por la energía. Cocino en veinte minutos con lo que la app me propone.',
    phase: 'folicular',
    rating: 5,
    avatar: '/images/reviews/10-sofa-plantas.webp',
  },
  {
    id: 'r11',
    name: 'Ximena Duarte',
    location: 'Puebla',
    quote:
      'Es la primera vez que una app de comida no me hace sentir culpable. Explica el porqué y una entiende su cuerpo.',
    phase: 'ovulatoria',
    rating: 5,
    avatar: '/images/reviews/11-mexico-exterior.webp',
  },
] as const;
