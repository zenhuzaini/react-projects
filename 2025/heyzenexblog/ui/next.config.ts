import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

const nextConfig: NextConfig = {
	// cacheComponents: true,
	allowedDevOrigins: siteUrl
		? [siteUrl, siteUrl.replace("://", "://www.")]
		: [],
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
		unoptimized: true,
	},
	reactCompiler: true,
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
