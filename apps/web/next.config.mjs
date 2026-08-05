import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nutricycle/shared'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Production builds get their own output directory.
  //
  // `next build` and `next dev` both default to `.next`, so running a build
  // while the dev server is live overwrites the very chunks dev is serving.
  // The symptom is a runtime "__webpack_modules__[moduleId] is not a
  // function" or a blank, non-interactive page, because main-app.js and
  // app/page.js start 404ing. Separate directories make that impossible.
  distDir: isProd ? '.next-build' : '.next',

  // Standalone output bundles a minimal server with only the traced
  // dependencies, so the VPS never needs node_modules or a build step.
  // That box runs six other apps on 2GB of RAM — building there risks
  // OOM-killing a live service.
  // Traced from the workspace root so the monorepo's hoisted node_modules
  // are included. Must be a real filesystem path — a URL pathname yields
  // "/C:/..." on Windows, which silently produces no standalone output.
  output: 'standalone',
  outputFileTracingRoot: path.join(here, '..', '..'),

  /**
   * Spanish keeps the bare URLs.
   *
   * Every page lives under `app/[locale]`, so the real path for Spanish is
   * `/es/recetas` — but revised-direction.md §3 requires `/recetas`, because
   * those URLs already exist on the live site and carry their search equity.
   * This rewrites the bare paths onto the `es` segment without redirecting,
   * so the address bar keeps showing `/recetas`.
   *
   * `beforeFiles` is required: without it the rewrite runs only after Next
   * fails to match a file, and `/recetas` would 404 before ever reaching it.
   * `/en/...` is left alone — it already carries its own locale segment —
   * and so are `_next`, `images`, `video` and the `/ir` redirect handlers.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          // `es` must be excluded as well as `en`. Without it the rewrite
          // matches its own destination — /es/recetas becomes /es/es/recetas
          // and recurses until Next gives up.
          source: '/:path((?!en$|en/|es$|es/|_next/|images/|video/|ir/|favicon).*)',
          destination: '/es/:path',
        },
        { source: '/', destination: '/es' },
      ],
    };
  },

  webpack: (config) => {
    // On this Windows volume webpack's filesystem cache repeatedly fails to
    // rename its pack files (EBUSY — an antivirus or sync client holds the
    // handle), and a failed write leaves the client chunks truncated.
    // An in-memory cache avoids the disk churn entirely, in dev and build.
    config.cache = { type: 'memory' };
    return config;
  },
};

export default nextConfig;
