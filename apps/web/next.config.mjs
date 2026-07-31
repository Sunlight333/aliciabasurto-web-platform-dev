/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nutricycle/shared'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
