import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles server-side rendering + image optimization natively.
  // No static export needed — Vercel's edge network serves this faster
  // than a static export would via CDN alone.
  //
  // If deployment target changes from Vercel, add:
  //   output: "export",
  //   images: { unoptimized: true },
  images: {
    // Placeholder domains — replace with real CDN/image host when photos arrive
    remotePatterns: [],
  },
};

export default nextConfig;
