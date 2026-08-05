import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, type Locale } from '@/lib/i18n';
import Image from 'next/image';
import { Leaf, CircleDashed, HeartHandshake, ArrowRight, AlertTriangle } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { FullBleedQuote } from '@/components/marketing/full-bleed-quote';
import { ReviewsSection } from '@/components/content/reviews-section';

export const metadata: Metadata = {
  title: 'Sobre Alicia Basurto — Nutrición Cíclica',
  description:
    'Health coach de nutrición hormonal. Después de seis años revirtiendo sus propios síntomas, Alicia consolidó un método basado en la alimentación como medicina.',
  alternates: { canonical: '/sobre' },
};

/**
 * Follows about-page.md §3 exactly: hero, story, credentials, full-bleed
 * quote, method, proof, CTA. Exactly one h1 — the live site's /app-1 has
 * 26 (site-audit.md §10.2).
 *
 * ⚠️ Two sections ship incomplete on purpose:
 *
 * - Credentials. about-page.md §4 item 2 records that Alicia's actual
 *   qualifications have not been supplied. On a site selling health
 *   guidance, inventing "certified in X" is the one thing that must not
 *   happen, so the section states what is verifiable and asks for the
 *   rest.
 * - Proof. The marquee is built and wired, but every quote, name and
 *   portrait in `getReviews(locale)` is placeholder — no testimonial has consent to
 *   publish yet. See the warning at the head of data/reviews.ts: this
 *   section must not go live until real reviews replace them.
 */
const PILLARS = [
  {
    icon: Leaf,
    title: 'La comida como medicina',
    body: 'Cada alimento elegido por lo que le hace a tus hormonas, no por sus calorías.',
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
    body: 'Nada de contar calorías ni prohibirte comida. Ese camino ya lo probaste.',
    tint: 'bg-menstrual-soft text-menstrual-ink',
  },
];

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return (
    <>
      <PageHero
        eyebrow={t.pages.sobre.eyebrow}
        title={t.pages.sobre.title}
        lead={t.pages.sobre.lead}
        image="/images/alicia/kitchen-wide.avif"
        focal="center 22%"
      />

      {/* Story */}
      <Section surface="raised">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <Eyebrow>Mi historia</Eyebrow>
              <h2 className="mt-5 text-h2 text-ink">
                Empecé <span className="text-accent">por necesidad</span>
              </h2>

              <div className="mt-8 space-y-6 text-body text-muted">
                <p>
                  Durante años mi cuerpo fue una espiral de acné, fatiga y
                  desequilibrios que afectaban mi calidad de vida. Probé lo que
                  prueba casi todo el mundo: dietas más estrictas, más disciplina,
                  más culpa cuando no funcionaba.
                </p>
                <p>
                  Lo que no había entendido es que estaba comiendo igual las cuatro
                  semanas del mes, mientras mi cuerpo cambiaba por completo entre
                  una y otra. No era falta de disciplina. Era falta de contexto.
                </p>
                <p>
                  Después de seis años revirtiendo mis propios síntomas, consolidé
                  una metodología basada en la alimentación como medicina —
                  ajustada a cada fase del ciclo, sin restricciones y sin contar
                  calorías.
                </p>
                <p>
                  Hoy mi misión es que otras mujeres no tarden seis años en
                  descubrir lo mismo. Nutricycle es ese método, ordenado y
                  automatizado, para que no tengas que llevar la cuenta vos.
                </p>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={140}>
              <div className="relative mx-auto max-w-md lg:ml-auto">
                <div
                  aria-hidden
                  className="absolute -top-6 -right-6 h-full w-full rounded-[2rem] bg-luteal/45"
                />
                <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
                  <div className="relative aspect-[2/3]">
                    <Image
                      src="/images/alicia/portrait-smiling.jpg"
                      alt="Alicia Basurto, health coach de nutrición hormonal, en su cocina"
                      fill
                      priority
                      sizes="(min-width: 1024px) 420px, 90vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Credentials — deliberately incomplete, see file header */}
      <Section surface="base" size="tight">
        <SectionTexture src="/images/textures/papel.avif" />
        <Container className="relative" size="prose">
          <Reveal>
            <Eyebrow>Formación</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              De dónde viene <span className="text-accent">el método</span>
            </h2>

            <ul className="mt-9 flex flex-col gap-4">
              {[
                'Seis años aplicando y ajustando el método en mi propio ciclo antes de enseñarlo.',
                'Acompañamiento a mujeres con SPM, SOP, acné hormonal, fatiga y ciclos irregulares.',
                'Más de 40 recetas desarrolladas y clasificadas por fase del ciclo.',
              ].map((c) => (
                <li key={c} className="card flex gap-4 p-6">
                  <span
                    aria-hidden
                    className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent-display"
                  />
                  <span className="text-body text-muted">{c}</span>
                </li>
              ))}
            </ul>

            {/* Visible in dev and to the client; removed once §4 lands. */}
            <p className="mt-7 flex items-start gap-3.5 rounded-card border border-ovulation bg-ovulation-soft p-6 text-small text-ink">
              <AlertTriangle
                aria-hidden
                strokeWidth={2}
                className="mt-0.5 h-5 w-5 shrink-0 text-ovulation-ink"
              />
              <span>
                <strong className="font-semibold">Pendiente del cliente:</strong>{' '}
                titulaciones, certificaciones y años de práctica profesional. Esta
                lista sólo recoge lo verificable hoy — nada aquí está inventado.
              </span>
            </p>
          </Reveal>
        </Container>
      </Section>

      <FullBleedQuote
        quote="La comida correcta en el momento correcto."
        attribution="Alicia Basurto"
        image="/images/alicia/kitchen-wide.avif"
      />

      {/* Method */}
      <Section surface="lilac">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>El método</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              Tres cosas que <span className="text-accent">no negocio</span>
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-7 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 100} className="h-full">
                <article className="card card-hover h-full p-8">
                  <span className={`icon-chip ${p.tint}`}>
                    <p.icon strokeWidth={1.9} className="h-9 w-9" />
                  </span>
                  <h3 className="mt-6 text-h4 text-ink">{p.title}</h3>
                  <p className="mt-3 text-small text-muted">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 text-center" delay={340}>
            <a
              href="/como-funciona"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 font-sans text-nav font-semibold text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Cómo lo aplica la app
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </Reveal>
        </Container>
      </Section>

      {/* Proof — same marquee as the landing page, its own card design */}
      <ReviewsSection
        variant="ficha"
        title={
          <>
            Historias de quienes ya{' '}
            <span className="text-accent">comen por fases</span>
          </>
        }
      />

      <CtaBand source="sobre" />
    </>
  );
}
