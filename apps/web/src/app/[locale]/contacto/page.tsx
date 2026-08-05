import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { Mail, HelpCircle, ShieldCheck, Store, ArrowRight } from 'lucide-react';
import { SITE } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';

export const metadata: Metadata = {
  title: 'Contacto — Nutricycle',
  description:
    'Escribinos a hola@aliciabasurto.com. Soporte de la app, privacidad y eliminación de datos, y consultas sobre la suscripción.',
  alternates: { canonical: '/contacto' },
};

/**
 * Email-first, no form — deliberately.
 *
 * A contact form needs somewhere to POST. There is no API route, no mail
 * provider and no spam handling in this build, and a form that silently
 * drops messages is worse than no form: the sender believes they have
 * been heard. `contact_submissions` is already reserved in the web-owned
 * tables (revised-direction.md §2) for when that backend exists.
 *
 * Routing the reader to the right subject line does most of the work a
 * form's category dropdown would have done anyway.
 */
const ROUTES = [
  {
    icon: HelpCircle,
    title: 'Soporte de la app',
    body: 'Algo no funciona, no podés entrar o la app se comporta raro.',
    subject: 'Soporte Nutricycle',
    tint: 'bg-luteal-soft text-luteal-ink',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidad y datos',
    body: 'Acceder a tus datos, corregirlos o eliminar tu cuenta por completo.',
    subject: 'Solicitud sobre mis datos',
    tint: 'bg-follicular-soft text-follicular-ink',
  },
  {
    icon: Store,
    title: 'Suscripción y pagos',
    body: 'Dudas sobre el Plan Hormonal, restaurar una compra o cancelar.',
    subject: 'Consulta sobre mi suscripción',
    tint: 'bg-ovulation-soft text-ovulation-ink',
  },
];

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Escribinos y"
        accent="te respondemos"
        lead="Somos un equipo pequeño, así que respondemos por correo. Elegí el tema y te llega directo a quien corresponde."
        image="/images/heroes/contacto.avif"
        focal="center 50%"
        veil={0.58}
      />

      <Section surface="raised">
        <SectionTexture src="/images/textures/arena.avif" scrim={0.9} />
        <Container className="relative">
          <ul className="grid gap-7 md:grid-cols-3">
            {ROUTES.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 100} className="h-full">
                <article className="card card-hover flex h-full flex-col p-8">
                  <span className={`icon-chip ${r.tint}`}>
                    <r.icon strokeWidth={1.9} className="h-9 w-9" />
                  </span>
                  <h2 className="mt-6 text-h4 text-ink">{r.title}</h2>
                  <p className="mt-3 flex-1 text-small text-muted">{r.body}</p>
                  <a
                    href={`mailto:${SITE.email}?subject=${encodeURIComponent(r.subject)}`}
                    className="group mt-6 inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
                  >
                    Escribir
                    <ArrowRight
                      strokeWidth={2.2}
                      className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </a>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14" delay={340}>
            <div className="card mx-auto max-w-xl p-10 text-center">
              <span className="icon-chip mx-auto bg-menstrual-soft text-menstrual-ink">
                <Mail strokeWidth={1.9} className="h-9 w-9" />
              </span>
              <Eyebrow className="mt-6">Cualquier otro tema</Eyebrow>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-4 inline-block font-display text-h3 text-ink transition-colors hover:text-accent"
              >
                {SITE.email}
              </a>
              <p className="mt-5 text-small text-muted">
                Respondemos en días hábiles. Si tu consulta es sobre la
                suscripción, mirá primero las{' '}
                <a href="/faq#suscripcion" className="text-accent underline underline-offset-4">
                  preguntas frecuentes
                </a>{' '}
                — suele estar resuelta ahí.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand source="contacto" />
    </>
  );
}
