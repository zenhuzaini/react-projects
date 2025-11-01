import { useState, useEffect } from "react";

const Jumbotron = () => {
	const hi = ["Hi", "Cześć", "Ciao", "مرحبا", "Привет"];

	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [charIndex, setCharIndex] = useState(0);

	useEffect(() => {
		const currentWord = hi[currentIndex];

		const typingSpeed = 300; // slower typing speed (ms per character)
		const deletingSpeed = 200; // slower deleting speed (ms per character)

		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					setDisplayedText(currentWord.substring(0, charIndex + 1));
					setCharIndex((prev) => prev + 1);
					if (charIndex + 1 === currentWord.length) {
						setTimeout(() => setIsDeleting(true), 1500); // longer pause before deleting
					}
				} else {
					setDisplayedText(currentWord.substring(0, charIndex - 1));
					setCharIndex((prev) => prev - 1);
					if (charIndex - 1 === 0) {
						setTimeout(() => {
							setIsDeleting(false);
							setCurrentIndex((prev) => (prev + 1) % hi.length);
							setCharIndex(0);
						}, 800); // pause between words
					}
				}
			},
			isDeleting ? deletingSpeed : typingSpeed
		);

		return () => clearTimeout(timeout);
	}, [charIndex, isDeleting, currentIndex, hi]);

	const cursorStyle = {
		display: "inline-block",
		width: "10px",

		marginLeft: "2px",
		animation: "blink 1s step-start infinite",
	};

	return (
		<div className="bg-primaryblue px-10 py-20">
			<h2 className="text-primarywhite  text-6xl sm:text-9xl font-semibold tracking-tighter">
				{displayedText}
				<span style={cursorStyle}>|</span>
			</h2>
			<h2 className="text-primarywhite px-2 text-2xl">I'm Zen</h2>
			<style>
				{`
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
			</style>
		</div>
	);
};

export default Jumbotron;
