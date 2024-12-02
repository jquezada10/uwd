import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'unitedwindowmfg.com',
      },
    ]
  }
  /* config options here */
};

export default nextConfig;
