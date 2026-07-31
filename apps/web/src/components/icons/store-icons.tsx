/**
 * Store glyphs for the download buttons.
 *
 * ⚠️ These are custom buttons carrying the platform marks, not Apple's or
 * Google's official badge lockups. That is the common pattern and reads
 * clearly, but the strictly compliant asset is each program's official
 * artwork. Drop those into /public/badges/ and swap `StoreButtons` when
 * they arrive (image-assets.md §5 gap #5).
 */

export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" className={className} fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

export function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      {/* left wing */}
      <path
        d="M3.6 1.8 13.8 12 3.6 22.2A1 1 0 0 1 3 21.3V2.7a1 1 0 0 1 .6-.9Z"
        fill="#00A0FF"
      />
      {/* upper */}
      <path d="M3.6 1.8 16.4 8.6 13.8 12 3.6 1.8Z" fill="#00E17B" />
      {/* lower */}
      <path d="M13.8 12 16.4 15.4 3.6 22.2 13.8 12Z" fill="#FF3A44" />
      {/* right point */}
      <path
        d="m16.4 8.6 3.8 2.2c1.1.6 1.1 1.8 0 2.4l-3.8 2.2L13.8 12l2.6-3.4Z"
        fill="#FFC900"
      />
    </svg>
  );
}
