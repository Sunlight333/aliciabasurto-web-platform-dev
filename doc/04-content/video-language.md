# The client's video language — and what it means for the design

**Date:** 2026-08-03
**Source:** `apps/web/public/video/` — 10 recipe videos supplied by the client, 132 MB
**Companion docs:** [image-assets.md](image-assets.md) · [revised-direction.md §4](../00-overview/revised-direction.md)

Every figure below is measured from the files, not estimated. Frames were
extracted with ffmpeg and sampled at 64×36 across 8 evenly-spaced points
per video.

---

## 1. What was supplied

| File | Duration |
| --- | --- |
| `#21.Taco de zanahoria y queso.mov` | 25s |
| `#22.Pan de psyllium.mov` | 15s |
| `#24.Tortilla de col y zanahoria sin ensalada.mov` | 17s |
| `#25.Pan con huevo y ensalada verde.mov` | 13s |
| `#26.Wrap de arroz con atun (1).mov` | 9s |
| `#27.Fideos con sardinas.mov` | 20s |
| `#28.Granola de tiramisu.mov` | 23s |
| `#29.Lentejas rojas al curry.mov` | 8s |
| `#30.Granola con yogurt y kiwi.mov` | 6s |
| `#31.Quinoa de chocolate.mov` | 14s |

**Uniform specs across all ten:** HEVC (H.265) in a QuickTime container,
1280×720, 16:9, 30 fps, AAC audio. 6–25s, mean ~15s. iPhone-recorded.

---

## 2. Two blockers, both discovered by hitting them

### 2a. HEVC will not play in most browsers

Chromium refuses all ten with `MEDIA_ERR_SRC_NOT_SUPPORTED`. HEVC is
Safari-only in practice — Chrome, Firefox and Edge will show a broken
player to the majority of visitors.

**Nothing in this folder can ship as-is.** Each needs an H.264 MP4
(universal) and ideally a WebM/AV1 companion. This is
[deployment.md §8 item 5](../06-operations/deployment.md) and
[image-assets.md §5 gap 7](image-assets.md), now with a confirmed cause.

### 2b. The leading `#` breaks every URL

`#` is the fragment delimiter. `/video/#21.Taco….mov` resolves to
`/video/` and the filename is discarded — the browser never requests the
file. [content README](README.md) flagged this; it is now verified, and
it broke frame extraction here until the path was percent-encoded.

Rename to kebab-case on the way through the transcode, matching the
`{subject}-{descriptor}` convention in [image-assets.md §1](image-assets.md).

---

## 3. The visual language

Remarkably consistent — ten videos, one grammar:

| Element | What it is |
| --- | --- |
| **Camera** | Fixed overhead flat-lay. Never moves, never cuts within a step. |
| **Subject** | Hands only. No face, ever. No presenter, no piece to camera. |
| **Surface** | Pale speckled stone/concrete, cool-neutral, filling the frame edge to edge. |
| **Props** | Cream ceramic bowls and plates, light-wood boards, a marble paddle board, black pan and tray, wooden spoons, linen cloths. |
| **Colour** | Comes *only* from the food — carrot orange, purple cabbage, herb green, tomato red, kiwi. Never from the set. |
| **Light** | Soft, even, diffuse, no hard shadow, no visible source. |
| **Graphics** | None. No text overlay, no lower third, no logo, no transition effect. |

The method is the subject. Nobody performs; a pair of hands does the work
and the dish arrives.

### Measured palette

| Metric | Value |
| --- | --- |
| Mean colour, all 10 | `#8c7b69` — `hsl(31, 14%, 48%)` |
| Per-video hue range | 24°–33° — warm, orange-brown family |
| Per-video saturation | 9%–20% |
| Mean saturation, all pixels | **21.4%** |
| Mean lightness | **48%** |

---

## 4. What this means for the site

### It confirms the palette — two of three axes

| Axis | Videos | Site tokens | Verdict |
| --- | --- | --- | --- |
| Hue | 31° | ink 23°, sand 42°, cream 53° | **Agrees.** Same warm-neutral family. |
| Saturation | 21% | sage 9.5%, sand 25% | **Agrees.** Both deliberately muted. |
| Lightness | 48% | cream 97.5%, sand 92% | **Disagrees, by ~49 points.** |

The brand direction is validated by the client's own content — the warm,
desaturated read was the right call and is not an invention of the site.

### But the site is a much lighter world than the client's content

This is the one finding that should change design decisions. A 1280×720
frame at 48% lightness dropped onto a 97.5% cream surface is a heavy dark
rectangle — it reads as a hole punched in the page, not as an element on
it. Every video and every still from these videos will do this.

**Design response:** client media needs a *stage*, not a slot. Sit it on
`surface-sunken` (92%) rather than cream, give it the card's rounding and
a soft shadow so it reads as an object resting on the page, and let the
generous cream margin do the separating. The mistake would be edge-to-edge
video bands on cream.

### The native format is 16:9 landscape

Not square, not portrait. Any video slot, poster frame or thumbnail grid
should be built at 16:9. Worth fixing before a component hard-codes
something else.

### The phase tints appear nowhere in the client's world

Lilac, blush, mint and sage are a site-invented wayfinding device. That is
legitimate — they carry the cycle-phase system — but they should never be
tinted *over* client imagery, or the two colour languages fight. Keep them
on chips, surfaces and rules; keep them off the photography.

### Overhead flat-lay is the house style

The client shoots straight down. The hero set sourced in
[image-assets.md §3b](image-assets.md) is mixed — some overhead
(`metodo`, `faq`), some oblique. Future imagery should bias overhead: it
is what the brand's own content looks like, and it is what will sit beside
these videos without a seam.

---

## 5. Poster frames — a caveat found while extracting

The obvious poster is the final plated dish. In practice **most of these
videos end with a hand still in frame**, so the last frame is not usable
as a still.

Sampling at 82% / 90% / 97% of duration, clean hands-free plated frames
exist for only four: `wrap-de-arroz-con-atun`, `fideos-con-sardinas`,
`granola-con-yogurt-y-kiwi`, and `pan-con-huevo-y-ensalada-verde`. The
rest need a hand-picked timestamp or a still shot separately.

Poster frames cannot be automated across the set. Budget for a manual pass.

---

## 6. What the site is missing that these solve

`RecipeCard` renders no image, and `VIDEOS` in
[`lib/content/from-files.ts`](../../apps/web/src/lib/content/from-files.ts)
is an empty array — `/videos` ships an empty state. **A nutrition site
with recipes at its centre currently has no food photography at all**,
while the client's own food photography sits unused in `public/video/`.

These ten videos are the closest thing to a solution in the repo. Using
them requires, in order:

1. Transcode to H.264 MP4 (+ WebM), rename kebab-case — unblocks everything
2. Hand-pick a poster frame per video (§5)
3. Give `RecipeCard` a 16:9 image slot on the sunken stage (§4)
4. Wire the video library and retire the `/videos` empty state

Steps 3 and 4 need recipe content that does not exist yet: only
`crema-de-zapallo` is published, and none of the ten videos matches it.
Publishing the videos means writing ten recipes to go with them — client
copy, not a build task.

---

## 7. What was built from this — 2026-08-03

Steps 1, 2 and 4 of §6 are done. `/videos` no longer renders an empty
state: it lists all ten with poster, duration and description, and each
has a detail page at `/videos/{slug}` with a working player.

### The two blockers are closed

**HEVC.** `scripts/transcode-videos.mjs` produces an H.264/AAC MP4 and a
VP9/Opus WebM per video at 1280×720. Verified by driving headless Chromium
at the real pages: all ten play in both formats, `currentTime` advances,
no console errors. 132 MB of masters → 42.6 MB MP4 + 22.8 MB WebM.

**The `#`.** Gone — every output is kebab-case (`taco-de-zanahoria-y-queso`).
`#24` also drops "sin ensalada", which was a shoot note rather than part of
the dish, and `#26` drops its " (1)" download suffix.

One defect surfaced that §1 missed: `#30` has 10px of black baked into the
bottom of the frame. Both the transcode and the poster crop it to
`1262:710:9:0` and rescale, so the output is a true 16:9 with no letterbox.

### Poster frames

`scripts/extract-posters.mjs` holds the hand-picked timestamp per video and
writes `public/images/videos/{slug}.jpg`. **These are committed**, unlike
the video files — the grid, the cards and the OG images have to render even
if the media host is unreachable.

§5 estimated four usable stills. Sampling the head and tail at 0.25s rather
than only 82/90/97% found six: the *opening* frame is often a clean plated
hero, which the original tail-only sweep could not see. The remaining four
(`#21`, `#22`, `#24`, `#28`) have no hands-free frame anywhere in their
duration, so they use the best-composed frame with a hand in shot — which
is on-brand regardless, per §3.

### Design decisions this doc drove

- `VideoPlayer` puts the video on `surface-sunken` with the card's rounding
  and a soft shadow — the "stage, not a slot" call in §4. No edge-to-edge
  video bands on cream anywhere.
- Every video slot and poster is 16:9, reserved before load so the page
  never reflows under the reader.
- No phase tint touches any client frame. `VideoCard` shows a duration
  badge, not a phase chip.
- Audio is real ambient kitchen sound (mean ≈ −23 dB, peaks near 0), not
  silence — so the player ships with controls and no autoplay.

### Still open — client input, not build work

1. **Phase assignment.** All ten are `"phase": "general"` in
   `src/content/videos.json`. Inferring a cycle phase from the ingredients
   would be inventing a nutrition claim; Alicia has to assign these.
2. **Descriptions.** The `excerpt` copy describes what each video visibly
   shows. It is accurate but it is not the client's voice — worth a review pass.
3. **`uploadDate`.** Omitted from the `VideoObject` structured data because
   no real publication date was supplied, and a fabricated one is worse than
   an absent one. Google wants it for video rich results.
4. **§6 step 3 — recipe imagery.** Still open, and still blocked on the same
   thing: `RecipeCard` has no image slot because no recipe has an image.
   The ten videos have no matching recipe, so nothing pairs up yet.
