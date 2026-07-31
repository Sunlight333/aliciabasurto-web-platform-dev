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

  webpack: (config, { dev }) => {
    // On this Windows volume webpack's filesystem cache repeatedly fails to
    // rename its pack files (EBUSY — an antivirus or sync client holds the
    // handle), and a failed write leaves the client chunks truncated.
    // An in-memory cache keeps dev rebuilds fast without touching disk.
    if (dev) {
      config.cache = { type: 'memory' };
    }
    return config;
  },
};

export default nextConfig;
