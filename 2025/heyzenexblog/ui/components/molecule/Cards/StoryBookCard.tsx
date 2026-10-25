import Link from "next/link";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { formatDate } from "@/lib/utils";
import type { StoryBookMeta } from "@/types/data";

const StoryBookCard = ({
	story,
	loading = "lazy",
}: {
	story: StoryBookMeta;
	loading?: "eager" | "lazy";
}) => {
	const date = new Date(story.datePublished);
	const formattedDate = Number.isNaN(date.getTime())
		? "StoryBook"
		: formatDate(
				story.datePublished,
				true,
				{ month: "short", year: "numeric" },
				"en-GB",
			);

	return (
		<Link
			href={`/storybook/${story.slug}`}
			aria-label={`${story.title}, ${story.city}, ${story.country}`}
			className="group relative block aspect-9/16 w-full min-w-0 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondaryforestgreen text-primarycream">
			<ImageWithSkeleton
				src={story.cover}
				alt={story.title}
				rounded="rounded-2xl"
				loading={loading}
				customClassName="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
			/>
			<div className="absolute inset-0 bg-linear-to-b from-primarymidnight/35 via-transparent to-primarymidnight/90" />
			<div className="absolute inset-x-0 top-0 space-y-5 p-5 sm:space-y-7 sm:p-6">
				<p className="text-xs font-semibold uppercase tracking-[0.14em] text-primarycream">
					StoryBook{" "}
					<span className="bg-primaryaccent p-2 items-center rounded">
						<span className="text-primarycream">
							<span className="text-dot">#</span>
							{story.id}
						</span>
					</span>
				</p>
				<h2 className="line-clamp-4 text-3xl font-extrabold leading-[1.08] text-primarycream sm:text-4xl">
					{story.title}
				</h2>
			</div>
			<div className="absolute inset-x-0 bottom-0 space-y-3 p-5 sm:p-6">
				<p className="line-clamp-4 text-sm leading-5 text-primarycream">
					{story.description}
				</p>
				<div className="flex items-center justify-between gap-3 border-t border-white/40 pt-3 text-xs text-white/80">
					<span className="text-primarycream">{formattedDate}</span>
					<span className="text-right text-primarycream">
						{story.city}
						{story.city && story.country ? ", " : ""}
						{story.country}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default StoryBookCard;
