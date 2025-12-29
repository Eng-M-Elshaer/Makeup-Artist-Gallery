import type { NextConfig } from "next";

const isGH = process.env.GITHUB_PAGES === 'true';
const repo = 'Makeup-Artist-Gallery';

const nextConfig: NextConfig = {
  output: 'export',
  ...(isGH ? { basePath: `/${repo}`, assetPrefix: `/${repo}/` } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
