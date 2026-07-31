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
