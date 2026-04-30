import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "static.easypack24.net" }],
  },
};

export default nextConfig;
