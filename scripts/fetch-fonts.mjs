/**
 * Download the two Google fonts into the repo so builds stop depending on
 * the network.
 *
 * `next/font/google` fetches at build time. That is fine until the network
 * is slow or down, at which point `next build` hangs on retries and the
 * project cannot be built or deployed at all — which is exactly what
 * happened here. Self-hosting makes the build hermetic and removes a
 * third-party runtime dependency from every page load as a bonus.
 *
 * Run once; the .woff2 files are committed. Re-run only to change weights.
 */
import fs from 'fs';
import path from 'path';

const OUT = 'apps/web/src/app/fonts';
fs.mkdirSync(OUT, { recursive: true });

// A modern browser UA is required, or Google serves the .ttf fallback CSS.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

const FAMILIES = [
  {
    name: 'CormorantGaramond',
    // weights + italics, matching what layout.tsx asked next/font for
    css: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
  },
  {
    name: 'Outfit',
    css: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap',
  },
];

const manifest = [];

for (const family of FAMILIES) {
  const res = await fetch(family.css, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${family.name}: CSS ${res.status}`);
  const css = await res.text();

  // Latin only. Google ships a @font-face per unicode-range; the others are
  // Cyrillic/Greek/Vietnamese and this site needs none of them.
  const faces = [...css.matchAll(/\/\* (\S+) \*\/\s*@font-face \{([^}]+)\}/g)]
    .filter(([, subset]) => subset === 'latin' || subset === 'latin-ext');

  for (const [, subset, body] of faces) {
    const url = /src:\s*url\(([^)]+)\)/.exec(body)?.[1];
    const weight = /font-weight:\s*(\d+)/.exec(body)?.[1] ?? '400';
    const style = /font-style:\s*(\w+)/.exec(body)?.[1] ?? 'normal';
    if (!url) continue;

    const file = `${family.name}-${weight}${style === 'italic' ? '-italic' : ''}-${subset}.woff2`;
    const bin = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!bin.ok) throw new Error(`${file}: ${bin.status}`);
    fs.writeFileSync(path.join(OUT, file), Buffer.from(await bin.arrayBuffer()));
    manifest.push({ family: family.name, file, weight, style, subset });
    console.log(
      file.padEnd(48),
      Math.round(fs.statSync(path.join(OUT, file)).size / 1024) + 'KB',
    );
  }
}

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length} files in ${OUT}`);
