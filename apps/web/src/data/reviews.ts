import { type Locale, type Localized, pick } from '@nutricycle/shared';

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

interface RawReview {
  id: string;
  name: string;
  quote: Localized<string>;
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
const REVIEW_DATA: readonly RawReview[] = [
  {
    id: 'r1',
    name: 'Camila Restrepo',
    location: 'Medellín',
    quote: { es:
        'Llevaba años culpándome por no tener disciplina. Resulta que solo necesitaba comer distinto cada semana.',
      en:
        'I spent years blaming myself for having no discipline. It turned out I just needed to eat differently each week.' },
    phase: 'lutea',
    rating: 5,
    avatar: '/images/reviews/01-camisa-rosa.webp',
  },
  {
    id: 'r2',
    name: 'Valentina Ortiz',
    location: 'Ciudad de México',
    quote: { es:
        'La app me dice qué cocinar según el día de mi ciclo. Dejé de improvisar y mi energía por las mañanas cambió.',
      en:
        'The app tells me what to cook for the day of my cycle I am on. I stopped improvising and my mornings feel different.' },
    phase: 'folicular',
    rating: 5,
    avatar: '/images/reviews/02-cocina-marmol.webp',
  },
  {
    id: 'r3',
    name: 'Daniela Ruiz',
    location: 'Bogotá',
    quote: { es:
        'El acné hormonal era mi mayor inseguridad. Cuatro meses siguiendo las recetas por fase y mi piel es otra.',
      en:
        'Hormonal acne was my biggest insecurity. Four months following the recipes by phase and my skin is another skin.' },
    phase: 'menstrual',
    rating: 5,
    avatar: '/images/reviews/03-jersey-gris.webp',
  },
  {
    id: 'r4',
    name: 'Mariana Peña',
    location: 'Lima',
    quote: { es:
        'Lo que más valoro es que no me prohíbe nada. Me enseña cuándo mi cuerpo aprovecha mejor cada alimento.',
      en:
        'What I value most is that it forbids nothing. It teaches me when my body makes the most of each food.' },
    phase: 'ovulatoria',
    rating: 5,
    avatar: '/images/reviews/04-sofa-crema.webp',
  },
  {
    id: 'r5',
    name: 'Sofía Aguirre',
    location: 'Buenos Aires',
    quote: { es:
        'Entender por qué me sentía distinta cada semana me quitó un peso enorme. Ya no peleo con mi cuerpo.',
      en:
        'Understanding why I felt different each week lifted an enormous weight. I no longer fight with my body.' },
    phase: 'lutea',
    rating: 5,
    avatar: '/images/reviews/05-jersey-verde.webp',
  },
  {
    id: 'r6',
    name: 'Lucía Fernández',
    location: 'Santiago',
    quote: { es:
        'La lista de compras me ahorra la peor parte. Llego al súper y ya sé exactamente qué necesita mi fase.',
      en:
        'The shopping list saves me the worst part. I get to the supermarket already knowing what my phase needs.' },
    phase: 'folicular',
    rating: 5,
    avatar: '/images/reviews/06-retrato-calido.webp',
  },
  {
    id: 'r7',
    name: 'Regina Salazar',
    location: 'Guadalajara',
    quote: { es:
        'Antes cenaba lo mismo todo el mes. Ahora ajusto la cena a la fase y duermo de un tirón desde la tercera semana.',
      en:
        'I used to eat the same dinner all month. Now I match dinner to the phase and from the third week I sleep straight through.' },
    phase: 'ovulatoria',
    rating: 5,
    avatar: '/images/reviews/07-camisa-azul.webp',
  },
  {
    id: 'r8',
    name: 'Paulina Navarro',
    location: 'Ciudad de México',
    quote: { es:
        'Los primeros días ya no me tumban. Como lo que toca, me caliento con caldos y sigo con mi semana normal.',
      en:
        'The first days no longer floor me. I eat what suits them, warm up with broths and carry on with my week.' },
    phase: 'menstrual',
    rating: 5,
    avatar: '/images/reviews/08-cocina-tulipanes.webp',
  },
  {
    id: 'r9',
    name: 'Fernanda Cruz',
    location: 'Monterrey',
    quote: { es:
        'Los antojos de la semana previa dejaron de ganarme. No es fuerza de voluntad, es comer lo que esa fase pide.',
      en:
        'The cravings in the week before stopped winning. It is not willpower, it is eating what that phase asks for.' },
    phase: 'lutea',
    rating: 5,
    avatar: '/images/reviews/09-encimera-verduras.webp',
  },
  {
    id: 'r10',
    name: 'Andrea Molina',
    location: 'Quito',
    quote: { es:
        'Empecé por curiosidad y me quedé por la energía. Cocino en veinte minutos con lo que la app me propone.',
      en:
        'I started out of curiosity and stayed for the energy. I cook in twenty minutes with whatever the app suggests.' },
    phase: 'folicular',
    rating: 5,
    avatar: '/images/reviews/10-sofa-plantas.webp',
  },
  {
    id: 'r11',
    name: 'Ximena Duarte',
    location: 'Puebla',
    quote: { es:
        'Es la primera vez que una app de comida no me hace sentir culpable. Explica el porqué y una entiende su cuerpo.',
      en:
        'It is the first food app that has never made me feel guilty. It explains the why, and you come to understand your body.' },
    phase: 'ovulatoria',
    rating: 5,
    avatar: '/images/reviews/11-mexico-exterior.webp',
  },
] as const;

/** A review with its quote resolved for one locale. */
export interface Review extends Omit<RawReview, 'quote'> {
  quote: string;
}

/**
 * Names and locations are proper nouns and stay as they are in both
 * languages — translating "Ciudad de México" to "Mexico City" in an English
 * testimonial would misrepresent where the person said they live.
 */
export function getReviews(locale: Locale): readonly Review[] {
  return REVIEW_DATA.map((r) => ({ ...r, quote: pick(r.quote, locale) }));
}

/** @deprecated Spanish-only. Use getReviews(locale). */
export const REVIEWS = getReviews('es');
