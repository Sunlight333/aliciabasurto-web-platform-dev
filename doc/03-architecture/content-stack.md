# Content Stack — decision

**Date:** 2026-08-03
**Question:** the recipe, article and video routes need a content source. Supabase credentials are blocker #1 and have not arrived. What do those routes read from in the meantime?

---

## Decision

> **File-based content in the repo, read through a repository interface.**
> Supabase becomes an alternate implementation behind the same functions when credentials arrive. No page changes at swap time.

---

## Why not the alternatives

| Option | Verdict |
| --- | --- |
| **Wait for Supabase** | Blocks 8 routes indefinitely on an input nobody has committed a date to. Leaves the nav 404ing. |
| **PostgreSQL on the VPS** | The stated stack, but the wrong call *here*. That box runs **7 services on 2 GB of RAM** ([deployment.md](../06-operations/deployment.md)). Postgres idles at ~120 MB and spikes under load; OOM would take down a neighbouring live site, not just ours. It would also be a **second** source of truth against the app's Supabase — exactly the duplication [revised-direction.md §2](../00-overview/revised-direction.md) rejected. |
| **Headless CMS** | Another vendor, another bill, another login, for content the coach already manages in the app's admin panel. |
| **File-based (chosen)** | Zero new infrastructure. Versioned in git with review. Statically prerendered, so the VPS serves flat HTML. Trivially replaced. |

## Why file-based is not a compromise here

The website was never going to hold the full library. It publishes a
**curated teaser — roughly 15–20 recipes** — while the app keeps 40+
([revised-direction.md §7](../00-overview/revised-direction.md)). A
hand-curated set of that size is exactly what belongs in files.

## Shape

```text
apps/web/src/content/          ← the data
  recipes/*.json
  articles/*.json
  videos/*.json

apps/web/src/lib/content/      ← the interface pages import
  index.ts                     ← getRecipes, getRecipe, getArticles, …
  from-files.ts                ← current implementation
  from-supabase.ts             ← later; same exports
```

Pages import only from `lib/content`. Swapping the implementation is one
line in `index.ts`.

## Field parity

Content files carry the fields the app's schema is expected to expose —
`slug`, `title`, `phase`, `mealType`, `ingredients`, `steps`,
`benefits`, `publishedToWeb`. When the real schema arrives, differences
are resolved in `from-supabase.ts`, not in the pages.

`publishedToWeb` is honoured now even though every file sets it true —
it is the teaser gate from revised-direction.md §7, and wiring it late
would mean auditing every query.

---

## What is still blocked

Files solve *where content lives*, not *what it says*.

Only **one** real recipe exists: `crema-de-zapallo`, migrated from the
live Wix site. Recipes carrying hormonal claims — "supports oestrogen
metabolism", "eases PMS" — must come from Alicia. She is the
practitioner; inventing them would put fabricated health guidance under
her name on a site that sells paid health advice.

So the routes ship complete and the library ships thin. Adding a recipe
is one JSON file.

| Content | Status |
| --- | --- |
| Recipes | 1 real, migrated. **Needs ~15–20 from Alicia.** |
| Articles | 0. Titles proposed in [app-content-strategy.md](../04-content/app-content-strategy.md) §5. |
| Videos | 0. Six `<video>` files exist on the live site; sources not yet recovered. |
