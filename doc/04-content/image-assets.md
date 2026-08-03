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
└── alicia/                       Founder photography
    ├── portrait-smiling.jpg
    ├── portrait-tea.jpg
    ├── kitchen-chopping.jpg
    ├── kitchen-chopping-alt.avif
    └── kitchen-wide.avif
```

Two folders, because the two groups have different lifecycles: brand assets are versioned with the identity and change rarely; founder photography is replaced whenever there is a new shoot.

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
commercial use, no attribution required, modification permitted.
Downloaded 2026-08-01, resized to 1920×1080 and re-encoded to AVIF.

| File | Pexels ID | Subject | Size | Used on |
| --- | --- | --- | --- | --- |
| `textures/hero-funciones.avif` | 18011826 | Lemon, water glass and a wildflower on sunlit linen | 189 KB | `/funcionalidades` → page hero |
| `textures/counter.avif` | 6739221 | Warm neutral marble | 8 KB | `/funcionalidades` → Nutrición y recetas |
| `textures/calma.avif` | 16408396 | Soft plant shadows on a warm wall | 91 KB | `/funcionalidades` → Registro diario |
| `textures/papel.avif` | 8941369 | Soft off-white paper texture | 80 KB | `/funcionalidades` → Tu cuenta |

### Page hero photography — the system

Every route opens the same way: a **full-viewport sharp photograph under
a light cream scrim**, running up beneath the sticky header. `/` uses
founder photography; interior pages pass their own image to `PageHero`.
Adding a page means adding one row above — not inventing a new header.

What a hero image has to be:

| Requirement | Why |
| --- | --- |
| Light and warm-toned | Text sits on it, and the site forbids dark surfaces |
| A still life, not a scene | Interiors and posed people read as stock; still lifes read as the brand |
| Generous negative space near the centre | The copy block lands there |
| Subject off-centre | It should be visible beside the copy, never behind it |

Encode at ~1400px wide, AVIF q30. The scrim hides fine detail, so
anything larger is wasted bytes — the same frame at q56 was 803 KB
against 189 KB here, with no visible difference through the veil.

**Alt text:** none — all three are decorative and rendered as CSS
backgrounds behind `aria-hidden` layers. They carry no information a
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

Contrast is **measured from rendered pixels**, not estimated: 13.72,
12.44 and 16.10:1 for ink on the three scrimmed backdrops — all AAA.
Re-measure if the scrim opacity changes.

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

> `public/video/` holds 10 recipe `.mov` files still named `#21.Taco de zanahoria…`. The leading `#` is a URL fragment delimiter and **will break any direct link**. They need the same treatment — out of scope here, tracked in [content README](README.md).
