import type { Metadata } from 'next';
import {
  Wand2,
  CalendarDays,
  Calculator,
  Activity,
  UtensilsCrossed,
  CalendarCheck,
  Leaf,
  ShoppingBasket,
  Bookmark,
  Sparkles,
  TrendingUp,
  NotebookPen,
  Droplets,
  Flower2,
  BookOpen,
  PlayCircle,
  Bell,
  UserCircle,
  Languages,
  Crown,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { FEATURE_GROUPS, type Feature } from '@/data/features';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Funciones de Nutricycle',
  description:
    'Rastreador del ciclo, recetas por fase, gráfico hormonal, plan semanal de comidas, lista de compras y una asesora con IA que conoce tu fase. Todo en Nutricycle.',
  alternates: { canonical: '/funcionalidades' },
};

const ICONS: Record<string, LucideIcon> = {
  Wand2,
  CalendarDays,
  Calculator,
  Activity,
  UtensilsCrossed,
  CalendarCheck,
  Leaf,
  ShoppingBasket,
  Bookmark,
  Sparkles,
  TrendingUp,
  NotebookPen,
  Droplets,
  Flower2,
  BookOpen,
  PlayCircle,
  Bell,
  UserCircle,
  Languages,
};

export default function FuncionalidadesPage() {
  return (
    <>
      <PageHero
        eyebrow="Funciones"
        title="Todo lo que Nutricycle"
        accent="hace por ti"
        lead="Un rastreador de ciclo, un plan de alimentación y una asesora hormonal en la misma app. Esto es lo que encuentras dentro."
      >
        <ul className="flex flex-wrap justify-center gap-3">
          {FEATURE_GROUPS.map((g) => (
            <li key={g.id}>
              <a
                href={`#${g.id}`}
                className="inline-flex rounded-full border border-hairline bg-white/70 px-5 py-2.5 font-sans text-caption font-semibold text-ink shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {g.eyebrow}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {FEATURE_GROUPS.map((group) => (
        <Section key={group.id} id={group.id} surface={group.surface}>
          <Container>
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow>{group.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-h2 text-ink">
                {group.title} <span className="text-accent">{group.accent}</span>
              </h2>
              {group.lead && (
                <p className="mx-auto mt-6 max-w-xl text-body text-muted">
                  {group.lead}
                </p>
              )}
            </Reveal>

            <ul
              className={cn(
                'mt-14 grid gap-7 sm:grid-cols-2',
                group.columns === 3 && 'lg:grid-cols-3',
              )}
            >
              {group.features.map((feature, i) => (
                <Reveal
                  as="li"
                  key={feature.title}
                  delay={i * 90}
                  className="h-full"
                >
                  <FeatureCard feature={feature} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      <CtaBand source="funcionalidades" />
    </>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = ICONS[feature.icon];

  return (
    <article
      className={cn(
        'card card-hover flex h-full flex-col p-8 lg:p-9',
        feature.premium && 'ring-2 ring-ovulation',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`icon-chip ${feature.tint}`}>
          {Icon && <Icon strokeWidth={1.9} className="h-9 w-9" />}
        </span>

        {feature.premium && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ovulation px-3.5 py-1.5 font-sans text-caption font-bold whitespace-nowrap text-ovulation-ink">
            <Crown strokeWidth={2.2} className="h-4 w-4" />
            Premium
          </span>
        )}
      </div>

      <h3 className="mt-6 text-h3 text-ink">{feature.title}</h3>
      <p className="mt-3 flex-1 text-small text-muted">{feature.body}</p>

      {feature.note && (
        <p className="mt-5 font-sans text-caption font-semibold text-accent-display">
          {feature.note}
        </p>
      )}

      {feature.premium && (
        <p className="mt-5 text-caption text-muted">
          Incluido en el Plan Hormonal, desde la app.
        </p>
      )}
    </article>
  );
}
