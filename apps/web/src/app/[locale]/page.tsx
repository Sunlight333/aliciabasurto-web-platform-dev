import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, alternatesFor, getDictionary, type Locale } from '@/lib/i18n';
import { Hero } from '@/components/marketing/hero';
import { ProblemSection } from '@/components/content/problem-section';
import { HowItWorks } from '@/components/content/how-it-works';
import { PhasesSection } from '@/components/content/phases-section';
import { FeaturesSection } from '@/components/content/features-section';
import { FounderSection } from '@/components/content/founder-section';
import { ReviewsSection } from '@/components/content/reviews-section';
import { CtaBand } from '@/components/marketing/cta-band';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return {
    title: t.meta.home.title,
    description: t.meta.home.description,
    alternates: { canonical: '/', languages: alternatesFor('/') },
  };
}

/**
 * Landing page — 8 sections.
 *
 * Store CTAs sit at 1 (hero), 8 (closing band), and the persistent sticky
 * bar on mobile. Sections 3–6 deliberately push to education instead: a
 * visitor who hasn't understood the value yet will not install
 * (cta-strategy.md §3).
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return (
    <>
      <Hero locale={locale} />
      <ProblemSection locale={locale} />
      <HowItWorks locale={locale} />
      <PhasesSection locale={locale} />
      <FeaturesSection locale={locale} />
      <FounderSection locale={locale} />
      <ReviewsSection locale={locale} />
      <CtaBand source="home-closing" locale={locale} />
    </>
  );
}
