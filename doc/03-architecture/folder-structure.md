# Repository Structure

**Stack:** Next.js (React) + Tailwind CSS · Node.js API · PostgreSQL
**Companion docs:** [site-structure.md](site-structure.md) · [design-direction.md](../02-design/design-direction.md)

---

## Framework decision

The brief specified React.js. `apps/web` is structured as **Next.js (App Router)** rather than a Vite SPA.

**Rationale:** the site is ~117 URLs of education content whose entire purpose is organic search ([site-structure.md](site-structure.md)). A client-rendered SPA would seriously undermine that. Next.js is still React, and the separate Node/PostgreSQL API is unaffected.

If a Vite SPA is preferred instead, the only change is `apps/web/src/app/` → `apps/web/src/routes/`.

---

## Top level

```text
nutricycle/
├── doc/                  All project documentation
├── apps/
│   ├── web/              Next.js + Tailwind frontend
│   └── api/              Node.js REST API
├── packages/
│   ├── shared/           Types, constants, phase data shared by web + api
│   └── config/           Shared eslint / tsconfig / tailwind preset
├── infra/                Docker, deployment manifests
├── scripts/              One-off maintenance and migration scripts
├── package.json          Workspace root
└── README.md
```

**Why a workspace:** `phases` — the four cycle phases — is the spine of the entire product. It drives `/ciclo/[fase]`, `/recetas/fase/[fase]`, recipe tagging, and the app page. It must exist **once** in `packages/shared`, consumed by both web and API. The audit found this data currently duplicated and contradictory across three pages.

---

## `apps/web` — Frontend

```text
apps/web/
├── public/
│   ├── fonts/                    Self-hosted Cormorant Garamond + Outfit
│   ├── images/
│   │   ├── brand/                Logo lockup, mark, app icon, favicons
│   │   └── alicia/               Founder photography — masters, uncropped
│   ├── badges/                   Official App Store / Google Play artwork (ES + EN)
│   └── video/                    Recipe clips
├── src/
│   ├── app/                      Next.js App Router — routes mirror site-structure.md
│   │   ├── (marketing)/          /, /metodo, /app, /precios, /testimonios
│   │   ├── ciclo/
│   │   │   ├── page.tsx
│   │   │   └── [fase]/page.tsx
│   │   ├── recetas/
│   │   │   ├── page.tsx
│   │   │   ├── fase/[fase]/page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── educacion/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── videos/
│   │   ├── programas/
│   │   ├── checkout/
│   │   ├── legal/                5 legal routes
│   │   ├── ir/app/               Store redirect + click tracking
│   │   ├── buscar/
│   │   ├── not-found.tsx         /404
│   │   ├── error.tsx             /500
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                   Button, Badge, Input, Tabs, Pill
│   │   ├── layout/               SiteHeader, SiteFooter, Container, Section, Grid
│   │   ├── marketing/            Hero, CtaBand, StoreBadges, StickyAppBar, QRDownload, StatStrip
│   │   ├── content/              RecipeCard, ArticleCard, VideoCard, PhaseCard, PostBody
│   │   ├── motion/               Reveal, AmbientOrbs, Parallax, GrainOverlay
│   │   └── seo/                  JsonLd, OpenGraph helpers
│   ├── data/
│   │   └── phases.ts             Re-export from packages/shared — the spine
│   ├── hooks/                    usePlatform, useReducedMotion, useScrollDirection
│   ├── lib/                      api client, formatters, store-link resolver
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css            CSS custom properties from design-direction.md
│   ├── types/
│   └── tests/
├── tailwind.config.ts            Consumes packages/config preset
└── next.config.mjs
```

### Component folders map to the design system

`ui/` holds primitives with states; `marketing/` holds the CTA system from [cta-strategy.md](../02-design/cta-strategy.md); `motion/` isolates the ethereal layer (orbs, grain, reveal) so it can be disabled wholesale under `prefers-reduced-motion` without touching content components.

### Asset conventions

Files are kebab-case and **English**, even though routes are Spanish — they are build-time identifiers, not user-facing strings, and the site is bilingual. Photographic masters stay full-resolution and uncropped; crops are `next/image` or CSS decisions, never a second file. Alt text is defined once per asset in [image-assets.md](../04-content/image-assets.md), not per component.

---

## `apps/api` — Backend

Module-per-domain. Each module is self-contained and independently testable.

```text
apps/api/
├── src/
│   ├── modules/
│   │   ├── phases/
│   │   │   ├── phases.routes.ts
│   │   │   ├── phases.controller.ts
│   │   │   ├── phases.service.ts
│   │   │   ├── phases.repository.ts     Raw SQL / query builder
│   │   │   └── phases.schema.ts         Zod validation
│   │   ├── recipes/                     same 5-file shape
│   │   ├── articles/
│   │   ├── videos/
│   │   ├── programs/
│   │   ├── search/                      Postgres full-text across content
│   │   ├── contact/                     Form submission + email
│   │   └── tracking/                    /ir/app click events
│   ├── db/
│   │   ├── client.ts                    pg Pool
│   │   ├── query.ts                     Typed query helper
│   │   └── transaction.ts
│   ├── middleware/                      error handler, rate limit, cors, logging
│   ├── config/                          env parsing + validation
│   ├── jobs/                            scheduled tasks (sitemap ping, cache warm)
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── db/
│   ├── migrations/                      Timestamped, forward-only
│   ├── seeds/
│   │   ├── 01-phases.sql                The 4 phases — fixed reference data
│   │   ├── 02-recipes.sql
│   │   └── 03-articles.sql
│   └── schema.sql                       Generated snapshot, for reference
└── tests/
```

**Consistent module shape** — `routes → controller → service → repository` — keeps SQL confined to the repository layer and makes each domain replaceable without touching the others.

---

## `packages/shared`

```text
packages/shared/
└── src/
    ├── phases.ts        The 4 cycle phases — single source of truth
    ├── types/           Recipe, Article, Video, Program, Phase
    ├── constants/       Routes, store links, site metadata
    └── validation/      Zod schemas shared by client and server
```

> ⚠️ Before writing `phases.ts`, resolve the day-range conflict documented in [site-audit.md §12.1](../01-research/site-audit.md). `/app-1` says Folicular = days 1–13 while `/blog` says 6–13, and `/app-1` has Folicular overlapping Menstruación. The `/blog` set is the coherent one.

---

## Database

PostgreSQL. Core tables, derived from [site-structure.md §6](site-structure.md):

| Table | Notes |
| --- | --- |
| `phases` | 4 fixed rows — slug, name, day_start, day_end, hormone_profile, symptoms, key_foods, color_token |
| `recipes` | slug, title, body, prep_time, macros, video_url, published_at |
| `recipe_phases` | Join — a recipe may suit multiple phases |
| `articles` | slug, title, body, category, related_phase_id, read_time |
| `videos` | slug, title, category, source_url, duration |
| `programs` | slug, title, price_cents, currency, curriculum, published |
| `testimonials` | author, body, program_id, photo_url |
| `faq_items` | question, answer, category, sort_order |
| `contact_submissions` | name, email, message, created_at |
| `cta_events` | source, platform, user_agent, created_at — store-click tracking |

**Conventions:** `snake_case`, UUID primary keys, `created_at` / `updated_at` on every table, soft deletes via `deleted_at` on content tables. Migrations are forward-only and timestamped.

---

## Documentation

```text
doc/
├── 00-overview/       Project brief, scope, decision log
├── 01-research/       Existing-site audit
├── 02-design/         Visual direction, CTA strategy, tokens
├── 03-architecture/   IA, folder structure, data model, API spec
├── 04-content/        Content model, copy deck, SEO, redirects
├── 05-development/    Setup, conventions, testing
├── 06-operations/     Deployment, envs, monitoring
└── assets/            Diagrams, screenshots, exports
```

See [doc/README.md](../README.md) for the full index.

---

## Conventions

| Area | Rule |
| --- | --- |
| Language | TypeScript throughout — web, api, shared |
| Naming | Components `PascalCase`; files `kebab-case`; DB `snake_case` |
| Routes | Spanish, matching the existing site (`lang="es"`) |
| Imports | `@/` within an app, `@nutricycle/shared` across packages |
| Env | `.env.example` committed; real `.env` never |
| Styling | Tailwind only. No CSS modules. Tokens in `tokens.css` as custom properties. |
| Tests | Colocated for units, `tests/` for integration |

---

## Build order

Matches [site-structure.md §8](site-structure.md):

| Phase | Scope |
| --- | --- |
| 0 | Workspace, tooling, `packages/shared` + `phases.ts`, DB schema + migrations |
| 1 | Design tokens, `SiteHeader` / `SiteFooter`, layout primitives, 404 / 500 |
| 2 | Marketing pages + the full CTA system |
| 3 | Legal, FAQ, contact, sitemap |
| 4 | Cycle + recipe content core |
| 5 | Education, video, search |
| 6 | Programs + checkout |

`packages/shared` comes first deliberately — everything else depends on the phase model.
