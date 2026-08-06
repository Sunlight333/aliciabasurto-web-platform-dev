import {
  Sparkles,
  CalendarDays,
  Activity,
  UtensilsCrossed,
  ShoppingBasket,
  Flower2,
  ArrowRight,
} from 'lucide-react';
import { getDictionary, localizePath, type Locale } from '@/lib/i18n';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { getFeatures } from '@/data/home';
import { cn } from '@/lib/cn';

const ICONS = {
  Sparkles,
  CalendarDays,
  Activity,
  UtensilsCrossed,
  ShoppingBasket,
  Flower2,
};

export function FeaturesSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section surface="base">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.home.features.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            {t.home.features.title}{' '}
            <span className="text-accent">{t.home.features.accent}</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {getFeatures(locale).map((feature, i) => {
            const Icon = ICONS[feature.icon];
            return (
              <Reveal as="li" key={feature.title} delay={i * 90} className="h-full">
                <article
                  className={cn(
                    'card card-hover h-full p-8 lg:p-9',
                    feature.highlight && 'ring-2 ring-luteal',
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`icon-chip ${feature.tint}`}>
                      <Icon strokeWidth={1.9} className="h-9 w-9" />
                    </span>

                    {feature.highlight && (
                      <span className="rounded-full bg-luteal px-3.5 py-1.5 font-sans text-caption font-bold text-luteal-ink">
                        {t.home.features.aiBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 text-h3 text-ink">{feature.title}</h3>
                  <p className="mt-3 text-small text-muted">{feature.body}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 text-center" delay={560}>
          <a
            href={localizePath('/funcionalidades', locale)}
            className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
          >
            {t.home.features.seeAll}
            <ArrowRight
              strokeWidth={2.2}
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
