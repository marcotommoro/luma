/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  experimental: {
    outputStandalone: true,
  },
  assetPrefix: ".",
};

module.exports = nextConfig;
