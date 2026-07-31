# Nutricycle — Site Structure & Page Inventory

**Project:** aliciabasurto.com → React.js + Tailwind CSS rebuild
**Date:** 2026-07-31
**Companion doc:** [site-audit.md](../01-research/site-audit.md) — layout & design-system audit of the existing site

> ## ⚠️ Partially superseded — 2026-07-31
>
> Analysis of the shipped app changed the route inventory. See **[revised-direction.md](../00-overview/revised-direction.md)**.
>
> | | This doc | Current |
> | --- | --- | --- |
> | Route templates | 31 | **26** |
> | Language | Spanish only | **ES (root) + EN (`/en`)** |
> | Total URLs | ~117 | **~141** |
> | Content source | Own PostgreSQL tables | **App's Supabase DB (read-only)** |
> | Removed | — | `/programas` ×2, `/checkout` ×3, `/politica-de-reembolso`, `/precios`, `/app`, `/testimonios` |
> | Added | — | `/funcionalidades`, `/como-funciona`, `/descargar` |
>
> **Still current in this doc:** the redirect map (§5), navigation principles (§4), and build-order logic (§8).

---

## Headline

| | Count |
| --- | --- |
| **Route templates to build (recommended full build)** | **38** |
| — Tier 1: Core site + commerce | 31 |
| — Tier 2: Auth + member area | 7 |
| Fixed URLs at launch | 33 |
| Content-driven URLs at launch *(est.)* | ~84 |
| **Total live URLs at launch** *(est.)* | **~117** |

> If course content is delivered through an **external platform** (Hotmart, Teachable, Kajabi) instead of self-hosted, Tier 2 is dropped and the build is **31 templates**.

**Language:** Spanish only. All routes in Spanish, matching the existing site (`lang="es"`).

---

## 1. Mapping your 10 categories to routes

| # | Your category | Routes |
| --- | --- | --- |
| 1 | Home / landing page | `/` |
| 2 | About Nutricycle and methodology | `/metodo` |
| 3 | Hormonal health education hub | `/educacion`, `/educacion/[slug]` |
| 4 | Cycle phase education pages | `/ciclo`, `/ciclo/[fase]` ×4 |
| 5 | Public recipe library by phase | `/recetas`, `/recetas/fase/[fase]` ×4, `/recetas/[slug]` |
| 6 | Courses/programs + purchase flow | `/programas`, `/programas/[slug]`, `/checkout`, `/checkout/exito`, `/checkout/cancelado` + Tier 2 |
| 7 | Video library | `/videos`, `/videos/[slug]` |
| 8 | Pricing | `/precios` |
| 9 | FAQ | `/faq` |
| 10 | Contact and legal | `/contacto` + 5 legal routes |

---

## 2. Full route inventory

### Group A — Marketing & Brand (5)

| # | Route | Page | Pages generated | Notes |
| --- | --- | --- | --- | --- |
| 1 | `/` | Home / landing | 1 | Migrates existing 4-section home |
| 2 | `/metodo` | About Nutricycle + methodology | 1 | Absorbs the existing `SOBRE MÍ` and `POR QUE FUNCIONA` sections |
| 3 | `/app` | Nutricycle app landing | 1 | ⚠️ **Not in your list** — migrates `/app-1`, the current primary conversion path |
| 4 | `/precios` | Pricing | 1 | App subscription + program pricing in one table |
| 5 | `/testimonios` | Testimonials / social proof | 1 | ⚠️ **Not in your list** — exists today as an empty shell linked from every footer |

### Group B — Cycle Education (6)

| # | Route | Page | Pages generated | Notes |
| --- | --- | --- | --- | --- |
| 6 | `/ciclo` | Cycle phases hub | 1 | Overview + phase comparison + circular tracker visual |
| 7 | `/ciclo/[fase]` | Phase detail | **4** | `menstrual`, `folicular`, `ovulatoria`, `lutea` — one template, four content entries |
| 8 | `/educacion` | Education hub index | 1 | Filterable article library |
| 9 | `/educacion/[slug]` | Article detail | ~20 | |

> `/ciclo/[fase]` and `/recetas/fase/[fase]` are deliberately separate: the first is **educational** (hormones, symptoms, what's happening in the body), the second is a **filtered recipe listing**. Each cross-links to the other.

### Group C — Recipe Library (3)

| # | Route | Page | Pages generated | Notes |
| --- | --- | --- | --- | --- |
| 10 | `/recetas` | Recipe library index | 1 | All phases, filter + search |
| 11 | `/recetas/fase/[fase]` | Phase-filtered listing | **4** | Real routes, not query params — needed for SEO |
| 12 | `/recetas/[slug]` | Recipe detail | ~40 | Ingredients, steps, hormonal benefits, phase tag, variations |

### Group D — Video Library (2)

| # | Route | Page | Pages generated | Notes |
| --- | --- | --- | --- | --- |
| 13 | `/videos` | Video library | 1 | Two categories: Recetas / Educación Hormonal |
| 14 | `/videos/[slug]` | Video detail | ~20 | Route rather than modal, for SEO and shareability |

### Group E — Programs & Commerce (5 — Tier 1)

| # | Route | Page | Pages generated | Notes |
| --- | --- | --- | --- | --- |
| 15 | `/programas` | Programs / courses index | 1 | |
| 16 | `/programas/[slug]` | Program sales page | ~4 | Long-form: curriculum, outcomes, testimonials, FAQ, pricing, CTA |
| 17 | `/checkout` | Checkout | 1 | Stripe Checkout or embedded Elements |
| 18 | `/checkout/exito` | Order confirmation | 1 | **Required** — payment return URL |
| 19 | `/checkout/cancelado` | Payment cancelled | 1 | **Required** — payment cancel URL |

### Group F — Auth & Member Area (7 — Tier 2, conditional)

Build only if course content is **self-hosted**. Skip entirely if using an external course platform.

| # | Route | Page | Pages generated |
| --- | --- | --- | --- |
| 20 | `/entrar` | Login | 1 |
| 21 | `/registro` | Register | 1 |
| 22 | `/recuperar-contrasena` | Forgot password | 1 |
| 23 | `/restablecer-contrasena` | Reset password | 1 |
| 24 | `/cuenta` | Account dashboard / My programs | 1 |
| 25 | `/cuenta/ajustes` | Account settings | 1 |
| 26 | `/programas/[slug]/leccion/[id]` | Lesson player | ~40–80 |

### Group G — Support (2)

| # | Route | Page | Pages generated |
| --- | --- | --- | --- |
| 27 | `/faq` | FAQ | 1 |
| 28 | `/contacto` | Contact | 1 |

### Group H — Legal (5) · *standard, non-negotiable*

| # | Route | Page | Notes |
| --- | --- | --- | --- |
| 29 | `/terminos-y-condiciones` | Terms & Conditions | Exists — migrate 11 sections |
| 30 | `/politica-de-privacidad` | Privacy Policy | Exists — migrate 11 sections, fix non-ASCII slug |
| 31 | `/politica-de-cookies` | Cookie Policy | **New** — required with any analytics/consent banner |
| 32 | `/politica-de-reembolso` | Refund / Cancellation Policy | **New** — required by Stripe & consumer law once you sell |
| 33 | `/aviso-medico` | Medical Disclaimer | **New** — currently buried as §3 of Terms. A health site selling programs needs this standalone and linkable. |

### Group I — System & Standard (5) · *standard, non-negotiable*

| # | Route | Page | Notes |
| --- | --- | --- | --- |
| 34 | `/404` | Not Found | With search + suggested links |
| 35 | `/500` | Server Error | |
| 36 | `/buscar` | Search results | Unified across recipes, articles, videos |
| 37 | `/enlaces` | Link-in-bio hub | Migrates `/instagram` |
| 38 | `/mapa-del-sitio` | HTML sitemap | Optional but recommended at ~117 URLs |

### Non-page routes (4)

Not pages, but must be built:

| Route | Purpose |
| --- | --- |
| `/sitemap.xml` | Generated, not hand-authored |
| `/robots.txt` | |
| `/manifest.webmanifest` | PWA/install metadata |
| `/rss.xml` | Optional — recipe + article feed |

Plus dynamic OG-image generation for recipe/article/program routes.

---

## 3. What I added beyond your list, and why

You said standard pages must be included without exception. These 11 were not in your 10 categories but are required:

| Route | Why it's required |
| --- | --- |
| `/app` | The current site's deepest page and only conversion path. Dropping it silently kills app installs. **Confirm intent.** |
| `/testimonios` | Already exists (empty) and is linked from every footer today. Also the strongest support for the new purchase flow. |
| `/checkout/exito` | Stripe requires a `success_url`. Not optional. |
| `/checkout/cancelado` | Stripe requires a `cancel_url`. Not optional. |
| `/politica-de-cookies` | Required alongside any consent banner (GDPR/ePrivacy). |
| `/politica-de-reembolso` | Required by Stripe onboarding and by consumer-protection law once you take payment. |
| `/aviso-medico` | Health claims + paid programs. Currently only a buried Terms clause. Needs to be standalone and linkable from every recipe and program page. |
| `/404` | |
| `/500` | |
| `/buscar` | Site has ~117 URLs at launch and only a Wix blog search today. |
| `/enlaces` | Replaces the existing `/instagram` link-in-bio page. |

---

## 4. Navigation structure

### Primary nav (6 items + CTA)

```text
Método  |  Ciclo ▾  |  Recetas  |  Programas  |  App  |  [🔍]  |  ( Empezar )
                │
                ├─ Las 4 fases            → /ciclo
                ├─ Educación hormonal     → /educacion
                └─ Videos                 → /videos
```

- `Ciclo ▾` is the only dropdown — it groups the three educational surfaces
- `Empezar` CTA → `/precios`
- Search icon → `/buscar`
- **Tier 2 adds:** `Entrar` / account avatar in the utility slot

### Footer (4 columns)

| Explora | Aprende | Nutricycle | Legal |
| --- | --- | --- | --- |
| Recetas | Las 4 fases | Método | Términos y Condiciones |
| Programas | Educación hormonal | Sobre Alicia | Política de Privacidad |
| Videos | FAQ | Testimonios | Política de Cookies |
| Precios | | Contacto | Política de Reembolso |
| | | Enlaces | Aviso Médico |

Plus: social row, `© NutriCycle`, `hola@aliciabasurto.com`, `Mapa del sitio`.

> Fixes the current bug where the footer `nutricycle` brand mark links to an empty `/testimonials`.

---

## 5. Redirect map (301, from the existing Wix site)

| Old URL | New URL |
| --- | --- |
| `/` | `/` *(unchanged)* |
| `/blog` | `/recetas` |
| `/services-4` | `/educacion` |
| `/app-1` | `/app` |
| `/videos` | `/videos` *(unchanged)* |
| `/testimonials` | `/testimonios` |
| `/instagram` | `/enlaces` |
| `/terminos-y-condiciones` | `/terminos-y-condiciones` *(unchanged)* |
| `/política-de-privacidad` | `/politica-de-privacidad` *(drops non-ASCII slug)* |
| `/post/{slug}` | `/recetas/{slug}` **or** `/educacion/{slug}` |

> All Wix blog posts currently live under a single `/post/` namespace regardless of type. The new site splits recipes from articles, so `/post/{slug}` needs a **per-post lookup rule**, not a blanket prefix rewrite. Only one post exists today, so this is cheap to set up now and expensive to retrofit later.

---

## 6. Content model implied by this structure

The structure only works if the content layer exists first. Minimum entities:

| Entity | Key fields | Est. count at launch |
| --- | --- | --- |
| **Phase** | slug, name, day range, hormone profile, symptoms, key foods, color token | **4** (fixed) |
| **Recipe** | slug, title, phase(s), video, ingredients, steps, benefits, macros, prep time, variations | ~40 |
| **Article** | slug, title, category, body, related phase, read time | ~20 |
| **Video** | slug, title, category, source, duration, related recipe/article | ~20 |
| **Program** | slug, title, price, curriculum, outcomes, testimonials, FAQ | ~4 |
| **Testimonial** | author, text, program, photo | ~10 |
| **FAQ item** | question, answer, category | ~20 |

**Phase is the spine of the entire site** — it drives `/ciclo/[fase]`, `/recetas/fase/[fase]`, recipe tagging, and the app page. It must be a **single shared data source** (`data/phases.ts`), not duplicated per page.

> ⚠️ Before building: resolve the phase day-range conflict documented in [site-audit.md §12.1](site-audit.md). `/app-1` currently says Folicular = days 1–13 while `/blog` says 6–13, and `/app-1` has Folicular overlapping Menstruación. The `/blog` set is the coherent one.

---

## 7. Open decisions

These change the final page count or the build shape. Flagged, not assumed:

| # | Decision | Impact |
| --- | --- | --- |
| 1 | **Keep the `/app` page?** It's absent from your 10 categories but is the current conversion path. | ±1 page, and the whole conversion strategy |
| 2 | **Course delivery: self-hosted vs external platform?** | ±7 templates (~35% of build) |
| 3 | **One-time purchase or subscription?** Affects checkout, pricing page, and account area. | Moderate |
| 4 | **Does the app subscription share checkout with programs**, or stay in-app (App Store / Play billing)? | Moderate — in-app billing is simpler and avoids store-policy conflict |
| 5 | **English version later?** Would add a locale prefix and roughly double URL count. | Large — cheap to plan for now, expensive later |
| 6 | ~~**Split `/metodo` into `/metodo` + `/sobre-mi`?**~~ | ✅ **Closed — split.** `/como-funciona` carries the methodology, `/sobre` carries the founder story. Both are spec'd: [about-page.md](../04-content/about-page.md). |

**Recommendation on #2:** for a solo practitioner, start with an external course platform and Tier 1 only (31 templates). Self-hosting the member area is worth it only once program revenue justifies owning the customer relationship and the support burden. The route structure above is designed so Tier 2 can be added later without restructuring anything in Tier 1.

---

## 8. Build order

| Phase | Scope | Templates |
| --- | --- | --- |
| **1 — Foundation** | Design tokens, `SiteHeader`/`SiteFooter`, layout primitives, `/404`, `/500` | 2 |
| **2 — Marketing** | `/`, `/metodo`, `/app`, `/testimonios`, `/enlaces` | 5 |
| **3 — Legal & support** | 5 legal + `/faq` + `/contacto` + `/mapa-del-sitio` | 8 |
| **4 — Content core** | `/ciclo`, `/ciclo/[fase]`, `/recetas`, `/recetas/fase/[fase]`, `/recetas/[slug]` | 5 |
| **5 — Content extended** | `/educacion`, `/educacion/[slug]`, `/videos`, `/videos/[slug]`, `/buscar` | 5 |
| **6 — Commerce** | `/precios`, `/programas`, `/programas/[slug]`, 3 checkout routes | 6 |
| **7 — Member area** *(conditional)* | Auth ×4, `/cuenta` ×2, lesson player | 7 |
| | **Total** | **38** |

Legal and support come early (Phase 3) deliberately — they're low-effort, they're required before any payment integration can be approved, and they're the first thing that gets forgotten.
