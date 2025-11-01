import { useState, useEffect } from "react";
import Link from "../Icons/Link";

const PhotoWithDetail = ({
	url,
	city,
	country,
	year,
	month,
}: {
	url: string;
	city: string;
	country: string;
	year: number;
	month: string;
}) => {
	const [showDetail, setShowDetail] = useState(false);
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	// Detect if device is mobile or tablet by viewport width
	useEffect(() => {
		const checkTouchDevice = () => {
			const width = window.innerWidth;
			// Consider mobile/tablet if width <= 1024px
			setIsTouchDevice(width <= 1024);
		};

		checkTouchDevice();
		window.addEventListener("resize", checkTouchDevice);
		return () => window.removeEventListener("resize", checkTouchDevice);
	}, []);

	return (
		<div
			className="h-[min(40vh)] md:h-[min(50vh)] bg-[#D9D9D9] flex items-end rounded-sm group bg-cover bg-center"
			style={{ backgroundImage: `url(${url})` }}
			onClick={isTouchDevice ? () => setShowDetail(!showDetail) : undefined}>
			<div
				className={`bg-accentbackground w-full p-2 rounded-b-sm text-primarycream max-h-0 overflow-hidden opacity-0 transition-all duration-800 ${
					isTouchDevice && showDetail
						? "max-h-40 opacity-100"
						: "group-hover:max-h-40 group-hover:opacity-100"
				}`}>
				<div className="flex justify-between items-center">
					<div className="flex">
						<h2 className="text-accenttext text-base sm:text-3xl md:text-3xl font-semibold tracking-tighter">
							{city}
							<span className="text-primaryyellow">.</span>
						</h2>
						<div className="md:hidden">
							<Link size={3} />
						</div>
					</div>
					<div className="flex-row text-xs font-extralight text-right">
						<h2 className="text-accenttext font-semibold tracking-tight">
							{country}
						</h2>
						<p className="text-accenttext font-extralight tracking-tight">
							{month} {year}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoWithDetail;
