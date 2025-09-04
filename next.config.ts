import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  // Optimize fonts
  optimizeFonts: true,
};

export default nextConfig;