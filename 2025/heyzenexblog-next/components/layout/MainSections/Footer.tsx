const Footer = () => {
	return (
		<div>
			<div className="p-4 sm:pl-20 sm:pr-20 py-4 items-center text-primarytextInvert flex justify-between">
				<div className="flex gap-1 text-xs sm:text-sm">
					<p className=" font-light tracking-tight">
						simply built with{" "}
						<span className="text-primaryaccent sm:font-extrabold font-semibold ">
							LOVE<span className="text-dot">.</span>
						</span>
					</p>
				</div>
				<div className=" flex-row text-[9px] sm:text-sm font-extralight text-right">
					<p>
						copyright {new Date().getFullYear()} @heyzenex
						<span className="text-dot">.</span>
					</p>
					<div>
						<p>
							all design, photos & articles are property of{" "}
							<span className="text-primaryaccent sm:font-extrabold font-bold ">
								HEYZENEX<span className="text-dot">.</span>com
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
