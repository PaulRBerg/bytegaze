import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // See https://github.com/vercel/next.js/discussions/59347
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
