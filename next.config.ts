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
    remotePatterns: [
      {
        // Demo photography via picsum.photos — replace with real CDN when photos arrive
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        // Future: real photos will be served from here
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
