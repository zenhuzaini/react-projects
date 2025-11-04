"use client";

import Sun from "@/icons/Sun";
import { Switch } from "../ui/switch";
import Moon from "@/icons/Moon";
import { useEffect, useState } from "react";
import ThreeBars from "@/icons/ThreeBars";
import XMark from "@/icons/XMark";

const Header = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [showHeader, setShowHeader] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const toggleDarkMode = () => {
		const html = document.documentElement;

		// 🪄 Add smooth transition class
		html.classList.add("theme-transition");

		// Toggle dark mode
		html.classList.toggle("dark");
		const newIsDark = html.classList.contains("dark");
		setIsDark(newIsDark);

		// Save preference
		localStorage.setItem("theme", newIsDark ? "dark" : "light");

		// Remove transition class after animation
		setTimeout(() => {
			html.classList.remove("theme-transition");
		}, 500);
	};

	useEffect(() => {
		// Load saved theme on mount
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			document.documentElement.classList.add("dark");
			setIsDark(true);
		}
	}, []);

	const toggleMenu = () => setIsBurgerMenuOpen((prev) => !prev);

	useEffect(() => {
		let ticking = false;
		function handleScroll() {
			const currentScrollY = window.scrollY;
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (currentScrollY < 80 || currentScrollY < lastScrollY) {
						setShowHeader(true);
					} else {
						setShowHeader(false);
						if (isBurgerMenuOpen) {
							setIsBurgerMenuOpen((prev) => !prev);
						}
					}
					setLastScrollY(currentScrollY);
					ticking = false;
				});
				ticking = true;
			}
		}
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return (
		<div
			className={`
				bg-mybackground
				grid grid-cols-8 h-15 sm:h-20
				z-50 sticky top-0 
				transition-all
				duration-700 ease-in-out
				lg:rounded-br-2xl
				${showHeader ? "translate-y-0 " : "-translate-y-full"}
  			`}>
			<div className="flex items-center">
				<h1 className="flex flex-col text-2xl sm:text-3xl font-extrabold tracking-tighter leading-[0.8]">
					<span>HEY</span>
					<span>
						ZENEX<span className="text-primaryaccent">.</span>
					</span>
				</h1>
			</div>

			<div className="hidden lg:flex col-span-2 col-start-2 col-end-4 place-self-center">
				<nav className="flex gap-4">
					<a>Home</a>
					<a>Photography</a>
					<a>Adventures</a>
					<a>Contact</a>
				</nav>
			</div>

			{/* Mobile menu toggle */}
			<div className="lg:hidden flex col-start-8 col-end-8 justify-end items-center">
				<button onClick={toggleMenu}>
					{!isBurgerMenuOpen ? <ThreeBars /> : <XMark />}
				</button>

				{/* Mobile menu */}
				<div
					id="mobile-menu"
					className={`lg:hidden absolute top-15 sm:top-16 left-0 w-full bg-mybackground py-2 z-50 transition-all
					duration-300 ease-in-out ${
						!isBurgerMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
					}`}>
					<a href="#" className="block py-2 text-primaryText">
						Home
					</a>
					<a href="#" className="block py-2 text-primaryText">
						Photography
					</a>
					<a href="#" className="block py-2 text-primaryText">
						Adventure
					</a>
					<a href="#" className="block py-2 text-primaryText">
						Contact
					</a>
					<button onClick={toggleDarkMode} className="mt-3">
						{isDark ? <Sun /> : <Moon />}
					</button>
				</div>
			</div>

			{/* Desktop switch */}
			<div className="hidden lg:flex col-start-8 col-end-8 justify-center items-center bg-primaryaccent rounded-b-2xl">
				<div className="flex gap-3 items-center">
					<Sun />
					<Switch checked={isDark} onCheckedChange={toggleDarkMode} />
					<Moon />
				</div>
			</div>
		</div>
	);
};

export default Header;
