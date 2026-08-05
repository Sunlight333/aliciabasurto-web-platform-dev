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
  /** Landing page sections. Copy that lives in the JSX, not in src/data. */
  home: {
    hero: {
      badge: 'Nutrición cíclica con IA',
      title: 'Come con tu ciclo.',
      accent: 'Vuelve a sentirte tú.',
      lead: 'Nutricycle adapta tu alimentación, tus recetas y tus rutinas a cada fase de tu ciclo menstrual — automáticamente.',
      note: 'Gratis · iOS y Android · Sin tarjeta',
    },
    problem: {
      eyebrow: 'Por qué cuesta tanto',
      title: 'No es falta de disciplina.',
      accent: 'Es falta de contexto.',
    },
    steps: {
      eyebrow: 'Cómo funciona',
      titleBefore: 'Nutrición que se',
      accent: 'sincroniza',
      titleAfter: 'a tu cuerpo',
      lead: 'Tres pasos. El resto lo calcula la app cada día por ti.',
    },
    features: {
      eyebrow: 'Lo que incluye',
      title: 'Todo lo que tu cuerpo',
      accent: 'ya sabía pedirte',
      aiBadge: 'Con IA',
      seeAll: 'Ver todas las funciones',
    },
    reviews: {
      previous: 'Anterior',
      next: 'Siguiente',
      listLabel: 'Testimonios de clientas',
      /** Screen-reader text after the rating: "5 de 5 estrellas". */
      starsOf: 'de 5 estrellas',
      eyebrow: 'Testimonios',
      titleBefore: 'Lo que cambia cuando',
      accent: 'escuchas tu ciclo',
    },
    founder: {
      eyebrow: 'Sobre mí',
      name: 'Alicia Basurto',
      role: 'Health coach de nutrición hormonal',
      titleBefore: 'Alicia Basurto:',
      accent: 'Nutrición Cíclica',
      quote: 'La comida correcta en el momento correcto.',
      pillars: {
        medicine: {
          title: 'La comida como medicina',
          body: 'Cada alimento elegido por lo que le hace a tus hormonas.',
        },
        synced: {
          title: 'Sincronizada a tu ciclo',
          body: 'Lo que tu cuerpo necesita cambia cada semana. Tu plan también.',
        },
        noDiets: {
          title: 'Sin dietas restrictivas',
          body: 'Nada de contar calorías ni prohibirte comida.',
        },
      },
      alt: {
        smiling: 'Alicia Basurto, health coach de nutrición hormonal, en su cocina',
        tea: 'Alicia Basurto sosteniendo una infusión en su cocina',
        chopping: 'Alicia Basurto cortando verduras frescas en su cocina',
      },
    },
    phaseLabel: {
      menstrual: 'Fase menstrual',
      folicular: 'Fase folicular',
      ovulatoria: 'Fase ovulatoria',
      lutea: 'Fase lútea',
    },
  },

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
    cursos: {
      eyebrow: 'Cursos',
      title: 'Aprendé el método, una vez.',
      accent: 'Aplicalo el resto de tu vida.',
      lead: 'No son cursos genéricos de nutrición. Son programas diseñados con el mismo método que está detrás de la app — para que entiendas por qué funciona y puedas aplicarlo sin depender de nadie.',
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
      /** Heading over the testimonial marquee at the foot of the page. */
      reviewsTitle: 'Historias de quienes ya',
      reviewsAccent: 'comen por fases',
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

  /** /cursos — the furniture around the client's brochure copy. */
  courses: {
    willLearn: 'Lo que vas a aprender',
    includes: 'Lo que incluye',
    askAbout: 'Preguntar por este programa',
    enrolEyebrow: 'Inscripción',
    enrolTitle: 'Escribile a Alicia y',
    enrolAccent: 'reservá tu lugar',
    enrolLead: 'Contale en qué momento estás y qué programa te interesa. Te responde con las fechas del próximo grupo y cómo inscribirte.',
    pendingLabel: 'Pendiente del cliente:',
    pendingBody: 'precio, duración, fechas de inicio y enlace de pago de cada programa. El folleto entregado no los incluye, así que la inscripción se resuelve hoy por correo — nada de esto está inventado en la página.',
  },

  nav: {
    method: 'Método',
    cycle: 'Tu ciclo',
    recipes: 'Recetas',
    courses: 'Cursos',
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
