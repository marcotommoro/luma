/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  trailingSlash: true,
  exportPathMap: async (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) => {
    console.log(defaultPathMap);
    return {
      "/": { page: "/" },
      "/live": { page: "/live" },
      "/data": { page: "/data" },
      "/mobiledata": { page: "/mobiledata" },
    };
  },
};

module.exports = nextConfig;
