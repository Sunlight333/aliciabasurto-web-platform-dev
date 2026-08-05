/**
 * Spanish UI strings — the reference dictionary.
 *
 * This is the shape every other locale must satisfy: `en.ts` is typed as
 * `Dictionary`, so a missing key is a compile error rather than a Spanish
 * word appearing on an English page. That is the whole point of typing it
 * this way — untranslated strings should not be able to reach a build.
 *
 * Page copy that is really *content* rather than UI lives in src/data and is
 * localized there. This file is chrome, labels, and page furniture.
 */
export const es = {
  /**
   * Page furniture — the hero block at the top of each route.
   *
   * These were literals in the JSX, which is why /en kept rendering Spanish
   * headlines after the data files were localized: the `<h1>` never came
   * from src/data at all.
   */
  pages: {
    blog: {
      eyebrow: 'Educación hormonal',
      title: 'Entender tu ciclo',
      accent: 'cambia cómo te tratás',
      lead: 'Artículos sobre lo que hacen tus hormonas, por qué te sentís distinta cada semana y qué hacer al respecto.',
      emptyTitle: 'Los primeros artículos están en camino',
    },
    ciclo: {
      eyebrow: 'Tu ciclo',
      title: 'Cuatro fases,',
      accent: 'cuatro cuerpos distintos',
      lead: 'Tus hormonas suben y bajan en un patrón que se repite cada mes. Entenderlo cambia lo que esperás de vos misma cada semana.',
    },
    comoFunciona: {
      eyebrow: 'Cómo funciona',
      title: 'De una fecha',
      accent: 'a un plan diario',
      lead: 'No hay que aprender nada nuevo ni llevar cuentas. Registrás una fecha y la app hace el resto, todos los días.',
    },
    contacto: {
      eyebrow: 'Contacto',
      title: 'Escribinos y',
      accent: 'te respondemos',
      lead: 'Somos un equipo pequeño, así que respondemos por correo. Elegí el tema y te llega directo a quien corresponde.',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que suelen',
      accent: 'preguntarnos',
      lead: 'Sobre la app, tus datos de salud, la suscripción y qué hacer si algo no funciona.',
    },
    funcionalidades: {
      eyebrow: 'Funciones',
      title: 'Todo lo que Nutricycle',
      accent: 'hace por ti',
      lead: 'Un rastreador de ciclo, un plan de alimentación y una asesora hormonal en la misma app. Esto es lo que encuentras dentro.',
    },
    membresia: {
      eyebrow: 'Membresía',
      title: 'Gratis para empezar,',
      accent: 'completo cuando lo necesites',
      lead: 'Todo lo esencial está en el plan gratuito. El Plan Hormonal es para cuando quieras preguntarle a la IA sin contar los mensajes.',
    },
    recetas: {
      eyebrow: 'Recetas',
      title: 'Cocina según',
      accent: 'la fase en la que estás',
      lead: 'Una selección abierta de recetas por fase. La biblioteca completa, con más de 40, vive dentro de la app.',
      emptyTitle: 'Todavía no hay recetas publicadas',
      phaseAccent: 'qué cocinar',
    },
    sobre: {
      eyebrow: 'Sobre mí',
      title: 'Hola, soy Alicia',
      lead: 'Health coach de nutrición hormonal. Enseño a mujeres a sincronizar su alimentación con la inteligencia de su ciclo menstrual.',
    },
    videos: {
      eyebrow: 'Videos',
      title: 'Verlo una vez',
      accent: 'y ya saber hacerlo',
      lead: 'Diez recetas filmadas desde arriba. Ninguna pasa de veinticinco segundos.',
      emptyTitle: 'La videoteca está en preparación',
      single: 'Video',
    },
  },

  a11y: {
    skipToContent: 'Saltar al contenido',
  },

  nav: {
    method: 'Método',
    cycle: 'Tu ciclo',
    recipes: 'Recetas',
    about: 'Sobre Alicia',
    features: 'Funciones',
    membership: 'Membresía',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    home: 'Nutricycle — inicio',
    primaryLeft: 'Principal izquierda',
    primaryRight: 'Principal derecha',
    primaryMobile: 'Principal móvil',
    language: 'Idioma',
    switchLanguage: 'Cambiar idioma',
  },

  footer: {
    blurb: 'Nutrición cíclica para tu salud hormonal. Aprende a comer según tu fase.',
    explore: 'Explora',
    company: 'Nutricycle',
    legal: 'Legal',
    rights: 'Todos los derechos reservados.',
    blog: 'Blog',
    videos: 'Videos',
    phases: 'Las 4 fases',
    faq: 'Preguntas frecuentes',
    contact: 'Contacto',
    howItWorks: 'Cómo funciona',
    aboutAlicia: 'Sobre Alicia',
  },

  cta: {
    eyebrow: 'Disponible en iOS y Android',
    title: 'Tu ciclo, tu guía —',
    accent: 'en tu bolsillo',
    lead: 'Cada día, los alimentos y recetas que tu cuerpo necesita según tu fase. Sin dietas, sin restricciones.',
    rating: 'Valoración',
    recipes: 'Recetas',
    phases: 'Fases',
    note: 'Descarga gratis · Plan Hormonal desde la app',
  },

  store: {
    appStoreTop: 'Descárgalo en el',
    appStore: 'App Store',
    googlePlayTop: 'Disponible en',
    googlePlay: 'Google Play',
    download: 'Descargar',
    downloadFree: 'Descargar gratis',
    downloadApp: 'Descargar la app',
  },

  common: {
    readMore: 'Leer más',
    seeAll: 'Ver todo',
    back: 'Volver',
    minutes: 'min',
    servings: 'porciones',
    phase: 'Fase',
    generalInfo: 'Información general, no diagnóstico.',
    readDisclaimer: 'Leé el aviso médico',
    medicalNote:
      'Información general de nutrición, no consejo médico.',
    comingSoon: 'Próximamente',
  },

  phases: {
    eyebrow: 'Las cuatro fases',
    inside: 'Qué pasa por dentro',
    feels: 'Cómo suele sentirse',
    eating: 'Alimentación',
    eatingTitle: 'Qué acompaña',
    eatingAccent: 'a tu cuerpo ahora',
    movement: 'Movimiento',
    practicalNote: 'Un apunte práctico',
    trendsNote: 'Son tendencias, no reglas. Cada cuerpo las vive distinto.',
    seeRecipes: 'Ver recetas de esta fase',
    otherPhases: 'Otras fases',
    previousPhase: 'Fase anterior',
    nextPhase: 'Fase siguiente',
    seeAllFour: 'Ver las cuatro fases',
  },

  recipes: {
    eyebrow: 'Recetas',
    title: 'Cocina según',
    accent: 'la fase en la que estás',
    lead: 'Una selección abierta de recetas por fase. La biblioteca completa, con más de 40, vive dentro de la app.',
    all: 'Todas',
    ingredients: 'Ingredientes',
    method: 'Preparación',
    tips: 'Consejos',
    whyPhase: 'Por qué acompaña a esta fase',
    pairings: 'Para acompañar',
    variations: 'Variaciones',
    emptyTitle: 'Todavía no hay recetas publicadas para esta fase',
    emptyBody: 'La biblioteca completa vive dentro de la app, con más de 40 recetas por fase.',
  },

  videos: {
    eyebrow: 'Videos',
    title: 'Verlo una vez',
    accent: 'y ya saber hacerlo',
    lead: 'Recetas en video cortas y explicaciones sobre tu ciclo, sin tecnicismos.',
    watch: 'Ver video',
    duration: 'Duración',
    emptyTitle: 'La videoteca está en preparación',
    emptyBody: 'Los videos por fase viven hoy dentro de la app, junto con las recetas y el plan semanal.',
    seeWhatsInside: 'Ver qué incluye la app',
    unsupported: 'Tu navegador no puede reproducir este video:',
  },

  blog: {
    eyebrow: 'Blog',
    emptyTitle: 'Los artículos están en camino',
    emptyBody: 'Mientras tanto, la app tiene una biblioteca de educación hormonal por fase.',
  },

  errors: {
    notFoundTitle: 'Esta página no existe',
    notFoundBody: 'El enlace puede estar roto o la página se movió.',
    backHome: 'Volver al inicio',
  },
};

/**
 * Deliberately not `as const`. With it, every value narrows to its own
 * Spanish literal and `en.ts` cannot satisfy the type — "Method" is not
 * assignable to "Método". Without it the *shape* is still enforced, which is
 * the part that matters: a missing key stays a compile error.
 */
export type Dictionary = typeof es;
