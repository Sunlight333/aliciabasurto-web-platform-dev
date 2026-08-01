import { ArrowRight, Leaf, CircleDashed, HeartHandshake } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { PortraitRotator, type Portrait } from './portrait-rotator';

/**
 * Frames the rotator cycles through. Alt text per asset comes from
 * doc/04-content/image-assets.md §3 — it belongs to the photograph, not
 * to the slot it fills.
 *
 * Three frames. The third, kitchen-chopping-alt, is 467×718 against a
 * 448px slot, so it is effectively native at 1× and softer on a retina
 * display — included at the client's direction. A DSLR master for this
 * frame is still worth requesting (image-assets.md §5 gap #3); dropping
 * it back to two is one deletion.
 */
const PORTRAITS: readonly Portrait[] = [
  {
    src: '/images/alicia/portrait-smiling.jpg',
    alt: 'Alicia Basurto, health coach de nutrición hormonal, en su cocina',
  },
  {
    src: '/images/alicia/portrait-tea.jpg',
    alt: 'Alicia Basurto sosteniendo una infusión en su cocina',
  },
  {
    src: '/images/alicia/kitchen-chopping-alt.avif',
    alt: 'Alicia Basurto cortando verduras frescas en su cocina',
  },
];

/**
 * Founder section — the site's trust anchor.
 *
 * The product is paid health guidance with no free trial on the web, so a
 * named, visible practitioner is the cheapest credibility available
 * (about-page.md §1). This section therefore carries more structure than
 * a plain text-and-photo split.
 *
 * The three pillars are drawn from the site's own existing copy — food as
 * medicine, syncing to the cycle, no restrictive dieting. They are method
 * principles, not credentials: real qualifications are still pending from
 * the client (about-page.md §4) and nothing here invents them.
 *
 * No app CTA by design — the closing band owns the download ask.
 */
const PILLARS = [
  {
    icon: Leaf,
    title: 'La comida como medicina',
    body: 'Cada alimento elegido por lo que le hace a tus hormonas.',
    tint: 'bg-follicular-soft text-follicular-ink',
  },
  {
    icon: CircleDashed,
    title: 'Sincronizada a tu ciclo',
    body: 'Lo que tu cuerpo necesita cambia cada semana. Tu plan también.',
    tint: 'bg-luteal-soft text-luteal-ink',
  },
  {
    icon: HeartHandshake,
    title: 'Sin dietas restrictivas',
    body: 'Nada de contar calorías ni prohibirte comida.',
    tint: 'bg-menstrual-soft text-menstrual-ink',
  },
];

export function FounderSection() {
  return (
    <Section surface="lilac" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(46vw, 540px)',
            height: 'min(46vw, 540px)',
            top: '-22%',
            right: '-10%',
            background: 'var(--color-luteal)',
            opacity: 0.4,
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Portrait ---------- */}
          <Reveal className="lg:col-span-5 lg:order-2">
            <div className="group relative mx-auto max-w-md lg:mx-0">
              {/* A tinted layer offset behind the frame. Depth comes from
                  this rather than a resting 3D tilt, which made the frame
                  read as crooked next to straight-edged copy. */}
              <div
                aria-hidden
                className="absolute -top-6 -right-6 h-full w-full rounded-[2rem] bg-luteal/45 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-2 group-hover:translate-y-2"
              />

              <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
                <PortraitRotator images={PORTRAITS} className="aspect-[4/5]" />
              </div>

              {/* Desktop only. On mobile the columns stack, putting this
                  directly above a heading carrying the same name — the
                  repetition read as a mistake. */}
              <div className="glass-strong relative z-10 -mt-10 ml-6 mr-10 hidden rounded-2xl px-6 py-5 shadow-lg lg:block">
                <p className="font-display text-h4 font-semibold text-ink">
                  Alicia Basurto
                </p>
                <p className="mt-1 text-caption text-muted">
                  Health coach de nutrición hormonal
                </p>
              </div>
            </div>
          </Reveal>

          {/* ---------- Copy ---------- */}
          <Reveal className="lg:col-span-7 lg:order-1" delay={140}>
            <Eyebrow>Sobre mí</Eyebrow>

            {/* Deliberate two-line lockup — as one run it orphaned "Cíclica". */}
            <h2 className="mt-5 text-h2 text-ink">
              Alicia Basurto:
              <br />
              <span className="text-accent">Nutrición Cíclica</span>
            </h2>

            <blockquote className="mt-8 border-l-2 border-accent-display/50 pl-6">
              <p className="font-display text-h3 leading-snug text-ink italic">
                La comida correcta en el momento correcto.
              </p>
            </blockquote>

            <div className="mt-7 max-w-xl space-y-5 text-body text-muted">
              <p>
                Durante años mi cuerpo fue una espiral de acné, fatiga y
                desequilibrios que afectaban mi calidad de vida.
              </p>
              <p>
                Después de seis años revirtiendo mis propios síntomas, consolidé
                una metodología basada en la alimentación como medicina. Hoy mi
                misión es enseñar a otras mujeres a sincronizar sus hábitos con la
                inteligencia de su ciclo menstrual.
              </p>
            </div>

            <ul className="mt-10 flex flex-col gap-px overflow-hidden rounded-card border border-white/70 bg-white/50">
              {PILLARS.map(({ icon: Icon, title, body, tint }) => (
                <li key={title} className="flex items-start gap-5 bg-white/70 p-5">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tint}`}
                  >
                    <Icon strokeWidth={1.9} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-sans text-small font-semibold text-ink">
                      {title}
                    </p>
                    <p className="mt-1 text-caption text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="/sobre"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-action px-7 py-4 font-sans text-nav font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-action-hover hover:shadow-lg"
            >
              Conóceme
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
