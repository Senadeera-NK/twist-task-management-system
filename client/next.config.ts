import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://twist-task-management-system.onrender.com/:path*',
      },
    ];
  },
};

export default nextConfig;