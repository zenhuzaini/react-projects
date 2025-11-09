import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "d2exd72xrrp1s7.cloudfront.net",
				pathname: "**",
			},
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
