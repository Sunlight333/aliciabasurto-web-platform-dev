# `/cursos` — Course page

**Source:** [`doc/Nutricycle_Cursos.pdf`](../Nutricycle_Cursos.pdf), supplied by the client 2026-08-05
**Route:** `/cursos` · `/en/cursos`
**Built:** [`app/[locale]/cursos/page.tsx`](../../apps/web/src/app/[locale]/cursos/page.tsx) · copy in [`data/courses.ts`](../../apps/web/src/data/courses.ts)

---

## 1. What the brochure changed

[revised-direction.md §9](../00-overview/revised-direction.md) removed `/programas`
on the finding **"no course product — `/membresia` is the app subscription."**
The brochure disproves that: there are two paid programmes, sold by Alicia
rather than through the stores. The route is back, under a name that matches
the client's own word (*cursos*), as **one page with two blocks** — two
products do not justify an index plus detail pages.

This is the first thing on the site that is **not** the app. Everything else
sells a download; this sells Alicia's time. The page therefore does not reuse
the membership page's plan-comparison shape, which would frame a course as a
subscription tier.

## 2. Structure

| Block | Content |
| --- | --- |
| Hero | Brochure's promise, plus jump links to each programme |
| `#metodo-desde-cero` | Accompanied programme — 4 lessons, includes list |
| `#sop` | PCOS mini course — 3 lessons, includes list |
| `#inscripcion` | Email CTA to `hola@aliciabasurto.com` + client-pending note |
| `CtaBand` | Standard app download close, `source="cursos"` |

Each programme block is: icon chip → format eyebrow → title → lead →
numbered lesson cards → "what it includes" card. The lessons are numbered
rather than bulleted because the count is part of the argument — four things,
in order, not "some topics covered".

## 3. Copy

Every user-facing string is the brochure's own wording, in
[`data/courses.ts`](../../apps/web/src/data/courses.ts). The English side is a
translation of that text, positional against the Spanish array, with a length
guard that throws at build time if a translator drops a lesson or a bullet —
the same guard [`features.ts`](../../apps/web/src/data/features.ts) uses.

The furniture around the copy ("Lo que vas a aprender", "Lo que incluye", the
enrolment block) lives in the dictionaries under `courses`, not in the data
file, because it is UI, not content.

## 4. What the brochure does not contain

The PDF ends on an email address. It has **no price, no duration, no start
date and no enrolment link** — the four things a buyer asks first.

The page therefore states what is known and routes the reader to email, with
a visible client-pending note in the enrolment block. It does not invent a
price, a "next cohort starts" date, or a checkout, and it does not borrow
`/membresia`'s pricing to look finished.

Tracked as items 14 and 15 in
[revised-direction.md §10](../00-overview/revised-direction.md):

| # | Missing | Consequence |
| --- | --- | --- |
| 14 | Price, duration, start dates, enrolment link | The page describes two products it cannot sell. Every CTA is an email. |
| 15 | Hero photograph | `/cursos` ships on `PageHero`'s gradient fallback — see [image-assets.md §3b](image-assets.md) |

Both are client-side blockers, not build work. When 14 lands the enrolment
block becomes a real CTA and the pending note comes out; when 15 lands the
hero takes an `image` prop like every other route.

## 5. Navigation

`Cursos` sits in the header's left group (método · tu ciclo · **cursos** ·
sobre alicia) and in the footer's *Explorar* column. Seven links means the
header's left/right widths no longer balance evenly — 353px against 289px at
1440, which is the closest split available. The reasoning is recorded in the
comment above `LEFT_HREFS` in
[`site-header.tsx`](../../apps/web/src/components/layout/site-header.tsx);
an eighth link will not fit at `xl` and forces a different bar.
