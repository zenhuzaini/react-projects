import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://picsum.photos/seed/**")],
	},
	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
	reactCompiler: true,
};

export default nextConfig;
