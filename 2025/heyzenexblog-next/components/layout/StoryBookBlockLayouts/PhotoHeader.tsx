import PhotoCards from "@/components/molecule/Cards/PhotoCards";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { photoMock } from "@/mock/photo";

// This can be used in the StoryBook header section, and also in the adventure view header (with some adjustments to height and gap)
//and photo collection section in the content page (with adjustments to layout and gap)
export const PhotoHeaderSection = ({
	photoLength = 5,
}: {
	photoLength?: number;
}) => {
	const photos = photoMock({ length: Math.min(photoLength, 5) });

	return (
		<div className="flex flex-col gap-5 sm:gap-10">
			{/* 1 PHOTO */}
			{photos.length === 1 && (
				<div className="grid grid-cols-1">
					<div className="h-[50vh] sm:h-[60vh]">
						<ImageWithSkeleton src={photos[0].photoUrl} />
					</div>
				</div>
			)}

			{/* 2 PHOTOS */}
			{photos.length === 2 && (
				<div className="grid grid-cols-2 gap-3 sm:gap-4">
					{photos.map((p, i) => (
						<div key={i} className="h-[40vh] sm:h-[50vh]">
							<ImageWithSkeleton src={p.photoUrl} />
						</div>
					))}
				</div>
			)}

			{/* 3 PHOTOS */}
			{photos.length === 3 && (
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
					<div className="sm:col-span-2 h-[50vh] sm:h-[60vh]">
						<ImageWithSkeleton src={photos[0].photoUrl} />
					</div>

					<div className="grid grid-rows-2 gap-3 sm:gap-4 h-[50vh] sm:h-[60vh]">
						<ImageWithSkeleton src={photos[1].photoUrl} />
						<ImageWithSkeleton src={photos[2].photoUrl} />
					</div>
				</div>
			)}

			{/* 4 PHOTOS */}
			{photos.length === 4 && (
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
					<div className="sm:col-span-2 h-[50vh] sm:h-[60vh]">
						<ImageWithSkeleton src={photos[0].photoUrl} />
					</div>

					<div className="grid grid-rows-3 gap-3 sm:gap-4 h-[50vh] sm:h-[60vh]">
						{photos.slice(1).map((p, i) => (
							<ImageWithSkeleton key={i} src={p.photoUrl} />
						))}
					</div>
				</div>
			)}

			{/* 5 PHOTOS (FINAL PERFECT LAYOUT) */}
			{photos.length >= 5 && (
				<div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-3 sm:gap-4 h-auto sm:h-[60vh]">
					{/* LEFT BIG */}
					<div className="sm:col-span-2 sm:row-span-2">
						<ImageWithSkeleton src={photos[0].photoUrl} />
					</div>

					{/* RIGHT TOP LEFT */}
					<div>
						<ImageWithSkeleton src={photos[1].photoUrl} />
					</div>

					{/* RIGHT TOP RIGHT */}
					<div>
						<ImageWithSkeleton src={photos[2].photoUrl} />
					</div>

					{/* RIGHT BOTTOM LEFT */}
					<div>
						<ImageWithSkeleton src={photos[3].photoUrl} />
					</div>

					{/* RIGHT BOTTOM RIGHT */}
					<div>
						<ImageWithSkeleton src={photos[4].photoUrl} />
					</div>
				</div>
			)}
		</div>
	);
};
