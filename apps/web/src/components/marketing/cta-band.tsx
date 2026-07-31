import { STORE } from '@nutricycle/shared';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { StoreBadges } from './store-badges';
import { Reveal } from '@/components/motion/reveal';

/**
 * The closing conversion band. Reused verbatim at the foot of every
 * /ciclo/[fase] and /recetas/[slug] page — that is where educational
 * search traffic lands, and the highest-intent moment on the site
 * (cta-strategy.md §3).
 */
export function CtaBand({ source = 'closing' }: { source?: string }) {
  return (
    <Section surface="inverse" size="feature" className="overflow-hidden">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="text-white/60">Disponible en iOS y Android</Eyebrow>

          <h2 className="mt-6 text-h1 text-white">
            Tu ciclo, tu guía —{' '}
            <em className="font-display italic text-luteal">en tu bolsillo</em>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lead text-white/75">
            Cada día, los alimentos y recetas que tu cuerpo necesita según tu fase.
            Sin dietas, sin restricciones.
          </p>

          {/* Social proof adjacent to the CTA, not stranded up the page. */}
          <div className="mt-10 flex items-center justify-center gap-8 text-white">
            <Stat value={`★ ${STORE.rating}`} label="Valoración" />
            <span aria-hidden className="h-8 w-px bg-white/20" />
            <Stat value={STORE.recipeCount} label="Recetas" />
            <span aria-hidden className="h-8 w-px bg-white/20" />
            <Stat value={STORE.phaseCount} label="Fases" />
          </div>

          <StoreBadges tone="dark" source={source} className="mt-10 justify-center" />

          <p className="mt-6 text-caption text-white/60">
            Descarga gratis · Plan Hormonal desde la app
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-h3 font-normal">{value}</p>
      <p className="mt-1 text-caption text-white/60">{label}</p>
    </div>
  );
}
