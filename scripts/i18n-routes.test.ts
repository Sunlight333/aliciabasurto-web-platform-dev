import { localizePath, canonicalPhase, phaseSlug } from '../apps/web/src/lib/i18n/routes.ts';

const cases: [string, 'es' | 'en', string][] = [
  ['/', 'en', '/en'],
  ['/en', 'es', '/'],
  ['/recetas', 'en', '/en/recetas'],
  ['/en/recetas', 'es', '/recetas'],
  ['/como-funciona', 'en', '/en/como-funciona'],
  ['/en/como-funciona', 'es', '/como-funciona'],
  ['/ciclo', 'en', '/en/ciclo'],
  ['/ciclo/lutea', 'en', '/en/ciclo/lutea'],
  ['/en/ciclo/lutea', 'es', '/ciclo/lutea'],
  ['/ciclo/folicular', 'en', '/en/ciclo/folicular'],
  ['/en/ciclo/folicular', 'es', '/ciclo/folicular'],
  ['/recetas/fase/lutea', 'en', '/en/recetas/fase/lutea'],
  ['/en/recetas/fase/lutea', 'es', '/recetas/fase/lutea'],
  ['/recetas/crema-de-zapallo', 'en', '/en/recetas/crema-de-zapallo'],
  ['/en/recetas/crema-de-zapallo', 'es', '/recetas/crema-de-zapallo'],
  ['/videos/pan-de-psyllium', 'en', '/en/videos/pan-de-psyllium'],
  ['/funcionalidades', 'en', '/en/funcionalidades'],
  ['/membresia', 'en', '/en/membresia'],
  ['/sobre', 'en', '/en/sobre'],
  ['/contacto', 'en', '/en/contacto'],
  ['/descargar', 'en', '/en/descargar'],
  ['/aviso-medico', 'en', '/en/aviso-medico'],
  ['/en/aviso-medico', 'es', '/aviso-medico'],
  ['/privacidad', 'en', '/en/privacidad'],
  ['/terminos', 'en', '/en/terminos'],
  ['/faq', 'en', '/en/faq'],
  ['/en/faq', 'es', '/faq'],
  ['/blog', 'en', '/en/blog'],
  ['/enlaces', 'en', '/en/enlaces'],
  // Idempotence: translating to the locale a path is already in changes nothing.
  ['/recetas', 'es', '/recetas'],
  ['/en/recetas', 'en', '/en/recetas'],
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
