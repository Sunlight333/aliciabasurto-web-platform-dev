# Project Brief

**Client:** Alicia Basurto — health coach, hormonal nutrition
**Product:** NutriCycle — cycle-syncing nutrition app (live on iOS + Android)
**Scope:** Rebuild aliciabasurto.com — Wix → React (Next.js) + Tailwind CSS, Node.js API, PostgreSQL

> **Revised 2026-07-31** following analysis of the shipped app. See [revised-direction.md](revised-direction.md).

---

## Mission

The **NutriCycle mobile app is already developed and live on both stores.**

The website's job is not to be the product. It is to:

1. **Educate** — hormonal-health knowledge and cycle-based nutrition
2. **Introduce** — explain what the app does
3. **Convert** — send readers to the App Store and Google Play

Education is the traffic engine; the store install is the single conversion goal.

---

## Scope

| | |
| --- | --- |
| Route templates | **26** |
| Languages | **Spanish (root) + English (`/en`)** |
| Fixed URLs | ~56 across both locales |
| Content URLs *(est.)* | ~85 |
| **Total live URLs** | **~141** |
| Web checkout | **None** — billing is handled by the stores |
| Web login | **None** |

Full inventory: [revised-direction.md §9](revised-direction.md)

---

## The product

The app is substantially broader than the current website communicates:

Cycle tracker with phase arcs · phase-based recipes · **AI chat powered by Google Gemini 2.0** · hormone chart · weekly meal planner with macros · shopping list · key-foods guide · daily log (symptoms, mood, energy) · hydration tracker · wellness activities (yoga, meditation, breathing) · article and video libraries · ES/EN toggle · admin panel for coaches

**Pricing:** $14.99/month · $84.99/year, billed through the App Store and Google Play.

**App stack:** Supabase (PostgreSQL) · Google Gemini · Clerk auth.

---

## Design brief

> Many elements of the previous site were unbalanced and unsatisfactory. The site must be modern and clean while maintaining its current visual identity — richly expressing feminine beauty and sophistication, with a loose and ethereal aesthetic.

Visual identity is preserved (Cormorant serif, warm cream/sage palette, italic accent device, editorial photography), now unified with the app's four phase colors.

Full direction: [design-direction.md](../02-design/design-direction.md) · palette merge in [revised-direction.md §4](revised-direction.md)

---

## Key constraints

| Constraint | Source |
| --- | --- |
| **The app owns the content database.** The website reads Supabase; it does not duplicate recipes, articles, or videos. | [revised-direction.md §2](revised-direction.md) |
| **No responsive CSS exists to migrate.** Wix Classic — fixed 980px desktop and a separate 320px mobile document via UA sniffing. No tablet layout. | [site-audit.md §5](../01-research/site-audit.md) |
| **Futura LT W01 Light cannot be carried over** — Monotype webfont licensed only through Wix | [site-audit.md §10.4](../01-research/site-audit.md) |
| **All assets are on the Wix CDN** and must be re-hosted | [site-audit.md §10.4](../01-research/site-audit.md) |
| **Every app CTA is currently dead** — buttons with no `href`; the site cannot send a single install | [cta-strategy.md](../02-design/cta-strategy.md) |
| **Phase day-ranges contradict across three sources** — must be read from the app's algorithm, not from documents | [revised-direction.md §6](revised-direction.md) |

---

## Blockers

| # | Item | Owner |
| --- | --- | --- |
| 1 | **Supabase read credentials + schema** for recipes / articles / videos / phases | Client / app dev |
| 2 | **The app's phase-calculation logic** — source of truth for day ranges | Client / app dev |
| 3 | App Store URL | Client |
| 4 | Google Play URL | Client |
| 5 | App icon 512×512 + store screenshots | Client |
| 6 | Real Youtube / Facebook / Instagram profile URLs | Client |
| 7 | Confirm `4.8 ★` is real store data, not aspirational | Client |
| 8 | Confirm pricing is live in both stores | Client |

**Items 1 and 2 gate more work than anything else.** Without them the content layer cannot be built and the phase system cannot be trusted to match the app.

---

## Open decisions

| # | Decision | Impact |
| --- | --- | --- |
| 1 | How many recipes are published publicly vs app-only? Proposed ~15–20. | SEO reach vs install motivation |
| 2 | Does English launch with full content or a marketing-only subset? Proposed subset. | Translation cost |
| 3 | Instrument Serif vs Cormorant for display — strict app parity vs the ethereal brief | Visual identity |

---

## Decision log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-07-31 | **Next.js over Vite SPA** | ~141 URLs of SEO-dependent education content |
| 2026-07-31 | **Keep `/app`** despite absence from the client's page list | It is the site's only conversion path |
| 2026-07-31 | **Drop the auth + member area tier** | App is monetized in-store; nothing on the web needs a login |
| 2026-07-31 | **Five type families → two** | Futura is unlicensable; Montserrat and Playfair redundant |
| 2026-07-31 | **Cormorant SemiBold → Light 300** at display sizes | Delivers the "feminine, delicate, sophisticated" brief |
| 2026-07-31 | **Flat backgrounds → continuous gradient field** | Fixes clashing blocks and delivers "ethereal" at once |
| **2026-07-31** | **Website reads the app's Supabase DB — no second content database** | The app already has the data and an admin panel; duplication would drift within weeks |
| **2026-07-31** | **Bilingual ES (root) + EN (`/en`)** | App has a language toggle; all supplied SEO keywords are English |
| **2026-07-31** | **App palette = tints; darkened variants = text/action** | App colors measure 1.25–2.2:1 as text — unusable — but 6.35–11.18:1 as surfaces |
| **2026-07-31** | **Cormorant + Outfit** (drop Inter) | Keeps the ethereal Light weight; gains app parity on UI type |
| **2026-07-31** | **Public recipes are a curated teaser (~15–20), not the full library** | SEO reach without giving away the app's core value |
| **2026-07-31** | **Drop `/programas` + checkout + refund policy** (31 → 26 templates) | No course product; store-handled billing |
| **2026-07-31** | **Phase ranges come from the app's code, not from any document** | Three contradictory definitions exist; a mismatch breaks trust mid-conversion |
