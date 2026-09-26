"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<AnimatePresence>
			<motion.div
				key={pathname}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={undefined} // Disable exit animation for no fade-out
				transition={{ duration: 0.7, ease: "easeInOut" }}>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
