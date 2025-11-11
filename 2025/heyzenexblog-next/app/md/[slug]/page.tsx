import { animationForArrow } from "@/animation/animation";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import { photoMock, photoMockStatic } from "@/mock/photo";
import { faker } from "@faker-js/faker";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import MyContent, {
	metadata,
} from "@/contents/mystorybook/001-welcome-heyzenex.mdx";
import { storyContentsMock } from "@/mock/storyContent";
import ShortDescription from "@/components/layout/StoryBookBlockLayouts/1_ShortDescription/ShortDescription";
import EyeSymbol from "@/icons/EyeSymbol";
import HeartOutlined from "@/icons/HeartOutlined";

const Story = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	const createdAt = faker.date.anytime().toLocaleDateString("en-GB", {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
	const storyCover = faker.image.url();
	const storyTitle = faker.lorem.sentence(4);
	const storyDescription = faker.lorem.paragraphs(1);
	const storyPhotoUrls = photoMockStatic;
	const storyContent = storyContentsMock;
	const totalLike = 17;
	const totalView = 200;

	return (
		<article className="flex flex-col gap-2 ">
			{/* info top */}
			<section className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<div className="flex flex-col text-xs md:text-lg">
						<p className="text-primarytextInvert font-extralight">StoryBook</p>
						<p className="text-[10px] text-primarytextInvert md:text-sm tracking-tight">
							<span className="font-extralight">Written on</span>{" "}
							{metadata.datePublished}
						</p>
					</div>
					<div className="bg-primaryaccent w-fit sm:text-base text-[10px] p-2 flex justify-center items-center rounded">
						<h3 className="text-primarycream font-extrabold">
							<span className="text-dot">#</span>
							{metadata.id}
						</h3>
					</div>
				</div>
				<div className="hidden md:flex">
					<Separator className="bg-primaryaccent"></Separator>
				</div>
			</section>

			{/* hero title & sats */}
			<section className="flex flex-col gap-2 sm:gap-4">
				<div className="relative rounded-2xl w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
					<ImageWithSkeleton alt={metadata.description} src={metadata.cover} />
					<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

					<div className="absolute bottom-0 m-5 w-[20%]">
						<div
							className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
							<h1 className="text-accenttext text-2xl sm:text-3xl md:text-6xl font-extrabold tracking-tighter leading-[0.8]">
								{metadata.title}
								<span className="text-dot">.</span>
							</h1>
						</div>
					</div>
				</div>
				{/* Stats */}
				<div className="flex justify-between">
					<div className="flex gap-0 sm:gap-2">
						<div className="flex text-sm md:text-lg sm:gap-2  pl-2 pr-2 rounded-lg items-center">
							<EyeSymbol className="stroke-primaryaccent" size={4}></EyeSymbol>{" "}
							<span className="text-primarytextInvert">12.k</span>
						</div>
						<div className="flex text-sm md:text-lg gap-1 sm:gap-2 pl-2 pr-2 rounded-lg items-center ">
							<HeartOutlined
								className="stroke-primaryaccent"
								size={4}></HeartOutlined>
							<span className="text-primarytextInvert">100</span>
						</div>
					</div>
					<div className="hidden md:flex gap-2">
						<div className="flex items-center justify-center">
							<h6 className="text-primarycream p-2 rounded-sm bg-primaryaccent text-sm">
								<span className="text-dot">#</span>adventure
							</h6>
						</div>
						<div className="flex items-center justify-center">
							<h6 className="text-primarycream p-2 rounded-sm bg-primaryaccent text-sm">
								<span className="text-dot">#</span>travel
							</h6>
						</div>
						<div className="flex items-center justify-center">
							<h6 className="text-primarycream p-2 rounded-sm bg-primaryaccent text-sm">
								<span className="text-dot">#</span>brazil
							</h6>
						</div>
					</div>
				</div>
			</section>

			{/* content */}
			<section className="lg:ml-[20%] lg:mr-[20%] flex flex-col gap-2 sm:gap-5 mt-[3%] rounded-3xl dark:bg-transparent ">
				<div className="text-center">
					<ShortDescription text={storyDescription}></ShortDescription>
				</div>

				<MyContent></MyContent>

				<div className="flex justify-between mt-[5%]">
					<Link href={`/`}>
						<div className="text-primaryText flex gap-1">
							<ChevronLeft />
							Home
						</div>
					</Link>

					<Link href={`/storybook/1`}>
						<div className="text-primaryText flex gap-1">
							<span>Next StoryBook</span>
							<ChevronRight></ChevronRight>
						</div>
					</Link>
				</div>
			</section>
		</article>
	);
};

export default Story;

export function generateStaticParams() {
	// TODO, this needs to be updated to automatically load all of the slugs
	return [{ slug: "001-welcome-heyzenex" }];
}

export const dynamicParams = false;
