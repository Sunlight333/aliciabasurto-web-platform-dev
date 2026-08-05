import type { Dictionary } from './es';

/**
 * English UI strings.
 *
 * Typed as `Dictionary`, so any key missing here is a compile error — an
 * untranslated string cannot reach a build and surface as a Spanish word on
 * an English page.
 */
export const en: Dictionary = {
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

  nav: {
    method: 'Method',
    cycle: 'Your cycle',
    recipes: 'Recipes',
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
