"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
	const pathname = usePathname();

	useEffect(() => {
		const timeout = setTimeout(() => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}, 100);
		return () => clearTimeout(timeout);
	}, [pathname]);

	return null;
}
