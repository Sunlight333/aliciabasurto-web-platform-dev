# 04 — Content

Content model, copy, and SEO. Pending.

## Written

| Doc | Contents |
| --- | --- |
| [`image-assets.md`](image-assets.md) | Inventory of every asset in `apps/web/public/images/` — identification, dimensions, placement, alt text (ES/EN), naming convention, and the 8 missing-asset blockers. |
| [`about-page.md`](about-page.md) | The founder section on `/` and the `/sobre` page. Closes open decision #6 in [site-structure.md §7](../03-architecture/site-structure.md). |

## Planned documents

| Doc | Contents |
| --- | --- |
| `content-model.md` | Entity definitions — Phase, Recipe, Article, Video, Program, Testimonial, FAQ. Fields, relationships, validation rules. |
| `phase-data.md` | **The canonical four cycle phases.** Day ranges, hormone profile, symptoms, key foods, color token. Resolves the contradiction documented in [site-audit.md §12.1](../01-research/site-audit.md). |
| `copy-deck.md` | All on-site Spanish copy, per route. Source of truth for translation and review. |
| `seo.md` | Title/description patterns, JSON-LD schema per content type, OG image rules. |
| `redirects.md` | Implementation of the 301 map in [site-structure.md §5](../03-architecture/site-structure.md), including the `/post/{slug}` per-post lookup rule. |

## Notes

`phase-data.md` blocks the most work. Phase is the spine of ~50 of the ~117 URLs and is currently contradictory between `/app-1` and `/blog` on the live site.

`copy-deck.md` must include the founder bio (long + short), credentials, and positioning statement specified in [about-page.md §4](about-page.md). None of it can be recovered from the existing site — the current `SOBRE MÍ` section contains no biographical detail.

~~**Open housekeeping:** the 10 recipe clips in `apps/web/public/video/` are still named `#21.Taco de zanahoria y queso.mov`.~~ **Done 2026-08-03** — transcoded off HEVC and renamed kebab-case by `scripts/transcode-videos.mjs`; `/videos` now ships the library. See [video-language.md §7](video-language.md). What remains is client input, not housekeeping: the ten videos have **no cycle phase assigned** (all `general`), and their descriptions are written from the footage rather than in Alicia's voice.
