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
      stepLabel: 'Paso',
      cta: 'Conoce el método',
    },
    phases: {
      eyebrow: 'Las 4 fases',
      title: 'Un plan diferente para cada',
      accent: 'momento de tu ciclo',
      cta: 'Explora las fases',
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
      body1: 'Durante años mi cuerpo fue una espiral de acné, fatiga y desequilibrios que afectaban mi calidad de vida.',
      body2: 'Después de seis años revirtiendo mis propios síntomas, consolidé una metodología basada en la alimentación como medicina. Hoy mi misión es enseñar a otras mujeres a sincronizar sus hábitos con la inteligencia de su ciclo menstrual.',
      cta: 'Conóceme',
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

  /** /membresia — furniture around the plan data. */
  membership: {
    planEyebrow: 'Plan Hormonal',
    planTitle: 'Dos formas de',
    planAccent: 'suscribirte',
    priceNote: 'Precios de referencia en dólares. La tienda de tu país muestra el importe final en tu moneda antes de confirmar.',
    compareEyebrow: 'Comparación',
    compareTitle: 'Qué incluye',
    compareAccent: 'cada plan',
    tableCaption: 'Comparación de funciones entre el plan gratuito y el Plan Hormonal',
    colFeature: 'Función',
    colFree: 'Gratis',
    colPremium: 'Plan Hormonal',
    billingEyebrow: 'Facturación',
    billingTitle: 'Se gestiona',
    billingAccent: 'desde tu tienda',
    faqLink: 'Ver preguntas sobre la suscripción',
  },

  /** /sobre — the page's own copy, not shared with the home founder block. */
  about: {
    storyEyebrow: 'Mi historia',
    storyTitle: 'Empecé',
    storyAccent: 'por necesidad',
    story: [
      'Durante años mi cuerpo fue una espiral de acné, fatiga y desequilibrios que afectaban mi calidad de vida. Probé lo que prueba casi todo el mundo: dietas más estrictas, más disciplina, más culpa cuando no funcionaba.',
      'Lo que no había entendido es que estaba comiendo igual las cuatro semanas del mes, mientras mi cuerpo cambiaba por completo entre una y otra. No era falta de disciplina. Era falta de contexto.',
      'Después de seis años revirtiendo mis propios síntomas, consolidé una metodología basada en la alimentación como medicina — ajustada a cada fase del ciclo, sin restricciones y sin contar calorías.',
      'Hoy mi misión es que otras mujeres no tarden seis años en descubrir lo mismo. Nutricycle es ese método, ordenado y automatizado, para que no tengas que llevar la cuenta vos.',
    ],
    credentialsEyebrow: 'Formación',
    credentialsTitle: 'De dónde viene',
    credentialsAccent: 'el método',
    credentials: [
      'Seis años aplicando y ajustando el método en mi propio ciclo antes de enseñarlo.',
      'Acompañamiento a mujeres con SPM, SOP, acné hormonal, fatiga y ciclos irregulares.',
      'Más de 40 recetas desarrolladas y clasificadas por fase del ciclo.',
    ],
    pendingLabel: 'Pendiente del cliente:',
    pendingBody: 'titulaciones, certificaciones y años de práctica profesional. Esta lista sólo recoge lo verificable hoy — nada aquí está inventado.',
    methodEyebrow: 'El método',
    methodTitle: 'Tres cosas que',
    methodAccent: 'no negocio',
    methodCta: 'Cómo lo aplica la app',
    pillars: {
      medicine: {
        title: 'La comida como medicina',
        body: 'Cada alimento elegido por lo que le hace a tus hormonas, no por sus calorías.',
      },
      synced: {
        title: 'Sincronizada a tu ciclo',
        body: 'Lo que tu cuerpo necesita cambia cada semana. Tu plan también.',
      },
      noDiets: {
        title: 'Sin dietas restrictivas',
        body: 'Nada de contar calorías ni prohibirte comida. Ese camino ya lo probaste.',
      },
    },
  },

  /** /como-funciona — the furniture around the five steps. */
  method: {
    stepsEyebrow: 'Cinco pasos',
    stepsTitle: 'Lo que pasa',
    stepsAccent: 'desde que la abrís',
    whyEyebrow: 'Por qué funciona',
    whyTitle: 'Tu cuerpo no es el mismo',
    whyAccent: 'todas las semanas',
    whyLead: 'Tus hormonas suben y bajan en un patrón que se repite cada mes. Comer en contra de ese patrón cuesta el doble; comer a favor, la mitad.',
    phasesCta: 'Conocé las 4 fases en detalle',
    originEyebrow: 'El método',
    originTitle: 'Seis años de',
    originAccent: 'prueba propia',
    originBody1: 'Nutricycle no salió de una hoja de cálculo. Salió de seis años en los que Alicia revirtió sus propios síntomas —acné, fatiga, ciclos irregulares— usando la alimentación como medicina.',
    originBody2: 'La app es ese método, ordenado y automatizado, para que no tengas que llevar la cuenta vos.',
    originCta: 'Conocé a Alicia',
  },

  /** /ciclo and /ciclo/[fase]. */
  cycle: {
    insideTitle: 'Qué pasa por dentro',
    feelsTitle: 'Cómo suele sentirse',
    foodEyebrow: 'Alimentación',
    foodTitle: 'Qué acompaña',
    foodAccent: 'a tu cuerpo ahora',
    recipesCta: 'Ver recetas de esta fase',
    movementTitle: 'Movimiento',
    tipTitle: 'Un apunte práctico',
    noticeBefore: 'Información general, no diagnóstico.',
    noticeLink: 'Leé el aviso médico',
    noticeAfter: 'antes de hacer cambios importantes en tu alimentación.',
    otherPhases: 'Otras fases',
    prevPhase: 'Fase anterior',
    nextPhase: 'Fase siguiente',
    allPhases: 'Ver las cuatro fases',
    mapEyebrow: 'El mapa',
    mapTitle: 'Un ciclo completo,',
    mapAccent: 'de principio a fin',
    detailCtaBefore: 'Ver la fase',
    detailCtaAfter: ' en detalle',
    rangeNote: 'Los rangos de días son de un ciclo de 28 días. El tuyo puede durar entre 21 y 35 y sigue siendo normal — la app ajusta las fases a tu duración real.',
    disclaimerTitle: 'Esto es información, no diagnóstico',
    disclaimerBody: 'Lo que leés acá describe tendencias generales del ciclo menstrual. No reemplaza el consejo de un profesional de salud, y hay situaciones —embarazo, SOP, endometriosis, medicación hormonal— en las que conviene consultarlo antes de cambiar tu alimentación.',
    disclaimerLink: 'Leer el aviso médico completo',
    phaseEyebrow: 'Fase',
    detailCta: 'Ver la fase en detalle',
  },

  /** Shared empty states and small page furniture. */
  content: {
    mealType: { desayuno: 'desayuno', almuerzo: 'almuerzo', snack: 'snack', cena: 'cena' },
    premiumNote: 'Incluido en el Plan Hormonal, desde la app.',
    tips: 'Consejos',
    recipesEmptyBody: 'Estamos preparando la selección abierta. Mientras tanto, la biblioteca completa está en la app.',
    recipesEmptyAction: 'Ver qué incluye la app',
    recipesPhaseEmptyTitleBefore: 'Aún no hay recetas para la fase',
    recipesPhaseEmptyBody: 'Estamos publicando la selección por fases. La biblioteca completa está disponible en la app.',
    videosEmptyBody: 'Estamos subiendo las recetas en video. Mientras tanto, la biblioteca completa está en la app.',
    articlesEmptyBody: 'Mientras tanto, la guía de las cuatro fases explica lo esencial: qué pasa en tu cuerpo cada semana y qué comer en cada una.',
    articlesEmptyAction: 'Ver las 4 fases',
    recipeEyebrow: 'Receta',
    preparation: 'Preparación',
    whyPhase: 'Por qué acompaña a esta fase',
    toPairWith: 'Para acompañar',
    variations: 'Variaciones',
    moreFromPhaseBefore: 'Más de la fase',
    alsoUseful: 'También te puede servir',
    nutritionNotice: 'Información general de nutrición, no consejo médico.',
    nutritionNoticeLink: 'Leé el aviso médico',
    nutritionNoticeAfter: 'antes de hacer cambios importantes en tu alimentación.',
    videoNotice: 'Sin locución: mirá las manos y seguí los pasos. Información general de nutrición, no consejo médico.',
    keepWatching: 'Seguí con estos',
    minutes: 'min',
    servings: 'porciones',
  },

  /** /faq */
  faq: {
    sectionLabel: 'Sección',
    stillStuckTitle: '¿No encontraste tu respuesta?',
    stillStuckBody: 'Escribinos y te respondemos por correo.',
    stillStuckCta: 'Ir a contacto',
  },

  /** /contacto */
  contact: {
    reasons: {
      support: {
        title: 'Soporte de la app',
        body: 'Algo no funciona, no podés entrar o la app se comporta raro.',
        subject: 'Soporte Nutricycle',
      },
      privacy: {
        title: 'Privacidad y datos',
        body: 'Acceder a tus datos, corregirlos o eliminar tu cuenta por completo.',
        subject: 'Solicitud sobre mis datos',
      },
      billing: {
        title: 'Suscripción y pagos',
        body: 'Dudas sobre el Plan Hormonal, restaurar una compra o cancelar.',
        subject: 'Consulta sobre mi suscripción',
      },
    },
    replyNoteBefore: 'Respondemos en días hábiles. Si tu consulta es sobre la suscripción, mirá primero las',
    replyNoteLink: 'preguntas frecuentes',
    replyNoteAfter: '— suele estar resuelta ahí.',
    writeTo: 'Escribir a',
  },

  /** /descargar and /enlaces */
  download: {
    points: [
      'Plan diario según tu fase actual',
      'recetas en video con beneficios hormonales',
      'Asesora con IA que conoce tu ciclo',
    ],
    badge: 'Gratis · iOS y Android',
    lead: 'Tu ciclo, tu guía. Recetas, alimentos clave y educación hormonal para cada fase — sin dietas y sin restricciones.',
    note: 'Descarga gratis · Plan Hormonal desde la app',
  },

  links: {
    eyebrow: 'Nutrición cíclica',
    titleBefore: 'Come con tu ciclo,',
    titleAccent: 'vuelve a sentirte tú',
    items: {
      recipes: { label: 'Recetas por fase del ciclo', note: 'Qué comer esta semana' },
      cycle: { label: 'Las 4 fases de tu ciclo', note: 'Qué le pasa a tu cuerpo' },
      features: { label: 'Qué hace la app', note: 'Todas las funciones' },
      courses: { label: 'Cursos con Alicia', note: 'Aprendé el método completo' },
      blog: { label: 'Educación hormonal', note: 'Artículos y guías' },
      about: { label: 'Sobre Alicia', note: 'El método detrás de Nutricycle' },
    },
  },

  /** Legal routes. The documents stay Spanish; this is the frame. */
  legal: {
    eyebrow: 'Legal',
    updated: 'Última actualización',
    index: 'Índice',
    contents: 'Contenido',
    spanishOnly: 'Este documento está disponible únicamente en español. La versión en español es la que rige; la traducción al inglés está pendiente.',
  },

  /**
   * Page <title> and meta description per route.
   *
   * These were static `export const metadata` objects in Spanish, so every
   * /en page shipped a Spanish title to search engines and to the browser
   * tab even after the visible copy was translated.
   */
  meta: {
    home: {
      title: 'Nutricycle — Come con tu ciclo, vuelve a sentirte tú',
      description: 'Nutricycle adapta tu alimentación, recetas y rutinas a cada fase de tu ciclo menstrual. Recetas por fase, gráfico hormonal y asesora con IA. Gratis en iOS y Android.',
    },
    blog: {
      title: 'Educación hormonal — artículos',
      description: 'Artículos sobre el ciclo menstrual, las hormonas y la nutrición cíclica. Qué pasa en cada fase y cómo acompañarlo con la alimentación.',
    },
    ciclo: {
      title: 'Las 4 fases de tu ciclo menstrual',
      description: 'Menstrual, folicular, ovulatoria y lútea: qué le pasa a tus hormonas en cada fase, cómo suele sentirse y qué alimentos acompañan mejor a tu cuerpo.',
    },
    comoFunciona: {
      title: 'Cómo funciona Nutricycle',
      description: 'Cinco pasos: creá tu cuenta, registrá tu ciclo, recibí tu plan diario, registrá cómo te sentís y mirá tus patrones a lo largo de los meses.',
    },
    contacto: {
      title: 'Contacto — Nutricycle',
      description: 'Escribinos a hola@aliciabasurto.com. Soporte de la app, privacidad y eliminación de datos, y consultas sobre la suscripción.',
    },
    cursos: {
      title: 'Cursos — Nutrición Cíclica con Alicia Basurto',
      description: 'Dos programas con el método que está detrás de la app: Nutrición Cíclica desde cero, con sesión semanal en vivo, y un mini curso de SOP y alimentación.',
    },
    descargar: {
      title: 'Descargar Nutricycle',
      description: 'Descarga Nutricycle gratis en iOS y Android. Recetas y alimentos clave para cada fase de tu ciclo.',
    },
    enlaces: {
      title: 'Enlaces — Nutricycle',
      description: 'Todos los enlaces de Nutricycle y Alicia Basurto en un solo lugar: la app, recetas por fase, educación hormonal y redes.',
    },
    faq: {
      title: 'Preguntas frecuentes — Nutricycle',
      description: '¿Es gratis? ¿Funciona con ciclos irregulares? ¿Quién ve mis datos de salud? Respuestas sobre la app, la privacidad, la suscripción y el soporte.',
    },
    funcionalidades: {
      title: 'Funciones de Nutricycle',
      description: 'Rastreador del ciclo, recetas por fase, gráfico hormonal, plan semanal de comidas, lista de compras y una asesora con IA que conoce tu fase. Todo en Nutricycle.',
    },
    membresia: {
      title: 'Membresía y precios — Nutricycle',
      description: 'Nutricycle es gratis para empezar. El Plan Hormonal desbloquea la asesora con IA sin límite, el predictor de ciclo y recetas guardadas ilimitadas.',
    },
    recetas: {
      title: 'Recetas por fase del ciclo',
      description: 'Recetas organizadas por fase del ciclo menstrual: menstrual, folicular, ovulatoria y lútea. Qué cocinar según lo que tu cuerpo necesita esta semana.',
    },
    sobre: {
      title: 'Sobre Alicia Basurto — Nutrición Cíclica',
      description: 'Health coach de nutrición hormonal. Después de seis años revirtiendo sus propios síntomas, Alicia consolidó un método basado en la alimentación como medicina.',
    },
    videos: {
      title: 'Recetas en video — Nutricycle',
      description: 'Diez recetas en video de 6 a 25 segundos: cámara cenital, manos a la obra y el plato terminado. Sin locución y sin vueltas.',
    },
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
    seeAll: 'Todas las recetas',
    understandPhase: 'Entender la fase',
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
