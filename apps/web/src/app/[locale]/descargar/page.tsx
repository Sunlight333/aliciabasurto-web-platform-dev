import type { Metadata } from 'next';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { STORE } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { StoreButtons } from '@/components/marketing/store-buttons';

export const metadata: Metadata = {
  title: 'Descargar Nutricycle',
  description:
    'Descarga Nutricycle gratis en iOS y Android. Recetas y alimentos clave para cada fase de tu ciclo.',
  alternates: { canonical: '/descargar' },
};

const POINTS = [
  'Plan diario según tu fase actual',
  `${STORE.recipeCount} recetas en video con beneficios hormonales`,
  'Asesora con IA que conoce tu ciclo',
];

/**
 * Single-purpose conversion page. Also the landing target for /ir/app while
 * store URLs are missing, so it must never be a dead end.
 */
export default function DescargarPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface-blush via-surface-raised to-surface-lilac py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="orb animate-drift"
          style={{
            width: 'min(60vw, 640px)',
            height: 'min(60vw, 640px)',
            top: '-20%',
            right: '-10%',
            background: 'var(--color-luteal)',
            opacity: 0.35,
          }}
        />
      </div>

      <Container className="relative">
        <div className="glass-strong mx-auto max-w-3xl rounded-[2.5rem] px-8 py-14 text-center shadow-xl lg:px-14">
          <Image
            src="/images/brand/app-icon-1024.png"
            alt=""
            width={1024}
            height={1024}
            priority
            className="animate-float mx-auto h-28 w-28 rounded-[1.75rem] shadow-lg"
          />

          <Eyebrow className="mt-9">Gratis · iOS y Android</Eyebrow>

          <h1 className="mt-5 text-h1 text-ink">
            Descarga <span className="text-accent">Nutricycle</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lead text-muted">
            Tu ciclo, tu guía. Recetas, alimentos clave y educación hormonal para
            cada fase — sin dietas, sin restricciones.
          </p>

          <StoreButtons source="descargar" size="lg" className="mt-10 justify-center" />

          <ul className="mx-auto mt-12 flex max-w-md flex-col gap-4 text-left">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-follicular-soft">
                  <Check strokeWidth={2.6} className="h-4 w-4 text-follicular-ink" />
                </span>
                <span className="text-small text-muted">{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-caption text-muted">
            Descarga gratis · Plan Hormonal desde la app
          </p>
        </div>
      </Container>
    </section>
  );
}
