import { animationForArrow } from "@/animation/animation";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { photoMock } from "@/mock/photo";
import { faker } from "@faker-js/faker";

export const PhotoHeaderSection = ({
	photoLength = 5,
	articleTitle = "My Adventure in the Mountains",
}: {
	photoLength?: number;
	articleTitle?: string;
}) => {
	const photos = photoMock({ length: Math.min(photoLength, 5) });

	return (
		<div className="flex flex-col gap-4 sm:gap-6">
			{/* 1 PHOTO */}
			{photos.length === 1 && (
				<div className="relative grid grid-cols-1 h-[45vh] sm:h-[60vh]">
					<ImageWithSkeleton src={photos[0].photoUrl} />
				</div>
			)}

			{/* 2 PHOTOS */}
			{photos.length === 2 && (
				<div className="grid grid-cols-2 gap-3 sm:gap-4 h-[40vh] sm:h-[50vh]">
					{photos.map((p, i) => (
						<ImageWithSkeleton key={i} src={p.photoUrl} />
					))}
				</div>
			)}

			{/* 3 PHOTOS */}
			{photos.length === 3 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-2 gap-3 sm:gap-4 h-[50vh] sm:h-[60vh]">
					{/* big image */}
					<div className="col-span-2 sm:col-span-2 row-span-2">
						<ImageWithSkeleton src={photos[0].photoUrl} />
					</div>

					<ImageWithSkeleton src={photos[1].photoUrl} />
					<ImageWithSkeleton src={photos[2].photoUrl} />
				</div>
			)}

			{/* 4 PHOTOS */}
			{photos.length === 4 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-2 gap-3 sm:gap-4 h-[50vh] sm:h-[60vh]">
					{/* big */}
					<div className="col-span-2 sm:col-span-2 row-span-2">
						<ImageWithSkeleton src={photos[0].photoUrl} />
					</div>

					{photos.slice(1).map((p, i) => (
						<ImageWithSkeleton key={i} src={p.photoUrl} />
					))}
				</div>
			)}

			{/* 5 PHOTOS */}
			{photos.length >= 5 && (
				<div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-3 sm:grid-rows-2 gap-3 sm:gap-4 h-[55vh] sm:h-[60vh]">
					{/* big hero */}
					<div className="col-span-2 row-span-2 sm:col-span-2 sm:row-span-2">
						<ImageWithSkeleton src={photos[0].photoUrl} />
					</div>

					<ImageWithSkeleton src={photos[1].photoUrl} />
					<ImageWithSkeleton src={photos[2].photoUrl} />
					<ImageWithSkeleton src={photos[3].photoUrl} />
					<ImageWithSkeleton src={photos[4].photoUrl} />
				</div>
			)}
		</div>
	);
};
