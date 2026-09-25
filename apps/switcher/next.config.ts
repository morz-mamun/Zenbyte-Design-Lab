import type { NextConfig } from "next";

// Each design runs as its own Next app (zone) with a matching basePath.
// Override the hosts to point at deployed zones instead of local dev servers.
// Trailing slashes are stripped: "https://host/" + "/classic" would become
// "//classic", which the zone redirects back to "/classic" in an endless loop.
const zoneUrl = (value: string | undefined, fallback: string) => (value || fallback).trim().replace(/\/+$/, "");
const CLASSIC_ZONE_URL = zoneUrl(process.env.CLASSIC_ZONE_URL, "http://localhost:3001");
const MOTION_ZONE_URL = zoneUrl(process.env.MOTION_ZONE_URL, "http://localhost:3002");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/classic", destination: `${CLASSIC_ZONE_URL}/classic` },
      { source: "/classic/:path*", destination: `${CLASSIC_ZONE_URL}/classic/:path*` },
      { source: "/motion", destination: `${MOTION_ZONE_URL}/motion` },
      { source: "/motion/:path*", destination: `${MOTION_ZONE_URL}/motion/:path*` },
    ];
  },
};

export default nextConfig;
