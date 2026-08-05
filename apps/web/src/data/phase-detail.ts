import { type Locale, type Localized, type PhaseSlug, pick } from '@nutricycle/shared';

/**
 * Educational copy for /ciclo/[fase].
 *
 * Kept out of `packages/shared` on purpose. The day ranges there are
 * blocked pending the app's algorithm (revised-direction.md §6); this
 * copy is not. Separating them means the blocker can be resolved by
 * editing one small file without touching prose, and vice versa.
 *
 * Source: app-content-strategy.md § "Nutrition & Cycle Science" and
 * § "Menstrual Cycle Trivia" — client-supplied. Nothing here is
 * clinical guidance invented for this build; every claim traces to that
 * document or to the phase data already in shared.
 *
 * Every page carries a link to /aviso-medico. This is a nutrition site,
 * not a medical one, and the disclaimer is one clause of the Terms that
 * now has its own route precisely so it can be linked from here.
 */

export interface PhaseDetail {
  /** One-line answer to "what is actually happening" */
  summary: string;
  /** How it commonly feels — framed as tendencies, never as diagnosis */
  feels: string[];
  /** What supports the body now */
  eat: { label: string; why: string }[];
  /** Movement that tends to suit the phase */
  movement: string;
  /** A practical note women often find useful */
  tip: string;
}

const PHASE_DETAIL_TEXT: Localized<Record<PhaseSlug, PhaseDetail>> = {
  es: {
  menstrual: {
    summary:
      'El revestimiento del útero se desprende y las hormonas están en su punto más bajo del mes. Es la fase de menor energía disponible, y eso es fisiología, no falta de voluntad.',
    feels: [
      'Menos energía y ganas de recogerte',
      'Cólicos o pesadez en la parte baja del abdomen',
      'Necesidad de dormir más',
      'Menos tolerancia al esfuerzo intenso',
    ],
    eat: [
      {
        label: 'Hierro',
        why: 'Se pierden entre 30 y 80 ml de sangre. Lentejas, espinaca y carnes rojas ayudan a reponerlo.',
      },
      {
        label: 'Magnesio',
        why: 'Asociado a menos intensidad en los cólicos. Chocolate amargo, almendras, aguacate.',
      },
      {
        label: 'Omega-3',
        why: 'Antiinflamatorio; acompaña bien el dolor de esta fase.',
      },
      {
        label: 'Comida caliente y cocida',
        why: 'Más fácil de digerir cuando el sistema está pidiendo descanso.',
      },
    ],
    movement:
      'Caminar, estirar, yoga suave. Es la peor semana del mes para exigirte fuerza máxima y la mejor para no hacerlo.',
    tip: 'Si podés elegir, dejá las reuniones y decisiones exigentes para la semana que viene. Tu claridad vuelve sola.',
  },
  folicular: {
    summary:
      'El estrógeno empieza a subir y con él vuelven la energía, la claridad mental y las ganas de empezar cosas. Es la fase con más capacidad para aprender y entrenar.',
    feels: [
      'Más energía y mejor ánimo',
      'Más claridad para pensar y decidir',
      'Más ganas de socializar',
      'Mejor tolerancia al ejercicio exigente',
    ],
    eat: [
      {
        label: 'Alimentos frescos y ligeros',
        why: 'Acompañan al estrógeno en ascenso sin cargar la digestión.',
      },
      {
        label: 'Fermentados',
        why: 'Yogur, kimchi y chucrut ayudan al metabolismo del estrógeno a través de la microbiota.',
      },
      {
        label: 'Crucíferas',
        why: 'Brócoli, coliflor y coles apoyan la vía hepática que procesa el estrógeno.',
      },
      {
        label: 'Semillas de linaza',
        why: 'Parte de la práctica del seed cycling en la primera mitad del ciclo.',
      },
    ],
    movement:
      'La mejor ventana para fuerza, intervalos o empezar una rutina nueva. Tu cuerpo aguanta más de lo que aguantará en dos semanas.',
    tip: 'Aprovechá esta fase para lo que requiere iniciativa: proyectos nuevos, conversaciones difíciles, aprender algo.',
  },
  ovulatoria: {
    summary:
      'El estrógeno llega a su pico y se libera el óvulo. La ovulación dura unas 24 horas, pero la ventana fértil se extiende a unos seis días porque los espermatozoides sobreviven hasta cinco.',
    feels: [
      'Pico de energía y de ánimo',
      'Te sentís más sociable y comunicativa',
      'Cambios en el flujo cervical',
      'Algunas mujeres notan una punzada breve en un costado',
    ],
    eat: [
      {
        label: 'Antioxidantes',
        why: 'Frutos rojos y hojas verdes acompañan la salud del óvulo.',
      },
      {
        label: 'Verduras crudas',
        why: 'Se toleran mejor ahora que en cualquier otro momento del ciclo.',
      },
      {
        label: 'Zinc',
        why: 'Semillas de calabaza y mariscos; asociado al soporte de la ovulación.',
      },
      {
        label: 'Fibra',
        why: 'Ayuda a eliminar el exceso de estrógeno tras el pico.',
      },
    ],
    movement:
      'Tu techo de rendimiento del mes. Buen momento para una clase exigente, una carrera o levantar más peso.',
    tip: 'Es la fase más corta y la más fácil de desaprovechar. Si tenías algo que requiere presencia y energía, ponelo acá.',
  },
  lutea: {
    summary:
      'La progesterona sube y el cuerpo se prepara para un posible embarazo. El metabolismo basal puede subir hasta 300 calorías diarias, lo que explica buena parte del hambre premenstrual.',
    feels: [
      'Más hambre, sobre todo por carbohidratos',
      'Hinchazón y sensibilidad en el pecho',
      'Ánimo más variable en los últimos días',
      'Sueño de peor calidad al final de la fase',
    ],
    eat: [
      {
        label: 'Carbohidratos complejos',
        why: 'Avena, batata y quinoa estabilizan la glucosa y bajan la intensidad de los antojos.',
      },
      {
        label: 'Vitamina B6',
        why: 'Plátano y garbanzos; participa en la producción de progesterona.',
      },
      {
        label: 'Magnesio',
        why: 'Su déficit se asocia a un SPM más intenso.',
      },
      {
        label: 'Menos cafeína',
        why: 'Puede agravar la sensibilidad mamaria y los síntomas premenstruales en esta fase.',
      },
    ],
    movement:
      'Pilates, fuerza moderada, caminatas largas. Bajá la intensidad conforme se acerca el período en vez de pelear con el cansancio.',
    tip: 'El hambre de esta fase es real y tiene una causa metabólica. Comer más ahora no es un fallo de disciplina.',
  },
  },
  en: {
    menstrual: {
      summary:
        'The lining of the uterus sheds and hormones are at their lowest point of the month. This is the phase with the least energy available, and that is physiology, not a lack of willpower.',
      feels: [
        'Less energy and a pull towards staying in',
        'Cramps or heaviness low in the abdomen',
        'A need for more sleep',
        'Less tolerance for hard effort',
      ],
      eat: [
        { label: 'Iron', why: 'Between 30 and 80 ml of blood is lost. Lentils, spinach and red meat help replace it.' },
        { label: 'Magnesium', why: 'Associated with milder cramps. Dark chocolate, almonds, avocado.' },
        { label: 'Omega-3', why: 'Anti-inflammatory; it sits well alongside the pain of this phase.' },
        { label: 'Warm, cooked food', why: 'Easier to digest when your system is asking for rest.' },
      ],
      movement:
        'Walking, stretching, gentle yoga. It is the worst week of the month to demand maximum strength of yourself, and the best one not to.',
      tip: 'If you can choose, leave demanding meetings and decisions for next week. Your clarity comes back on its own.',
    },
    folicular: {
      summary:
        'Oestrogen starts to rise, and with it come energy, mental clarity and the appetite to start things. This is the phase with the most capacity to learn and to train.',
      feels: [
        'More energy and a better mood',
        'More clarity for thinking and deciding',
        'More appetite for socialising',
        'Better tolerance for demanding exercise',
      ],
      eat: [
        { label: 'Fresh, light foods', why: 'They keep pace with rising oestrogen without weighing digestion down.' },
        { label: 'Fermented foods', why: 'Yoghurt, kimchi and sauerkraut support oestrogen metabolism through the microbiome.' },
        { label: 'Cruciferous vegetables', why: 'Broccoli, cauliflower and cabbage support the liver pathway that processes oestrogen.' },
        { label: 'Flaxseed', why: 'Part of the seed cycling practice in the first half of the cycle.' },
      ],
      movement:
        'The best window for strength, intervals or starting a new routine. Your body will take more now than it will in two weeks.',
      tip: 'Use this phase for whatever needs initiative: new projects, difficult conversations, learning something.',
    },
    ovulatoria: {
      summary:
        'Oestrogen reaches its peak and the egg is released. Ovulation lasts around 24 hours, but the fertile window stretches to about six days because sperm survive for up to five.',
      feels: [
        'A peak in energy and mood',
        'Feeling more sociable and talkative',
        'Changes in cervical fluid',
        'Some women notice a brief twinge on one side',
      ],
      eat: [
        { label: 'Antioxidants', why: 'Berries and leafy greens support egg health.' },
        { label: 'Raw vegetables', why: 'They are better tolerated now than at any other point in the cycle.' },
        { label: 'Zinc', why: 'Pumpkin seeds and shellfish; associated with supporting ovulation.' },
        { label: 'Fibre', why: 'Helps clear excess oestrogen after the peak.' },
      ],
      movement:
        'Your performance ceiling for the month. A good moment for a demanding class, a race or lifting heavier.',
      tip: 'It is the shortest phase and the easiest to waste. If you had something that needs presence and energy, put it here.',
    },
    lutea: {
      summary:
        'Progesterone rises and the body prepares for a possible pregnancy. Basal metabolism can rise by up to 300 calories a day, which explains a good part of premenstrual hunger.',
      feels: [
        'More hunger, especially for carbohydrates',
        'Bloating and breast tenderness',
        'A more changeable mood in the last few days',
        'Poorer quality sleep towards the end of the phase',
      ],
      eat: [
        { label: 'Complex carbohydrates', why: 'Oats, sweet potato and quinoa steady your blood sugar and take the edge off cravings.' },
        { label: 'Vitamin B6', why: 'Banana and chickpeas; it plays a part in producing progesterone.' },
        { label: 'Magnesium', why: 'A deficiency is associated with more intense PMS.' },
        { label: 'Less caffeine', why: 'It can worsen breast tenderness and premenstrual symptoms in this phase.' },
      ],
      movement:
        'Pilates, moderate strength work, long walks. Ease the intensity down as your period approaches instead of fighting the tiredness.',
      tip: 'The hunger of this phase is real and has a metabolic cause. Eating more now is not a failure of discipline.',
    },
  },
};

export function getPhaseDetail(locale: Locale): Record<PhaseSlug, PhaseDetail> {
  return pick(PHASE_DETAIL_TEXT, locale);
}

/** @deprecated Spanish-only. Use getPhaseDetail(locale). */
export const PHASE_DETAIL = getPhaseDetail('es');
