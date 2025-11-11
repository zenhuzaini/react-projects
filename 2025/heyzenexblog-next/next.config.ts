import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "d2exd72xrrp1s7.cloudfront.net",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				pathname: "**",
			},
			// https://picsum.photos/id/1019/800/600)
			new URL("https://picsum.photos/seed/**"),
			new URL("https://res.cloudinary.com/djufavji1/image/upload/**/**"),
		],
	},
	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
	reactCompiler: true,
};

export default nextConfig;
