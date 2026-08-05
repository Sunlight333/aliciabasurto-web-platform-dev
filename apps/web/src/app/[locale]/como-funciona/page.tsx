import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import Image from 'next/image';
import {
  UserPlus,
  CalendarHeart,
  LayoutDashboard,
  NotebookPen,
  LineChart,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { PHASES, phaseDays } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';

export const metadata: Metadata = {
  title: 'Cómo funciona Nutricycle',
  description:
    'Cinco pasos: creá tu cuenta, registrá tu ciclo, recibí tu plan diario, registrá cómo te sentís y mirá tus patrones a lo largo de los meses.',
  alternates: { canonical: '/como-funciona' },
};

/** Source: app-content-strategy.md § "Page 3: How It Works". */
const STEPS: {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
  detail: string;
  tint: string;
}[] = [
  {
    n: '01',
    icon: UserPlus,
    title: 'Creá tu cuenta',
    body: 'Con tu correo, con Google o con Apple ID.',
    detail: 'Toma unos 30 segundos. No hace falta tarjeta.',
    tint: 'bg-luteal-soft text-luteal-ink',
  },
  {
    n: '02',
    icon: CalendarHeart,
    title: 'Registrá tu ciclo',
    body: 'La fecha de tu último período y cuánto suele durar tu ciclo.',
    detail: 'Nutricycle calcula tu fase actual al instante y predice la siguiente.',
    tint: 'bg-menstrual-soft text-menstrual-ink',
  },
  {
    n: '03',
    icon: LayoutDashboard,
    title: 'Recibí tu plan',
    body: 'Tu panel muestra tu fase de hoy, tu gráfico hormonal, los alimentos que te convienen y un plan semanal.',
    detail: 'Todo ajustado al punto exacto en el que estás.',
    tint: 'bg-ovulation-soft text-ovulation-ink',
  },
  {
    n: '04',
    icon: NotebookPen,
    title: 'Registrá y aprendé',
    body: 'Anotá tus síntomas y tu energía. Preguntale a la asesora con IA. Probá las recetas de tu fase.',
    detail: 'Mientras más registrás, más se ajusta la app a vos.',
    tint: 'bg-follicular-soft text-follicular-ink',
  },
  {
    n: '05',
    icon: LineChart,
    title: 'Mirá tus patrones',
    body: 'Revisá tu historial en el calendario y vas viendo cómo cambian tu ánimo y tu energía mes a mes.',
    detail: 'Lo que parecía aleatorio empieza a tener forma.',
    tint: 'bg-luteal-soft text-luteal-ink',
  },
];

export default async function ComoFuncionaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return (
    <>
      <PageHero
        eyebrow="Cómo funciona"
        title="De una fecha"
        accent="a un plan diario"
        lead="No hay que aprender nada nuevo ni llevar cuentas. Registrás una fecha y la app hace el resto, todos los días."
        image="/images/heroes/metodo.avif"
        focal="center 50%"
        veil={0.5}
      />

      {/* The journey */}
      <Section surface="raised">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Cinco pasos</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              Lo que pasa <span className="text-accent">desde que la abrís</span>
            </h2>
          </Reveal>

          <ol className="mt-16 flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 110}>
                <article className="card card-hover flex flex-col gap-6 p-8 sm:flex-row sm:items-start lg:p-10">
                  <span className={`icon-chip shrink-0 ${step.tint}`}>
                    <step.icon strokeWidth={1.9} className="h-9 w-9" />
                  </span>

                  <div className="flex-1">
                    <span className="font-sans text-caption font-bold tracking-[0.16em] text-accent-display uppercase">
                      Paso {step.n}
                    </span>
                    <h3 className="mt-2 text-h3 text-ink">{step.title}</h3>
                    <p className="mt-3 text-body text-muted">{step.body}</p>
                    <p className="mt-2 text-small text-accent">{step.detail}</p>
                  </div>

                  <span
                    aria-hidden
                    className="hidden font-display text-h1 leading-none font-semibold text-hairline-strong lg:block"
                  >
                    {step.n}
                  </span>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* What the phases actually are */}
      <Section surface="base">
        <SectionTexture src="/images/textures/counter.avif" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Por qué funciona</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              Tu cuerpo no es el mismo{' '}
              <span className="text-accent">todas las semanas</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-body text-muted">
              Tus hormonas suben y bajan en un patrón que se repite cada mes. Comer
              en contra de ese patrón cuesta el doble; comer a favor, la mitad.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {PHASES.map((phase, i) => (
              <Reveal as="li" key={phase.slug} delay={i * 90} className="h-full">
                <article className="card card-hover flex h-full flex-col p-7">
                  <span className="font-sans text-caption font-bold text-accent-display">
                    {phaseDays(phase)}
                  </span>
                  <h3 className="mt-3 text-h3 text-ink">{phase.name}</h3>
                  <p className="mt-1 font-sans text-caption font-semibold text-muted">
                    {phase.tagline}
                  </p>
                  <p className="mt-4 text-small text-muted">{phase.nutrition}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 text-center" delay={420}>
            <a
              href="/ciclo"
              className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
            >
              Conocé las 4 fases en detalle
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </Reveal>
        </Container>
      </Section>

      {/* The method behind it */}
      <Section surface="lilac" className="overflow-hidden">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>El método</Eyebrow>
              <h2 className="mt-5 text-h2 text-ink">
                Seis años de <span className="text-accent">prueba propia</span>
              </h2>
              <div className="mt-7 space-y-5 text-body text-muted">
                <p>
                  Nutricycle no salió de una hoja de cálculo. Salió de seis años en
                  los que Alicia revirtió sus propios síntomas —acné, fatiga, ciclos
                  irregulares— usando la alimentación como medicina.
                </p>
                <p>
                  La app es ese método, ordenado y automatizado, para que no tengas
                  que llevar la cuenta vos.
                </p>
              </div>
              <a
                href="/sobre"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 font-sans text-nav font-semibold text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Conocé a Alicia
                <ArrowRight
                  strokeWidth={2.2}
                  className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </a>
            </Reveal>

            <Reveal delay={140}>
              <div className="relative mx-auto max-w-md lg:ml-auto">
                <div
                  aria-hidden
                  className="absolute -top-6 -right-6 h-full w-full rounded-[2rem] bg-luteal/45"
                />
                <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/images/alicia/kitchen-chopping.jpg"
                      alt="Alicia Basurto preparando verduras para una receta por fase del ciclo"
                      fill
                      sizes="(min-width: 1024px) 440px, 90vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand source="como-funciona" />
    </>
  );
}
