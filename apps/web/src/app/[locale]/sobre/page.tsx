import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, localizePath, alternatesFor, type Locale } from '@/lib/i18n';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return {
    title: t.meta.sobre.title,
    description: t.meta.sobre.description,
    alternates: { canonical: '/sobre', languages: alternatesFor('/sobre') },
  };
}

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
 *   portrait in `REVIEWS` is placeholder — no testimonial has consent to
 *   publish yet. See the warning at the head of data/reviews.ts: this
 *   section must not go live until real reviews replace them.
 */
const pillars = (t: ReturnType<typeof getDictionary>) => [
  { icon: Leaf, ...t.about.pillars.medicine, tint: 'bg-follicular-soft text-follicular-ink' },
  { icon: CircleDashed, ...t.about.pillars.synced, tint: 'bg-luteal-soft text-luteal-ink' },
  { icon: HeartHandshake, ...t.about.pillars.noDiets, tint: 'bg-menstrual-soft text-menstrual-ink' },
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
              <Eyebrow>{t.about.storyEyebrow}</Eyebrow>
              <h2 className="mt-5 text-h2 text-ink">
                {t.about.storyTitle} <span className="text-accent">{t.about.storyAccent}</span>
              </h2>

              <div className="mt-8 space-y-6 text-body text-muted">
                {t.about.story.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
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
                      alt={t.home.founder.alt.smiling}
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
            <Eyebrow>{t.about.credentialsEyebrow}</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              {t.about.credentialsTitle} <span className="text-accent">{t.about.credentialsAccent}</span>
            </h2>

            <ul className="mt-9 flex flex-col gap-4">
              {t.about.credentials.map((c) => (
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
                <strong className="font-semibold">{t.about.pendingLabel}</strong>{' '}
                {t.about.pendingBody}
              </span>
            </p>
          </Reveal>
        </Container>
      </Section>

      <FullBleedQuote
        quote={t.home.founder.quote}
        attribution={t.home.founder.name}
        image="/images/alicia/kitchen-wide.avif"
      />

      {/* Method */}
      <Section surface="lilac">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.about.methodEyebrow}</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              {t.about.methodTitle} <span className="text-accent">{t.about.methodAccent}</span>
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-7 md:grid-cols-3">
            {pillars(t).map((p, i) => (
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
              href={localizePath('/como-funciona', locale)}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 font-sans text-nav font-semibold text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {t.about.methodCta}
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
        locale={locale}
        variant="ficha"
        title={
          <>
            {t.pages.sobre.reviewsTitle}{' '}
            <span className="text-accent">{t.pages.sobre.reviewsAccent}</span>
          </>
        }
      />

      <CtaBand source="sobre" locale={locale} />
    </>
  );
}
