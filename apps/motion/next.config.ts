import type { NextConfig } from "next";

// Served as a zone of the design lab: the switcher app proxies /motion/** here.
const basePath = "/motion";

const nextConfig: NextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    serverActions: {
      // Server actions arrive through the switcher's rewrite proxy.
      allowedOrigins: ["localhost:3000"],
    },
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/how-we-work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
