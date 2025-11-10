"use client";

import Sun from "@/icons/Sun";
import { Switch } from "../../ui/switch";
import Moon from "@/icons/Moon";
import { useEffect, useState } from "react";
import ThreeBars from "@/icons/ThreeBars";
import XMark from "@/icons/XMark";
import Link from "next/link";
import TerminalIcon from "@/icons/TerminalIcon";

const Header = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [showHeader, setShowHeader] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [bg, setBG] = useState("");

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
						setBG("bg-mybackground"); //this is done to avoid blinking if I add this directly to the classname and do reload
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
		<header
			className={`	
				grid grid-cols-8 h-15 sm:h-20
				transition-all
				duration-700 ease-in-out
				lg:rounded-br-2xl
				ml-4 mr-4 sm:ml-20 sm:mr-20 sticky top-0 z-50
				${showHeader ? "translate-y-0 " + bg : "-translate-y-full"}
  			`}>
			<div className="flex items-center ">
				<Link href={"/"}>
					<h1 className="flex flex-col text-lg sm:text-3xl font-extrabold tracking-tighter leading-[0.8]">
						<span>HEY</span>
						<span>
							<span className="text-primaryaccent">ZENEX</span>
							<span className="text-dot">.</span>
						</span>
					</h1>
				</Link>
			</div>

			<div className="hidden lg:flex col-span-2 col-start-2 col-end-4 place-self-center">
				<nav className="flex gap-4 text-primaryText">
					<Link href="/" className="block py-2 ">
						Home
					</Link>
					<Link href="/error/construction" className="block py-2 ">
						PhotoBook
					</Link>
					<Link href="/error/construction" className="block py-2">
						StoryBook
					</Link>
					<Link href="/error/construction" className="block py-2">
						Me
					</Link>
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
					<nav className="text-primaryText">
						<Link
							href="/"
							className="block py-2 "
							onClick={() => setIsBurgerMenuOpen((prev) => !prev)}>
							Home
						</Link>
						<Link
							href="/error/construction"
							className="block py-2 "
							onClick={() => setIsBurgerMenuOpen((prev) => !prev)}>
							PhotoBook
						</Link>
						<Link
							href="/error/construction"
							className="block py-2 "
							onClick={() => setIsBurgerMenuOpen((prev) => !prev)}>
							StoryBook
						</Link>
						<Link
							href="/error/construction"
							className="block py-2 "
							onClick={() => setIsBurgerMenuOpen((prev) => !prev)}>
							Me
						</Link>
					</nav>

					<button onClick={toggleDarkMode} className="mt-3">
						{isDark ? <Sun /> : <Moon />}
					</button>
				</div>
			</div>

			{/* Desktop switch */}
			<div className="hidden lg:flex col-start-7">
				<Link href="/playground/content" className="flex items-center gap-1 ">
					<div>
						<TerminalIcon size={5}></TerminalIcon>
					</div>
					<span>
						playground
						<span className="text-dot font-extrabold">.</span>
					</span>
				</Link>
			</div>
			<div className="hidden lg:flex col-start-8 col-end-8 justify-center items-center bg-primaryaccent rounded-b-2xl">
				<div className="flex gap-3 items-center">
					<Sun />
					<Switch checked={isDark} onCheckedChange={toggleDarkMode} />
					<Moon />
				</div>
			</div>
		</header>
	);
};

export default Header;
