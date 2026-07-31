# Revised Direction — Post App Analysis

**Date:** 2026-07-31
**Trigger:** [app-content-strategy.md](../04-content/app-content-strategy.md) — analysis of the shipped NutriCycle app
**Status:** Supersedes parts of [site-structure.md](../03-architecture/site-structure.md) and [design-direction.md](../02-design/design-direction.md), as noted per section.

---

## Summary

The app analysis changes the plan in six material ways. Two of them are large enough to reshape the architecture:

1. **The app already owns a content database and an admin panel.** The website must not build a second one.
2. **The app is bilingual (ES/EN).** The website must be too.

The remaining four are palette, typography, pricing, and feature scope.

---

## 1. Six material changes

| # | New fact | Impact |
| --- | --- | --- |
| 1 | App runs on **Supabase (PostgreSQL)** with an **admin panel** managing recipes, videos, and articles | **Architecture.** The website reads the app's database instead of duplicating content. |
| 2 | App has a **Spanish / English toggle**; all SEO keywords supplied are English | **Scope.** Bilingual site, not Spanish-only. |
| 3 | App has a **defined palette** with four phase colors | **Design.** The web palette had no phase colors despite phases being the spine. |
| 4 | App uses **Instrument Serif + Outfit** | **Design.** Conflicts with Cormorant + Inter. |
| 5 | Pricing is **$14.99/mo · $84.99/yr, billed through the stores** | **Scope.** Confirms no web checkout. Refund policy page no longer needed. |
| 6 | App is far broader than assumed — **AI chat (Gemini 2.0), hormone chart, meal planner, shopping list, hydration, wellness activities, daily log** | **Content.** The website was under-selling the product. |

---

## 2. The architectural decision: one content source

**This is the highest-value change in this revision.**

The app already has:
- A Supabase PostgreSQL database holding recipes, articles, and videos
- An admin panel where coaches upload and manage that content

The original plan had the website building its own PostgreSQL content tables. That would mean **two databases, two admin surfaces, and every recipe entered twice** — guaranteed to drift within weeks.

### Decision

> The website **reads from the app's existing Supabase database**. It does not own content.

This satisfies the stated stack exactly — **Supabase *is* PostgreSQL**, and the Node.js API connects to it over a standard connection string.

| Layer | Owner |
| --- | --- |
| Recipes, articles, videos, phases | **App's Supabase DB** — read-only from web |
| Publishing / editing | **App's existing admin panel** — unchanged |
| Website-only data | Website's own tables (see below) |

### Website-owned tables

Small, and genuinely web-specific:

| Table | Purpose |
| --- | --- |
| `cta_events` | Store-click tracking ([cta-strategy.md §7](../02-design/cta-strategy.md)) |
| `contact_submissions` | Contact form |
| `newsletter_subscribers` | Email capture |
| `seo_overrides` | Per-route meta title/description overrides |
| `page_content` | Marketing copy for static pages, if the client wants it editable |

These can live in the same Supabase project under a `web_` prefix, or a separate database. Same project is simpler and is the recommendation.

### Consequences

- The Node API becomes a **read / cache / transform layer**, not a second source of truth
- Content published in the app appears on the website automatically
- A `published_to_web` boolean on content tables controls what is public — this is how the teaser strategy in §5 is implemented
- ISR / on-demand revalidation replaces a full CMS

**Required:** read-only Supabase credentials and the current schema for `recipes`, `articles`, `videos`, and `phases`.

---

## 3. Language: bilingual ES / EN

| Evidence | Implication |
| --- | --- |
| App has a language toggle | Users expect parity |
| Supplied SEO keywords are **all English** | English is the growth market |
| Existing site is `lang="es"`; the audience and founder are Spanish-speaking | Spanish is the established base |
| App articles are "auto-translated to your language" | Content is already bilingual-capable |

### Decision

> **Spanish at the root, English under `/en`.**

```text
/                    Spanish (default)
/en                  English
/recetas             ES
/en/recipes          EN
```

Spanish stays at the root so existing URLs and their search equity survive the migration ([site-structure.md §5](../03-architecture/site-structure.md)).

**Implementation:** Next.js i18n routing with `hreflang` pairs and a locale-aware sitemap. Route slugs are localized, not shared — `/recetas` and `/en/recipes`, not `/en/recetas`.

**Launch scope:** full Spanish; English for the marketing pages, FAQ, and the top ~10 blog articles. Do not block launch on translating all ~70 content URLs.

> This closes open decision #3 in [project-brief.md](project-brief.md), previously deferred.

---

## 4. Palette: neutrals from the web, phases from the app

The two palettes are not in conflict — they cover different jobs.

| Source | Provides | Gap |
| --- | --- | --- |
| Website (audited) | Warm neutral canvas: cream, sand, ink, olive, lilac | **No phase colors** — despite phases being the product's spine |
| App | Five phase colors | **None work as text or buttons** — 1.25–2.2:1 |

### Measured

App colors as **backgrounds** with ink `#2C2C2C`:

| Color | Hex | Contrast | Verdict |
| --- | --- | --- | --- |
| Sage | `#A3B3A5` | **6.35** | ✅ |
| Menstrual rose | `#E8A0A2` | **6.64** | ✅ |
| Follicular mint | `#B8D8BC` | **9.04** | ✅ |
| Ovulation gold | `#F9E4B7` | **11.18** | ✅ |
| Luteal lavender | `#C8BCE0` | **7.80** | ✅ |

The same colors as **text or button fills**: `2.20 · 2.10 · 1.55 · 1.25 · 1.79` — all fail badly.

### Decision

> **App colors are tints and chips. Darkened variants carry text and action.**

| Phase | Tint (app) | Ink variant | On white | Use |
| --- | --- | --- | --- | --- |
| Menstrual | `#E8A0A2` | `#A34E52` | **5.57** | Labels, borders, icons |
| Follicular | `#B8D8BC` | `#3F6B47` | **6.17** | ″ |
| Ovulation | `#F9E4B7` | `#7A5C15` | **6.23** | ″ |
| Luteal | `#C8BCE0` | `#5C4C7D` | **7.54** | ″ |

**Foundation stays as specified** in [design-direction.md §6](../02-design/design-direction.md): cream `#FDFCF4`, sand `#F0EDE6`, ink `#27211E`, action `#5F6B5B` → `#4E594B` → `#3F4A3D`.

**Sage reconciliation:** the app's `#A3B3A5` fails as an action color (2.2:1). It becomes a **tint**; the action color remains `#5F6B5B` (5.61:1) — a darker sibling of the same hue, so the two products still read as one brand.

**Net gain:** the website acquires a phase color system it did not have, and the app's palette acquires accessible text variants it did not have. Both improve.

---

## 5. Typography

| | Display | UI |
| --- | --- | --- |
| App | Instrument Serif | Outfit |
| Web plan | Cormorant Garamond | Inter |

### Decision

> **Cormorant Garamond (display) + Outfit (UI).**

Reasoning:

- **Keep Cormorant** — it is the existing brand's voice, the client asked to maintain the visual identity, and Cormorant **Light 300** is what delivers the "loose and ethereal" brief. Instrument Serif ships in a single weight, which would remove that lever entirely.
- **Adopt Outfit, drop Inter** — free app parity in the type that covers most of the interface, at no cost to the aesthetic direction.
- Palette and phase-color unification (§4) carries brand recognition far more strongly than the serif does.

> Verify Instrument Serif's available weights before final sign-off. If strict app parity is preferred over the ethereal direction, Instrument Serif + Outfit is the alternative — but the display type would lose its Light weight.

Everything else in [design-direction.md §3](../02-design/design-direction.md) — the 10-token scale, the 28px Light floor, the `clamp()` sizing — is unchanged.

---

## 6. Phase model — a three-way conflict

There are now **three** contradictory definitions:

| Source | Menstrual | Follicular | Ovulation | Luteal |
| --- | --- | --- | --- | --- |
| Site `/app-1` | 1–5 | **1–13** | 14–16 | 17–28 |
| Site `/blog` | 1–5 | **6–13** | 14–17 | 18–29 |
| App strategy doc | — | **1–13** | ~24h | 15–28 |

### Why they differ

Two valid models are being mixed:

- **Clinical (2-phase):** the follicular phase begins on day 1 and *includes* menstruation → days 1–13
- **Consumer (4-phase):** menstrual is treated as its own phase → follicular starts after bleeding ends

The app uses the **4-phase** model. So does the website.

### Decision

> **Do not resolve this from documents. Read it from the app's actual phase-calculation code.**

The website must display the identical phase for the identical cycle day. If they disagree, a user reading `/ciclo/folicular` on day 6 and opening the app to see "menstrual" loses trust immediately — and that user is mid-conversion.

**Proposed canonical set, pending confirmation against the app's algorithm:**

| Phase | Days |
| --- | --- |
| Menstrual | 1–5 |
| Follicular | 6–13 |
| Ovulation | 14–16 |
| Luteal | 17–28 |

The clinical overlap becomes a **blog article**, not a data conflict — *"Why some sources say the follicular phase starts on day 1"*. It is good SEO content and it resolves the ambiguity for readers.

---

## 7. Content strategy: teaser, not vault

The client's page list included a *public recipe library*. The app strategy doc omits it — recipes are the app's core value.

### Decision

> **Publish a curated subset publicly; keep the full library in the app.**

| | Public web | In app |
| --- | --- | --- |
| Recipes | ~15–20, phase-tagged | 40+ |
| Articles | Full blog | Full library |
| Videos | Curated | Full library |
| Meal plans, shopping list, AI chat, hormone chart, tracking | ❌ | ✅ |

Implemented with the `published_to_web` flag from §2 — the coach chooses per item, in the admin panel that already exists.

This serves both goals: long-tail SEO (*"follicular phase recipes"*) drives traffic, while the features that require the app stay in the app. Every public recipe ends with the CTA band from [cta-strategy.md §3](../02-design/cta-strategy.md).

---

## 8. What the website was under-selling

The app is substantially more capable than the current site communicates. These now need surfacing:

| Feature | Placement |
| --- | --- |
| **AI chat (Gemini 2.0), phase-aware** | Home hero support + a dedicated `/funcionalidades` section. This is the strongest differentiator against generic period trackers and it appears nowhere on the current site. |
| Hormone chart | Home feature grid + `/como-funciona` step 3 |
| Weekly meal planner + macros | `/funcionalidades` |
| Shopping list | `/funcionalidades` |
| Wellness activities (yoga, meditation, breathing) | `/funcionalidades` |
| Daily log — symptoms, mood, energy | `/como-funciona` step 4 |
| Hydration tracker | `/funcionalidades` |

---

## 9. Revised route inventory

**26 route templates** (down from 31), bilingual.

| Group | Routes |
| --- | --- |
| **Marketing** (6) | `/` · `/funcionalidades` · `/como-funciona` · `/membresia` · `/descargar` · [`/sobre`](../04-content/about-page.md) |
| **Education** (4) | `/blog` · `/blog/[slug]` · `/ciclo` · `/ciclo/[fase]` ×4 |
| **Recipes** (3) | `/recetas` · `/recetas/fase/[fase]` ×4 · `/recetas/[slug]` |
| **Video** (2) | `/videos` · `/videos/[slug]` |
| **Support** (2) | `/faq` · `/contacto` |
| **Legal** (4) | `/terminos` · `/privacidad` · `/cookies` · `/aviso-medico` |
| **System** (5) | `/404` · `/500` · `/buscar` · `/enlaces` · `/ir/app` |

### Removed

| Route | Reason |
| --- | --- |
| `/programas`, `/programas/[slug]` | No course product — `/membresia` is the app subscription |
| `/checkout` ×3 | Billing is handled by the stores |
| `/politica-de-reembolso` | Store-handled refunds; no web transaction |
| `/precios` | Merged into `/membresia` |
| `/app` | Split into `/funcionalidades` + `/descargar` |
| `/testimonios` | Folded into `/` and `/sobre` — it was never more than a footer link to an empty page |
| Auth + member area ×7 | Already dropped; the app strategy confirms it |

### Added

| Route | Reason |
| --- | --- |
| `/funcionalidades` | The app has far more features than one page could hold |
| `/como-funciona` | Converts skeptical visitors — the 5-step walkthrough |
| `/descargar` | Single-purpose conversion page for ad and email campaigns |

### URL estimate

| | ES | EN | Total |
| --- | --- | --- | --- |
| Fixed | 28 | 28 | 56 |
| Content | ~70 | ~15 (launch subset) | ~85 |
| **Total** | | | **~141** |

---

## 10. Updated blockers

| # | Item | Owner | Status |
| --- | --- | --- | --- |
| 1 | **Supabase read credentials + schema** for recipes / articles / videos / phases | Client / app dev | ❌ **New — now the top blocker** |
| 2 | **The app's phase-calculation logic** — source of truth for day ranges | Client / app dev | ❌ **New** |
| 3 | App Store URL | Client | ❌ |
| 4 | Google Play URL | Client | ❌ |
| 5 | ~~App icon 512×512~~ + **store screenshots** | Client | ⚠️ Icon delivered (`brand/app-icon-1024.png`); **screenshots still missing** |
| 6 | Real Youtube / Facebook / Instagram profile URLs | Client | ❌ |
| 7 | Confirm `4.8 ★` is real store data | Client | ❌ |
| 8 | Confirm pricing ($14.99 / $84.99) is live in both stores | Client | ❌ |
| 9 | Instrument Serif weight availability | Design | Verify |
| 10 | **Founder bio, credentials, positioning statement, testimonials** | Client | ❌ **New** — [about-page.md §4](../04-content/about-page.md) |
| 11 | **App screenshots** — `/funcionalidades`, `/como-funciona`, `/descargar` are built around them; zero exist | Client / app dev | ❌ **New — blocks Phase 2** |
| 12 | **Store badge artwork** (ES + EN) — `public/badges/` is empty | Client | ❌ **New** |
| 13 | **SVG logo** + full favicon set — all brand assets are raster today | Client / design | ❌ **New** |

Items 1 and 2 now gate more work than anything else. Without them the content layer cannot be built and the phase system cannot be trusted.

Items 10–13 came out of the asset audit in [image-assets.md §5](../04-content/image-assets.md), which lists all eight gaps with their consequences. **11 and 12 gate Phase 2** — three of the six marketing pages cannot be filled without them.

---

## 11. Revised build order

| Phase | Scope |
| --- | --- |
| **0** | Workspace, i18n routing, Supabase read client, `packages/shared` phase model |
| **1** | Design tokens (merged palette + phase colors), header/footer, layout primitives, `FullBleedQuote`, 404/500 |
| **2** | `/` **including the `Sobre mí` founder section**, `/funcionalidades`, `/como-funciona`, `/descargar` + the full CTA system |
| **3** | `/membresia`, **`/sobre`**, `/faq`, `/contacto`, legal ×4 |
| **4** | `/ciclo` + `/ciclo/[fase]`, `/recetas` ×3 — reading from Supabase |
| **5** | `/blog` ×2, `/videos` ×2, `/buscar` |
| **6** | English locale, `hreflang`, localized sitemap |
| **7** | Analytics, store-click attribution, launch checklist |

Phase 0 moves first because everything downstream depends on the shared phase model and the Supabase connection.

The founder section on `/` and the `/sobre` page are specified in [about-page.md](../04-content/about-page.md). The home section is **not optional** — it is section 3 of 4 on the current site and every photographic asset the project owns is founder imagery. It ships in Phase 2 with the rest of `/`; its `Conóceme` link resolves when `/sobre` lands in Phase 3.
