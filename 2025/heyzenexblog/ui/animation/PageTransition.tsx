"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	// No AnimatePresence: with the App Router it keeps stale route content and breaks child animations on re-entry.
	return (
		<motion.div
			key={pathname}
			className="flex flex-1 flex-col"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}>
			{children}
		</motion.div>
	);
}
