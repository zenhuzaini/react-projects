"use client";
import { motion } from "framer-motion";
import React from "react";

export default function EnterAnimation({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.4,
				type: "spring",
				bounce: 0.5,
			}}
		>
			{children}
		</motion.div>
	);
}
