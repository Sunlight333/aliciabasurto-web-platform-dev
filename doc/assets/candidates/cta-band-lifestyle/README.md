# CtaBand background — 10 lifestyle candidates (person + phone)

**Downloaded:** 2026-08-04 · **Source:** [Pexels](https://www.pexels.com) ·
Pexels License — free for commercial use, no attribution required.

Real scenes for the App Store CTA, not surfaces. The companion folder
[`../cta-band/`](../cta-band/) holds the texture/gradient set; this one is the opposite
brief. **Open [`index.html`](index.html)** — every frame renders as the real band, with a
layout switch, a veil slider and a focal-point slider.

---

## The ten

| # | File stem | Pexels | Scene | Face? | Master |
| --- | --- | --- | --- | --- | --- |
| 01 | `01-kitchen-counter-phone-8939262` | [8939262](https://www.pexels.com/photo/8939262/) | Cream overshirt, phone in hand, vegetables on the counter | yes | 2400×3600 |
| 02 | `02-kitchen-banana-phone-8939309` | [8939309](https://www.pexels.com/photo/8939309/) | Checking the phone while unpacking groceries | yes | 2400×3600 |
| 03 | `03-green-smoothie-phone-6707452` | [6707452](https://www.pexels.com/photo/6707452/) | Green smoothie, phone still in hand | yes | 2400×3600 |
| 04 | `04-cooking-phone-plants-12673803` | [12673803](https://www.pexels.com/photo/12673803/) | Cooking at the hob, reading the phone, plants behind | yes | 2400×1600 |
| 05 | `05-sofa-window-smiling-27176011` | [27176011](https://www.pexels.com/photo/27176011/) | By the window with plants, smiling at the phone | yes | 2400×1600 |
| 06 | `06-morning-bed-linen-3807633` | [3807633](https://www.pexels.com/photo/3807633/) | Morning on white linen, phone | yes | 2400×1600 |
| 07 | `07-overhead-coffee-phone-9788052` | [9788052](https://www.pexels.com/photo/9788052/) | Top-down: hands, phone, coffee | no | 2400×1600 |
| 08 | `08-hands-blank-screen-linen-9787782` | [9787782](https://www.pexels.com/photo/9787782/) | Hands and phone on white bedding, **screen empty** | no | 2400×3600 |
| 09 | `09-hand-blank-screen-cream-24709142` | [24709142](https://www.pexels.com/photo/24709142/) | Hand holding a phone, **screen empty**, cream backdrop | no | 2400×1746 |
| 10 | `10-closeup-watching-video-17757178` | [17757178](https://www.pexels.com/photo/17757178/) | Over the shoulder, video playing on the phone | no | 2400×3200 |

**01–06** put a person in the frame (01–04 tie the phone to food, which is the product).
**07–10** are hands only.

## Formats

| Folder | What | Spec |
| --- | --- | --- |
| `jpg/` | Master | 2400 px wide, Pexels JPEG as delivered |
| `webp/` | Delivery | 1600 px, WebP q80 |
| `avif/` | Delivery | 1600 px, AVIF q50 — above the q42 texture spec, because these carry detail a texture does not |
| `preview-crop/` | Still | 1400×600 (21:9) centre crop — what survives in a full-width band, no scrim |

## Three things this brief forces

**The layout has to change.** `CtaBand` centres a 4xl glass card over the full width — exactly
where a person's face lands. A photograph of someone is only worth using if the copy moves off
them: card pushed right, or a true 50/50 split with the photo as a panel. All three options are
in `index.html`; judge each frame in the layout you would actually ship.

**The veil has to come down.** Textures sit under an 84% cream scrim. At that strength a person
disappears. These want roughly **0.15–0.35** — which means contrast is no longer free, and the
copy has to sit on the card or on a clean part of the frame, not on the photograph.

**Faces carry a licence question.** The Pexels licence permits commercial use but not depicting
an identifiable person in a way that implies endorsement — the risk a stock face beside a health
claim runs into. It is a judgement call, not a prohibition, and 07–10 sidestep it entirely.

## The strongest option

**09** (and **08**) hold a phone with a blank screen. Composite a real app screen into it and the
band stops showing a generic phone and starts showing the product — which is the thing that
actually earns a download. That path needs app screenshots, still gap #4 in
[image-assets.md §5](../../../04-content/image-assets.md).

## When one is picked

1. Encode to `apps/web/public/images/` at 1600 px (AVIF q50 — not the q42 texture spec).
2. Adjust `CtaBand` to the chosen layout; the cream top-fade must still paint after any
   decorative layer (§3b, *Section seams*).
3. Add it to the asset inventory with its Pexels ID, and give it **real alt text** — unlike the
   textures, a photograph of a person is not decorative.
4. Re-measure contrast and seams.
5. Delete this folder.
