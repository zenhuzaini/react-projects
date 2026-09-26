import {
	Fleur_De_Leah,
	Geist,
	Geist_Mono,
	Inter,
	Lusitana,
	Martian_Mono,
	Playfair_Display,
	Schibsted_Grotesk,
} from "next/font/google";

export const lusitana = Lusitana({
	weight: ["400", "700"],
	subsets: ["latin"],
});

export const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// 💐 Add Fleur De Leah
export const fleurDeLeah = Fleur_De_Leah({
	variable: "--font-fleur",
	subsets: ["latin"],
	weight: "400", // Only one weight available
});

export const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-heading",
	weight: ["900", "400", "500", "600", "700"],
});

export const inter = Inter({
	subsets: ["latin"],
	variable: "--font-body",
	weight: ["100", "200", "800", "900", "400", "500", "600", "700"], // optional
});
export const schibstedGrotesk = Schibsted_Grotesk({
	variable: "--font-schibsted-grotesk",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
});

export const martianMono = Martian_Mono({
	variable: "--font-martian-mono",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "100", "200", "300"],
});
