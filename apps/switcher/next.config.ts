import type { NextConfig } from "next";

// Each design runs as its own Next app (zone) with a matching basePath.
// Override the hosts to point at deployed zones instead of local dev servers.
const MAIN_ZONE_URL = process.env.MAIN_ZONE_URL ?? "http://localhost:3001";
const LENIS_ZONE_URL = process.env.LENIS_ZONE_URL ?? "http://localhost:3002";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/main", destination: `${MAIN_ZONE_URL}/main` },
      { source: "/main/:path*", destination: `${MAIN_ZONE_URL}/main/:path*` },
      { source: "/lenis", destination: `${LENIS_ZONE_URL}/lenis` },
      { source: "/lenis/:path*", destination: `${LENIS_ZONE_URL}/lenis/:path*` },
    ];
  },
};

export default nextConfig;
