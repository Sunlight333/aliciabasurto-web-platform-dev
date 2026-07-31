import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/hero';
import { ProblemSection } from '@/components/content/problem-section';
import { HowItWorks } from '@/components/content/how-it-works';
import { PhasesSection } from '@/components/content/phases-section';
import { FeaturesSection } from '@/components/content/features-section';
import { FounderSection } from '@/components/content/founder-section';
import { ProofSection } from '@/components/content/proof-section';
import { CtaBand } from '@/components/marketing/cta-band';

export const metadata: Metadata = {
  title: 'Nutricycle — Come con tu ciclo, vuelve a sentirte tú',
  description:
    'Nutricycle adapta tu alimentación, recetas y rutinas a cada fase de tu ciclo menstrual. Recetas por fase, gráfico hormonal y asesora con IA. Gratis en iOS y Android.',
  alternates: { canonical: '/' },
};

/**
 * Landing page — 8 sections.
 *
 * Store CTAs sit at 1 (hero), 8 (closing band), and the persistent sticky
 * bar on mobile. Sections 3–6 deliberately push to education instead: a
 * visitor who hasn't understood the value yet will not install
 * (cta-strategy.md §3).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <PhasesSection />
      <FeaturesSection />
      <FounderSection />
      <ProofSection />
      <CtaBand source="home-closing" />
    </>
  );
}
