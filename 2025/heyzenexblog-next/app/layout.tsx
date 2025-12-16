import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/MainSections/Footer";
import Header from "@/components/layout/MainSections/Header";
import ScrollToTop from "@/components/layout/OtherLayouts/ScrollToTop";
import { schibstedGrotesk } from "@/components/ui/fonts";
import PageTransition from "@/animation/PageTransition";
import { createBaseMetadata } from "../lib/seo";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = createBaseMetadata({
	title: "Zen Huzaini's Photography and Travel Blog",
	description:
		"Personal photography and travel stories by Zen. Explore adventures, bikepacking journeys, and life outdoors.",
	keywords: [
		"heyzenex",
		"Zen Huzaini",
		"zenhuzaini",
		"adventure",
		"photography",
		"bikepacking",
		"hiking",
	],
});

// this acts as a parent for all of the other pages
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			{/* add this if there will be scrollbar horizontal in the bottom overflow-x-hidden  */}
			<body className={`${schibstedGrotesk.className}  antialiased`}>
				<ScrollToTop />
				<div className="flex flex-col gap-5 sm:gap-10 min-h-screen">
					<Header></Header>
					<PageTransition>
						{/* this is to wrap not full frame */}
						<div
							role="main"
							className="ml-4 mr-4 flex flex-col gap-2 sm:ml-20 sm:mr-20 lg:gap-7 grow">
							{children}
						</div>
					</PageTransition>
					<div role="contentinfo">
						<Footer></Footer>
					</div>
				</div>
				<Analytics></Analytics>
			</body>
		</html>
	);
}
