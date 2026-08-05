/**
 * Course catalogue for /cursos.
 *
 * Source: doc/Nutricycle_Cursos.pdf, supplied by the client. Every string
 * below is that brochure — the wording is theirs, not a rewrite. Two
 * programmes: an accompanied course on the full method, and a mini course
 * on PCOS.
 *
 * ⚠️ The brochure carries no price, no start date, no duration and no
 * enrolment link — it ends on an email address. Those are the four things
 * a buyer asks first, so the page states what is known, routes the reader
 * to that email, and flags the gap in the client-pending note rather than
 * inventing a "$XX · 8 semanas · Inscribite" that nobody approved.
 *
 * `highlight` is the brochure's own one-line summary of what a programme
 * includes; `includes` is the checklist beneath it. Both come from the PDF
 * — the summary line and the ticked list are separate elements there too.
 */

import type { Locale } from '@nutricycle/shared';

export interface CourseLesson {
  /** The promise, as a sentence. Rendered bold, leading the card. */
  title: string;
  /** What it means in practice. */
  body: string;
}

export interface Course {
  id: string;
  /** Programme format — "Programa con acompañamiento", "Mini curso". */
  kind: string;
  title: string;
  lead: string;
  lessons: CourseLesson[];
  /** One-line summary of the deliverables, from the brochure. */
  highlight: string;
  includes: string[];
  /** Section surface, alternated so the two blocks read as distinct. */
  surface: 'raised' | 'mint';
  tint: string;
  icon: string;
}

const COURSES_ES: readonly Course[] = [
  {
    id: 'metodo-desde-cero',
    kind: 'Programa con acompañamiento',
    title: 'Nutrición Cíclica: el método desde cero',
    lead: 'No es un curso que ves sola y guardás en una carpeta. Es un programa donde aprendés el método, lo aplicás a tu vida, y tenés a Alicia para acompañarte en el proceso.',
    lessons: [
      {
        title: 'Cómo funcionan tus hormonas.',
        body: 'Vas a entender qué pasa en tu cuerpo cada semana del mes y por qué te sentís distinta en cada fase — porque cuando entendés el porqué, todo lo demás tiene sentido.',
      },
      {
        title: 'Qué comer según tu fase.',
        body: 'Los alimentos que apoyan a tus hormonas en cada semana del ciclo — sin dieta, sin restricción, con lógica.',
      },
      {
        title: 'Cómo ayunar como una mujer.',
        body: 'El ayuno intermitente está diseñado para el cuerpo masculino. Vas a aprender cuándo suma y cuándo te juega en contra según tu ciclo.',
      },
      {
        title: 'Tu manual de comidas personalizado.',
        body: 'Usás los prompts que te doy para pedirle a la IA un plan mensual adaptado a tus gustos, tu ciclo y tu vida. No un plan genérico — uno tuyo.',
      },
    ],
    highlight:
      'Recetas mensuales en video por fase · Sesión semanal en vivo con Alicia',
    includes: [
      'Acceso a clases de por vida',
      'Recetas mensuales en video',
      'Sesión semanal con Alicia',
    ],
    surface: 'raised',
    tint: 'bg-luteal-soft text-luteal-ink',
    icon: 'GraduationCap',
  },
  {
    id: 'sop',
    kind: 'Mini curso',
    title: 'SOP y alimentación: lo que nadie te explicó',
    lead: 'Un programa específico para mujeres con Síndrome de Ovario Poliquístico que quieren entender cómo la alimentación puede ayudar a mejorar sus síntomas — sin información genérica, sin dietas extremas.',
    lessons: [
      {
        title: 'Cómo el SOP afecta tus hormonas.',
        body: 'Vas a entender qué está pasando en tu cuerpo y por qué tus síntomas tienen sentido — y solución.',
      },
      {
        title: 'Qué alimentos inflaman y cuáles ayudan.',
        body: 'No todos los cuerpos responden igual. Vas a aprender a identificar qué sumar y qué reducir específicamente para el SOP.',
      },
      {
        title: 'Cómo adaptar la nutrición cíclica a ciclos irregulares.',
        body: 'El método funciona incluso cuando tu ciclo no es predecible — acá aprendés cómo.',
      },
    ],
    highlight:
      'Clases grabadas · Recetario en PDF con recetas diseñadas para el SOP',
    includes: ['Clases grabadas', 'Recetario en PDF', 'Acceso de por vida'],
    surface: 'mint',
    tint: 'bg-follicular-soft text-follicular-ink',
    icon: 'HeartPulse',
  },
];

/** English text, positional against COURSES_ES. */
const COURSES_TEXT_EN: {
  kind: string;
  title: string;
  lead: string;
  lessons: CourseLesson[];
  highlight: string;
  includes: string[];
}[] = [
  {
    kind: 'Guided programme',
    title: 'Cyclical Nutrition: the method from scratch',
    lead: 'This is not a course you watch alone and file away. It is a programme where you learn the method, apply it to your own life, and have Alicia alongside you while you do.',
    lessons: [
      {
        title: 'How your hormones actually work.',
        body: 'You will understand what happens in your body each week of the month and why you feel different in every phase — because once you understand the why, everything else follows.',
      },
      {
        title: 'What to eat in each phase.',
        body: 'The foods that support your hormones week by week through the cycle — no diet, no restriction, just logic.',
      },
      {
        title: 'How to fast as a woman.',
        body: 'Intermittent fasting was designed around the male body. You will learn when it helps you and when it works against you, according to your cycle.',
      },
      {
        title: 'Your own meal handbook.',
        body: 'Use the prompts I give you to ask AI for a monthly plan built around your tastes, your cycle and your life. Not a generic plan — yours.',
      },
    ],
    highlight: 'Monthly video recipes by phase · Weekly live session with Alicia',
    includes: [
      'Lifetime access to the classes',
      'Monthly video recipes',
      'Weekly session with Alicia',
    ],
  },
  {
    kind: 'Mini course',
    title: 'PCOS and food: what nobody explained to you',
    lead: 'A programme specifically for women with Polycystic Ovary Syndrome who want to understand how food can help improve their symptoms — no generic information, no extreme diets.',
    lessons: [
      {
        title: 'How PCOS affects your hormones.',
        body: 'You will understand what is happening in your body and why your symptoms make sense — and can be addressed.',
      },
      {
        title: 'Which foods inflame and which help.',
        body: 'Not every body responds the same way. You will learn to identify what to add and what to reduce, specifically for PCOS.',
      },
      {
        title: 'How to adapt cyclical nutrition to irregular cycles.',
        body: 'The method works even when your cycle is not predictable — this is where you learn how.',
      },
    ],
    highlight: 'Recorded classes · PDF recipe book designed for PCOS',
    includes: ['Recorded classes', 'PDF recipe book', 'Lifetime access'],
  },
];

/**
 * Merge the shared structure with the text for one locale.
 *
 * The length checks are the same guard features.ts uses: a translator
 * dropping a bullet should break the build, not silently ship a course
 * that promises three things in Spanish and two in English.
 */
export function getCourses(locale: Locale): readonly Course[] {
  if (locale === 'es') return COURSES_ES;

  return COURSES_ES.map((course, i) => {
    const text = COURSES_TEXT_EN[i];
    if (text.lessons.length !== course.lessons.length) {
      throw new Error(
        `courses.ts: "${course.id}" has ${course.lessons.length} Spanish lessons but ${text.lessons.length} English`,
      );
    }
    if (text.includes.length !== course.includes.length) {
      throw new Error(
        `courses.ts: "${course.id}" has ${course.includes.length} Spanish includes but ${text.includes.length} English`,
      );
    }
    return {
      ...course,
      kind: text.kind,
      title: text.title,
      lead: text.lead,
      lessons: text.lessons,
      highlight: text.highlight,
      includes: text.includes,
    };
  });
}
