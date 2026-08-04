/**
 * Where the recipe videos are served from, and how they are addressed.
 *
 * The transcoded .mp4/.webm files are gitignored along with their .mov
 * masters (see .gitignore) — 65 MB of media does not belong in the repo.
 * They are meant to be uploaded to a CDN or bucket and addressed through
 * `NEXT_PUBLIC_MEDIA_BASE_URL`. Left unset, the paths resolve to `/video/…`
 * under `public/`, which is exactly what a checkout that has run
 * `scripts/transcode-videos.mjs` will have.
 *
 * Posters are deliberately *not* routed through the same base. They are
 * small and committed, so the listing, the cards and the OG images render
 * whether or not the media host is reachable — a page whose thumbnails all
 * 404 is worse than one whose videos merely refuse to start.
 */
const BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? '').replace(/\/+$/, '');

export interface VideoSource {
  src: string;
  type: string;
}

/**
 * WebM first: a browser plays the first source it claims to support, and
 * VP9 comes out ~45% smaller than H.264 across this set. Anything that
 * doesn't take WebM falls through to the MP4, which everything plays.
 */
export function videoSources(slug: string): VideoSource[] {
  return [
    { src: `${BASE}/video/${slug}.webm`, type: 'video/webm' },
    { src: `${BASE}/video/${slug}.mp4`, type: 'video/mp4' },
  ];
}

export function videoPoster(slug: string): string {
  return `/images/videos/${slug}.jpg`;
}

/** 25.2 → "0:25" */
export function formatDuration(seconds: number): string {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

/** 25.2 → "PT25S", for schema.org VideoObject */
export function isoDuration(seconds: number): string {
  const total = Math.round(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `PT${m ? `${m}M` : ''}${s}S`;
}
