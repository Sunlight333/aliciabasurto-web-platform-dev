import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, alternatesFor, type Locale } from '@/lib/i18n';
import { Check, Minus, Crown, Sparkles, Store, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { StoreButtons } from '@/components/marketing/store-buttons';
import { getPlans, getComparison, getBillingFacts } from '@/data/membership';
import { localizePath } from '@/lib/i18n';
import { cn } from '@/lib/cn';

const BILLING_ICONS = { Store, Sparkles, Check } as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return {
    title: t.meta.membresia.title,
    description: t.meta.membresia.description,
    alternates: { canonical: '/membresia', languages: alternatesFor('/membresia') },
  };
}

/**
 * Source: app-content-strategy.md § "Page 4: Membership".
 *
 * ⚠️ Prices are quoted in USD as supplied. Both are pending confirmation
 * that they are live in each store (project-brief.md blocker #8), and
 * the stores localise currency per region — so these are shown as
 * reference, with the store named as the authority.
 */
export default async function MembresiaPage({
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
        eyebrow={t.pages.membresia.eyebrow}
        title={t.pages.membresia.title}
        accent={t.pages.membresia.accent}
        lead={t.pages.membresia.lead}
        image="/images/heroes/membresia.avif"
        focal="center 50%"
        veil={0.5}
      >
        <StoreButtons source="membresia-hero" className="justify-center" locale={locale} />
      </PageHero>

      {/* Pricing */}
      <Section surface="raised">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.membership.planEyebrow}</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              {t.membership.planTitle} <span className="text-accent">{t.membership.planAccent}</span>
            </h2>
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-3xl gap-7 sm:grid-cols-2">
            {getPlans(locale).map((plan, i) => (
              <Reveal as="li" key={plan.id} delay={i * 110} className="h-full">
                <article
                  className={cn(
                    'card card-hover flex h-full flex-col p-8 text-center lg:p-10',
                    plan.featured && 'ring-2 ring-ovulation',
                  )}
                >
                  {plan.badge && (
                    <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-ovulation px-3.5 py-1.5 font-sans text-caption font-bold text-ovulation-ink">
                      <Crown strokeWidth={2.2} className="h-4 w-4" />
                      {plan.badge}
                    </span>
                  )}

                  <h3 className={cn('text-h3 text-ink', plan.badge && 'mt-5')}>
                    {plan.name}
                  </h3>

                  <p className="mt-5 font-display text-display leading-none font-semibold text-ink">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-body text-muted">{plan.unit}</p>
                  <p className="mt-5 text-small text-muted">{plan.note}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={280}>
            <p className="mx-auto mt-10 max-w-xl text-center text-caption text-muted">
              {t.membership.priceNote}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Comparison */}
      <Section surface="base">
        <SectionTexture src="/images/textures/papel.avif" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.membership.compareEyebrow}</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              {t.membership.compareTitle} <span className="text-accent">{t.membership.compareAccent}</span>
            </h2>
          </Reveal>

          <Reveal className="mt-14" delay={120}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse overflow-hidden rounded-card border border-hairline bg-white shadow-sm">
                <caption className="sr-only">
                  {t.membership.tableCaption}
                </caption>
                <thead>
                  <tr className="border-b border-hairline bg-surface-raised">
                    <th
                      scope="col"
                      className="p-5 text-left font-sans text-caption font-bold tracking-[0.16em] text-accent-display uppercase"
                    >
                      {t.membership.colFeature}
                    </th>
                    <th
                      scope="col"
                      className="w-32 p-5 text-center font-sans text-small font-semibold text-ink"
                    >
                      {t.membership.colFree}
                    </th>
                    <th
                      scope="col"
                      className="w-40 bg-ovulation-soft p-5 text-center font-sans text-small font-semibold text-ovulation-ink"
                    >
                      {t.membership.colPremium}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getComparison(locale).map((row) => (
                    <tr key={row.feature} className="border-b border-hairline last:border-0">
                      <th
                        scope="row"
                        className="p-5 text-left text-small font-normal text-muted"
                      >
                        {row.feature}
                      </th>
                      <Cell value={row.free} />
                      <Cell value={row.premium} highlight />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Billing facts */}
      <Section surface="lilac">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.membership.billingEyebrow}</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              {t.membership.billingTitle} <span className="text-accent">{t.membership.billingAccent}</span>
            </h2>
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-4xl gap-7 md:grid-cols-3">
            {getBillingFacts(locale).map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 100} className="h-full">
                <article className="card card-hover h-full p-8">
                  <span className={`icon-chip ${c.tint}`}>
                    {(() => { const Icon = BILLING_ICONS[c.icon]; return <Icon strokeWidth={1.9} className="h-9 w-9" />; })()}
                  </span>
                  <h3 className="mt-6 text-h4 text-ink">{c.title}</h3>
                  <p className="mt-3 text-small text-muted">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 text-center" delay={340}>
            <a
              href={localizePath('/faq', locale)}
              className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
            >
              {t.membership.faqLink}
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </Reveal>
        </Container>
      </Section>

      <CtaBand source="membresia" locale={locale} />
    </>
  );
}

function Cell({ value, highlight }: { value: string | true; highlight?: boolean }) {
  return (
    <td className={cn('p-5 text-center', highlight && 'bg-ovulation-soft/40')}>
      {value === true ? (
        <>
          <Check
            aria-hidden
            strokeWidth={2.6}
            className="mx-auto h-5 w-5 text-follicular-ink"
          />
          <span className="sr-only">Incluido</span>
        </>
      ) : value === '—' ? (
        <>
          <Minus aria-hidden strokeWidth={2.4} className="mx-auto h-5 w-5 text-hairline-strong" />
          <span className="sr-only">No incluido</span>
        </>
      ) : (
        <span className="text-caption font-semibold text-ink">{value}</span>
      )}
    </td>
  );
}
