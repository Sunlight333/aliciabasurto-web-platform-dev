# Design Direction

**Project:** aliciabasurto.com → React + Tailwind rebuild
**Companion docs:** [site-audit.md](../01-research/site-audit.md) · [site-structure.md](../03-architecture/site-structure.md) · [cta-strategy.md](cta-strategy.md)

**Client brief:**
> Many elements of the previous site were unbalanced and unsatisfactory. The site must be modern and clean while maintaining its current visual identity. It must richly express feminine beauty and sophistication, conveying a modern, clean, fresh feel — with a loose and ethereal aesthetic.

---

## Governing principle

> **Ethereal lives in light, edge, and motion. It never touches the text layer.**

Every softness decision sits *behind* or *around* content — never on it. This is what separates ethereal from washed-out, and it is why the aesthetic below costs nothing in accessibility.

"Loose and ethereal" only reads as *sophisticated* when the underlying grid is rigorous. Without that discipline it reads as sloppy — which is precisely what the client is reacting to now.

---

## 1. Diagnosis — why the current site reads as unbalanced

Measured, not opinion. Sources in [site-audit.md](../01-research/site-audit.md).

| # | Problem | Evidence |
| --- | --- | --- |
| 1 | **Five type families, no system** | Cormorant, Futura, Montserrat, Inter, Playfair — layered on across two eras |
| 2 | **Four heading sizes within 4px** | 55 / 54 / 52 / 51px. Reads as *the same size, slightly wrong* — not as hierarchy |
| 3 | **UI chrome outweighs content** | Nav 26px, buttons 25–29px, body 18–20px. Navigation is literally larger than the writing. **Primary cause.** |
| 4 | **A cliff in the text scale** | 20px → 13px with nothing between. Card body sits at 13px beside 22px titles |
| 5 | **No spacing scale** | Measured: `-24, -22, 10, 11, 12, 13, 16, 25, 36, 49, 58, 60, 62, 228`px — including negative offsets used to hand-overlap elements |
| 6 | **Two color temperatures, no rule** | Warm axis (cream/sand/taupe/olive) and cool axis (lilac/plum) alternate arbitrarily |
| 7 | **Four section backgrounds, no hierarchy** | `#FFFFFF`, `#FDFCF4`, `#F0EDE6`, `#ECEAF2` with no governing logic |
| 8 | **Content fills half the screen** | 980px fixed canvas = **51% of a 1920px display**, 68% of 1440px. Wide dead margins read cramped and dated |
| 9 | **Every button fails contrast** | 3.62:1, dropping to **2.27:1 on hover** |

Points **3, 5, and 8** are what the client is feeling. The identity is sound; the execution is not.

---

## 2. What we keep

The brand is not the problem. Preserved unchanged:

- **Cormorant Garamond** as the display serif — this is the voice
- **The warm palette** — cream `#FDFCF4`, sand `#F0EDE6`, ink `#27211E`
- **Sage / olive** as the action color
- **Lilac / plum** as the accent family
- **The italic accent-phrase device** (`Alicia Basurto: *Nutrición Ciclica*`)
- **Editorial photography** — warm natural light, muted tones
- **The intent toward generous whitespace**, currently undermined by inconsistent execution

---

## 3. Typography

### 3.1 Five families → two

| Font | Decision |
| --- | --- |
| **Cormorant Garamond** | **Keep** — display and headings |
| **Inter** | **Keep** — all UI and body |
| Futura LT W01 Light | **Drop** — Monotype/Wix-licensed, cannot migrate (audit §10.4) |
| Montserrat | **Drop** — Inter covers the role |
| Playfair Display *(italic)* | **Drop the family, keep the device** — render accent phrases in **Cormorant Italic** |

The italic accent device is the most distinctive thing on the site. Executing it in Cormorant Italic preserves it exactly while removing an entire font family.

### 3.2 The weight move

**Cormorant Garamond SemiBold (600) → Light (300).**

This single change does more for *feminine, delicate, sophisticated* than anything else. SemiBold Cormorant reads sturdy and traditional; **Light at large sizes** is the fashion-editorial register — hairline serifs, high stroke contrast, refined rather than assertive.

| Size band | Weight |
| --- | --- |
| ≥ 40px (display, h1) | **Cormorant Light 300** |
| 28–40px (h2) | **Cormorant Regular 400** |
| < 28px | Regular 400 — **never Light** |
| Body / UI | Inter 400 |

The 28px floor is firm — Light weight at small sizes becomes fragile and hurts legibility.

### 3.3 Scale

Ten tokens, replacing sixteen ad-hoc sizes.

| Token | Size | Font | Weight | Tracking | Leading |
| --- | --- | --- | --- | --- | --- |
| `display` | `clamp(44px, 7vw, 88px)` | Cormorant | **300** | `-0.01em` | 1.02 |
| `h1` | `clamp(36px, 5vw, 60px)` | Cormorant | **300** | `-0.01em` | 1.08 |
| `h2` | `clamp(28px, 3.5vw, 42px)` | Cormorant | 400 | `0` | 1.15 |
| `h3` | `24px` | Cormorant | 400 | `0` | 1.30 |
| `h4` | `20px` | Inter | 600 | `0` | 1.30 |
| `lead` | `20px` | Inter | 300 | `0` | **1.75** |
| `body` | `17px` | Inter | 400 | `0` | **1.80** |
| `small` | `15px` | Inter | 400 | `0` | 1.60 |
| `caption` | `13px` | Inter | 500 | `0.01em` | 1.50 |
| `eyebrow` | `12px` | Inter | 500 | **`0.2em`** uppercase | 1.40 |

**The rebalance:** nav drops `26px → 15px`; buttons `25–29px → 15px`. Chrome recedes, content leads. This one change fixes most of what the client is reacting to.

`clamp()` also replaces the current two-document 980/320 split with fluid scaling.

**Italic** becomes a deliberate rhythm tool rather than a one-off — one italic phrase per section heading.

---

## 4. Space — loose means density, not padding

"Loose" is usually misread as more padding. It is actually **fewer things per screen**.

| Rule | Spec |
| --- | --- |
| **One idea per viewport** | Desktop sections hold a single thought — no stacked competing blocks |
| Section padding (desktop) | `160px` standard, `200px` feature |
| Section padding (tablet) | `96px` / `120px` |
| Section padding (mobile) | `64px` / `80px` |
| Grid occupancy | Use **10 of 12 columns**; leave outer columns empty by default |
| Grid gaps | `48–64px` |
| Reading measure | **62ch** — shorter lines feel lighter |
| Cards | **No borders, no fills** — separated by space alone |
| Asymmetry | Alternate 5/7 and 7/5 splits rather than 6/6; offset images vertically off the baseline |

The current site fills its 980px edge to edge. The new one deliberately does not fill its 1200px — **the empty margin is the design.**

### Spacing scale

4px base: `4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160 · 200`

**No negative margins for overlap.** Where the current site nudges by `-22px` and `-24px`, use grid placement.

---

## 5. Grid

| Property | Current | New |
| --- | --- | --- |
| Max content width | 980px fixed | **1200px** |
| Columns | none (absolute positioning) | **12** |
| Gutter | none | 24px mobile / 32px desktop |
| Reading measure | unconstrained | **62ch** |
| Breakpoints | **none** | `sm 640 · md 768 · lg 1024 · xl 1280` |

+22% content width, and prose no longer runs the full width — long-form gets a proper measure while media stays wide. That contrast between narrow text and wide imagery is most of what "modern editorial" actually is.

---

## 6. Color

### The rule: **warm builds structure, cool creates emphasis**

This rule does not exist today, which is why sections feel arbitrary.

### 6.1 Surfaces — a continuous field, not flat blocks

Audit problem #7 was four flat backgrounds clashing. The ethereal fix solves both at once: **stop using flat blocks.**

| Layer | Treatment |
| --- | --- |
| Base field | `#FDFCF4` → `#FAF7F2` → `#F7F4F9`, vertical, across the whole page |
| Ambient orbs | 600–900px radial gradients, `blur(120px)`, **4–8% opacity**, lilac `#968DA1` and sage `#AAAF92`, slowly drifting behind content |
| Section transitions | 160px gradient fade between tiers — **never a hard edge** |
| Header | `rgba(253,252,244,0.72)` + `backdrop-filter: blur(20px)` |
| Grain | Noise overlay at **3%** — removes digital flatness |
| Inverse | `#4A4453` — **CTA moments only** |

This recovers the lilac that flat-block usage ruined. `#ECEAF2` was wrong as a solid section background; as a diffuse wash it becomes the most ethereal element on the site.

**Verified legibility on every wash tint:**

| Wash | ink `#27211E` | muted `#65564E` | accent `#756B82` |
| --- | --- | --- | --- |
| `#FFFFFF` | 15.88 | 7.01 | 5.02 |
| `#FDFCF4` | 15.43 | 6.81 | 4.88 |
| `#FAF7F2` | 14.86 | 6.56 | 4.70 |
| `#F7F4F9` | 14.56 | 6.43 | 4.61 |
| `#F0EDE6` | 13.58 | 6.00 | 4.30 |
| `#E9E4EE` | 12.70 | 5.61 | 4.02 |

All pass AA at every size. The atmosphere costs nothing.

### 6.2 Text tokens

| Token | Hex | On white | Note |
| --- | --- | --- | --- |
| `text-ink` | `#27211E` | **15.88** | Unchanged |
| `text-muted` | `#65564E` | **7.01** | Replaces `#9F8C82` (3.21 — failed at 13px) |
| `text-accent-display` | `#968DA1` | 3.17 | **≥24px only** — preserves the current look exactly |
| `text-accent` | `#756B82` | **5.02** | Any size |

### 6.3 Action

| State | Hex | Contrast (white label) |
| --- | --- | --- |
| Default | `#5F6B5B` | **5.61** |
| Hover | `#4E594B` | **7.36** |
| Active | `#3F4A3D` | **9.30** |

Contrast **improves** as the user interacts. The current ramp does the opposite (3.62 → 2.27).

---

## 7. Edge — nothing hard

| Element | Treatment |
| --- | --- |
| **Image masks** | **Arch top** on portraits — the defining feminine-editorial silhouette |
| Image edges | Soft vignette / feathered mask, never a bare rectangle |
| Radius | `16px` standard; arch = `9999px 9999px 16px 16px` |
| Rules | Hairline `1px` `#E5DED4` — 1.3:1, **decorative only** |
| Shadows | Large, diffuse, **warm-tinted**: `0 24px 64px rgba(39,33,30,0.06)` |
| Buttons | Pill `9999px` for ghost/secondary; `12px` for primary |

Warm-tinted shadows matter: gray shadows on a cream palette read dirty, a warm shadow reads like light.

---

## 8. Imagery

The current site uses **seven aspect ratios** (1.19, 1.33, 0.88, 0.65, 0.647, 0.61, 0.594). That inconsistency is a large, unspoken part of "unbalanced."

Standardize to three:

| Ratio | Use |
| --- | --- |
| **4:5** | Portraits, editorial, recipe cards |
| **16:9** | Video, wide feature |
| **1:1** | Avatars, phase icons |

Also: convert the 980×1110 **PNG photograph** to AVIF/WebP, apply one consistent warm grade, and use a uniform radius across all media.

---

## 9. Motion — two speeds

Interaction stays instant; atmosphere drifts.

| Layer | Duration | Easing |
| --- | --- | --- |
| **UI feedback** — buttons, links, inputs | `200ms` | `ease-out` |
| **Content reveal** | `800ms` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| **Image reveal** | `1000ms` fade + scale `1.04 → 1` | same |
| **Ambient orb drift** | `24–32s` loop | `ease-in-out` |
| **Parallax** | `0.15` intensity, images only | linear |
| Stagger | `100ms` between siblings | |

The site should feel like it is floating, not like it is lagging.

`prefers-reduced-motion` — already honored in the current build — disables orb drift, parallax, and reveal entirely.

---

## 10. Guardrails

Three ways this aesthetic commonly fails. Explicitly prevented:

1. **Contrast.** Ink ≥ 12.7:1 on every wash; muted ≥ 5.6:1; buttons 5.61 → 9.30 on interaction. Softness applies to decoration only.
2. **Light weight at small sizes.** Cormorant Light floors at 28px. Inter 300 is used for `lead` at 20px only, never body.
3. **Performance.** All washes are CSS gradients, not images. `backdrop-filter` is limited to the header bar. Orbs are composited transforms only. **Blur never animates.**

---

## 11. Before / after

| | Current | New |
| --- | --- | --- |
| Font families | 5 | **2** |
| Type sizes | 16 ad-hoc | **10 tokens** |
| Display weight | SemiBold 600 | **Light 300** |
| Display max size | 55px | **88px** |
| Nav size | 26px | **15px** |
| Body leading | 1.75 | **1.80** |
| Eyebrow tracking | 0.1em | **0.2em** |
| Spacing values | ~14 arbitrary, incl. negative | **14-step 4px scale** |
| Section padding (desktop) | ad-hoc | **160 / 200px** |
| Content width | 980px fixed | **1200px, 12-col** |
| Backgrounds | 4 flat, no rule | **Continuous gradient field + orbs** |
| Cards | Bordered | **Borderless, space-separated** |
| Buttons passing AA | **0** | **All** |
| Aspect ratios | 7 | **3** |
| Breakpoints | 0 | **4** |
| Reveal motion | none | **800ms drift** |
| Image shape | Rectangle | **Arch-masked portraits** |

---

## 12. Client approval needed

Two changes will be immediately visible and should be signed off before build:

1. **Nav and buttons shrink by ~40%.** This is the central fix, but it is the most noticeable difference.
2. **The pale lilac section background disappears as a solid block**, returning as a diffuse wash.

**Recommended:** build a visual specimen page — display type at Light 300, the gradient field with orbs, arch-masked imagery, borderless cards — side by side against the current site, *before* any application code. "Loose and ethereal" is a direction where a written spec and the client's mental image diverge easily, and alignment is far cheaper on one page than after the component library exists.
