#!/usr/bin/env node
/**
 * Transcode the client's recipe videos into web-deliverable formats.
 *
 * The masters in `apps/web/public/video/` are HEVC in a QuickTime container —
 * Safari-only in practice, and Chromium rejects them outright with
 * MEDIA_ERR_SRC_NOT_SUPPORTED. They also carry a leading `#` in the filename,
 * which is the URL fragment delimiter: `/video/#21.Taco….mov` resolves to
 * `/video/` and the file is never requested. Both problems are fixed here.
 * See doc/04-content/video-language.md §2.
 *
 * Outputs, per video, next to the master:
 *   {slug}.mp4    H.264 High/4.0 + AAC — the universal baseline
 *   {slug}.webm   VP9 + Opus — smaller, preferred by browsers that take it
 *
 * The outputs stay gitignored along with the masters (see .gitignore) — they
 * are meant to be uploaded to a CDN and addressed via NEXT_PUBLIC_MEDIA_BASE_URL.
 *
 * Requires ffmpeg with libx264, libvpx-vp9 and aac. Resolved from $FFMPEG, else
 * `ffmpeg` on PATH.
 *
 *   node scripts/transcode-videos.mjs [--mp4-only] [--force]
 */
import { execFile } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VIDEO_DIR = join(ROOT, 'apps/web/public/video');
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

const mp4Only = process.argv.includes('--mp4-only');
const force = process.argv.includes('--force');

/**
 * Master filename → web slug.
 *
 * Slugs are kebab-case per the {subject}-{descriptor} convention in
 * doc/04-content/image-assets.md §1. Two deliberate departures from the
 * filenames: `#24` drops "sin ensalada" (a shoot note, not part of the dish)
 * and `#26` drops the " (1)" duplicate-download suffix.
 *
 * `crop` is applied before scaling when a master needs it.
 */
const VIDEOS = [
  { file: '#21.Taco de zanahoria y queso.mov', slug: 'taco-de-zanahoria-y-queso' },
  { file: '#22.Pan de psyllium.mov', slug: 'pan-de-psyllium' },
  { file: '#24.Tortilla de col y zanahoria sin ensalada.mov', slug: 'tortilla-de-col-y-zanahoria' },
  { file: '#25.Pan con huevo y ensalada verde.mov', slug: 'pan-con-huevo-y-ensalada-verde' },
  { file: '#26.Wrap de arroz con atun (1).mov', slug: 'wrap-de-arroz-con-atun' },
  { file: '#27.Fideos con sardinas.mov', slug: 'fideos-con-sardinas' },
  { file: '#28.Granola de tiramisu.mov', slug: 'granola-de-tiramisu' },
  { file: '#29.Lentejas rojas al curry.mov', slug: 'lentejas-rojas-al-curry' },
  // 10px of black is baked into the bottom of this master. Crop it, then take
  // the width down to match so the result is exactly 16:9 rather than stretched.
  { file: '#30.Granola con yogurt y kiwi.mov', slug: 'granola-con-yogurt-y-kiwi', crop: '1262:710:9:0' },
  { file: '#31.Quinoa de chocolate.mov', slug: 'quinoa-de-chocolate' },
];

const filters = (crop) =>
  [crop && `crop=${crop}`, 'scale=1280:720:flags=lanczos', 'format=yuv420p']
    .filter(Boolean)
    .join(',');

const mb = (p) => (statSync(p).size / 1048576).toFixed(1);

async function encode(label, args, out) {
  if (existsSync(out) && !force) {
    console.log(`  ${label}  skip (exists, ${mb(out)} MB) — pass --force to redo`);
    return;
  }
  const started = process.hrtime.bigint();
  await run(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
    maxBuffer: 1 << 26,
  });
  const secs = Number(process.hrtime.bigint() - started) / 1e9;
  console.log(`  ${label}  ${mb(out)} MB in ${secs.toFixed(1)}s`);
}

async function main() {
  try {
    await run(FFMPEG, ['-version']);
  } catch {
    console.error(
      `ffmpeg not found (tried "${FFMPEG}").\n` +
        'Install it, or point $FFMPEG at a binary:  FFMPEG=/path/to/ffmpeg node scripts/transcode-videos.mjs'
    );
    process.exit(1);
  }

  mkdirSync(VIDEO_DIR, { recursive: true });
  let done = 0;

  for (const { file, slug, crop } of VIDEOS) {
    const src = join(VIDEO_DIR, file);
    if (!existsSync(src)) {
      console.warn(`! missing master, skipping: ${file}`);
      continue;
    }
    console.log(`${slug}  (${mb(src)} MB master)`);
    const vf = filters(crop);

    // H.264: CRF 21 is visually transparent on this material at 720p, and
    // faststart puts the moov atom first so playback can begin before the
    // whole file has arrived.
    await encode(
      'mp4 ',
      [
        '-i', src,
        '-vf', vf,
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '21',
        '-profile:v', 'high', '-level', '4.0',
        '-movflags', '+faststart',
        '-c:a', 'aac', '-b:a', '128k', '-ac', '2',
        join(VIDEO_DIR, `${slug}.mp4`),
      ],
      join(VIDEO_DIR, `${slug}.mp4`)
    );

    if (!mp4Only) {
      await encode(
        'webm',
        [
          '-i', src,
          '-vf', vf,
          '-c:v', 'libvpx-vp9', '-crf', '33', '-b:v', '0',
          '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2',
          '-c:a', 'libopus', '-b:a', '96k',
          join(VIDEO_DIR, `${slug}.webm`),
        ],
        join(VIDEO_DIR, `${slug}.webm`)
      );
    }
    done++;
  }

  console.log(`\n${done}/${VIDEOS.length} videos transcoded into ${VIDEO_DIR}`);
}

main().catch((err) => {
  console.error(err.stderr || err.message);
  process.exit(1);
});
