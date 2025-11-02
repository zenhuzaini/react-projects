import SectionTitle from "./SectionTitle";
import { photoMock } from "@/mock/photo";
import PhotoCards from "../molecule/Cards/PhotoCards";

const PhotoCardsSection = () => {
	const photoContent = photoMock({ length: 9 }).map((photoDetail, idx) => {
		if (idx === 0) {
			return (
				<div
					key={idx}
					className="col-span-2 relative rounded-2xl overflow-hidden h-[30vh] sm:h-[40vh] md:h-[60vh]">
					<PhotoCards key={idx} photoDetail={photoDetail} />
				</div>
			);
		}

		return (
			<div
				key={idx}
				className="relative rounded-2xl overflow-hidden h-[30vh] sm:h-[40vh] md:h-[60vh]">
				<PhotoCards key={idx} photoDetail={photoDetail} />
			</div>
		);
	});
	return (
		<div className="flex flex-col gap-5 sm:gap-10">
			<SectionTitle></SectionTitle>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
				{photoContent}
			</div>
		</div>
	);
};

export default PhotoCardsSection;
