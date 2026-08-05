/**
 * Bidirectional purity check.
 *
 * The requirement is not "the switch navigates" — it is that a Spanish page
 * contains only Spanish and an English page contains only English. That is
 * two separate failures, so this checks both directions:
 *
 *   ES leaking onto /en   — the untranslated case
 *   EN leaking onto ES    — the over-translated case, where a dictionary
 *                           fallback or a hardcoded English string shows
 *                           English to a Spanish reader
 *
 * Brand names are exempt, per the requirement.
 *
 * Usage: node scripts/i18n-purity-check.mjs http://127.0.0.1:3281
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://127.0.0.1:3281';

const ROUTES = [
  '', '/recetas', '/recetas/crema-de-zapallo', '/recetas/fase/menstrual',
  '/recetas/fase/folicular', '/recetas/fase/ovulatoria', '/recetas/fase/lutea',
  '/ciclo', '/ciclo/menstrual', '/ciclo/folicular', '/ciclo/ovulatoria',
  '/ciclo/lutea', '/como-funciona', '/funcionalidades', '/membresia', '/sobre',
  '/faq', '/contacto', '/blog', '/videos', '/videos/pan-de-psyllium',
  '/descargar', '/enlaces', '/privacidad', '/terminos', '/cookies',
  '/aviso-medico',
];

/** Brand and proper nouns — exempt in both directions. */
const BRAND = [
  'Nutricycle', 'Alicia', 'Basurto', 'App Store', 'Google Play', 'Instagram',
  'YouTube', 'Facebook', 'TikTok', 'iOS', 'Android', 'Español', 'English',
];

const ES_ACCENTS = /[áéíóúüñÁÉÍÓÚÜÑ¿¡]/u;

const ES_WORDS = new RegExp(
  '\\b(' + [
    'para','pero','porque','cuando','donde','todo','todos','toda','todas','este',
    'esta','estos','estas','ese','esa','tus','sus','del','los','las','una','unos',
    'unas','con','sin','desde','hasta','entre','sobre','tiene','tienen','hace',
    'hacer','puede','pueden','ser','estar','cada','más','menos','muy','también',
    'años','día','días','semana','mes','meses','cuerpo','ciclo','fase','fases',
    'receta','recetas','comida','alimento','alimentos','salud','hormonal',
    'hormonas','gratis','descargar','leer','aquí','ahora','siempre','nunca',
    'según','qué','cómo','tu','te','se','es','y','o','el','la','de','en','que',
  ].join('|') + ')\\b',
  'i',
);

/** English function words with no Spanish homograph. */
const EN_WORDS = new RegExp(
  '\\b(' + [
    'the','and','your','you','with','from','what','when','where','which','this',
    'these','those','their','they','have','has','been','will','would','should',
    'about','after','before','because','every','each','other','more','most',
    'less','than','then','they','into','over','under','through','during','while',
    'phase','phases','cycle','recipe','recipes','food','foods','health','free',
    'download','read','here','now','always','never','week','month','months',
    'day','days','body','hormonal','hormones','learn','eat','feel','know',
  ].join('|') + ')\\b',
  'i',
);

const strip = (t) => BRAND.reduce((s, b) => s.split(b).join(' '), t);

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

async function visibleText(url) {
  const res = await page.goto(url, { waitUntil: 'domcontentloaded' });
  if (!res || res.status() !== 200) return { status: res ? res.status() : 'ERR', nodes: [] };
  await page.waitForTimeout(220);
  const nodes = await page.evaluate(() => {
    const out = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walk.nextNode())) {
      const text = n.textContent.trim();
      if (!text || text.length < 3) continue;
      const el = n.parentElement;
      if (!el || el.closest('script,style,noscript')) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      out.push({ text, tag: el.tagName.toLowerCase() });
    }
    return out;
  });
  return { status: 200, nodes };
}

let esLeaks = 0, enLeaks = 0, esClean = 0, enClean = 0;
const detail = { en: [], es: [] };

for (const route of ROUTES) {
  // English page must contain no Spanish.
  const en = await visibleText(`${BASE}/en${route}`);
  if (en.status !== 200) { enLeaks++; detail.en.push({ route, status: en.status, hits: [] }); }
  else {
    const hits = en.nodes.filter(({ text }) => {
      const s = strip(text);
      return ES_ACCENTS.test(s) || ES_WORDS.test(s);
    });
    if (hits.length) { enLeaks += hits.length; detail.en.push({ route, status: 200, hits }); }
    else enClean++;
  }

  // Spanish page must contain no English.
  const es = await visibleText(`${BASE}${route || '/'}`);
  if (es.status !== 200) { esLeaks++; detail.es.push({ route, status: es.status, hits: [] }); }
  else {
    const hits = es.nodes.filter(({ text }) => {
      const s = strip(text);
      if (ES_ACCENTS.test(s)) return false;      // clearly Spanish
      return EN_WORDS.test(s) && !ES_WORDS.test(s);
    });
    if (hits.length) { esLeaks += hits.length; detail.es.push({ route, status: 200, hits }); }
    else esClean++;
  }
}

await browser.close();

console.log('=== A. Spanish leaking onto ENGLISH pages ===');
for (const { route, status, hits } of detail.en) {
  console.log(`  /en${route || ''} ${status !== 200 ? 'HTTP ' + status : hits.length + ' leaks'}`);
  for (const h of hits.slice(0, 3)) console.log(`      <${h.tag}> ${JSON.stringify(h.text.slice(0, 80))}`);
}
console.log(`  → ${enClean}/${ROUTES.length} English pages pure · ${enLeaks} Spanish leaks\n`);

console.log('=== B. English leaking onto SPANISH pages ===');
for (const { route, status, hits } of detail.es) {
  console.log(`  ${route || '/'} ${status !== 200 ? 'HTTP ' + status : hits.length + ' leaks'}`);
  for (const h of hits.slice(0, 3)) console.log(`      <${h.tag}> ${JSON.stringify(h.text.slice(0, 80))}`);
}
console.log(`  → ${esClean}/${ROUTES.length} Spanish pages pure · ${esLeaks} English leaks`);

const ok = enLeaks === 0 && esLeaks === 0;
console.log(`\n${ok ? 'PASS — each language shows only itself' : 'FAIL — pages are mixed'}`);
process.exit(ok ? 0 : 1);
