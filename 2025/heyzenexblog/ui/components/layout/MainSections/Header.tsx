"use client";

import Sun from "@/icons/Sun";
import { Switch } from "../../ui/switch";
import Moon from "@/icons/Moon";
import { useEffect, useRef, useState } from "react";
import ThreeBars from "@/icons/ThreeBars";
import XMark from "@/icons/XMark";
import Link from "next/link";
import TerminalIcon from "@/icons/TerminalIcon";
import { motion } from "framer-motion";
import LightDarkSwitcher from "@/components/molecule/Switch/LightDarkSwitcher";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/photobook", label: "PhotoBook" },
	{ href: "/storybook", label: "StoryBook" },
	{ href: "/me/about", label: "Me" },
];

const PLAYGROUND_LINKS = [
	{ href: "/playground/mystory", label: "StoryBook" },
	{ href: "/playground/myphotobook", label: "PhotoBook" },
	{ href: "/playground/settings", label: "Settings" },
];

const Header = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [showHeader, setShowHeader] = useState(true);
	const lastScrollYRef = useRef(0);
	const [bg, setBG] = useState("");
	const [hovered, setHovered] = useState(false);

	const toggleDarkMode = () => {
		const html = document.documentElement;
		html.classList.add("theme-transition");
		html.classList.toggle("dark");
		const newIsDark = html.classList.contains("dark");
		setIsDark(newIsDark);
		localStorage.setItem("theme", newIsDark ? "dark" : "light");
		setTimeout(() => html.classList.remove("theme-transition"), 500);
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			document.documentElement.classList.add("dark");
			setIsDark(true);
		}
	}, []);

	const toggleMenu = () => setIsBurgerMenuOpen((p) => !p);

	useEffect(() => {
		let ticking = false;
		function handleScroll() {
			const currentScrollY = window.scrollY;
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (currentScrollY < 80 || currentScrollY < lastScrollYRef.current) {
						setShowHeader(true);
						setBG("bg-mybackground");
					} else {
						setShowHeader(false);
						setIsBurgerMenuOpen(false);
					}
					lastScrollYRef.current = currentScrollY;
					ticking = false;
				});
				ticking = true;
			}
		}
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// -----------------------
	// DYNAMIC SLIDE LOGIC
	// -----------------------
	const logoContainerRef = useRef<HTMLDivElement | null>(null);
	const secondLogoRef = useRef<HTMLHeadingElement | null>(null);
	const [shiftY, setShiftY] = useState(0);

	// Measure offsetTop of the SECOND logo (distance from top of the sliding column).
	useEffect(() => {
		function updateShift() {
			if (secondLogoRef.current && logoContainerRef.current) {
				// offsetTop of second logo relative to the sliding column (motion.div)
				const offset = secondLogoRef.current.offsetTop;
				setShiftY(offset);
			}
		}

		updateShift();

		// Recalculate on resize
		window.addEventListener("resize", updateShift);

		// ResizeObserver is available in all supported browsers.
		const ro = new ResizeObserver(updateShift);
		const container = logoContainerRef.current;
		const secondLogo = secondLogoRef.current;
		if (container) ro.observe(container);
		if (secondLogo) ro.observe(secondLogo);

		// Minor safeguard: recalc after fonts load (some custom fonts change metrics)
		const t = setTimeout(updateShift, 300);

		return () => {
			window.removeEventListener("resize", updateShift);
			ro.disconnect();
			clearTimeout(t);
		};
	}, []);

	return (
		<header
			className={`	
				grid grid-cols-8 h-15 sm:h-20
				transition-all duration-700 ease-in-out
				lg:rounded-br-2xl ml-4 mr-4 sm:ml-20 sm:mr-20 sticky top-0 z-50
				${showHeader ? "translate-y-0 " + bg : "-translate-y-full"}
      `}>
			<div className="flex items-center max-sm:col-start-1 max-sm:col-end-4">
				<Link href={"/"}>
					<div
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
						className="relative h-8 sm:h-14 overflow-hidden cursor-pointer select-none"
						style={{ width: "fit-content" }}
						ref={logoContainerRef}>
						<motion.div
							animate={{
								y: hovered ? `-${shiftY}px` : "0px",
								opacity: hovered ? 0.95 : 1,
							}}
							transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
							className="flex flex-col">
							{/* Default logo (visible initially) */}
							<h1 className="text-lg sm:text-3xl flex flex-col font-extrabold tracking-tighter leading-[0.9]">
								<span>HEY</span>
								<span className="text-primaryaccent">
									ZENEX<span className="text-dot">.</span>
								</span>
							</h1>

							{/* Hover logo (we measure this one's offsetTop) */}
							<h1
								ref={secondLogoRef}
								className="text-lg sm:text-3xl flex flex-col font-extrabold tracking-tighter leading-[0.9] mt-2">
								<span>ZEN</span>
								<span className="text-primaryaccent">
									HUZAINI
									<motion.span
										className="text-dot inline-block"
										animate={{ y: hovered ? [-2, 0, -2] : 0 }}
										transition={{
											repeat: hovered ? Infinity : 0,
											duration: 0.8,
										}}>
										.
									</motion.span>
								</span>
							</h1>
						</motion.div>
					</div>
				</Link>
			</div>

			<div className="hidden lg:flex col-span-2 col-start-2 col-end-4 place-self-center">
				<nav className="flex gap-4 text-primaryText">
					{NAV_LINKS.map(({ href, label }) => (
						<Link key={href} href={href} className="block py-2">
							{label}
						</Link>
					))}
				</nav>
			</div>

			{/* Mobile menu toggle */}
			<div className="lg:hidden flex col-start-8 col-end-8 justify-end items-center">
				<div className="flex items-center justify-center gap-4">
					<LightDarkSwitcher
						toggleDarkMode={toggleDarkMode}
						isDark={isDark}></LightDarkSwitcher>

					<button onClick={toggleMenu}>
						{!isBurgerMenuOpen ? <ThreeBars /> : <XMark />}
					</button>
				</div>

				<div
					id="mobile-menu"
					className={`lg:hidden absolute top-15 sm:top-16 left-0 w-full bg-mybackground py-2 z-50 transition-all duration-300 ease-in-out ${
						!isBurgerMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
					}`}>
					<nav className="text-primaryText">
						{NAV_LINKS.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className="block py-2"
								onClick={() => setIsBurgerMenuOpen(false)}>
								{label}
							</Link>
						))}
					</nav>
				</div>
			</div>

			{/* Desktop switch */}
			<div className="hidden lg:flex col-start-7">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="flex items-center gap-1 text-primaryText">
							<div>
								<TerminalIcon size={5}></TerminalIcon>
							</div>
							<span>
								playground
								<span className="text-dot font-extrabold">.</span>
							</span>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-9" align="start">
						<DropdownMenuGroup>
							{PLAYGROUND_LINKS.map(({ href, label }) => (
								<DropdownMenuItem key={href}>
									<Link href={href} className="text-primaryebony">
										{label}
									</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
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
