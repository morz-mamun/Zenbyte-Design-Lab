import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
