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

const Header = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [showHeader, setShowHeader] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [bg, setBG] = useState("");
	const [hovered, setHovered] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

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
					if (currentScrollY < 80 || currentScrollY < lastScrollY) {
						setShowHeader(true);
						setBG("bg-mybackground");
					} else {
						setShowHeader(false);
						if (isBurgerMenuOpen) setIsBurgerMenuOpen(false);
					}
					setLastScrollY(currentScrollY);
					ticking = false;
				});
				ticking = true;
			}
		}
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY, isBurgerMenuOpen]);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 640);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
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

		// Use ResizeObserver so changes in font or layout also update the measurement
		let ro: ResizeObserver | null = null;
		try {
			ro = new ResizeObserver(updateShift);
			if (logoContainerRef.current) ro.observe(logoContainerRef.current);
			if (secondLogoRef.current) ro.observe(secondLogoRef.current);
		} catch (e) {
			// ResizeObserver isn't supported -> fallback handled by window resize
		}

		// Minor safeguard: recalc after fonts load (some custom fonts change metrics)
		const t = setTimeout(updateShift, 300);

		return () => {
			window.removeEventListener("resize", updateShift);
			if (ro) {
				try {
					if (logoContainerRef.current) ro.unobserve(logoContainerRef.current);
					if (secondLogoRef.current) ro.unobserve(secondLogoRef.current);
					ro.disconnect();
				} catch (e) {}
			}
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
			<div
				className={`flex items-center col-span ${
					isMobile && "col-start-1 col-end-4"
				}`}>
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
					<Link href="/" className="block py-2 ">
						Home
					</Link>
					<Link href="/error/construction" className="block py-2 ">
						PhotoBook
					</Link>
					<Link href="/storybook" className="block py-2">
						StoryBook
					</Link>
					<Link href="/me/about" className="block py-2">
						Me
					</Link>
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
						<Link
							href="/"
							className="block py-2 "
							onClick={() => setIsBurgerMenuOpen(false)}>
							Home
						</Link>
						<Link
							href="/error/construction"
							className="block py-2 "
							onClick={() => setIsBurgerMenuOpen(false)}>
							PhotoBook
						</Link>
						<Link
							href="/storybook"
							className="block py-2 "
							onClick={() => setIsBurgerMenuOpen(false)}>
							StoryBook
						</Link>
						<Link
							href="/me/about"
							className="block py-2 "
							onClick={() => setIsBurgerMenuOpen(false)}>
							Me
						</Link>
					</nav>
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
