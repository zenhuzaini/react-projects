import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Moon from "@/icons/Moon";
import Sun from "@/icons/Sun";

const LightDarkSwitcher = ({
	isDark,
	toggleDarkMode,
}: {
	isDark: boolean;
	toggleDarkMode: (param: any) => void;
}) => {
	return (
		<div className="relative h-6 w-6 overflow-hidden">
			<AnimatePresence initial={false}>
				{isDark ? (
					// Moon → when clicked: Moon goes UP
					<motion.button
						key="moon"
						onClick={toggleDarkMode}
						initial={{ y: -30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -30, opacity: 0 }}
						transition={{ duration: 0.75, ease: "easeInOut" }}
						className="absolute inset-0 flex items-center justify-center">
						<Moon size={5} />
					</motion.button>
				) : (
					// Sun → when clicked: Sun goes DOWN
					<motion.button
						key="sun"
						onClick={toggleDarkMode}
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 30, opacity: 0 }}
						transition={{ duration: 0.75, ease: "easeInOut" }}
						className="absolute inset-0 flex items-center justify-center">
						<Sun size={5} />
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	);
};

export default LightDarkSwitcher;
