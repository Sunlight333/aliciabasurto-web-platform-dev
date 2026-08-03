/**
 * Photographic texture behind a section.
 *
 * Held well back behind a cream scrim: it should register as *material*,
 * not imagery. A section already carries cards and a heading — a second
 * subject competing with them is what makes a page feel busy rather than
 * layered.
 *
 * The top and bottom fades are the point as much as the image. Without
 * them the texture ends on a hard line and the section reads as a pasted
 * block instead of part of the page.
 *
 * Use on **alternating** sections only. Every section textured is the
 * same monotony as none of them.
 *
 * Contrast over the scrim is measured, not assumed — see
 * image-assets.md §3b.
 */
export function SectionTexture({
  src,
  /** Higher hides more of the image. Raise it for busy or contrasty frames. */
  scrim = 0.86,
}: {
  src: string;
  scrim?: number;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${src}')` }}
      />
      <div
        className="absolute inset-0 bg-surface-raised"
        style={{ opacity: scrim }}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-surface-raised to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface-raised to-transparent" />
    </div>
  );
}
