const Footer = () => {
	return (
		<div>
			<div className="bg-primaryorange h-50 px-10 py-4 items-center text-primarycream hidden sm:flex justify-between">
				<p className="text-sm font-light tracking-tight">
					simply built with{" "}
					<span className="text-primaryyellow font-extrabold">love.</span>
				</p>
				<div className="flex-row text-xs font-extralight text-right">
					<p>copyright 2025 @heyzenex</p>
					<p>
						all design, photos & articles are property of{" "}
						<span className="text-primaryyellow">heyzenex.com</span>
					</p>
				</div>
			</div>
			<div className="bg-accentbackground px-10 py-4 items-center text-primarycream flex justify-between">
				<p className="text-accenttext text-sm font-light tracking-tight">
					simply built with
					<span className="text-primaryyellow font-extrabold dark:text-primarymidnight">
						love.
					</span>
				</p>
				<div className="text-accenttext flex-row text-xs font-extralight text-right">
					<p>copyright 2025 @heyzenex</p>
					<p>
						all design, photos & articles are property of
						<span className="text-primaryyellow dark:text-primarymidnight">
							heyzenex.com
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
