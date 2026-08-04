#!/usr/bin/env node
/**
 * Extract the poster frame for each recipe video.
 *
 * The timestamps below are hand-picked, and they have to be: the obvious
 * choice — the last frame — is unusable on most of these, because the videos
 * end with a hand still in shot. doc/04-content/video-language.md §5 called
 * for a manual pass; this file is the result of it.
 *
 * Six of the ten have a hands-free frame of the finished dish. Four
 * (#21, #22, #24, #28) have none anywhere in their duration — for those the
 * timestamp is the best-composed frame of the finished dish, hand included,
 * which is on-brand anyway: hands doing the work is the house style.
 *
 * Posters are committed (unlike the video files, which are gitignored and
 * belong on a CDN) because the listing, the card grid and the OG images all
 * need them whether or not the media host is reachable.
 *
 *   node scripts/extract-posters.mjs [--force]
 */
import { execFile } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VIDEO_DIR = join(ROOT, 'apps/web/public/video');
const POSTER_DIR = join(ROOT, 'apps/web/public/images/videos');
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const force = process.argv.includes('--force');

/** `hands: true` marks a poster where no hands-free frame exists in the master. */
const POSTERS = [
  { slug: 'taco-de-zanahoria-y-queso', file: '#21.Taco de zanahoria y queso.mov', t: 24.9, hands: true },
  { slug: 'pan-de-psyllium', file: '#22.Pan de psyllium.mov', t: 14.5, hands: true },
  { slug: 'tortilla-de-col-y-zanahoria', file: '#24.Tortilla de col y zanahoria sin ensalada.mov', t: 14.07, hands: true },
  { slug: 'pan-con-huevo-y-ensalada-verde', file: '#25.Pan con huevo y ensalada verde.mov', t: 0 },
  { slug: 'wrap-de-arroz-con-atun', file: '#26.Wrap de arroz con atun (1).mov', t: 0 },
  { slug: 'fideos-con-sardinas', file: '#27.Fideos con sardinas.mov', t: 19.0 },
  { slug: 'granola-de-tiramisu', file: '#28.Granola de tiramisu.mov', t: 1.4, hands: true },
  { slug: 'lentejas-rojas-al-curry', file: '#29.Lentejas rojas al curry.mov', t: 5.87 },
  // Same 10px black band as the transcode — crop it so poster and video match.
  { slug: 'granola-con-yogurt-y-kiwi', file: '#30.Granola con yogurt y kiwi.mov', t: 5.25, crop: '1262:710:9:0' },
  { slug: 'quinoa-de-chocolate', file: '#31.Quinoa de chocolate.mov', t: 1.0 },
];

async function main() {
  try {
    await run(FFMPEG, ['-version']);
  } catch {
    console.error(`ffmpeg not found (tried "${FFMPEG}"). Set $FFMPEG to a binary path.`);
    process.exit(1);
  }

  mkdirSync(POSTER_DIR, { recursive: true });

  for (const { slug, file, t, crop, hands } of POSTERS) {
    const src = join(VIDEO_DIR, file);
    const out = join(POSTER_DIR, `${slug}.jpg`);
    if (!existsSync(src)) {
      console.warn(`! missing master, skipping: ${file}`);
      continue;
    }
    if (existsSync(out) && !force) {
      console.log(`${slug}  skip (exists)`);
      continue;
    }
    const vf = [crop && `crop=${crop}`, 'scale=1280:720:flags=lanczos'].filter(Boolean).join(',');
    // -ss before -i seeks by keyframe and is fast; accurate enough at 30fps
    // for a still, and these timestamps were chosen from frames sampled the
    // same way, so what you saw is what you get.
    await run(FFMPEG, [
      '-hide_banner', '-loglevel', 'error', '-y',
      '-ss', String(t), '-i', src,
      '-frames:v', '1', '-vf', vf, '-q:v', '3',
      out,
    ]);
    const kb = (statSync(out).size / 1024).toFixed(0);
    console.log(`${slug}  t=${t}s  ${kb} KB${hands ? '  (hand in frame — no clean frame exists)' : ''}`);
  }

  console.log(`\nPosters written to ${POSTER_DIR}`);
}

main().catch((err) => {
  console.error(err.stderr || err.message);
  process.exit(1);
});
