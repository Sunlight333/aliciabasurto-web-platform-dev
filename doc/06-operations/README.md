# 06 — Operations

Deployment, environments, and monitoring. Pending.

## Planned documents

| Doc | Contents |
| --- | --- |
| `deployment.md` | Hosting targets for web and api, build pipeline, release process |
| `environments.md` | Local / staging / production, and the full env-var reference |
| `database-ops.md` | Backups, restore procedure, migration rollout, connection pooling |
| `analytics.md` | Event schema, CTA attribution, store-install tracking |
| `monitoring.md` | Uptime, error tracking, performance budgets |
| `launch-checklist.md` | Redirects verified, sitemap submitted, legal pages live, store links tested on real devices |

## Analytics requirement

[cta-strategy.md §7](../02-design/cta-strategy.md) defines three required events — `cta_view`, `cta_click`, `store_redirect` — with placement-level `src` attribution. Without these, the four store touchpoints cannot be compared.

## Launch-critical

Store links must be tested on **real iOS and Android devices**, not simulators. The current site's CTAs are dead buttons with no `href`; verifying the replacement actually reaches both stores is the single most important launch check.
