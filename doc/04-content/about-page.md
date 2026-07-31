# Founder Presence — Home Section + `/sobre`

**Date:** 2026-07-31
**Status:** Closes open decision **#6** in [site-structure.md §7](../03-architecture/site-structure.md) — *"Split `/metodo` into `/metodo` + `/sobre-mi`?"* → **Yes, split.**
**Companion docs:** [image-assets.md](image-assets.md) · [revised-direction.md](../00-overview/revised-direction.md) · [cta-strategy.md](../02-design/cta-strategy.md)

Two deliverables, not one:

1. A **founder section on the landing page** — carried forward from the current site, required on every future version of `/`.
2. A **dedicated `/sobre` page** — new. It does not exist today.

---

## 1. Why this is not optional

| Evidence | Implication |
| --- | --- |
| The live site's home page devotes **section 3 of 4** to `SOBRE MÍ` ([site-audit.md §3](../01-research/site-audit.md)) | The founder section is established layout, not decoration. Removing it is a regression. |
| Site chrome is **NutriCycle**; the personal brand is **Alicia Basurto** ([site-audit.md §1](../01-research/site-audit.md)) | Two names, one business. The bridge between them is the founder story, and it currently lives in one home section. |
| The header logo's alt text is *"Alicia Basurto, health coach de nutrición hormonal"* | The person is already carrying the brand's credibility. |
| The photography set is **five images, all of Alicia**, and nothing else ([image-assets.md §3](image-assets.md)) | Every photographic asset the project owns is founder imagery. A site with no founder page has nowhere to put most of its own art direction. |
| `/testimonios` was folded into `/` and `/sobre` ([revised-direction.md §9](../00-overview/revised-direction.md)) | `/sobre` now inherits the social-proof job as well. |
| The product is **paid health guidance** ($14.99/mo) with no free trial surface on the web | Trust is the conversion bottleneck. A named, qualified, visible practitioner is the cheapest trust available. |

> The route `/sobre` already appears in the revised marketing group ([revised-direction.md §9](../00-overview/revised-direction.md)). What was missing was a specification. This is it.

---

## 2. Home — the `Sobre mí` section

**Position:** after the method / how-it-works section, before the closing CTA band. This preserves the current running order — hero → method → founder → proof.

**Section background:** lilac `#ECEAF2`, as served today, alternating against the cream and white sections around it ([site-audit.md §4.1](../01-research/site-audit.md)).

### Layout

Two columns, mirrored against the method section above it — **text left, portrait right** on `lg`, stacking to portrait-then-text on mobile.

```text
┌──────────────────────────────┬───────────────────────┐
│ SOBRE MÍ            (eyebrow)│                       │
│                              │                       │
│ Alicia Basurto:              │      portrait-tea     │
│ Nutrición Cíclica  (Cormorant│         2:3           │
│                     + Playfa-│                       │
│                     ir accent│                       │
│                              │                       │
│ 2–3 short paragraphs         │                       │
│                              │                       │
│ Conóceme  →  /sobre          │                       │
└──────────────────────────────┴───────────────────────┘
```

| Slot | Content | Source |
| --- | --- | --- |
| Eyebrow | `SOBRE MÍ` / `ABOUT` | Existing |
| Heading | `Alicia Basurto: Nutrición Cíclica` — italic accent on the second half, matching the live site's Playfair `#968DA1` treatment | Existing |
| Body | 2–3 paragraphs, ~80 words total. Credentials, the why, the method in one line. | ⚠️ **Needs writing** — §4 |
| Image | `alicia/portrait-tea.jpg` | Exists |
| Link | `Conóceme` → `/sobre` | **New target** |

### One change from the current site

Today this section's link is `Comienza tu sincronización` → `/blog` — a recipe feed. It sends someone who just started trusting a person into a content index.

> **New:** the founder section links to `/sobre`. The section builds interest in Alicia; the link should resolve that interest, not redirect it.

The app CTA is **not** placed in this section. Per [cta-strategy.md](../02-design/cta-strategy.md), the closing band owns the download ask; a second competing CTA here weakens both.

---

## 3. `/sobre` — the page

**Slug:** `/sobre` (ES) · `/en/about` (EN). Localized, not shared ([revised-direction.md §3](../00-overview/revised-direction.md)).
**Purpose:** convert a visitor who is interested but not yet convinced, by answering *who is telling me this, and why should I believe them.*

### Sections

| # | Section | Content | Image |
| --- | --- | --- | --- |
| 1 | **Hero** | Eyebrow `SOBRE MÍ` · H1 `Hola, soy Alicia` · one-line positioning statement. Single `h1` on the page. | `alicia/portrait-smiling.jpg`, 2:3, right column |
| 2 | **Story** | Long-form, 300–500 words. The problem she had, what she found, why cyclical nutrition. First person. | — |
| 3 | **Credentials** | Qualifications, certifications, years practising, clients served. Plain list — no badge graphics. | — |
| 4 | **Full-bleed band** | A single pull-quote or the method in one sentence, over the photograph. | `alicia/kitchen-wide.avif`, 16:9 |
| 5 | **Method** | 3–4 principles. Brief — the depth lives on `/como-funciona`, linked from here. | — |
| 6 | **Proof** | Testimonials, absorbed from the retired `/testimonios`. Renders as a real empty state if none exist. | — |
| 7 | **CTA band** | Standard closing band — store buttons. Identical component to every other page. | — |

### Constraints

- **Exactly one `h1`.** The live site's `/app-1` has 26 ([site-audit.md §10.2](../01-research/site-audit.md)). This page ships with one.
- Section 6 must render an **empty state**, not a blank region. `/testimonials` rendering as an empty shell is a documented bug ([site-audit.md §12.1](../01-research/site-audit.md)) — do not reproduce it.
- No new components. The page is `Hero` + `SplitSection` ×2 + `FullBleedQuote` + `TestimonialGrid` + `CtaBand`. Only `FullBleedQuote` is net-new, and it is reusable on `/membresia`.

---

## 4. Content required from the client

Nothing here can be written from the existing site — the current `SOBRE MÍ` section contains no biographical detail at all.

| # | Item | Length | Blocks |
| --- | --- | --- | --- |
| 1 | Founder bio, long form | 300–500 words | `/sobre` §2 |
| 2 | Founder bio, short form | ~80 words | Home section |
| 3 | Credentials — qualifications, certifying bodies, dates | list | `/sobre` §3 |
| 4 | Positioning statement | one line | `/sobre` §1 |
| 5 | Testimonials — name, text, consent to publish | 3–6 | `/sobre` §6 |
| 6 | English translations of 1–4 | — | `/en/about` |

> Items 1–4 are the **entire** text of both deliverables. Without them, the layout can be built but not filled.

---

## 5. SEO

| | ES | EN |
| --- | --- | --- |
| Title | `Sobre Alicia Basurto — Nutrición Cíclica \| Nutricycle` | `About Alicia Basurto — Cyclical Nutrition \| Nutricycle` |
| Description | Founder positioning + credentials, ~155 chars | ″ |
| Canonical | `/sobre` | `/en/about` |
| `hreflang` | paired both ways | ″ |

**JSON-LD:** a `Person` entity — `name`, `jobTitle`, `image` (`portrait-smiling.jpg`), `sameAs` (the social profiles, once real URLs arrive — blocker #6 in [revised-direction.md §10](../00-overview/revised-direction.md)), `worksFor` → the `Organization` entity declared in the root layout.

This is the page that makes the `Person` schema legitimate. It is also where an `author` reference from every `/blog/[slug]` should point — currently every post is bylined `Alicia Basurto` with nothing behind the name.

---

## 6. Placement in the build order

Amends [revised-direction.md §11](../00-overview/revised-direction.md):

| Phase | Scope | Change |
| --- | --- | --- |
| **1** | Design tokens, header/footer, layout primitives | + `FullBleedQuote` primitive |
| **2** | `/`, `/funcionalidades`, `/como-funciona`, `/descargar`, CTA system | + **home `Sobre mí` section** — non-optional |
| **3** | `/membresia`, **`/sobre`**, `/faq`, `/contacto`, legal ×4 | `/sobre` spec'd by this document |
| **6** | English locale | + `/en/about` |

The home section lands in Phase 2 with the rest of `/`; the page lands in Phase 3. The section's `Conóceme` link therefore points at a route that does not exist yet for one phase — acceptable, and the reason `/sobre` should not slip past Phase 3.

---

## 7. Open questions

| # | Question | Default if unanswered |
| --- | --- | --- |
| 1 | Is the founder section's short bio the first paragraph of the long bio, or separately written? | First paragraph, trimmed |
| 2 | Does `/sobre` cover the **method** as well, or does it defer entirely to `/como-funciona`? | Defer — §5 stays to 3–4 lines |
| 3 | Do testimonials carry photos? | No — text and name only; no client photography exists |
| 4 | Should the header nav expose `Sobre` directly, or only the footer? | Footer + home section. The nav is already at 6 items ([site-structure.md §4](../03-architecture/site-structure.md)). |
