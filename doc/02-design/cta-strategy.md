# App Store CTA Strategy

**Companion docs:** [site-audit.md](../01-research/site-audit.md) · [site-structure.md](../03-architecture/site-structure.md) · [design-direction.md](design-direction.md)

**Context:** The Nutricycle mobile app is developed and live on both stores. The website's mission is to deliver hormonal-health education and a basic introduction to the app, converting readers into installs.

---

## Critical finding

**Every app CTA on the current site is dead.**

`DESCARGAR APP`, `APP STORE`, and `GOOGLE PLAY` all render as `<button type="button">` with no `href`, no anchor wrapper, and no click handler. Verified across the full markup:

- The entire `/app-1` page contains **zero outbound links** — the only external link is `mailto:hola@aliciabasurto.com`
- No `apps.apple.com`, `play.google.com`, or any store URL appears anywhere on the site
- The footer's Youtube / Facebook / Instagram links point to an **internal Wix page** (`/instagram`), not to real profiles

The app is live in the stores and the website cannot currently send it a single install. This is the highest-value fix in the project.

---

## 1. Mission weighting

| Layer | Role | Weight |
| --- | --- | --- |
| Education (`/ciclo`, `/educacion`, `/recetas`, `/videos`) | Traffic + trust. SEO surface. ~50 of ~117 URLs. | **Volume** |
| App introduction (`/`, `/app`) | Explain, then convert | **Conversion** |
| Programs (`/programas`) | Secondary revenue | **De-emphasized** |

**Consequence:** the app is already monetized in-store (`Plan Hormonal desde la app` = in-app purchase). A web checkout for app access would be redundant *and* conflict with store billing policy. Therefore:

- **Drop the auth + member area tier entirely** (7 templates). Nothing on the web needs a login.
- Keep `/programas` lean — sales page + external checkout, not a self-hosted LMS.

Route templates: **38 → 31.** URL count unchanged (~117), since the cut pages were all fixed-URL.

---

## 2. Store routing logic

The single most important behavior. Desktop visitors **cannot install** — sending them to a store page they can't act on is where most app-landing funnels leak.

| Context | Behavior |
| --- | --- |
| **iOS / iPadOS** | Direct to App Store URL |
| **Android** | Direct to Google Play URL |
| **Desktop / unknown** | Both badges **+ QR code** resolving to the smart link |
| **In-app browsers** (Instagram, Facebook) | Both badges — these browsers often break store deep links |

Implement as one `<a>` whose `href` resolves client-side after hydration, with a **server-rendered fallback of both badges**. Never render a broken CTA before JS loads.

### Internal redirect routes

```text
/ir/app          → smart link (device detect → store)
/ir/app/ios      → App Store
/ir/app/android  → Google Play
```

Routing through an owned `/ir/` path rather than raw store URLs gives click tracking, one place to change URLs, and a QR target that never needs reprinting.

---

## 3. Placement map — landing page

The current home has 4 sections whose CTAs point to `/videos` and `/app-1`. Rework:

| # | Section | CTA | Type |
| --- | --- | --- | --- |
| 1 | **Hero** | `Descargar gratis` → `/ir/app` · secondary `Ver cómo funciona` → anchor §3 | **Primary** + ghost |
| 2 | Nutrición Cíclica (methodology) | `Descubre tu fase` → `/ciclo` | Content |
| 3 | Cómo funciona (3 steps) | Store badges inline, after step 3 | **Secondary store** |
| 4 | Las 4 fases | `Explora las recetas` → `/recetas` | Content |
| 5 | Sobre Alicia | `Conoce el método` → `/metodo` | Content |
| 6 | **Closing band** (`#4A4453`) | Both badges + QR + rating strip | **Primary store** |
| — | **Sticky mobile bar** | Appears after hero exits viewport | **Persistent** |

### Rules

- **One primary CTA per viewport.**
- Sections 2 / 4 / 5 deliberately push to **education, not the store** — a visitor who hasn't understood the value yet will not install.
- Three store touchpoints on the landing page: hero (intent-ready), mid-page (convinced), closing (last chance), plus the sticky bar on mobile.
- **Reuse the closing band verbatim** at the foot of every `/ciclo/[fase]` and `/recetas/[slug]` page. That is where educational search traffic lands, and it is the highest-intent moment on the site.

---

## 4. Component specs

### 4.1 `AppStoreCTA` — primary button

| State | Background | Label | Contrast |
| --- | --- | --- | --- |
| Default | `#5F6B5B` | `#FFFFFF` | **5.61** ✅ AA |
| Hover | `#4E594B` | `#FFFFFF` | **7.36** ✅ AAA |
| Active | `#3F4A3D` | `#FFFFFF` | **9.30** ✅ AAA |
| Focus | — | — | `2px solid #27211E`, `outline-offset: 2px` |
| Loading | `#5F6B5B` | spinner | While resolving device |

Fixes the audit's worst defect: the current button is 3.62:1 and **hovering drops it to 2.27:1**. The new ramp darkens on interaction, so contrast improves as the user engages.

**Geometry:** `border-radius: 12px`, `min-height: 48px`, `padding: 14px 28px`, Inter 15px, `letter-spacing: 0.1em`.

### 4.2 `StoreBadges` — official badge pair

**Do not recreate these.** Use official artwork from Apple Marketing Resources and the Google Play brand guidelines, in their **Spanish localizations** (`Descárgalo en el App Store` / `Disponible en Google Play`).

Both programs specify minimum size and clear-space rules — follow each program's stated values. Getting this wrong is a review-rejection risk.

Layout: side by side on desktop, stacked on mobile, equal optical height.

### 4.3 `StickyAppBar` — mobile only

```text
┌────────────────────────────────────────┐
│ [icon]  Nutricycle          ( Instalar ) │
│         ★ 4.8 · Gratis                 │
└────────────────────────────────────────┘
```

- Appears once the hero scrolls out; hides on scroll-up
- `#5F6B5B` background, white label — 5.61:1
- Dismissible, remembered in `localStorage`
- `≤ md` breakpoint only
- Adds `padding-bottom` to `<body>` so it never covers content
- Respects `env(safe-area-inset-bottom)`

### 4.4 `QRDownload` — desktop only

Renders at `≥ lg` inside the closing band. Static SVG pointing at `/ir/app`, captioned `Escanea para descargar`.

This is the desktop conversion path. Without it, every desktop visitor is a dead end.

---

## 5. Copy

Current label `DESCARGAR APP` states a mechanic. Lead with outcome, and always show the price — "gratis" is the single biggest lift on an install CTA.

| Slot | Copy |
| --- | --- |
| Hero primary | `Descargar gratis` |
| Hero support | `Gratis · iOS y Android · Sin tarjeta` |
| Hero secondary | `Ver cómo funciona` |
| Mid-page | `Empieza hoy con tu fase actual` |
| Closing band | `Tu ciclo, tu guía — en tu bolsillo` |
| Closing support | `Descarga gratis · Plan Hormonal desde la app` *(existing copy, keep)* |
| Sticky bar | `Instalar` |
| Post-article | `¿Quieres esto adaptado a tu fase? Descarga Nutricycle` |

Carry the existing `4.8 ★ · 40+ recetas · 4 fases` stat strip **directly above the store badges** — social proof adjacent to the CTA, not stranded further up the page.

---

## 6. Accessibility

The current implementation fails several checks. The rebuild must fix all of them:

- **Render as `<a href>`, never `<button>`.** The current buttons aren't crawlable, can't be middle-clicked or opened in a new tab, and give analytics nothing to bind to.
- Contrast fixed to AA+ in every state.
- **Designed** focus ring — `2px solid #27211E` — replacing the browser-default `3px solid highlight`.
- `48px` minimum touch target.
- Badge images need real `alt` (`Descárgalo en el App Store`), not empty.
- QR code needs a text alternative: the URL in visible text beneath it.
- Sticky bar must not trap focus and must be keyboard-dismissible.

---

## 7. Tracking

Route every store click through `/ir/app`:

| Parameter | Purpose |
| --- | --- |
| `?src=home-hero` / `home-closing` / `recipe-footer` / `sticky` | Which placement converts |
| Apple `pt` / `ct` campaign params | App Store attribution |
| Google Play `&referrer=utm_source%3D…` | Play install attribution |

Instrument three events: `cta_view`, `cta_click`, `store_redirect`. Without placement-level data, the four touchpoints can't be compared.

---

## 8. Required inputs

Blockers for implementation. The design above is complete without them; nothing can ship until they exist.

| # | Item | Status |
| --- | --- | --- |
| 1 | App Store URL (`https://apps.apple.com/…/id…`) | ❌ Needed |
| 2 | Google Play URL (`https://play.google.com/store/apps/details?id=…`) | ❌ Needed |
| 3 | App icon at 512×512 — sticky bar, QR card, OG images | ❌ Needed |
| 4 | Real Youtube / Facebook / Instagram profile URLs | ❌ Needed — footer links are currently internal |

### Open questions

5. **Is the `4.8 ★` rating real store data?** If so, pull it live rather than hardcode. If aspirational, it must come out — a fabricated rating beside a store badge is a review risk.
6. **With no login anywhere on the web, should `/programas` sell on-site or link to an external checkout?** This is the last open item affecting page count.
