import SectionTitle from "./SectionTitle";
import { photoMock } from "@/mock/photo";
import PhotoCards from "../../molecule/Cards/PhotoCards";
import Link from "next/link";

const PhotoCardsSection = ({ photoLength = 6 }: { photoLength?: number }) => {
	const photoContent = photoMock({ length: photoLength }).map(
		(photoDetail, idx) => {
			let colspan = "";
			if (idx === 0) {
				colspan = "col-span-2 ";
				if (photoLength === 1) {
					colspan = "col-span-3 ";
				}
			}

			// Second card in the first row (completes row)
			// no colspan needed: will fill 1 column

			// Detect if this is the last item in the last row
			const gridCols = 3;
			const remainingPhotos = photoLength - 2;

			const leftover = remainingPhotos % gridCols;
			const isLastPhoto = idx === photoLength - 1;

			if (isLastPhoto && leftover === 1) {
				colspan += "col-span-2 sm:col-span-3";
			}
			if (isLastPhoto && leftover === 2) {
				colspan += "sm:col-span-2";
			}

			return (
				<div
					key={idx}
					className={`${colspan} relative rounded-2xl overflow-hidden h-[30vh] sm:h-[40vh] md:h-[60vh] `}>
					<Link key={idx} href={`/photobook/${photoDetail.id}`}>
						<PhotoCards key={idx} photoDetail={photoDetail} />
					</Link>
				</div>
			);
		},
	);

	return (
		<div className="flex flex-col gap-5 sm:gap-10">
			<SectionTitle />
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
				{photoContent}
			</div>
		</div>
	);
};

export default PhotoCardsSection;
