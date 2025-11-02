import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://picsum.photos/seed/**")],
	},
};

export default nextConfig;
