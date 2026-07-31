import type { Metadata } from 'next';
import Image from 'next/image';
import { STORE } from '@nutricycle/shared';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { StoreBadges } from '@/components/marketing/store-badges';
import { AmbientOrbs } from '@/components/motion/ambient-orbs';

export const metadata: Metadata = {
  title: 'Descargar Nutricycle',
  description:
    'Descarga Nutricycle gratis en iOS y Android. Recetas y alimentos clave para cada fase de tu ciclo.',
  alternates: { canonical: '/descargar' },
};

/**
 * Single-purpose conversion page. Also the landing target for /ir/app while
 * the real store URLs are missing, so it must never be a dead end.
 *
 * TODO: add QRDownload at >=lg once a store URL exists — a QR pointing at
 * nothing is worse than no QR (cta-strategy.md §4.4).
 */
export default function DescargarPage() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
      <AmbientOrbs variant="cool" />

      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <Image
            src="/images/brand/app-icon-1024.png"
            alt=""
            width={1024}
            height={1024}
            priority
            className="mx-auto h-24 w-24 rounded-3xl shadow-soft"
          />

          <Eyebrow className="mt-10">Gratis · iOS y Android</Eyebrow>

          <h1 className="mt-6 text-h1 text-ink">
            Descarga{' '}
            <em className="font-display italic text-accent-display">Nutricycle</em>
          </h1>

          <p className="mt-6 text-lead text-muted">
            Tu ciclo, tu guía. Recetas, alimentos clave y educación hormonal para
            cada fase — sin dietas, sin restricciones.
          </p>

          <StoreBadges source="descargar" className="mt-10" />

          <ul className="mt-12 flex flex-col gap-3 text-left text-small text-muted sm:mx-auto sm:max-w-sm">
            <li className="border-t border-hairline pt-3">
              Plan diario según tu fase actual
            </li>
            <li className="border-t border-hairline pt-3">
              {STORE.recipeCount} recetas en video con beneficios hormonales
            </li>
            <li className="border-t border-hairline pt-3">
              Asesora con IA que conoce tu ciclo
            </li>
          </ul>

          <p className="mt-10 text-caption text-muted">
            Descarga gratis · Plan Hormonal desde la app
          </p>
        </div>
      </Container>
    </section>
  );
}
