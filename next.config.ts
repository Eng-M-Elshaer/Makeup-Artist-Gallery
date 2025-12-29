import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/Makeup-Artist-Gallery' : '',
  assetPrefix: isProd ? '/Makeup-Artist-Gallery/' : '',
  images: { unoptimized: true },
};

export default nextConfig;
