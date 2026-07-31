/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nutricycle/shared'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { dev }) => {
    // On this Windows volume webpack's filesystem cache repeatedly fails to
    // rename its pack files (EBUSY — an antivirus or sync client holds the
    // handle). A failed write leaves the client chunks truncated, so
    // main-app.js 404s and React never hydrates: the page renders but no
    // interactivity, no scroll listeners, no reveal.
    //
    // An in-memory cache keeps dev rebuilds fast without touching disk.
    if (dev) {
      config.cache = { type: 'memory' };
    }
    return config;
  },
};

export default nextConfig;
