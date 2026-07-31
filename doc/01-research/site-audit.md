# aliciabasurto.com — Site Audit for React + Tailwind Migration

**Source:** https://www.aliciabasurto.com/
**Audit date:** 2026-07-31
**Purpose:** Capture the existing site's layout, structure, and design system as the reference for a from-scratch React.js + Tailwind CSS rebuild that preserves the current layout.

**Method:** All values below were extracted from the served HTML/CSS, Wix theme variables, and both the desktop and mobile documents. Values are measured, not estimated, unless explicitly marked *(inferred)*.

---

## Table of Contents

1. [Platform & Global Shell](#1-platform--global-shell)
2. [Route Map](#2-route-map)
3. [Page-by-Page Layout](#3-page-by-page-layout)
4. [Visual Identity](#4-visual-identity)
5. [Layout & Structure](#5-layout--structure)
6. [Components & Patterns](#6-components--patterns)
7. [Content Strategy](#7-content-strategy)
8. [Interaction & Motion](#8-interaction--motion)
9. [Prototypes & Flows](#9-prototypes--flows)
10. [Accessibility & Constraints](#10-accessibility--constraints)
11. [Reusable Component Inventory](#11-reusable-component-inventory)
12. [Issues & Priorities](#12-issues--priorities)

---

## 1. Platform & Global Shell

**Current stack:** Wix Classic Editor. Wix Blog powers `/blog`, `/services-4`, and `/post/*`.
**Language:** Spanish (`lang="es"` correctly set on all pages).
**Branding:** Site chrome uses **NutriCycle**; personal brand is **Alicia Basurto**.

All 9 pages share an identical header and footer — these are the first two components to build.

### Header

Sticky, full-width, background `rgba(255,255,255,0.9)` (translucent), `--sticky-offset: 0px`.

- **Logo:** circular raster photo, `124×104`, alt `Alicia Basurto, health coach de nutrición hormonal`
- **Nav:** 4 items, horizontal, right-aligned, Montserrat 26–27px

| Label | Target | Note |
| --- | --- | --- |
| Recetas | `/blog` | |
| Articulos | `/services-4` | Wix default slug, never renamed |
| Videos | `/` | ⚠️ **points at the homepage, not `/videos`** |
| App | `/app-1` | Wix default slug |

### Footer

Background `#F0EDE6`, full-bleed, identical on all 9 routes. Four stacked rows:

1. Brand mark `nutricycle` (live text, Cormorant 26px — not an asset)
2. Label `SINCRONIZANDO BIO-DATOS`
3. Social row: Youtube · Facebook · Instagram (text labels, no icons)
4. `© 2026 NutriCycle - hola@aliciabasurto.com` + `Términos y Condiciones` · `Politica de Privacidad`

> Wix also injects `top of page` / `bottom of page` skip anchors. Drop these; replace with a real skip-link.

---

## 2. Route Map

From `pages-sitemap.xml` (9 pages) + `blog-posts-sitemap.xml` (1 post):

| Route | Type | Status |
| --- | --- | --- |
| `/` | Marketing home | Complete |
| `/videos` | Video hub | Complete, **orphaned** (nothing links to it) |
| `/app-1` | App product landing | Complete — richest page |
| `/blog` | Recipe feed (Wix Blog) | Structure done, 1 real post |
| `/services-4` | Article library (Wix Blog) | Structure done, 1 real post |
| `/post/deliciosa-receta-de-crema-de-zapallo-…` | Post detail | 1 post exists |
| `/testimonials` | — | **Empty shell** |
| `/instagram` | Link-in-bio hub | Minimal |
| `/terminos-y-condiciones` | Legal | Complete |
| `/política-de-privacidad` | Legal | Complete |

---

## 3. Page-by-Page Layout

### `/` — Home (4 sections)

1. **Hero** — H1 `Recupera tu Salud Hormonal`, sub `usando la alimentacion como tu medicina`, single CTA `Empieza tu cambio` → `/videos`
2. **NUTRICION CICLICA** — eyebrow + heading `Protocolos diseñados para tu equilibrio hormonal`; two-column image/text split; body copy; CTA `DESCUBRE TU PLAN` → `/app-1`; then a **3-item feature list**:
   - Alimentación diseñada para cada fase de tu ciclo
   - Recetas medicinales y antiinflamatorias
   - Acompañamiento en nutrición hormonal femenina
3. **SOBRE MÍ** — eyebrow + heading `Alicia Basurto: Nutrición Ciclica`; two-column text/portrait (mirrored from §2); text link `Comienza tu sincronización` → `/blog`
4. **POR QUE FUNCIONA** — heading `Tu ciclo es tu brújula hormonal`; **tab strip `FASE 01 / FASE 02 / FASE 03`** driving 3 panels:
   - *Conoce tu fase* — "Cada semana de tu ciclo tiene necesidades hormonales distintas."
   - *Elige tus alimentos* — "La comida correcta en el momento correcto amplifica tus hormonas."
   - *Recupera tu equilibrio* — "Acné, fatiga, ciclos irregulares — se alivian cuando tu cuerpo recibe lo que necesita."

### `/videos` — Video hub

1. **Hero** — eyebrow `VIDEOS - NUTRICYCLE`, H1 `Aprende a comer según tu ciclo`
2. **Anchor/filter row** — `RECETAS` · `EDUCACION HORMONAL`
3. **Section: RECETAS** — `Cocina para cada fase` → **3-card video grid** → CTA `VER TODAS LAS RECETAS`
4. **Section: EDUCACION HORMONAL** — `Entiende tu ciclo` → **3-card video grid** → CTA `VER TODOS LOS VIDEOS`
5. **CTA band** — `YOUTUBE · @ALIBASURTO` / `Nuevo video cada semana` / button `SUSCRIBIRME AL CANAL`

### `/app-1` — App landing (6 sections, deepest page)

1. **Hero** — eyebrows `NUTRICION CICLICA` / `RECETAS EN VIDEO EN ESPANOL`; H1 `Tu ciclo, tu guia` + sub `recetas en video para cada fase`; **dual CTA** `DESCARGAR APP` (primary) + `VER COMO FUNCIONA` (secondary)
2. **Stat strip — 3 columns:** `4.8 VALORACION` · `40+ RECETAS` · `4 FACES DEL CICLO`
3. **COMO FUNCIONA** — `Nutrición que se sincroniza a tu cuerpo`; **numbered 3-step row**: Ingresa tu ciclo → Recibe tu plan diario → Recupera tu equilibrio
4. **LAS 4 FASES** — `Un plan diferente para cada momento de tu ciclo`; **4 cards**:

   | Card | Tagline | Days | Sample recipes |
| --- | --- | --- | --- |
   | FASE FOLICULAR | Energía & Comienzos | 1–13 | Granola · Avena Matcha · Ensalada Garbanzos |
   | OVULACIÓN | Pico & Vitalidad | 14–16 | Mousse Chocolate · Pizza Pollo · Okonomiyaki |
   | FASE LUTEA | Calma & Nutrición | 17–28 | Brownies Almendra · Tortilla Naranja · Pudding |
   | MENSTRUACION | Descanso & Restauración | 1–5 | Sopa Raíces · Arroz Cúrcuma · Té Jengibre |

5. **LO QUE INCLUYE** — `Todo lo que tu hormona necesita`; **5 feature cards**: Rastreador circular del ciclo · Plan de comidas diario con video · Lista de compras inteligente · Alimentos clave por fase · Plan Hormonal Premium
6. **Download band** — `DISPONIBLE EN IOS Y ANDROID` / `Comienza tu sincronización hormonal hoy` / `Descarga gratis · Plan Hormonal desde la app` / two store buttons `APP STORE` + `GOOGLE PLAY`

### `/blog` — Recipe feed

Stacks a custom phase-organized layout **on top of** the stock Wix Blog feed:

1. **Hero** — eyebrow `RECETAS - NUTRICYCLE`, H1 `Come según tu fase`
2. **Phase filter tabs** — `TODAS LAS FASES` · `FASE MENSTRUAL` · `FASE OVULATORIA` · `FASE LUTEA`
   > ⚠️ **`FASE FOLICULAR` is missing from the tab row** but present as a section below.
3. **4 phase-grouped sections**, each = phase heading + day-range/mood subtitle + card grid:
   - Fase Menstrual — `Días 1–5 · DESCANSO Y RESTAURACION`
   - Fase Folicular — `Días 6–13 · ENERGIA Y RENOVACION`
   - Fase Ovulatoria — `Días 14–17 · PICO DE ENERGIA`
   - Fase Lutea — `Días 18–29 · CALMA Y PREPARACION`
4. Link `Volver al Inicio`
5. **Stock Wix Blog feed** — `All Posts` + search field. Card = thumbnail / title / author `Alicia Basurto` / date `2 jul` / read time `3 min de lectura`

### `/services-4` — Article library

1. **Hero** — eyebrow `ARTÍCULOS · NUTRICYCLE`, H1 `Tu biblioteca de salud hormonal`
2. **Filter tabs** — `TODOS` · `EDUCACION HORMONAL`
3. **`DESTACADO` featured block**
4. **Card grid** — same card shape as `/blog`

### `/post/{slug}` — Post detail

Nav (with search) → H1 `Crema de Zapallo` → meta row `Alicia Basurto · 2 jul · 3 min de lectura` → intro paragraph → body:
**ingredient list (with quantities) → 5 numbered preparation steps → tips → nutritional benefits → serving suggestions → variations**

**Absent:** cover image, tags, share buttons, related posts, comments, sidebar. These are net-new if the client wants them.

### `/testimonials`

Header + `Volver al inicio` + footer. **Nothing else.** Linked from every footer's `nutricycle` brand mark.

### `/instagram`

Link-in-bio hub: header → `SINCRONIZANDO BIO-DATOS` → Youtube / Facebook / Instagram → footer.

### `/terminos-y-condiciones` & `/política-de-privacidad`

Single-column legal text, **11 numbered sections** each, no sidebar or in-page TOC.

- **Terms:** last updated 13 jun 2026; governing law **Illinois**; medical disclaimer visually emphasized
- **Privacy:** 1 Información que Recopilamos · 2 Cómo Usamos tu Información · 3 Datos de Salud · 4 Compartir Información · 5 Retención de Datos · 6 Tus Derechos · 7 Privacidad de Menores · 8 Seguridad de los Datos · 9 Servicios de Terceros · 10 Cambios en esta Política · 11 Contacto

---

## 4. Visual Identity

### 4.1 Color Palette

The Wix theme exposes 56 slots, but only ~14 distinct colors are real.

#### Core

| Role | Hex | Theme slots |
| --- | --- | --- |
| Ink / primary text | `#27211E` | color_1, 10, 15, 37, 45, 46 |
| White | `#FFFFFF` | color_0, 11, 36, 50, 51 |
| Cream (dominant section bg) | `#FDFCF4` | color_44 |
| Olive (brand green) | `#7D8260` | color_2, 18, 41, 48, 49, 52, 53 |
| Deep brown | `#312824` | color_3, 25, 43 |

#### Ramps

| Ramp | Values | Slots |
| --- | --- | --- |
| Warm brown | `#CFC5C1` → `#9F8C82` → `#65564E` → `#27211E` | color_12–15 |
| Grey | `#FBFBFB` · `#F7F7F7` · `#B9B9B9` · `#7C7C7C` · `#3E3E3E` | color_26–30 |
| Sage | `#D5D7C9` · `#AAAF92` · `#7D8260` · `#535740` · `#2A2B20` | color_16–20 |
| Rose/taupe | `#DBD2CE` · `#B7A59D` · `#93786C` · `#625048` · `#312824` | color_21–25 |
| Gold | `#E8D6B3` · `#D0AC68` · `#B28838` · `#775B25` · `#3B2D13` | color_31–35 |

#### Hard-coded colors outside the theme

These are what the newer pages actually use, and they map to **no theme slot**. This is the main palette debt to resolve during migration.

| Hex | Used for |
| --- | --- |
| `#7E8A7A` | Primary button background |
| `#AAAF92` | Button hover (all buttons, site-wide) |
| `#B2AC88` | Alternate button background |
| `#968DA1` | Lilac accent — Playfair italic headings |
| `#ECEAF2` | Lilac section background (home §3, videos hero) |
| `#F0EDE6` | Sand section background + **footer on every page** |
| `#4A4453` | Dark plum CTA band (`/app-1` download, `/videos` YouTube) |
| `#212121` | Video card background (`/videos`) |
| `#F9F8F5` | `/blog` page background |
| `#E2E2E2` / `#8F8F8F` | Disabled button bg / label |
| `#535151`, `#373737` | Button label variants |

#### Section background rhythm

Alternating: `#FFFFFF` → `#FDFCF4` → `#F0EDE6` → `#ECEAF2`, with `#4A4453` reserved for closing CTA bands.

Per-page section backgrounds as served:

| Page | Backgrounds used |
| --- | --- |
| `/` | page `#FFFFFF`; sections `#FFFFFF`, `#FDFCF4`, `#ECEAF2`; footer `#F0EDE6` |
| `/app-1` | page `#FFFFFF`; sections `#F0EDE6`, `#FDFCF4`, `#4A4453`; footer `#F0EDE6` |
| `/videos` | page `#FFFFFF`; hero `#ECEAF2`; cards `#212121`; band `#4A4453`; footer `#F0EDE6` |
| `/blog` | page `#F9F8F5`; sections `#FFFFFF`, `#F7F7F7`; footer `#F0EDE6` |
| `/services-4` | page `#FFFFFF`; sections `#F0EDE6`, `#FDFCF4`; footer `#F0EDE6` |

### 4.2 Typography

**Four families in active use** (all self-hosted via `static.parastorage.com`, `font-display: swap`):

| Family | Role |
| --- | --- |
| **Cormorant Garamond SemiBold** | Serif display — all H1/H2 |
| **Futura LT W01 Light** | Theme body font (legacy; being displaced) |
| **Montserrat** | Nav + primary button labels |
| **Inter** | Newer UI text, small labels, secondary buttons |
| **Playfair Display** *(italic 400 only)* | Accent phrase highlighting |

> Cormorant/Futura are the *original* theme; Montserrat/Inter/Playfair were layered on later. **There is no single type system** — this is the second thing to unify.

#### Theme scale as served

| Token | Value |
| --- | --- |
| `--font_3` | `88px / 1.2em` Cormorant |
| `--font_4` | `72px / 1.25em` Cormorant |
| `--font_5` | `50px / 1.34em` Cormorant |
| `--font_6` | `34px / 1.35em` Cormorant |
| `--font_2` | `28px / 1.375em` Cormorant |
| `--font_0` | `22px / 1.41em` Cormorant |
| `--font_7` | `20px / 1.67em` Futura |
| `--font_8` | `18px / 1.75em` Futura |
| `--font_9` | `15px / 1.875em` Futura |
| `--font_1` / `--font_10` | `14px / 1.79em` Futura |

#### Actual rendered sizes (inline overrides)

- **Desktop:** 55, 54, 52, 51, 46, 44, 35, 27, 26, 22, 20, 18, 17, 15, 13, 12 px
- **Mobile document:** 27, 26, 24, 21, 19, 18, 17, 16, 15, 14, 13, 12, 11 px

> The overrides ignore the theme scale — e.g. H1 renders at `55px`, not `--font_5`'s `50px`.

#### Letter-spacing

`-0.05em` display serif · `0.1em` buttons and eyebrow labels · `0.15em` one eyebrow · `0.01em` body

#### Role mapping (measured on `/`)

| Element | Font | Size |
| --- | --- | --- |
| H1 hero | Cormorant | 55px |
| Section H2 | Cormorant | 54 / 52 / 51px |
| Accent italic (`Nutrición Ciclica`) | Playfair italic `#968DA1` | 46px |
| Eyebrow (`NUTRICION CICLICA`) | Inter, `0.1em` | 15px, weight 500 |
| Body | Futura/Inter | 20 / 18px |
| Card title | Cormorant | 22px |
| Card body | Inter | 13px |
| Nav | Montserrat | 26–27px |
| Button label | Montserrat | 25–29px |

### 4.3 Brand Assets

Single logo asset: `fe4292_78c86aa877af42479ee59641a3cb6d4b~mv2.png`, **124×104**, alt `Alicia Basurto, health coach de nutrición hormonal`. It is a **raster photo-mark**.

**Missing:** SVG logo, favicon set, wordmark file, icon system. Social links are text labels; the button icon slot is `display: none` everywhere.

---

## 5. Layout & Structure

### 5.1 The critical finding

```text
"isResponsive": false
--site-width: 980px    (desktop document)
--site-width: 320px    (mobile document, served by UA sniffing)
--minViewportSize: 320
--maxViewportSize: 1920
--section-max-width: 9999px
--sticky-offset: 0px
```

The site is **Wix Classic Editor**, not Wix Studio / Editor X. Consequences:

- **There is no responsive CSS to migrate.** The only media queries in the served stylesheet are `forced-colors`, `prefers-reduced-motion`, and one degenerate `(min-width:1px) and (max-width:0px)` rule. **Zero width breakpoints.**
- Desktop and mobile are **two separately authored documents** with different markup and type scales, chosen by user-agent string.
- **No tablet layout exists at all.** Anything between ~768px and 980px is currently unhandled.
- Layout is **absolute positioning**: 99 `position:absolute` rules vs 15 `display:grid` (and those grids are `100%` single-column Wix scaffolding, not content grids).

> **Treat the current site as a fixed-canvas visual reference, not a responsive spec.** The grid system, spacing scale, and breakpoints must be designed, not extracted.

### 5.2 What does exist

| Property | Value |
| --- | --- |
| Content column | `980px`, centered via `calc((100% - 980px) * 0.5)` |
| Secondary narrow column | `491px` (exactly half of 980) |
| Header | sticky, `rgba(255,255,255,0.9)` |
| Footer | `#F0EDE6`, full-bleed |
| Sections | full-bleed background, constrained inner content |

### 5.3 Spacing

**No scale exists.** Measured vertical values: `-24, -22, 10, 11, 12, 13, 16, 25, 36, 49, 58, 60, 62, 228` px — hand-nudged, including negative offsets used to overlap elements. Nothing rounds to a 4/8px system.

### 5.4 Recommended rebuild target *(inferred — not extracted)*

- Container: `max-w-[1200px]`
- Breakpoints: Tailwind defaults — `sm 640 / md 768 / lg 1024 / xl 1280`
- Spacing: 4px-base scale
- Grid: 12 columns
- The 980px canvas maps cleanly to `lg`
- **Author mobile-first** — the existing mobile document gives you the intended small-screen content order for free

---

## 6. Components & Patterns

**Exists:** buttons, nav, cards, filter tabs, tab panels, video players, blog search input.

**Does NOT exist anywhere on the site:** forms, modals, dialogs (`role="dialog"` count = 0 on all pages), tooltips, dropdowns, accordions, toasts, breadcrumbs, pagination. Only one `<input>` site-wide (Wix blog search on `/blog`).

### 6.1 Button states — fully extracted

| State | Background | Label | Transition |
| --- | --- | --- | --- |
| Default (primary) | `#7E8A7A` | `#FFFFFF` | `all 0.2s ease, visibility 0s` |
| Default (alt) | `#B2AC88` | `#FFFFFF` | same |
| Default (light, `/videos`) | `#FDFCF4` | `#535151` | same |
| **Hover** | `#AAAF92` | unchanged | same |
| **Disabled** | `#E2E2E2` | `#8F8F8F`, icon `#8F8F8F` | same |
| **Focus** | — | — | `outline: 3px solid highlight; outline-offset: 1px` |
| **Active/pressed** | *not defined* | | |
| **Loading** | *not defined* | | |
| **Error** | *not defined* | | |

**Geometry:** `border-radius: 10px` (a `5px` rule is declared then overridden), `border: 0px solid #7D8260`, icon slot `10×10` but `display:none`.

> ⚠️ **Every button on the site hovers to the same `#AAAF92`** regardless of its resting color — including the light `#FDFCF4` button on `/videos`, which inverts from light to sage. Almost certainly unintentional.

### 6.2 Text link states

`transition: color 0.4s ease` — hover color resolves to `var(--txth, --color_15)` = `#27211E`. Uses `aria-disabled` rather than the `disabled` attribute.

### 6.3 Other patterns

| Pattern | Notes |
| --- | --- |
| **Nav** | 4 flat links, Montserrat 26px, no dropdown, no active/current styling |
| **Filter tabs** (`/blog`, `/services-4`, `/videos`) | Styled as text rows. No selected state exposed. |
| **Phase tabs** (`FASE 01/02/03` on `/`) | Visual only — no `role="tab"`, no `aria-selected`, no keyboard model |
| **Blog/article card** | image + title (Cormorant 22px) + date (13px). **No hover state defined.** |
| **Video card** | `#212121` bg + 237×178 media. No hover state defined. |
| **Image treatment** | `filter .8s ease-in` — the only image effect on the site |

---

## 7. Content Strategy

**Text-dominant with sparse, high-value photography.** Total image count across the five main pages is 50, but 27 of those are the same blog thumbnail repeated.

| Page | Images | Videos | Body words *(approx)* |
| --- | --- | --- | --- |
| `/` | 4 | 0 | ~230 |
| `/app-1` | 3 | 0 | ~330 |
| `/videos` | 7 | 6 | ~90 |
| `/blog` | 27 | 0 | ~110 |
| `/services-4` | 9 | 0 | ~50 |

### 7.1 Photography style

Editorial lifestyle portraits of Alicia, warm natural light, matching the cream/sage/taupe palette. Source files are DSLR originals (`5-DSC01798.png`, `9-DSC01773.jpg`, `7-DSC01755.jpg`).

> ⚠️ One source is a **PNG at 980×1110** — wrong format for a photograph.

### 7.2 Aspect ratios in use

| Ratio | Dimensions | Where |
| --- | --- | --- |
| ~1.19:1 | 124×104 | Logo |
| 0.88:1 | 980×1110 | Home hero portrait |
| 0.65:1 | 467×718, 372×575 | Section portraits |
| ~0.60:1 | 264×433, 310×522 | App screenshots |
| **4:3** | 237×178 | Video cards |

**No illustrations, no icons, no diagrams.** The site relies entirely on typography and photography.

### 7.3 Video

Six `<video muted loop playsinline preload="auto">` elements on `/videos` — silent autoplay loops, no controls, no poster, no captions.

> ⚠️ `preload="auto"` on six simultaneous videos is a real performance problem.

### 7.4 Content maturity

One real blog post exists, replicated across all card slots. The `/blog` design assumes **~40+ recipes tagged across 4 phases**.

> **The React build needs a content model before it needs components.**

---

## 8. Interaction & Motion

Motion is minimal and almost entirely Wix chrome rather than authored design.

### 8.1 Transitions actually declared

| Duration / easing | Applied to |
| --- | --- |
| `all 0.2s ease, visibility 0s` | All buttons |
| `all .2s ease-in` | Generic Wix elements |
| `color .4s ease` | Text links |
| `border-color .4s ease, background-color .4s ease` | Bordered link variants |
| `filter .8s ease-in` | Images |
| `all .3s` | Misc Wix |
| `outline 10ms` | Focus rings |

### 8.2 Keyframes present

`motion-fadeIn`, `slide-horizontal-new/old`, `slide-vertical-new/old`, `out-in-new/old`

These are Wix **page-transition** primitives, not content animation.

### 8.3 What is absent

- **No scroll-triggered entrance animations.** Searched for Wix's animation payload (`FadeIn`, `FloatIn`, `SlideIn`, `GlideIn`, `Reveal`, etc.) — **zero matches.** The only `data-motion-part` entries are `BG_LAYER` / `BG_MEDIA` background scaffolding.
- **No parallax.** Background scroll-effect infrastructure exists (`scrollEffect`, `bgEffectName` in the image handler) but no effect is configured on any section.
- **No loading states.** `font-display: swap` (expect FOUT). Images use Wix's `srcset` loader. No skeletons, spinners, or empty states — `/testimonials` renders blank rather than showing an empty state.

### 8.4 Preserve this

✅ **`prefers-reduced-motion` is honored** by the Wix baseline (both `reduce` and `no-preference` branches exist). Carry this into the rebuild.

> **Net: the site currently feels static.** Any motion design in the React version is net-new work, not migration.

---

## 9. Prototypes & Flows

**There are no transactional flows on this site.** No signup, no login, no checkout, no cart, no contact form, no newsletter capture, no booking. Every conversion is a handoff to an external destination.

### 9.1 Primary flow — app acquisition (the only real conversion path)

```text
/ (hero "Empieza tu cambio")
  └─▶ /videos          [⚠ nav "Videos" mislinks to / instead]

/ (§2 "DESCUBRE TU PLAN")
  └─▶ /app-1
        ├─▶ "VER COMO FUNCIONA"  → in-page anchor to §3
        └─▶ "DESCARGAR APP"      → App Store / Google Play  ⟶ EXIT
```

### 9.2 Secondary flow — content discovery

```text
Header ─┬─ Recetas   → /blog       → phase filter → card → /post/{slug}  ⟶ dead end
        ├─ Articulos → /services-4 → TODOS | EDUCACION HORMONAL → card → /post/{slug}
        ├─ Videos    → /  (broken)
        └─ App       → /app-1

/videos → "SUSCRIBIRME AL CANAL" → YouTube  ⟶ EXIT
```

### 9.3 Search

Exists only as the stock Wix blog search on `/blog`. Not in the header, not on `/services-4`.

### 9.4 Structural gaps in the flow graph

1. **`/videos` is unreachable from the nav** — only the homepage hero CTA reaches it.
2. **`/post/{slug}` is a dead end** — no related posts, no back-to-feed, no next/prev, no tags.
3. **`/testimonials` is linked from every footer** (the `nutricycle` mark) and is empty — a site-wide link to a blank page.
4. **`/instagram` has no inbound link** from the main nav.
5. **There is no lead capture anywhere**, so every visitor who isn't ready to install the app leaves with no way to be reached again. Worth raising with the client during the redesign.

---

## 10. Accessibility & Constraints

### 10.1 Contrast — measured (WCAG 2.1)

| Pair | Ratio | Result |
| --- | --- | --- |
| Body `#27211E` on white | **15.88** | ✅ AAA |
| Body `#27211E` on cream `#FDFCF4` | **15.43** | ✅ AAA |
| `#27211E` on lilac `#ECEAF2` | **13.32** | ✅ AAA |
| White on dark plum `#4A4453` | **9.36** | ✅ AAA |
| White on video card `#212121` | **16.10** | ✅ AAA |
| Muted `#65564E` on cream | **6.81** | ✅ AA |
| Button label `#535151` on `#FDFCF4` | **7.66** | ✅ AA |
| Olive `#7D8260` on white | 4.01 | ⚠️ large text only |
| Lilac accent `#968DA1` on white | 3.17 | ⚠️ large text only (used at 46px — passes) |
| Muted `#9F8C82` on white | 3.21 | ⚠️ large only — **used at 13–15px, fails** |
| **Primary button — white on `#7E8A7A`** | **3.62** | ❌ **fails AA at 15px** |
| **Button hover — white on `#AAAF92`** | **2.27** | ❌ **fails badly** |
| **Alt button — white on `#B2AC88`** | **2.30** | ❌ **fails** |
| **Lilac accent on sand `#F0EDE6`** | **2.71** | ❌ **fails** |
| **Disabled `#8F8F8F` on `#E2E2E2`** | **2.50** | ❌ fails (tolerated for disabled) |
| **Gold `#D0AC68` on white** | **2.15** | ❌ fails |

> **Headline problem: every button on the site fails contrast, and hovering makes it worse** — 3.62 → 2.27.
>
> **Fix:** shift the sage ramp one step darker — primary ≈ `#5F6B5B`, hover ≈ `#7E8A7A`. Preserves the identity, passes AA.

### 10.2 Semantics & ARIA

| Page | h1 | h2 | h3 | `aria-expanded` | `aria-current` | imgs w/o alt |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | **6** | 7 | 3 | 0 | 0 | 0 |
| `/app-1` | **26** | 2 | 0 | 0 | 0 | 0 |
| `/videos` | **9** | 1 | 0 | 0 | 0 | **6** |
| `/blog` | **4** | 13 | 0 | 1 | 1 | 0 |
| `/services-4` | **8** | 4 | 0 | 0 | 0 | 0 |

**Failures:**

- **Heading hierarchy is broken on every page.** `/app-1` has 26 `<h1>` elements — Wix promotes styled text to h1. Screen-reader document outline is unusable. Rebuild with exactly one h1 per page.
- **`/videos`: 6 images with empty `alt`** — video poster frames, invisible to assistive tech.
- **Tabs are not accessible.** `FASE 01/02/03` on `/` and the filter tabs on `/blog` and `/services-4` have no `role="tab"`/`tablist`, no `aria-selected`, no roving tabindex, no keyboard arrow navigation.
- **No active-page indication** in the nav (`aria-current` absent everywhere except one instance on `/blog`).
- **Videos have no captions, controls, or transcripts.** Muted autoplay loops are exempt from WCAG 1.2.x only if purely decorative — recipe demonstrations are not.

**Passes:**

- ✅ `lang="es"` correctly set on all pages
- ✅ Alt text on photographic images is descriptive and in Spanish
- ✅ Focus indicator exists (`3px solid highlight`, system color) — but it's the browser default, not a designed token, and `highlight` won't respect the brand palette
- ✅ `forced-colors: active` (Windows High Contrast) is handled

### 10.3 Data bug

On `/app-1`, the same file `fe4292_646ababc2a6849c2a1fcd4ab7cceb76e~mv2.png` is served twice with contradictory alt text:

- *"Pantalla de la app Nutricycle mostrando recetas por fase del ciclo menstrual"*
- *"Alicia Basurto, health coach de nutrición hormonal, creadora de Nutricycle"*

One of the two images was never uploaded.

### 10.4 Platform constraints

| Constraint | Impact on migration |
| --- | --- |
| **Mobile is a separate 320px document** with its own type scale | Will not survive migration. Rebuild mobile-first using its content order as reference. |
| **No tablet layout exists** | 768–980px is entirely undesigned — net-new design work. |
| **Images on Wix CDN** (`static.wixstatic.com`) with proprietary `srcset` transform | Requires re-hosting all assets + rebuilding responsive images (`next/image` or equivalent). |
| **Fonts are Wix-hosted** | Cormorant Garamond, Montserrat, Playfair Display, Inter are all on Google Fonts and self-hostable. |
| **Futura LT W01 Light is a licensed Monotype webfont** | Available only through Wix's license — **cannot be carried over.** Either drop it (Inter already overlaps its role) or budget for a license/substitute. |
| **1 `<iframe>` per page** | Wix's own performance/analytics frame — discardable. |

---

## 11. Reusable Component Inventory

The whole site reduces to ~12 components:

| Component | Used on |
| --- | --- |
| `SiteHeader` (sticky, logo + 4-link nav) | all |
| `SiteFooter` (brand / tagline / socials / legal) | all |
| `Hero` (eyebrow + H1 + sub + 0–2 CTAs) | `/`, `/videos`, `/app-1`, `/blog`, `/services-4` |
| `SplitSection` (image ↔ text, alternating) | `/` §2, §3 |
| `FilterTabs` | `/blog`, `/services-4`, `/videos` |
| `TabPanels` (FASE 01/02/03) | `/` §4 |
| `StatStrip` (3-col) | `/app-1` §2 |
| `NumberedSteps` (3-col) | `/app-1` §3 |
| `PhaseCard` (name/tagline/days/copy/recipe list) | `/app-1` §4 |
| `FeatureCard` grid | `/app-1` §5, `/` §2 bullets |
| `PostCard` (image + title + date [+ author/read-time]) | `/blog`, `/services-4` |
| `CtaBand` (YouTube / app-store) | `/videos`, `/app-1` |

**Two recurring grids:** 3-column (video sections, steps, features) and 4-column (phases, article grid) — both collapsing to 1 on mobile.

> **The 4 cycle phases are the site's organizing spine** — they appear on `/`, `/app-1`, and `/blog`. In React this should be a single shared data source (`phases.ts`), not three hardcoded copies.

---

## 12. Issues & Priorities

### 12.1 Content & data inconsistencies

1. **`Videos` nav item links to `/` instead of `/videos`** — `/videos` is fully built but completely orphaned. Almost certainly a config error.
2. **`/testimonials` is empty** but is the footer brand-mark's link target on every page. Either build it or repoint the footer.
3. **`/blog` phase tabs are missing `FASE FOLICULAR`** — 4 tabs for 5 sections.
4. **Phase day-ranges disagree between pages:**

   | Phase | `/app-1` | `/blog` |
| --- | --- | --- |
   | Folicular | días 1–13 | días 6–13 |
   | Menstruación | días 1–5 | días 1–5 |
   | Lútea | días 17–28 | días 18–29 |

   `/app-1` has Folicular and Menstruación overlapping. `/blog` is the coherent set. **Pick one canonical definition.**
5. **Duplicate image with contradictory alt text** on `/app-1` (§10.3).
6. **Content is at placeholder stage** — 1 blog post repeated across every card slot, video cards with no real thumbnails.

### 12.2 URL changes for the rebuild

| Current | Proposed | Action |
| --- | --- | --- |
| `/services-4` | `/articulos` | 301 redirect |
| `/app-1` | `/app` | 301 redirect |
| `/política-de-privacidad` | `/politica-de-privacidad` | 301 redirect (drop non-ASCII slug) |

### 12.3 Highest-priority items for the redesign

1. **Fix button contrast** — every button fails AA, and hover degrades it further.
2. **One `<h1>` per page** — `/app-1` currently has 26.
3. **Design the responsive system from scratch** — none exists to port; add the missing tablet range.
4. **Consolidate five type families down to two** (a Cormorant-class serif + one sans).
5. **Promote the 11 hard-coded hex values into real tokens** — they carry the current visual identity but live outside the theme.
6. **Replace the browser-default focus ring** with a designed, brand-colored token.
7. **Make tabs and filters keyboard-accessible.**
8. **Resolve the Futura license** before committing to the type system.
9. **Define a content model** — the layout assumes 40+ phase-tagged recipes; one post exists.
10. **Decide on lead capture** — there is currently no way to retain a visitor who isn't ready to install the app.
