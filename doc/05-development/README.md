# 05 — Development

Setup, conventions, and workflow. Pending.

## Planned documents

| Doc | Contents |
| --- | --- |
| `getting-started.md` | Prerequisites, install, env setup, running web + api + Postgres locally |
| `conventions.md` | TypeScript style, naming, import aliases, component patterns, commit format |
| `database.md` | Migration workflow, seeding, local reset, connection config |
| `api-spec.md` | REST endpoints, request/response shapes, error format, pagination |
| `testing.md` | Unit / integration / e2e strategy, coverage expectations |
| `accessibility.md` | The AA baseline from [site-audit.md §10](../01-research/site-audit.md) as an enforceable checklist |

## Baseline conventions

Already fixed in [folder-structure.md](../03-architecture/folder-structure.md):

- TypeScript throughout — web, api, shared
- Components `PascalCase`; files `kebab-case`; database `snake_case`
- Routes in Spanish, matching `lang="es"`
- Tailwind only — no CSS modules; tokens as CSS custom properties
- API modules follow `routes → controller → service → repository`
- Migrations are forward-only and timestamped
- Static assets are kebab-case and English, grouped by lifecycle under `public/images/{brand,alicia}/` — see [image-assets.md](../04-content/image-assets.md)

## Scope additions

| Item | Phase | Spec |
| --- | --- | --- |
| **`Sobre mí` founder section on `/`** — carried over from the current site, non-optional | 2 | [about-page.md §2](../04-content/about-page.md) |
| **`/sobre` page** — new; also absorbs the retired `/testimonios` | 3 | [about-page.md §3](../04-content/about-page.md) |
| `/en/about` | 6 | [about-page.md §5](../04-content/about-page.md) |

Build order lives in [revised-direction.md §11](../00-overview/revised-direction.md).
