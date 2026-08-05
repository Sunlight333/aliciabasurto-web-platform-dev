import { HelpCircle, Salad, BellRing } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { PROBLEMS } from '@/data/home';
import { getDictionary, type Locale } from '@/lib/i18n';

const ICONS = { HelpCircle, Salad, BellRing };

export function ProblemSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section surface="raised">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.home.problem.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            {t.home.problem.title}{' '}
            <span className="text-accent">{t.home.problem.accent}</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-7 md:grid-cols-3">
          {PROBLEMS.map((problem, i) => {
            const Icon = ICONS[problem.icon];
            return (
              <Reveal as="li" key={problem.pain} delay={i * 110}>
                <article className="card card-hover h-full p-8 lg:p-9">
                  <span className={`icon-chip ${problem.tint}`}>
                    <Icon strokeWidth={1.9} className="h-9 w-9" />
                  </span>

                  <h3 className="mt-6 text-h4 text-ink">“{problem.pain}”</h3>

                  <p className="mt-4 text-small text-muted">{problem.answer}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
