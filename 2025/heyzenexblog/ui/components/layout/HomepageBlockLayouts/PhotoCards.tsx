import SectionTitle from "./SectionTitle";
import { photoMock } from "@/mock/photo";
import PhotoCards from "../../molecule/Cards/PhotoCards";
import Link from "next/link";
import { PhotoBookMeta } from "@/types/data";
import { PhotoCardDetailType } from "@/types/components";
import { EMPTY_STRING } from "@/const/vars";

const PhotoCardsSection = ({ photoStory }: { photoStory: PhotoBookMeta[] }) => {
	const getPhotoDetail = (photo: PhotoBookMeta): PhotoCardDetailType => ({
		title: photo.title,
		photoUrl: photo.cover,
		description: photo.description,
		city: photo.city,
		country: photo.country,
		year: Number(photo.eventDateFrom.split(" ")[3]),
		month: photo.eventDateFrom.split(" ")[1],
		activityType: photo.activityType,
		activityDate: photo.eventDateFrom,
	});

	// Sort by latest slug descending
	const sortedPhotobook = [...photoStory].sort((a, b) =>
		b.slug.localeCompare(a.slug),
	);

	const photoContent = sortedPhotobook.map((photoDetail, idx) => {
		let colspan = EMPTY_STRING;
		if (idx === 0) {
			colspan = "col-span-2 ";
			if (photoStory.length === 1) {
				colspan = "col-span-3 ";
			}
		}

		// Second card in the first row (completes row)
		// no colspan needed: will fill 1 column

		// Detect if this is the last item in the last row
		const gridCols = 3;
		const remainingPhotos = photoStory.length - 2;

		const leftover = remainingPhotos % gridCols;
		const isLastPhoto = idx === photoStory.length - 1;

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
				<Link key={idx} href={`/photobook/${photoDetail.slug}`}>
					<PhotoCards key={idx} photoDetail={getPhotoDetail(photoDetail)} />
				</Link>
			</div>
		);
	});

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
