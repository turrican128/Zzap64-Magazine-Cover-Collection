import type { NextConfig } from "next";

// In production CI we set NEXT_PUBLIC_BASE_PATH=/Zzap64-Magazine-Cover-Collection
// so URLs resolve under the GitHub Pages project subpath. Locally and on a
// custom domain it stays empty so URLs resolve from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
