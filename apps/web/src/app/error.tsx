'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, TriangleAlert } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';

/**
 * Route-level error boundary — the 500 surface.
 *
 * Must be a client component; Next requires it. `reset()` retries the
 * segment without a full reload, which recovers most transient failures.
 *
 * The digest is shown deliberately: it is the only handle a visitor can
 * quote in a support email, and it exposes nothing about the stack.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with the real reporter when analytics lands (Phase 7)
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-gradient-to-b from-surface-blush via-surface-raised to-surface-raised py-24">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="icon-chip mx-auto bg-menstrual-soft text-menstrual-ink">
            <TriangleAlert strokeWidth={1.9} className="h-9 w-9" />
          </span>

          <Eyebrow className="mt-8">Algo salió mal</Eyebrow>
          <h1 className="mt-5 text-h1 text-ink">
            No pudimos cargar <span className="text-accent">esta página</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lead text-muted">
            Fue un problema de nuestro lado, no tuyo. Probá de nuevo — y si
            sigue pasando, escribinos.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2.5 rounded-full bg-action px-7 py-4 font-sans text-nav font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-action-hover hover:shadow-lg"
            >
              <RefreshCw strokeWidth={2.2} className="h-5 w-5" />
              Intentar de nuevo
            </button>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-hairline bg-white px-7 py-4 font-sans text-nav font-semibold text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Volver al inicio
            </Link>
          </div>

          {error.digest && (
            <p className="mt-8 text-caption text-muted">
              Código de referencia:{' '}
              <span className="font-mono text-ink">{error.digest}</span>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
