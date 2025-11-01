import { useState } from "react";
import ThreeBars from "../Icons/ThreeBars";
import XMark from "../Icons/XMark";
import Moon from "../Icons/Moon";

const Navbar = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
	const toggleMenu = () => {
		setIsBurgerMenuOpen((prev) => !prev);
	};
	return (
		<header>
			<div className="w-full bg-navbar px-3 py-4 md:px-10  text-navbartext flex justify-between items-center">
				<h1 className="text-2xl sm:text-3xl  font-extrabold tracking-tighter">
					heyzenex<span className="text-primaryyellow">.</span>
				</h1>

				{/* Nav links (hidden on mobile, flex on larger screens) */}
				<nav className="hidden sm:flex gap-5 font-semibold tracking-tighter text-navbartext">
					<a href="#" className="block py-2 zigzag-wave-hover text-navbartext">
						Home
					</a>
					<a href="#" className="block py-2 zigzag-underline text-navbartext">
						Photography
					</a>
					<a href="#" className="block py-2 zigzag-underline text-navbartext">
						Adventure
					</a>
					<a href="#" className="block py-2 zigzag-underline text-navbartext">
						Contact
					</a>
					<button
						onClick={() => document.documentElement.classList.toggle("dark")}>
						Change
					</button>
				</nav>

				{/* Hamburger menu visible on small screens */}
				<button
					className="sm:hidden inline-flex items-center px-3 py-2"
					onClick={() => {
						toggleMenu();
					}}>
					{!isBurgerMenuOpen ? <ThreeBars></ThreeBars> : <XMark></XMark>}
				</button>
				{/* Mobile menu (toggle visibility with JS, initially hidden) */}
				<div
					id="mobile-menu"
					className={`sm:hidden absolute top-16 left-0 w-full bg-navbar px-4 py-2 ${
						!isBurgerMenuOpen && "hidden"
					}`}>
					<a
						href="#"
						className="block py-2 text-navbartext hover:text-secondaryblue">
						Home
					</a>
					<a
						href="#"
						className="block py-2 text-navbartext hover:text-secondaryblue">
						Photography
					</a>
					<a
						href="#"
						className="block py-2 text-navbartext hover:text-secondaryblue">
						Adventure
					</a>
					<a
						href="#"
						className="block py-2 text-navbartext hover:text-secondaryblue">
						Contact
					</a>
					<button
						onClick={() => document.documentElement.classList.toggle("dark")}>
						<Moon></Moon>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
