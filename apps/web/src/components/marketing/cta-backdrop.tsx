/**
 * Rotating photographic backdrop for the closing CTA band.
 *
 * Seven frames crossfading on a loop. The rotation is **pure CSS** — one
 * keyframe shared by every layer, staggered by `animation-delay`. No state,
 * no timer, no `use client`: this band closes every page on the site, and a
 * client component here would ship JavaScript and a hydration boundary to
 * all of them for something the compositor does on its own.
 *
 * Frames are `<img loading="lazy">` rather than CSS `background-image`
 * precisely because the band sits at the foot of the page — lazy loading is
 * guaranteed by the attribute, whereas deferring a background image is left
 * to the browser's discretion. Nothing is fetched until the reader is
 * near it.
 *
 * The cream scrim is not decoration. These frames average 57–73% lightness
 * against a 97.5% page, and the glass card sits directly on top of them —
 * the scrim is what keeps the band a light surface and the card's text
 * legible (video-language.md §4).
 *
 * Order is deliberate: no two consecutive frames repeat a setting, and the
 * two pink-linen shots are kept apart in the loop.
 */
const FRAMES = [
  { src: '/images/cta/bright-kitchen-tulips.avif' },
  { src: '/images/cta/marble-kitchen-gesture.avif' },
  { src: '/images/cta/sofa-plants-phone.avif' },
  { src: '/images/cta/pink-linen-standing.avif' },
  { src: '/images/cta/counter-vegetables.avif' },
  { src: '/images/cta/kitchen-wide-cup.avif' },
  { src: '/images/cta/pink-linen-close.avif' },
];

/** Seconds each frame holds before handing over. Mirrored in globals.css. */
const HOLD = 6;
/** Crossfade length. Also the head start layer 0 needs to be up at t=0. */
const FADE = 1.4;

export function CtaBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {FRAMES.map((f, i) => (
        <img
          // eslint-disable-next-line @next/next/no-img-element -- see doc comment
          key={f.src}
          src={f.src}
          alt=""
          className="cta-frame absolute inset-0 h-full w-full object-cover"
          // Negative on the first layer so it is already at full opacity on
          // the very first frame — otherwise the band opens on a blank wash.
          style={{ animationDelay: `${(i * HOLD - FADE).toFixed(1)}s` }}
          loading="lazy"
          decoding="async"
        />
      ))}

      {/* Keeps the band a light surface and the card legible over any frame */}
      <div className="absolute inset-0 bg-surface-raised/[0.74]" />
    </div>
  );
}
