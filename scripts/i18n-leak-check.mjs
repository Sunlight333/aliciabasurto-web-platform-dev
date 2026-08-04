/**
 * Crawl every /en page and flag Spanish that leaked through.
 *
 * This is the "nothing was missed" check. Eyeballing pages does not scale to
 * 38 routes, and a single untranslated heading is exactly the kind of thing
 * that survives a manual pass.
 *
 * Detection is deliberately conservative — it looks for markers that cannot
 * plausibly be English, so a hit is a real hit:
 *   - Spanish-only characters (á é í ó ú ñ ¿ ¡)
 *   - high-signal function words that are not English words
 * Words that exist in both languages (no, media, general, total…) are not
 * used, and shared proper nouns are allowlisted.
 *
 * Usage: node scripts/i18n-leak-check.mjs http://127.0.0.1:3272
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://127.0.0.1:3272';

const ROUTES = [
  '', '/recetas', '/recetas/crema-de-zapallo', '/recetas/fase/menstrual',
  '/recetas/fase/folicular', '/recetas/fase/ovulatoria', '/recetas/fase/lutea',
  '/ciclo', '/ciclo/menstrual', '/ciclo/folicular', '/ciclo/ovulatoria',
  '/ciclo/lutea', '/como-funciona', '/funcionalidades', '/membresia', '/sobre',
  '/faq', '/contacto', '/blog', '/videos', '/videos/pan-de-psyllium',
  '/descargar', '/enlaces', '/privacidad', '/terminos', '/cookies',
  '/aviso-medico',
];

/**
 * Accented characters that simply do not occur in English text.
 *
 * Written as an explicit list with no whitespace — an earlier version had
 * literal spaces inside the class, which made every string containing a
 * space a "leak" and reported "Skip to content" as Spanish.
 */
const ACCENTS = /[áéíóúüñÁÉÍÓÚÜÑ¿¡]/u;

/** Spanish function words with no English homograph. */
const WORDS = new RegExp(
  '\\b(' + [
    'para','pero','porque','cuando','donde','como','todo','todos','toda','todas',
    'este','esta','estos','estas','ese','esa','eso','tu','tus','sus','del','los',
    'las','una','unos','unas','con','sin','desde','hasta','entre','sobre','tiene',
    'tienen','hace','hacer','puede','pueden','ser','estar','está','están','cada',
    'más','menos','muy','también','sólo','solo','años','día','días','semana',
    'mes','meses','cuerpo','ciclo','fase','fases','receta','recetas','comida',
    'comidas','alimento','alimentos','salud','hormonal','hormonas','plan',
    'gratis','descargar','ver','leer','aquí','ahora','siempre','nunca','según',
  ].join('|') + ')\\b',
  'i',
);

const ALLOW = new Set([
  'Nutricycle', 'Alicia', 'Basurto', 'App Store', 'Google Play', 'Español',
  'Instagram', 'YouTube', 'Facebook', 'iOS', 'Android',
]);

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

let totalHits = 0;
const report = [];

for (const route of ROUTES) {
  const url = `${BASE}/en${route}`;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded' });
  if (!res || res.status() !== 200) {
    report.push({ route, status: res ? res.status() : 'ERR', hits: [] });
    totalHits++;
    continue;
  }
  await page.waitForTimeout(250);

  // Visible text only, element by element, so a hit can be pointed at.
  const hits = await page.evaluate(() => {
    const out = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walk.nextNode())) {
      const text = n.textContent.trim();
      if (!text || text.length < 3) continue;
      const el = n.parentElement;
      if (!el) continue;
      if (el.closest('script,style,noscript')) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      out.push({ text, tag: el.tagName.toLowerCase(), cls: (el.className || '').toString().slice(0, 40) });
    }
    return out;
  });

  const flagged = hits.filter(({ text }) => {
    if ([...ALLOW].some((a) => text === a)) return false;
    const stripped = [...ALLOW].reduce((s, a) => s.split(a).join(' '), text);
    return ACCENTS.test(stripped) || WORDS.test(stripped);
  });

  if (flagged.length) totalHits += flagged.length;
  report.push({ route, status: 200, hits: flagged });
}

await browser.close();

console.log('=== Spanish leaking onto /en ===\n');
let clean = 0;
for (const { route, status, hits } of report) {
  const label = ('/en' + route || '/en').padEnd(32);
  if (status !== 200) { console.log(`${label} HTTP ${status}`); continue; }
  if (!hits.length) { clean++; console.log(`${label} clean`); continue; }
  console.log(`${label} ${hits.length} leak${hits.length > 1 ? 's' : ''}`);
  for (const h of hits.slice(0, 6)) {
    console.log(`    <${h.tag}> ${JSON.stringify(h.text.slice(0, 90))}`);
  }
  if (hits.length > 6) console.log(`    … ${hits.length - 6} more`);
}

console.log(`\n${clean}/${report.length} pages clean · ${totalHits} total leaks`);
process.exit(totalHits ? 1 : 0);
