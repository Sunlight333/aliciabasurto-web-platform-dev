import type { Metadata } from 'next';
import { SITE } from '@nutricycle/shared';
import { isLocale, DEFAULT_LOCALE, getDictionary, alternatesFor, type Locale } from '@/lib/i18n';
import {
  GraduationCap,
  HeartPulse,
  Check,
  Mail,
  AlertTriangle,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { getCourses, type Course } from '@/data/courses';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return {
    title: t.meta.cursos.title,
    description: t.meta.cursos.description,
    alternates: { canonical: '/cursos', languages: alternatesFor('/cursos') },
  };
}

const ICONS: Record<string, LucideIcon> = { GraduationCap, HeartPulse };

/**
 * Source: doc/Nutricycle_Cursos.pdf (client brief). The page is the
 * brochure's own structure — promise, then the two programmes, each with
 * what you learn and what it includes.
 *
 * ⚠️ Ships knowingly incomplete, the same way /sobre's credentials block
 * does. The brochure has no price, no dates, no duration and no enrolment
 * flow, so every "empezar" here is an email to Alicia and the gap is
 * stated on the page instead of being filled with invented numbers.
 *
 * The hero photograph is a study still life — tea and a handwritten page —
 * rather than food. Every other route opens on ingredients; this one sells
 * learning the method, so the frame is the notebook, not the meal.
 */
export default async function CursosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  const courses = getCourses(locale);

  return (
    <>
      <PageHero
        eyebrow={t.pages.cursos.eyebrow}
        title={t.pages.cursos.title}
        accent={t.pages.cursos.accent}
        lead={t.pages.cursos.lead}
        image="/images/heroes/cursos.avif"
        focal="center 45%"
        veil={0.5}
      >
        <ul className="flex flex-wrap justify-center gap-3">
          {courses.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="inline-flex rounded-full border border-hairline bg-white/70 px-5 py-2.5 font-sans text-caption font-semibold text-ink shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {c.kind}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {courses.map((course) => (
        <CourseBlock key={course.id} course={course} t={t} />
      ))}

      {/* Enrolment — an email, because that is what the brochure gives */}
      <Section id="inscripcion" surface="lilac" size="tight">
        <Container size="prose">
          <Reveal className="text-center">
            <Eyebrow>{t.courses.enrolEyebrow}</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              {t.courses.enrolTitle}{' '}
              <span className="text-accent">{t.courses.enrolAccent}</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-body text-muted">
              {t.courses.enrolLead}
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4.5 font-sans text-nav font-semibold text-surface-raised shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Mail strokeWidth={2.1} className="h-5.5 w-5.5" />
              {SITE.email}
            </a>

            {/* Visible to the client in review; removed once the brochure
                gains prices, dates and a real enrolment link. */}
            <p className="mt-10 flex items-start gap-3.5 rounded-card border border-ovulation bg-ovulation-soft p-6 text-left text-small text-ink">
              <AlertTriangle
                aria-hidden
                strokeWidth={2}
                className="mt-0.5 h-5 w-5 shrink-0 text-ovulation-ink"
              />
              <span>
                <strong className="font-semibold">{t.courses.pendingLabel}</strong>{' '}
                {t.courses.pendingBody}
              </span>
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand source="cursos" locale={locale} />
    </>
  );
}

function CourseBlock({
  course,
  t,
}: {
  course: Course;
  t: ReturnType<typeof getDictionary>;
}) {
  const Icon = ICONS[course.icon] ?? GraduationCap;

  return (
    <Section id={course.id} surface={course.surface}>
      {/* Only on the cream section — the scrim is cream, so it would wash
          the mint tint off the other one. */}
      {course.surface === 'raised' && (
        <SectionTexture src="/images/textures/estudio.avif" />
      )}

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className={`icon-chip mx-auto ${course.tint}`}>
            <Icon strokeWidth={1.9} className="h-9 w-9" />
          </span>
          <Eyebrow className="mt-6">{course.kind}</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">{course.title}</h2>
          <p className="mx-auto mt-7 max-w-2xl text-body text-muted">{course.lead}</p>
        </Reveal>

        <Reveal className="mt-16" delay={120}>
          <h3 className="text-center font-sans text-caption font-bold tracking-[0.16em] text-accent-display uppercase">
            {t.courses.willLearn}
          </h3>
        </Reveal>

        {/* Numbered rather than bulleted: these are the syllabus in order,
            and the count is the argument — four things, not "some topics". */}
        <ol className="mx-auto mt-9 grid max-w-5xl gap-6 md:grid-cols-2">
          {course.lessons.map((lesson, i) => (
            <Reveal as="li" key={lesson.title} delay={i * 90} className="h-full">
              <article className="card card-hover flex h-full gap-5 p-7 lg:p-8">
                <span
                  aria-hidden
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-h4 font-semibold ${course.tint}`}
                >
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-display text-h4 text-ink">{lesson.title}</h4>
                  <p className="mt-2.5 text-small text-muted">{lesson.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mx-auto mt-14 max-w-3xl" delay={160}>
          <div className="card p-8 text-center lg:p-10">
            <h3 className="font-sans text-caption font-bold tracking-[0.16em] text-accent-display uppercase">
              {t.courses.includes}
            </h3>
            <p className="mt-5 text-body text-ink">{course.highlight}</p>

            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {course.includes.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface-raised px-5 py-2.5 text-caption font-semibold text-ink"
                >
                  <Check
                    aria-hidden
                    strokeWidth={2.6}
                    className="h-4.5 w-4.5 text-follicular-ink"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#inscripcion"
              className="group mt-9 inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
            >
              {t.courses.askAbout}
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
