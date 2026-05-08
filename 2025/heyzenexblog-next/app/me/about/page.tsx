import Paragraph from "@/components/layout/StoryBookBlockLayouts/2_BasicPharagraph/Paragraph";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";

const page = () => {
	const content = (
		<>
			<Paragraph text="I like hiking in the mountains and cycling on quiet roads through forests and hills, enjoying nature and the adventure that comes with getting a little lost. Sometimes it feels like I’m meant to be a traveler or live somewhere wild, far from the city—maybe even like Tarzan! But that’s tough these days." />
			<Paragraph text="This blog is here for me to share experiences and random thoughts. It’s meant to be a little diary or record of my life, and maybe it will help someone out there. I don’t expect many readers, since most people watch YouTube these days—but you can follow my channel too!" />
		</>
	);

	return (
		<div className="h-full flex flex-col">
			<div className="grid grid-cols-4 grid-rows-4 gap-2 md:gap-4 max-h-[30vh] md:min-h-[calc(100svh-25svh)]">
				{/* Big image (top left, spans two columns and two rows) */}
				<div className="col-span-2 row-span-2  rounded-2xl overflow-hidden flex flex-col justify-between">
					<div className="text-6xl lg:text-9xl text-primaryText  h-full flex flex-col p-2 md:p-6  font-extrabold tracking-tighter leading-[0.8] ">
						<h2>Hey</h2>
						<h2 className="text-primaryaccent font-style-heading">There!</h2>
					</div>

					<div className="text-primaryText p-6 leading-4 hidden md:flex">
						<p className="text-md">
							My name is <span className="text-primaryaccent font-extrabold">Zen</span>. Since I was a kid,
							I’ve loved looking at the sky for hours in the fields near my grandma’s house, watching
							clouds and hoping to see something cool. The night sky is my favorite, especially if I spot a
							shooting star.
						</p>
					</div>
				</div>
				{/* Text block (right side, fills all rows in rightmost column) */}
				<div className="col-span-2 row-span-4 flex flex-col h-full w-full">
					<ImageWithSkeleton src="https://res.cloudinary.com/djufavji1/image/upload/v1762553897/IMG_5881_Original_jloeub.jpg" />
				</div>
				{/* Two smaller images (bottom left, each in a single row of the left two columns) */}
				<div className="col-span-1 row-span-2 bg-amber-400 rounded-2xl overflow-hidden">
					<ImageWithSkeleton src="https://res.cloudinary.com/djufavji1/image/upload/v1762553897/IMG_5881_Original_jloeub.jpg" />
				</div>
				<div className="col-span-1 row-span-2 bg-amber-400 rounded-2xl overflow-hidden">
					<ImageWithSkeleton src="https://res.cloudinary.com/djufavji1/image/upload/v1762553897/IMG_5881_Original_jloeub.jpg" />
				</div>
			</div>

			{content}
		</div>
	);
};

export default page;
