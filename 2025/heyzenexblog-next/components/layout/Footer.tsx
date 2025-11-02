const Footer = () => {
	return (
		<div>
			<div className="bg-primaryaccent p-4 sm:pl-20 sm:pr-20 py-4 items-center text-primarycream flex justify-between">
				<div className="flex gap-1 text-xs sm:text-sm">
					<p className="text-accenttext  font-light tracking-tight">
						simply built with{" "}
						<span className="text-primaryyellow sm:font-light font-semibold dark:text-primarymidnight">
							LOVE.
						</span>
					</p>
				</div>
				<div className="text-accenttext flex-row text-[8px] sm:text-sm font-extralight text-right">
					<p>copyright 2025 @heyzenex</p>
					<div>
						<p>
							all design, photos & articles are property of{" "}
							<span className="text-primaryyellow sm:font-light font-semibold dark:text-primarymidnight">
								HEYZENEX.com
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
