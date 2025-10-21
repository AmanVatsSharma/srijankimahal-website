import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for optimal performance
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
