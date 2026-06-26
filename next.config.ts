import type { NextConfig } from "next";
import { CORS_CREDENTIALS } from "./shared/config/dotenv-config";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api-backend/:path*",
        destination: `${CORS_CREDENTIALS.API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
