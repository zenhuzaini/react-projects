"use client";

import Sun from "@/icons/Sun";
import { Switch } from "../ui/switch";
import Moon from "@/icons/Moon";
import { useEffect, useState } from "react";
import ThreeBars from "@/icons/ThreeBars";
import XMark from "@/icons/XMark";

const Header = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
	const [isDark, setIsDark] = useState(false);
	const toggleDarkMode = () => {
		document.documentElement.classList.toggle("dark");
		setIsDark(document.documentElement.classList.contains("dark"));
	};

	useEffect(() => {
		// Check if html element has the 'dark' class on mount
		setIsDark(document.documentElement.classList.contains("dark"));
	}, []);

	const toggleMenu = () => {
		setIsBurgerMenuOpen((prev) => !prev);
	};

	return (
		<div className="grid grid-cols-8 h-15 sm:h-20">
			<div className="flex items-center">
				<h1 className="flex flex-col text-2xl sm:text-3xl font-extrabold tracking-tighter leading-[0.8]">
					<span>HEY</span>
					<span>
						ZENEX<span className="text-primaryaccent">.</span>
					</span>
				</h1>
			</div>

			<div className="hidden sm:flex col-span-2 col-start-2 col-end-4 place-self-center">
				<nav className="flex gap-4">
					<a>Home</a>
					<a>Photography</a>
					<a>Adventures</a>
					<a>Contact</a>
				</nav>
			</div>

			<div className="sm:hidden col-start-8 col-end-8 flex justify-center items-center">
				{/* Hamburger menu visible on small screens */}
				<button
					className="sm:hidden  "
					onClick={() => {
						toggleMenu();
					}}>
					{!isBurgerMenuOpen ? <ThreeBars></ThreeBars> : <XMark></XMark>}
				</button>
				{/* Mobile menu (toggle visibility with JS, initially hidden) */}
				<div
					id="mobile-menu"
					className={`sm:hidden absolute top-16 left-0 w-full bg-mybackground px-4 py-2 z-50 ${
						!isBurgerMenuOpen && "hidden"
					}`}>
					<a href="#" className="block py-2 text-primaryText  ">
						Home
					</a>
					<a href="#" className="block py-2 text-primaryText  ">
						Photography
					</a>
					<a href="#" className="block py-2 text-primaryText ">
						Adventure
					</a>
					<a href="#" className="block py-2 text-primaryText ">
						Contact
					</a>
					<button onClick={toggleDarkMode}>
						{isDark ? <Sun /> : <Moon />}
					</button>
				</div>
			</div>

			<div className="hidden sm:flex col-start-8 col-end-8 justify-center items-center bg-primaryaccent rounded-b-2xl">
				<div className="flex gap-3 items-center">
					<Sun></Sun>
					<Switch></Switch>
					<Moon></Moon>
				</div>
			</div>
		</div>
	);
};

export default Header;
