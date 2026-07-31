# 04 — Content

Content model, copy, and SEO. Pending.

## Planned documents

| Doc | Contents |
| --- | --- |
| `content-model.md` | Entity definitions — Phase, Recipe, Article, Video, Program, Testimonial, FAQ. Fields, relationships, validation rules. |
| `phase-data.md` | **The canonical four cycle phases.** Day ranges, hormone profile, symptoms, key foods, color token. Resolves the contradiction documented in [site-audit.md §12.1](../01-research/site-audit.md). |
| `copy-deck.md` | All on-site Spanish copy, per route. Source of truth for translation and review. |
| `seo.md` | Title/description patterns, JSON-LD schema per content type, OG image rules. |
| `redirects.md` | Implementation of the 301 map in [site-structure.md §5](../03-architecture/site-structure.md), including the `/post/{slug}` per-post lookup rule. |

## Note

`phase-data.md` blocks the most work. Phase is the spine of ~50 of the ~117 URLs and is currently contradictory between `/app-1` and `/blog` on the live site.
