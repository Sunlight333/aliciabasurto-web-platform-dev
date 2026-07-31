# Nutricycle

Rebuild of **aliciabasurto.com** — Wix → React (Next.js) + Tailwind CSS, with a Node.js API and PostgreSQL.

The Nutricycle mobile app is already live on both stores. This website's job is to **educate, introduce the app, and convert readers into installs.**

---

## Structure

```
├── doc/          Project documentation  →  start here
├── apps/
│   ├── web/      Next.js + Tailwind frontend
│   └── api/      Node.js REST API
├── packages/
│   ├── shared/   Types, constants, cycle-phase data
│   └── config/   Shared eslint / tsconfig / tailwind preset
├── infra/        Docker, deployment manifests
└── scripts/      Maintenance and migration scripts
```

---

## Documentation

Full index: **[doc/README.md](doc/README.md)**

| Start with | |
|---|---|
| [Project brief](doc/00-overview/project-brief.md) | Mission, scope, constraints, blockers, decision log |
| [Site audit](doc/01-research/site-audit.md) | What exists today and what's wrong with it |
| [Site structure](doc/03-architecture/site-structure.md) | 31 route templates, ~117 URLs |
| [Design direction](doc/02-design/design-direction.md) | Visual system and aesthetic |
| [Folder structure](doc/03-architecture/folder-structure.md) | Where code goes |

---

## Status

**Planning.** No application code yet.

Blocked on five client inputs — see [project-brief.md](doc/00-overview/project-brief.md#blockers). Most urgent is the canonical cycle-phase day-range definition, which the live site currently contradicts itself on and which underpins ~50 of the ~117 URLs.
