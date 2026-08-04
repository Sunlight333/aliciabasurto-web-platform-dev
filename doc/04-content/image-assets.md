# Image Asset Inventory

**Date:** 2026-07-31
**Location:** `apps/web/public/images/`
**Companion docs:** [about-page.md](about-page.md) · [site-audit.md §7.1](../01-research/site-audit.md) · [folder-structure.md](../03-architecture/folder-structure.md)

Every asset below was opened and identified visually. Dimensions are measured, not inferred.

---

## 1. Structure

```text
apps/web/public/images/
├── brand/                        Logo, mark, icons
│   ├── logo-lockup.png
│   ├── logo-mark.jpg
│   ├── app-icon-1024.png
│   └── favicon-192.png
├── alicia/                       Founder photography
│   ├── portrait-smiling.jpg
│   ├── portrait-tea.jpg
│   ├── kitchen-chopping.jpg
│   ├── kitchen-chopping-alt.avif
│   └── kitchen-wide.avif
├── heroes/                       One landscape frame per route (§3b)
└── textures/                     Section backgrounds (§3b)
```

Four folders, because the groups have different lifecycles: brand assets are versioned with the identity and change rarely; founder photography is replaced whenever there is a new shoot; heroes and textures are licensed stock, swappable per route without touching a component.

### Naming convention

`{subject}-{descriptor}[-{variant}].{ext}` — lowercase kebab-case, matching the `files kebab-case` rule in [folder-structure.md §Conventions](../03-architecture/folder-structure.md).

Filenames are **English** even though routes are Spanish. They are build-time identifiers, not user-facing strings, and the site is bilingual ([revised-direction.md §3](../00-overview/revised-direction.md)) — a Spanish filename would be just as arbitrary under `/en`. Localized text belongs in alt attributes, not paths.

Pixel dimensions appear in a filename only where **multiple sizes of the same asset will coexist** (`app-icon-1024`, `favicon-192`). Photographs get no size suffix — `next/image` generates the responsive set.

---

## 2. Brand assets

| File | Dimensions | Format | Description | Use |
| --- | --- | --- | --- | --- |
| `brand/logo-lockup.png` | 500×500 | PNG, alpha | Two interlocking rings — sage `#A3B3A5` + lilac `#968DA1` — above the wordmark **nutricycle** in a dark serif | Header, footer brand mark, OG images |
| `brand/logo-mark.jpg` | 431×431 | JPEG, **no alpha** | The rings alone, on an off-white `#F7F7F7` field | Compact header, avatar slots, share cards |
| `brand/app-icon-1024.png` | 1024×1024 | PNG, alpha | White rings, solid sage field, full bleed | App-store listing artwork, PWA icon, `/descargar` |
| `brand/favicon-192.png` | 192×192 | PNG, alpha | Same composition as the app icon at favicon scale | `favicon`, `apple-touch-icon`, web manifest |

### Notes

- **The interlocking rings are the identity.** Two overlapping circles reading as a cycle — this is what carries brand recognition between the app and the website, and it is new since the audit. The audit ([§4.3](../01-research/site-audit.md)) found only a `124×104` raster photo-mark on the live site; that asset is **superseded and should not be migrated**.
- The sage in the app icon matches the app's `#A3B3A5` tint from [revised-direction.md §4](../00-overview/revised-direction.md). Confirms the two products already share a palette.
- ⚠️ `logo-mark.jpg` is a **JPEG with a baked-in background**. It cannot sit on cream `#FDFCF4` or sand `#F0EDE6` without a visible grey rectangle. Use `logo-lockup.png` anywhere the background is not white, until an SVG exists (§5).
- A byte-identical duplicate of `logo-mark.jpg` (`4c2ffc1a-…jfif`, same MD5) was removed.

---

## 3. Founder photography — Alicia Basurto

One editorial shoot: warm natural light, cream sweater, light-wood kitchen with open shelving, sage cookware. It matches the cream / sage / taupe palette exactly, which is why these images can carry entire sections without decoration.

| File | Dimensions | Ratio | Description |
| --- | --- | --- | --- |
| `alicia/portrait-smiling.jpg` | 1365×2048 | 0.67 · portrait | Direct to camera, half-smile, arms resting wide on the counter. Shelving and a candle soft behind her. **The strongest single image in the set.** |
| `alicia/portrait-tea.jpg` | 1342×2048 | 0.66 · portrait | Direct to camera holding a glass cup in both hands. Blender and spice shelves visible. Warmest, most personal frame. |
| `alicia/kitchen-chopping.jpg` | 1314×2048 | 0.64 · portrait | Working — slicing carrot and red pepper on a marble board, eyes down. Reads as method rather than personality. |
| `alicia/kitchen-chopping-alt.avif` | 467×718 | 0.65 · portrait | Adjacent frame of the same moment (`DSC01773`), recovered from the live Wix site. ⚠️ **Low resolution — see §5.** |
| `alicia/kitchen-wide.avif` | 1905×1110 | 1.72 · landscape | Full kitchen. Standing centre, one hand on a rosemary plant, prepped vegetables across the foreground. **The only landscape frame** — the only one that works as a full-width band. |

The 0.64–0.67 portrait ratios are close enough to be treated as a single `2:3` crop target across all components. `kitchen-wide.avif` at 1.72 sits near `16:9`.

### Recommended placement

| Asset | Placement |
| --- | --- |
| `portrait-smiling.jpg` | `/sobre` hero — the founder page's primary image |
| `portrait-tea.jpg` | Home `Sobre mí` section ([about-page.md §2](about-page.md)); author byline on `/blog/[slug]` |
| `kitchen-chopping.jpg` | `/como-funciona` or the home method section — activity, not identity |
| `kitchen-wide.avif` | Full-bleed band on `/sobre`; fallback home hero background |
| `kitchen-chopping-alt.avif` | **In use** — third frame of the `/` founder rotator, at the client's direction. Renders acceptably at the 448px slot; a DSLR master is still worth requesting (§5 gap #3). |

### Alt text

Descriptive, bilingual, written once here so it is not reinvented per component. The audit ([§10.2](../01-research/site-audit.md)) confirms the current site's Spanish alt text is good — this continues it.

| Asset | ES | EN |
| --- | --- | --- |
| `portrait-smiling.jpg` | Alicia Basurto, health coach de nutrición hormonal, en su cocina | Alicia Basurto, hormonal nutrition health coach, in her kitchen |
| `portrait-tea.jpg` | Alicia Basurto sosteniendo una infusión en su cocina | Alicia Basurto holding a herbal tea in her kitchen |
| `kitchen-chopping.jpg` | Alicia Basurto preparando verduras para una receta por fase del ciclo | Alicia Basurto preparing vegetables for a cycle-phase recipe |
| `kitchen-wide.avif` | Alicia Basurto en su cocina con ingredientes frescos preparados | Alicia Basurto in her kitchen with fresh prepared ingredients |
| `logo-lockup.png` | Nutricycle | Nutricycle |
| `logo-mark.jpg` | *(decorative — empty alt when adjacent to the wordmark)* | *(same)* |

> ⚠️ Do not repeat the live site's bug ([§10.3](../01-research/site-audit.md)): one image served twice on `/app-1` with contradictory alt text. Alt text belongs to the **asset**, defined here, not to the slot it fills.

---

## 3b. Section textures — licensed stock

Photographic textures used as **section backgrounds**, not as subjects.
They sit behind an 84% cream scrim, so they read as material rather than
imagery and never compete with the cards in front of them.

**Source:** [Pexels](https://www.pexels.com) · Pexels License — free for
commercial use, no attribution required, modification permitted. Textures
downloaded 2026-08-01, heroes 2026-08-03; all resized and re-encoded to
AVIF. Pexels IDs are recorded per file below so any frame can be traced
back to its licence.

| File | Pexels ID | Subject | Size | Used on |
| --- | --- | --- | --- | --- |
| `textures/counter.avif` | 6739221 | Warm neutral marble | 8 KB | `/funcionalidades` · `/recetas` · `/recetas/fase/[fase]` |
| `textures/calma.avif` | 16408396 | Soft plant shadows on a warm wall | 91 KB | `/funcionalidades` · `/ciclo` · `/ciclo/[fase]` |
| `textures/papel.avif` | 8941369 | Soft off-white paper texture | 80 KB | `/funcionalidades` · `/sobre` · `/membresia` · `/blog` · `/recetas/[slug]` |
| `textures/luz.avif` | 16408400 | Shadow bars across warm plaster | 79 KB | `/videos` · `/faq` (alternating groups) |
| `textures/arena.avif` | 6279955 | Soft beige diagonal bands | 2 KB | `/contacto` |

`arena.avif` is 2 KB because it genuinely is three flat bands — the
encoder is not failing, there is simply almost nothing to encode. It is
used at `scrim={0.9}` for the same reason: any less and the bands read as
a gradient artefact rather than a surface.

`textures/hero-funciones.avif` (Pexels 18011826) was **removed** — it was
the only texture doing hero duty, and heroes now have their own set below.

### Page hero photography — the system

Every route opens the same way: a **full-viewport sharp photograph under
a light cream scrim**, running up beneath the sticky header. `/` uses
founder photography; interior pages pass their own image to `PageHero`.
Adding a page means adding one row to the table below — not inventing a
new header.

#### The frames

Downloaded 2026-08-03 from Pexels, encoded 1600 px wide, AVIF q42.
**Landscape only.** The first set was sourced portrait (1400×2100) and
fed to a `bg-cover` band, so roughly two thirds of every frame was thrown
away at render and what survived was a featureless centre slice — the
reason `/funcionalidades` read as flat mush. Portrait sources are now
centre-cropped to 3:2 at encode time, so the frame that ships is the
frame that shows.

| File | Pexels ID | Subject | Size | Route | `veil` |
| --- | --- | --- | --- | --- | --- |
| `heroes/funciones.avif` | 5420378 | Figs, pears and a water glass on sunlit linen | 55 KB | `/funcionalidades` | 0.66 |
| `heroes/ciclo.avif` | 9518512 | Five dried stems laid out in a row | 5 KB | `/ciclo` | 0.40 |
| `heroes/fase-menstrual.avif` | 12486422 | A dried bloom on a fold of cream linen | 34 KB | `/ciclo/menstrual` | 0.55 |
| `heroes/fase-folicular.avif` | 8543321 | Green sprig and its shadow on a white wall | 12 KB | `/ciclo/folicular` | 0.48 |
| `heroes/fase-ovulatoria.avif` | 15956086 | White ranunculus opening in a pewter jug | 8 KB | `/ciclo/ovulatoria` | 0.50 |
| `heroes/fase-lutea.avif` | 10794667 | Dried gypsophila across warm olive stripes | 11 KB | `/ciclo/lutea` | 0.58 |
| `heroes/recetas.avif` | 18278511 | Bread, flowers and candles on a morning table | 75 KB | `/recetas` · `/recetas/[slug]` | 0.68 |
| `heroes/metodo.avif` | 6962747 | Wooden bowl on a striped linen napkin | 33 KB | `/como-funciona` | 0.50 |
| `heroes/membresia.avif` | 8101910 | Olive branch, ceramic and a lit candle | 12 KB | `/membresia` | 0.50 |
| `heroes/blog.avif` | 7657877 | Coffee, notebook and pen on white | 7 KB | `/blog` | 0.45 |
| `heroes/faq.avif` | 9850185 | A single dried flower on a beige plate | 68 KB | `/faq` | 0.56 |
| `heroes/contacto.avif` | 6958775 | Vase, frame and candle on a white shelf | 18 KB | `/contacto` | 0.58 |
| `heroes/videos.avif` | 19085283 | Circular shadow on a sunlit cream wall | 6 KB | `/videos` | 0.45 |

The four phase frames are chosen as a **colour story**, not four
illustrations of the same idea: linen warmth, new growth, an open bloom,
banked gold. Read in order they should feel like the month passing. They
are mapped once in [`lib/phase-hero.ts`](../../apps/web/src/lib/phase-hero.ts)
and shared by `/ciclo/[fase]` and `/recetas/fase/[fase]`, so the two
phase routes cannot drift apart.

`veil` is per-frame because the frames do not carry the same weight. A
single flat wash either erases the pale frames or leaves the busy ones
shouting; the values above are tuned per image and verified by the
contrast measurement below.

What a hero image has to be:

| Requirement | Why |
| --- | --- |
| Light and warm-toned | Text sits on it, and the site forbids dark surfaces |
| A still life, not a scene | Interiors and posed people read as stock; still lifes read as the brand |
| Generous negative space near the centre | The copy block lands there |
| Subject off-centre | It should be visible beside the copy, never behind it |

Encode at 1600px wide, AVIF q42. The old q30 guidance came from a heavier
82% wash; at the lighter veil the photograph is genuinely visible, and q30
banded on the smooth frames. File sizes above range 5–75 KB — the small
ones are not broken, they are smooth frames with little to encode.

**Alt text:** none — every hero and texture is decorative and rendered as
a CSS background behind `aria-hidden` layers. They carry no information a
screen reader needs.

### Selection criteria

The first search returned saturated farmers-market produce — the obvious
match for a nutrition site, and completely wrong here. Backgrounds behind
text need the opposite of a striking photograph:

- **Light and low-contrast** — the site forbids dark surfaces, and text
  sits directly on these
- **Warm-neutral** — anything cool fights the cream/sage palette
- **No subject** — a recognisable object competes with the cards
- **Even across the frame** — a bright corner would break contrast locally

Contrast is **measured from rendered pixels**, not estimated — and from
the *page*, not the asset: the `<h1>` box is located in a real render, the
copy is hidden, and ink `#221d1a` is measured against the surface actually
beneath it. Every hero is AAA at worst-case pixel, measured 2026-08-03:

| Route | worst | mean | | Route | worst | mean |
| --- | --- | --- | --- | --- | --- | --- |
| `/funcionalidades` | 11.56 | 14.65 | | `/recetas` | 12.08 | 15.00 |
| `/ciclo` | 13.17 | 15.43 | | `/recetas/[slug]` | 12.32 | 14.95 |
| `/ciclo/menstrual` | 12.04 | 15.01 | | `/como-funciona` | 11.66 | 14.74 |
| `/ciclo/folicular` | 12.45 | 15.50 | | `/membresia` | 10.59 | 14.33 |
| `/ciclo/ovulatoria` | 11.93 | 14.20 | | `/faq` | 13.37 | 15.02 |
| `/ciclo/lutea` | 14.00 | 15.07 | | `/contacto` | 11.74 | 15.26 |
| `/blog` | 11.93 | 15.03 | | `/videos` | 12.87 | 15.13 |

Worst case across the site is 10.59:1 on `/membresia`, comfortably past
the 7:1 AAA floor. Re-measure if any `veil` or the radial changes.

### Section seams

Tinted sections fade in and out rather than filling flat, so a join never
lands on a hard line. Measured as the largest single-row luminance step
within 14px of each `<section>` boundary, sampled down the left gutter:
every route is now ≤ 5.3, against a 6.0 threshold.

One seam survived the original pass on **every** page. `CtaBand`'s top
orb is positioned above the band and clipped by `overflow-hidden`, and
the cream top-fade was painted *before* the orbs — so the orb drew over
its own softening layer and its clipped edge became a 13-step line across
the left gutter. The fade now paints after the orbs. Worth remembering
when adding any decorative layer to a band that fades at its edges:
**order in the DOM is order on the screen.**

---

## 3c. CTA band backdrop — rotating lifestyle set

The closing CTA band carries a **seven-frame rotating photographic
backdrop**. Chosen by the client from a 20-image candidate set in
`doc/assets/candidates/cta-band-latam/`.

**Source:** Pexels License. Encoded 1400×933, AVIF q38 — **166 KB for all
seven**, lazy-loaded, since this band closes every page on the site.

Order is the rotation order, not the candidate numbering: no two
consecutive frames repeat a setting, and the two pink-linen shots are kept
apart in the loop.

| # | File | Pexels ID | Subject | Size | Mean L |
| --- | --- | --- | --- | --- | --- |
| 1 | `cta/bright-kitchen-tulips.avif` | 4173298 | White-tiled kitchen, tulips, phone | 19 KB | 73% |
| 2 | `cta/marble-kitchen-gesture.avif` | 7605215 | Marble kitchen, glasses, on a call | 19 KB | 67% |
| 3 | `cta/sofa-plants-phone.avif` | 5902792 | Sofa and plants, phone held close | 15 KB | 57% |
| 4 | `cta/pink-linen-standing.avif` | 8530066 | Pink linen shirt, plant, wide room | 34 KB | 73% |
| 5 | `cta/counter-vegetables.avif` | 8939258 | Counter of vegetables, phone in hand | 29 KB | 62% |
| 6 | `cta/kitchen-wide-cup.avif` | 7014584 | Kitchen, cup in hand, on a call | 17 KB | 68% |
| 7 | `cta/pink-linen-close.avif` | 8530070 | Same set as 4, closer crop | 33 KB | 67% |

### How it rotates

**Pure CSS.** One `@keyframes cta-cycle` shared by all seven layers,
staggered by `animation-delay` (`i × 6s − 1.4s`). 6s hold, 1.4s crossfade,
42s a loop. Only `opacity` animates, so it stays on the compositor.

No `use client`, no timer, no state. This band closes every page — a client
component here would ship JavaScript and a hydration boundary sitewide for
something the compositor does for free. The negative delay on the first
layer is what stops the band opening on a blank wash.

Frames are `<img loading="lazy">`, not CSS `background-image`: the band
sits at the foot of the page, and lazy loading is *guaranteed* by the
attribute where deferring a background image is left to the browser.

⚠️ **`prefers-reduced-motion` stops the loop** and holds frame 1. A
backdrop that changes on its own is exactly what that setting is asking us
not to do.

### Legibility

These frames run 57–73% lightness against a 97.5% page, so they sit under
a **0.74 cream scrim** with the blush→lilac tint demoted to 70% — at full
strength the tint fought the photography rather than sitting over it.

Measured from rendered pixels with the card's contents hidden, sampled
across the full 42-second loop: **worst case 15.56:1** for ink on the
glass card. The card is 88% white with a blur, so it is effectively opaque
to whatever passes behind it.

> ⚠️ Measure the *surface*, not the copy. Sampling raw pixels inside a card
> that contains text includes the glyphs, which are ink — that reads 1.00:1
> and means nothing. Hide the contents first. The same trap caught the hero
> measurement in §3b.

---

## 4. Format policy

| Source | Delivery |
| --- | --- |
| JPEG masters (`portrait-*`, `kitchen-chopping`) | Keep as the source of truth. `next/image` emits AVIF → WebP → JPEG. |
| AVIF-only assets (`kitchen-wide`, `kitchen-chopping-alt`) | Usable, but **no master exists**. Request originals (§5). |
| PNG with alpha (logos, icons) | Keep PNG. Replace with SVG when available (§5). |

Masters stay in the repo at full resolution and uncropped. Every crop is a build-time or CSS decision, never a second file — the audit found the live site shipping a photograph as a `980×1110` PNG ([§7.1](../01-research/site-audit.md)) precisely because crops were baked in.

---

## 5. Gaps and requests

Add to the blocker list in [revised-direction.md §10](../00-overview/revised-direction.md).

| # | Missing | Why it matters | Owner |
| --- | --- | --- | --- |
| 1 | **SVG logo** — lockup + mark | Both existing files are raster. The header logo will be soft on any retina display, and `logo-mark.jpg` cannot go on a non-white background at all. | Client / designer |
| 2 | **Full favicon set** — 16, 32, 180 (apple-touch), `.ico` | Only 192 exists. | Design |
| 3 | **DSLR masters for `kitchen-wide` and `kitchen-chopping-alt`** | Both were pulled from the live Wix CDN. `kitchen-chopping-alt` at 467×718 is now shipping in the founder rotator against a 448px slot — native at 1×, soft on retina. `kitchen-wide` at 1905px is adequate but not future-proof for a full-bleed band. | Client |
| 4 | **App screenshots** | `/funcionalidades`, `/como-funciona`, and `/descargar` are all built around app screenshots ([revised-direction.md §8](../00-overview/revised-direction.md)). **Zero exist in the repo.** This blocks three of the six marketing pages. | Client / app dev |
| 5 | **App Store / Google Play badges** (ES + EN) | `public/badges/` is empty. Official artwork only — store terms forbid redrawing. | Client |
| 6 | **Landscape founder frames** | One landscape image for the entire site. Any second full-width band has nothing to use. | Client |
| 7 | **Recipe photography** | The recipe library assumes 15–20 public recipes ([revised-direction.md §7](../00-overview/revised-direction.md)). Images presumably come from the app's Supabase records — **confirm they are web-licensed and reachable by URL.** | Client / app dev |
| 8 | **OG / social share image** — 1200×630 | None exists. Every shared link currently previews blank. `kitchen-wide.avif` (1.72) is the closest crop source. | Design |

> Items **4 and 5 gate Phase 2** of the build order. They rank alongside the Supabase credentials as top blockers.

---

## 6. Rename log

Original filenames were camera roll numbers, Wix CDN hashes, and a WhatsApp export — none survivable. Renames used `git mv`, so history is intact.

| Original | New |
| --- | --- |
| `logo.png` | `brand/logo-lockup.png` |
| `WhatsApp Image 2026-07-28 at 7.20.47 PM.jpeg` | `brand/logo-mark.jpg` |
| `4c2ffc1a-7a16-4f03-a0dd-cc5378c7fb12.jfif` | **deleted** — byte-identical duplicate of the above |
| `icon.png` | `brand/app-icon-1024.png` |
| `favicon.png` | `brand/favicon-192.png` |
| `7-DSC01755.jpg` | `alicia/portrait-smiling.jpg` |
| `8-DSC01739 (1).jpg` | `alicia/portrait-tea.jpg` |
| `3-DSC01774.jpg` | `alicia/kitchen-chopping.jpg` |
| `9-DSC01773.avif` | `alicia/kitchen-chopping-alt.avif` |
| `fe4292_0fb2b998d5e54326acb820167815c13a~mv2.avif` | `alicia/kitchen-wide.avif` |

> **Resolved 2026-08-03.** `public/video/` held 10 recipe `.mov` files named
> `#21.Taco de zanahoria…`, whose leading `#` — a URL fragment delimiter —
> broke any direct link. They are now transcoded and renamed kebab-case by
> `scripts/transcode-videos.mjs`; the masters stay gitignored. See
> [video-language.md §7](video-language.md).

### Video posters

One frame per recipe video, hand-picked (`scripts/extract-posters.mjs`) and
committed, because the `/videos` grid and the OG images must render whether
or not the media host is reachable. All 1280×720 — the native shape of the
footage.

| File | Source | Poster frame | Size |
| --- | --- | --- | --- |
| `videos/taco-de-zanahoria-y-queso.jpg` | client `#21` | 24.90s | 91 KB |
| `videos/pan-de-psyllium.jpg` | client `#22` | 14.50s | 81 KB |
| `videos/tortilla-de-col-y-zanahoria.jpg` | client `#24` | 14.07s | 56 KB |
| `videos/pan-con-huevo-y-ensalada-verde.jpg` | client `#25` | 0.00s | 86 KB |
| `videos/wrap-de-arroz-con-atun.jpg` | client `#26` | 0.00s | 81 KB |
| `videos/fideos-con-sardinas.jpg` | client `#27` | 19.00s | 79 KB |
| `videos/granola-de-tiramisu.jpg` | client `#28` | 1.40s | 148 KB |
| `videos/lentejas-rojas-al-curry.jpg` | client `#29` | 5.87s | 98 KB |
| `videos/granola-con-yogurt-y-kiwi.jpg` | client `#30` | 5.25s | 119 KB |
| `videos/quinoa-de-chocolate.jpg` | client `#31` | 1.00s | 65 KB |

These are the first client food photographs used anywhere on the site, and
the only images here not sourced from stock.
