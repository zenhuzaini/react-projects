import type { Metadata } from "next";
import {
	Fleur_De_Leah,
	Geist,
	Geist_Mono,
	Inter,
	Playfair_Display,
	Schibsted_Grotesk,
	Martian_Mono,
} from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/MainSections/Footer";
import Header from "@/components/layout/MainSections/Header";
import ScrollToTop from "@/components/layout/OtherLayouts/ScrollToTop";
import { Suspense } from "react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// 💐 Add Fleur De Leah
const fleurDeLeah = Fleur_De_Leah({
	variable: "--font-fleur",
	subsets: ["latin"],
	weight: "400", // Only one weight available
});

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-heading",
	weight: ["900", "400", "500", "600", "700"],
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-body",
	weight: ["100", "200", "800", "900", "400", "500", "600", "700"], // optional
});

export const metadata: Metadata = {
	title: "heyzenex",
	description:
		"Heyzenex is a captivating blog dedicated to photography and travel stories. Explore breathtaking adventures, vibrant cultures, and inspiring journeys through the lens of a passionate explorer.",
};

const schibstedGrotesk = Schibsted_Grotesk({
	variable: "--font-schibsted-grotesk",
	subsets: ["latin"],
});

const martianMono = Martian_Mono({
	variable: "--font-martian-mono",
	subsets: ["latin"],
});

// this acts as a parent for all of the other pages
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Suspense fallback={null}>
					<ScrollToTop />
				</Suspense>
				<div className="flex flex-col gap-5 sm:gap-10 min-h-screen w-screen">
					<Header></Header>
					{/* this is to wrap not full frame */}
					<div className="ml-4 mr-4 flex flex-col gap-2 sm:ml-20 sm:mr-20 lg:gap-7 grow">
						{children}
					</div>
					<Footer></Footer>
				</div>
			</body>
		</html>
	);
}
