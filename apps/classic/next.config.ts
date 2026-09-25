import type { NextConfig } from "next";

// Served as a zone of the design lab: the switcher app proxies /classic/** here.
const basePath = "/classic";

// Host(s) of the lab app that proxies this zone, comma-separated
// (e.g. "zenbyte-lab.vercel.app"). Defaults to the local switcher.
const labOrigins = (process.env.LAB_ORIGIN ?? "localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    serverActions: {
      // Server actions arrive through the switcher's rewrite proxy.
      allowedOrigins: labOrigins,
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
