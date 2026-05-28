import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        //in my case i used cdn.pixabay.com
      },
    ],
  },
};

export default nextConfig;
