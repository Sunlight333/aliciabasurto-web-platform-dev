# Nutricycle — Documentation

Documentation for the **aliciabasurto.com** rebuild: Wix → React (Next.js) + Tailwind CSS, with a Node.js API and PostgreSQL.

---

## Classification

| Folder | Contains | Status |
| --- | --- | --- |
| [`00-overview/`](00-overview/) | Project brief, mission, scope, decision log | Active |
| [`01-research/`](01-research/) | Audits and analysis of the existing site | Complete |
| [`02-design/`](02-design/) | Visual direction, design tokens, component and CTA specs | Active |
| [`03-architecture/`](03-architecture/) | Information architecture, folder structure, data model, API spec | Active |
| [`04-content/`](04-content/) | Content model, copy deck, SEO and redirect map | Pending |
| [`05-development/`](05-development/) | Setup, conventions, workflow, testing | Pending |
| [`06-operations/`](06-operations/) | Deployment, environments, monitoring, analytics | Pending |
| [`assets/`](assets/) | Diagrams, screenshots, exports referenced by the docs | — |

---

## Index

### 00 — Overview
| Doc | Description |
| --- | --- |
| [project-brief.md](00-overview/project-brief.md) | Mission, scope, constraints, open decisions, decision log |
| [revised-direction.md](00-overview/revised-direction.md) | Post-app-analysis revision — one content source, bilingual scope, merged palette, revised 26-route inventory, blockers, build order |

### 01 — Research
| Doc | Description |
| --- | --- |
| [site-audit.md](01-research/site-audit.md) | Full audit of the existing Wix site — layout, visual identity, components, content, motion, flows, accessibility. All values measured from the served CSS. |

### 02 — Design
| Doc | Description |
| --- | --- |
| [design-direction.md](02-design/design-direction.md) | Diagnosis of the current design's imbalance, plus the refined system: typography, spacing, grid, color, imagery, motion, and the ethereal aesthetic layer |
| [cta-strategy.md](02-design/cta-strategy.md) | App-store conversion strategy — routing logic, placement map, component specs, copy, tracking |

### 03 — Architecture
| Doc | Description |
| --- | --- |
| [site-structure.md](03-architecture/site-structure.md) | Full route inventory (31 templates / ~117 URLs), navigation, redirect map, build order |
| [folder-structure.md](03-architecture/folder-structure.md) | Repository layout for web, API, database, and shared packages |

### 04 — Content
| Doc | Description |
| --- | --- |
| [image-assets.md](04-content/image-assets.md) | Inventory of `apps/web/public/images/` — every asset identified, dimensions, placement, bilingual alt text, naming convention, and the 8 missing-asset blockers |
| [about-page.md](04-content/about-page.md) | The founder section on `/` and the `/sobre` page — layout, sections, copy requirements, SEO, build placement |

_Still pending:_ content model, phase data spec, copy deck, SEO metadata, redirect implementation.

### 05 — Development
_Pending._ Local setup, coding conventions, branching, testing strategy, CI.

### 06 — Operations
_Pending._ Deployment, environment variables, monitoring, analytics, backups.

---

## Reading order for new contributors

1. [project-brief.md](00-overview/project-brief.md) — what this is and why
2. [site-audit.md](01-research/site-audit.md) — what exists today and what's wrong with it
3. [site-structure.md](03-architecture/site-structure.md) — what we're building
4. [design-direction.md](02-design/design-direction.md) — how it should look and feel
5. [folder-structure.md](03-architecture/folder-structure.md) — where the code goes

---

## Conventions

- All docs are Markdown, English, with Spanish preserved verbatim for on-site copy.
- Measured values are stated as measured; anything estimated is marked *(inferred)*.
- Cross-link between docs with relative paths.
- Diagrams and screenshots live in [`assets/`](assets/) and are referenced, not embedded as base64.
