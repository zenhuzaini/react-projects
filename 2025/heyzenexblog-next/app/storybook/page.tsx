import SectionTitle from "@/components/layout/HomepageBlockLayouts/SectionTitle";
import { getPaginatedStoryMetas } from "@/lib/storybook";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

const page = async () => {
	const story = await getPaginatedStoryMetas(1, 50);
	const stories = story.stories.map((story, idx) => {
		return (
			<li key={story.slug} className="flex gap-3">
				<span>{idx}.</span>
				<Link href={`/storybook/${story.slug}`}>{story.title}</Link>
			</li>
		);
	});
	return (
		<div className="text-primarytextInvert flex flex-col gap-2">
			<SectionTitle left={"My"} right={"STORIES"}></SectionTitle>

			<ul>{stories}</ul>
		</div>
	);
};

export default page;
