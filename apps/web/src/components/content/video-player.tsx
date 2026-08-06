import { videoPoster, videoSources } from '@/lib/media';
import { cn } from '@/lib/cn';

/**
 * The stage a client video sits on.
 *
 * Deliberately not a bare `<video>` dropped onto the page. These frames
 * average 48% lightness against a 97.5% cream surface — a raw rectangle
 * reads as a hole punched in the page rather than an object resting on it
 * (video-language.md §4). So: sunken surface underneath, the card's
 * rounding, a soft shadow, and cream margin doing the separating.
 *
 * 16:9 is reserved before the media loads. The masters are all 1280×720 and
 * the box must not collapse to zero height while the poster is still in
 * flight, or the page reflows under the reader.
 *
 * No `use client` and no custom controls: native controls are keyboard
 * accessible, screen-reader labelled and localised by the browser for free.
 * Nothing here needs JavaScript we would have to ship and maintain.
 */
export function VideoPlayer({
  slug,
  title,
  className,
  unsupported,
}: {
  slug: string;
  title: string;
  className?: string;
  /** Localised fallback text for browsers that cannot play the source. */
  unsupported: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-card border border-hairline bg-surface-sunken shadow-lg',
        className,
      )}
    >
      <video
        className="block aspect-video w-full bg-surface-sunken"
        controls
        // metadata, not auto: ten videos on one page at ~4 MB each would be
        // 40 MB of unrequested download. The poster carries the thumbnail.
        preload="metadata"
        playsInline
        poster={videoPoster(slug)}
      >
        {videoSources(slug).map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
        {/* Shown only where <video> itself is unsupported */}
        {unsupported} {title}.
      </video>
    </div>
  );
}
