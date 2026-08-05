import type { Dictionary } from './es';

/**
 * English UI strings.
 *
 * Typed as `Dictionary`, so any key missing here is a compile error — an
 * untranslated string cannot reach a build and surface as a Spanish word on
 * an English page.
 */
export const en: Dictionary = {
  home: {
    hero: {
      badge: 'Cyclical nutrition with AI',
      title: 'Eat with your cycle.',
      accent: 'Feel like yourself again.',
      lead: 'Nutricycle adapts your food, your recipes and your routines to each phase of your menstrual cycle — automatically.',
      note: 'Free · iOS and Android · No card',
    },
    problem: {
      eyebrow: 'Why it is so hard',
      title: 'It is not a lack of discipline.',
      accent: 'It is a lack of context.',
    },
    steps: {
      eyebrow: 'How it works',
      titleBefore: 'Nutrition that syncs',
      accent: 'to your body',
      titleAfter: '',
      lead: 'Three steps. The app works out the rest for you, every day.',
    },
    features: {
      eyebrow: 'What is included',
      title: 'Everything your body',
      accent: 'already knew to ask for',
      aiBadge: 'With AI',
      seeAll: 'See all the features',
    },
    reviews: {
      previous: 'Previous',
      next: 'Next',
      listLabel: 'Customer testimonials',
      starsOf: 'out of 5 stars',
      eyebrow: 'Testimonials',
      titleBefore: 'What changes when',
      accent: 'you listen to your cycle',
    },
    founder: {
      eyebrow: 'About me',
      name: 'Alicia Basurto',
      role: 'Hormonal nutrition health coach',
      titleBefore: 'Alicia Basurto:',
      accent: 'Cyclical Nutrition',
      quote: 'The right food at the right moment.',
      pillars: {
        medicine: {
          title: 'Food as medicine',
          body: 'Every food chosen for what it does to your hormones.',
        },
        synced: {
          title: 'Synced to your cycle',
          body: 'What your body needs changes every week. So does your plan.',
        },
        noDiets: {
          title: 'No restrictive diets',
          body: 'No counting calories, no forbidding yourself food.',
        },
      },
      alt: {
        smiling: 'Alicia Basurto, hormonal nutrition health coach, in her kitchen',
        tea: 'Alicia Basurto holding a herbal tea in her kitchen',
        chopping: 'Alicia Basurto chopping fresh vegetables in her kitchen',
      },
    },
    phaseLabel: {
      menstrual: 'Menstrual phase',
      folicular: 'Follicular phase',
      ovulatoria: 'Ovulatory phase',
      lutea: 'Luteal phase',
    },
  },

  pages: {
    blog: {
      eyebrow: 'Hormonal education',
      title: 'Understanding your cycle',
      accent: 'changes how you treat yourself',
      lead: 'Articles on what your hormones are doing, why you feel different each week, and what to do about it.',
      emptyTitle: 'The first articles are on their way',
    },
    ciclo: {
      eyebrow: 'Your cycle',
      title: 'Four phases,',
      accent: 'four different bodies',
      lead: 'Your hormones rise and fall in a pattern that repeats every month. Understanding it changes what you expect of yourself each week.',
    },
    comoFunciona: {
      eyebrow: 'How it works',
      title: 'From one date',
      accent: 'to a daily plan',
      lead: 'There is nothing new to learn and nothing to keep count of. You log one date and the app does the rest, every day.',
    },
    cursos: {
      eyebrow: 'Courses',
      title: 'Learn the method once.',
      accent: 'Apply it for the rest of your life.',
      lead: 'These are not generic nutrition courses. They are programmes built on the same method behind the app — so you understand why it works and can apply it without depending on anyone.',
    },
    contacto: {
      eyebrow: 'Contact',
      title: 'Write to us and',
      accent: 'we will reply',
      lead: 'We are a small team, so we reply by email. Pick the subject and it goes straight to the right person.',
    },
    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'What people',
      accent: 'usually ask us',
      lead: 'About the app, your health data, the subscription, and what to do if something is not working.',
    },
    funcionalidades: {
      eyebrow: 'Features',
      title: 'Everything Nutricycle',
      accent: 'does for you',
      lead: 'A cycle tracker, a nutrition plan and a hormonal coach in the same app. This is what you will find inside.',
    },
    membresia: {
      eyebrow: 'Membership',
      title: 'Free to start,',
      accent: 'complete when you need it',
      lead: 'Everything essential is in the free plan. The Hormonal Plan is for when you want to ask the AI without counting messages.',
    },
    recetas: {
      eyebrow: 'Recipes',
      title: 'Cook for the phase',
      accent: 'you are in',
      lead: 'An open selection of recipes by phase. The full library, with more than 40 recipes, lives inside the app.',
      emptyTitle: 'No recipes published yet',
      phaseAccent: 'what to cook',
    },
    sobre: {
      eyebrow: 'About me',
      title: 'Hi, I am Alicia',
      reviewsTitle: 'Stories from women who already',
      reviewsAccent: 'eat by phase',
      lead: 'Hormonal nutrition health coach. I teach women to sync their eating with the intelligence of their menstrual cycle.',
    },
    videos: {
      eyebrow: 'Videos',
      title: 'Watch it once',
      accent: 'and you will know how',
      lead: 'Ten recipes filmed from above. None of them runs past twenty-five seconds.',
      emptyTitle: 'The video library is in preparation',
      single: 'Video',
    },
  },

  a11y: {
    skipToContent: 'Skip to content',
  },

  courses: {
    willLearn: 'What you will learn',
    includes: 'What it includes',
    askAbout: 'Ask about this programme',
    enrolEyebrow: 'Enrolment',
    enrolTitle: 'Write to Alicia and',
    enrolAccent: 'hold your place',
    enrolLead: 'Tell her where you are right now and which programme interests you. She replies with the dates of the next group and how to enrol.',
    pendingLabel: 'Pending from the client:',
    pendingBody: 'price, duration, start dates and a payment link for each programme. The brochure supplied does not include them, so enrolment runs by email for now — none of it is invented on the page.',
  },

  nav: {
    method: 'Method',
    cycle: 'Your cycle',
    recipes: 'Recipes',
    courses: 'Courses',
    about: 'About Alicia',
    features: 'Features',
    membership: 'Membership',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'Nutricycle — home',
    primaryLeft: 'Primary navigation, left',
    primaryRight: 'Primary navigation, right',
    primaryMobile: 'Primary navigation, mobile',
    language: 'Language',
    switchLanguage: 'Change language',
  },

  footer: {
    blurb: 'Cyclical nutrition for your hormonal health. Learn to eat with your phase.',
    explore: 'Explore',
    company: 'Nutricycle',
    legal: 'Legal',
    rights: 'All rights reserved.',
    blog: 'Blog',
    videos: 'Videos',
    phases: 'The four phases',
    faq: 'FAQ',
    contact: 'Contact',
    howItWorks: 'How it works',
    aboutAlicia: 'About Alicia',
  },

  cta: {
    eyebrow: 'Available on iOS and Android',
    title: 'Your cycle, your guide —',
    accent: 'in your pocket',
    lead: 'Every day, the foods and recipes your body needs for the phase you are in. No diets, no restrictions.',
    rating: 'Rating',
    recipes: 'Recipes',
    phases: 'Phases',
    note: 'Free download · Hormonal Plan from the app',
  },

  store: {
    appStoreTop: 'Download on the',
    appStore: 'App Store',
    googlePlayTop: 'Get it on',
    googlePlay: 'Google Play',
    download: 'Download',
    downloadFree: 'Download free',
    downloadApp: 'Download the app',
  },

  common: {
    readMore: 'Read more',
    seeAll: 'See all',
    back: 'Back',
    minutes: 'min',
    servings: 'servings',
    phase: 'Phase',
    generalInfo: 'General information, not a diagnosis.',
    readDisclaimer: 'Read the medical disclaimer',
    medicalNote: 'General nutrition information, not medical advice.',
    comingSoon: 'Coming soon',
  },

  phases: {
    eyebrow: 'The four phases',
    inside: 'What happens inside',
    feels: 'How it usually feels',
    eating: 'Eating',
    eatingTitle: 'What supports',
    eatingAccent: 'your body right now',
    movement: 'Movement',
    practicalNote: 'A practical note',
    trendsNote: 'These are tendencies, not rules. Every body experiences them differently.',
    seeRecipes: 'See recipes for this phase',
    otherPhases: 'Other phases',
    previousPhase: 'Previous phase',
    nextPhase: 'Next phase',
    seeAllFour: 'See all four phases',
  },

  recipes: {
    eyebrow: 'Recipes',
    title: 'Cook for',
    accent: 'the phase you are in',
    lead: 'An open selection of recipes by phase. The full library, with more than 40 recipes, lives inside the app.',
    all: 'All',
    ingredients: 'Ingredients',
    method: 'Method',
    tips: 'Tips',
    whyPhase: 'Why it suits this phase',
    pairings: 'Serve with',
    variations: 'Variations',
    emptyTitle: 'No recipes published for this phase yet',
    emptyBody: 'The full library lives inside the app, with more than 40 recipes by phase.',
  },

  videos: {
    eyebrow: 'Videos',
    title: 'Watch once',
    accent: 'and you’ll know how',
    lead: 'Short recipe videos and plain explanations about your cycle.',
    watch: 'Watch video',
    duration: 'Duration',
    emptyTitle: 'The video library is in preparation',
    emptyBody: 'Phase videos live inside the app today, alongside the recipes and the weekly plan.',
    seeWhatsInside: 'See what the app includes',
    unsupported: 'Your browser cannot play this video:',
  },

  blog: {
    eyebrow: 'Blog',
    emptyTitle: 'Articles are on the way',
    emptyBody: 'In the meantime, the app has a library of hormonal education by phase.',
  },

  errors: {
    notFoundTitle: 'This page does not exist',
    notFoundBody: 'The link may be broken or the page may have moved.',
    backHome: 'Back to homepage',
  },
};
