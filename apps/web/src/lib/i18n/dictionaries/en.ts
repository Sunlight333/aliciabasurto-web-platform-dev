import type { Dictionary } from './es';

/**
 * English UI strings.
 *
 * Typed as `Dictionary`, so any key missing here is a compile error — an
 * untranslated string cannot reach a build and surface as a Spanish word on
 * an English page.
 */
export const en: Dictionary = {
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
    primaryLeft: 'Primary left',
    primaryRight: 'Primary right',
    primaryMobile: 'Primary mobile',
    language: 'Language',
    languageSoon: 'Spanish version coming soon',
  },

  footer: {
    explore: 'Explore',
    company: 'Nutricycle',
    legal: 'Legal',
    rights: 'All rights reserved.',
    blog: 'Blog',
    videos: 'Videos',
    phases: 'The 4 phases',
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
    trendsNote: 'These are tendencies, not rules. Every body lives them differently.',
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
    lead: 'An open selection of recipes by phase. The full library, with more than 40, lives inside the app.',
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
    accent: 'and you know how',
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
    backHome: 'Back to home',
  },
};
