import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, type Locale } from '@/lib/i18n';
import { Check, Minus, Crown, Sparkles, Store, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { StoreButtons } from '@/components/marketing/store-buttons';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Membresía y precios — Nutricycle',
  description:
    'Nutricycle es gratis para empezar. El Plan Hormonal desbloquea la asesora con IA sin límite, el predictor de ciclo y recetas guardadas ilimitadas.',
  alternates: { canonical: '/membresia' },
};

/**
 * Source: app-content-strategy.md § "Page 4: Membership".
 *
 * ⚠️ Prices are quoted in USD as supplied. Both are pending confirmation
 * that they are live in each store (project-brief.md blocker #8), and
 * the stores localise currency per region — so these are shown as
 * reference, with the store named as the authority.
 */
const PRICING = [
  {
    id: 'mensual',
    name: 'Mensual',
    price: '$14.99',
    unit: '/ mes',
    note: 'Cancelás cuando quieras',
    featured: false,
  },
  {
    id: 'anual',
    name: 'Anual',
    price: '$84.99',
    unit: '/ año',
    note: 'Equivale a $7.08 por mes',
    badge: 'Ahorrás 53%',
    featured: true,
  },
];

const COMPARISON: { feature: string; free: string | true; premium: string | true }[] = [
  { feature: 'Seguimiento del ciclo y calendario', free: true, premium: true },
  { feature: 'Recetas por fase', free: true, premium: true },
  { feature: 'Registro diario (síntomas, ánimo, energía)', free: true, premium: true },
  { feature: 'Plan semanal de comidas', free: true, premium: true },
  { feature: 'Lista de compras', free: true, premium: true },
  { feature: 'Guía de alimentos clave', free: true, premium: true },
  { feature: 'Artículos y videos', free: true, premium: true },
  { feature: 'Registro de hidratación', free: true, premium: true },
  { feature: 'Actividades de bienestar', free: true, premium: true },
  { feature: 'Asesora Nutricycle AI', free: 'Limitada', premium: 'Sin límite' },
  { feature: 'Predictor de ciclo con IA', free: '—', premium: 'Incluido' },
  { feature: 'Recetas guardadas', free: 'Limitadas', premium: 'Sin límite' },
  { feature: 'Soporte prioritario', free: '—', premium: 'Incluido' },
];

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
        <StoreButtons source="membresia-hero" className="justify-center" />
      </PageHero>

      {/* Pricing */}
      <Section surface="raised">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Plan Hormonal</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              Dos formas de <span className="text-accent">suscribirte</span>
            </h2>
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-3xl gap-7 sm:grid-cols-2">
            {PRICING.map((plan, i) => (
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
              Precios de referencia en dólares. La tienda de tu país muestra el
              importe final en tu moneda antes de confirmar.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Comparison */}
      <Section surface="base">
        <SectionTexture src="/images/textures/papel.avif" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Comparación</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              Qué incluye <span className="text-accent">cada plan</span>
            </h2>
          </Reveal>

          <Reveal className="mt-14" delay={120}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse overflow-hidden rounded-card border border-hairline bg-white shadow-sm">
                <caption className="sr-only">
                  Comparación de funciones entre el plan gratuito y el Plan Hormonal
                </caption>
                <thead>
                  <tr className="border-b border-hairline bg-surface-raised">
                    <th
                      scope="col"
                      className="p-5 text-left font-sans text-caption font-bold tracking-[0.16em] text-accent-display uppercase"
                    >
                      Función
                    </th>
                    <th
                      scope="col"
                      className="w-32 p-5 text-center font-sans text-small font-semibold text-ink"
                    >
                      Gratis
                    </th>
                    <th
                      scope="col"
                      className="w-40 bg-ovulation-soft p-5 text-center font-sans text-small font-semibold text-ovulation-ink"
                    >
                      Plan Hormonal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
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
            <Eyebrow>Facturación</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              Se gestiona <span className="text-accent">desde tu tienda</span>
            </h2>
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-4xl gap-7 md:grid-cols-3">
            {[
              {
                icon: Store,
                title: 'App Store o Google Play',
                body: 'El cobro lo procesa la tienda de tu dispositivo, con sus condiciones y su moneda.',
                tint: 'bg-luteal-soft text-luteal-ink',
              },
              {
                icon: Sparkles,
                title: 'Cancelás cuando quieras',
                body: 'Desde los ajustes de tu cuenta en la tienda. Sigue activa hasta el final del período pagado.',
                tint: 'bg-follicular-soft text-follicular-ink',
              },
              {
                icon: Check,
                title: 'Sin cargos ocultos',
                body: 'Restaurar una compra anterior está disponible dentro de la app.',
                tint: 'bg-menstrual-soft text-menstrual-ink',
              },
            ].map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 100} className="h-full">
                <article className="card card-hover h-full p-8">
                  <span className={`icon-chip ${c.tint}`}>
                    <c.icon strokeWidth={1.9} className="h-9 w-9" />
                  </span>
                  <h3 className="mt-6 text-h4 text-ink">{c.title}</h3>
                  <p className="mt-3 text-small text-muted">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 text-center" delay={340}>
            <a
              href="/faq"
              className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
            >
              Ver preguntas sobre la suscripción
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </Reveal>
        </Container>
      </Section>

      <CtaBand source="membresia" />
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
