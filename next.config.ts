import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // See https://github.com/vercel/next.js/discussions/59347
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
