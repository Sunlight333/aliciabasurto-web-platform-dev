import { localizePath, canonicalPhase, phaseSlug } from '../apps/web/src/lib/i18n/routes.ts';

const cases: [string, 'es' | 'en', string][] = [
  ['/', 'en', '/en'],
  ['/en', 'es', '/'],
  ['/recetas', 'en', '/en/recipes'],
  ['/en/recipes', 'es', '/recetas'],
  ['/como-funciona', 'en', '/en/how-it-works'],
  ['/en/how-it-works', 'es', '/como-funciona'],
  ['/ciclo', 'en', '/en/cycle'],
  ['/ciclo/lutea', 'en', '/en/cycle/luteal'],
  ['/en/cycle/luteal', 'es', '/ciclo/lutea'],
  ['/ciclo/folicular', 'en', '/en/cycle/follicular'],
  ['/en/cycle/follicular', 'es', '/ciclo/folicular'],
  ['/recetas/fase/lutea', 'en', '/en/recipes/phase/luteal'],
  ['/en/recipes/phase/luteal', 'es', '/recetas/fase/lutea'],
  ['/recetas/crema-de-zapallo', 'en', '/en/recipes/crema-de-zapallo'],
  ['/en/recipes/crema-de-zapallo', 'es', '/recetas/crema-de-zapallo'],
  ['/videos/pan-de-psyllium', 'en', '/en/videos/pan-de-psyllium'],
  ['/funcionalidades', 'en', '/en/features'],
  ['/membresia', 'en', '/en/membership'],
  ['/sobre', 'en', '/en/about'],
  ['/contacto', 'en', '/en/contact'],
  ['/descargar', 'en', '/en/download'],
  ['/aviso-medico', 'en', '/en/medical-disclaimer'],
  ['/en/medical-disclaimer', 'es', '/aviso-medico'],
  ['/privacidad', 'en', '/en/privacy'],
  ['/terminos', 'en', '/en/terms'],
  ['/faq', 'en', '/en/faq'],
  ['/en/faq', 'es', '/faq'],
  ['/blog', 'en', '/en/blog'],
  ['/enlaces', 'en', '/en/links'],
  // Idempotence: translating to the locale a path is already in changes nothing.
  ['/recetas', 'es', '/recetas'],
  ['/en/recipes', 'en', '/en/recipes'],
  // Unknown path falls back to the locale root rather than 404-ing.
  ['/no-such-page', 'en', '/en'],
];

let fail = 0;
for (const [input, to, expected] of cases) {
  const got = localizePath(input, to);
  const ok = got === expected;
  if (!ok) fail++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${input.padEnd(30)} -> ${to}  ${got.padEnd(30)} ${ok ? '' : 'expected ' + expected}`);
}

// Round-trip every Spanish route through English and back.
const roundTrip = [
  '/', '/como-funciona', '/ciclo', '/ciclo/menstrual', '/ciclo/folicular',
  '/ciclo/ovulatoria', '/ciclo/lutea', '/recetas', '/recetas/fase/menstrual',
  '/funcionalidades', '/membresia', '/sobre', '/faq', '/contacto', '/blog',
  '/videos', '/descargar', '/enlaces', '/privacidad', '/terminos', '/cookies',
  '/aviso-medico',
];
console.log('\nround trip es -> en -> es:');
for (const p of roundTrip) {
  const back = localizePath(localizePath(p, 'en'), 'es');
  const ok = back === p;
  if (!ok) fail++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${p.padEnd(28)} ${localizePath(p, 'en').padEnd(30)} ${back}`);
}

console.log('\nphase helpers:', canonicalPhase('luteal'), phaseSlug('lutea', 'en'), phaseSlug('lutea', 'es'));
console.log(fail === 0 ? '\nALL PASS' : `\n${fail} FAILURES`);
process.exit(fail ? 1 : 0);
