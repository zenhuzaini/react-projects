import SectionTitle from "./SectionTitle";
import PostCardsLong from "../../molecule/Cards/PostCardsLong";
import PostCard from "../../molecule/Cards/PostCard";
import Link from "next/link";
import { StoryBookMeta } from "@/types/data";
import { PhotoCardDetailType } from "@/types/components";

const StoryPost = ({ stories }: { stories: StoryBookMeta[] }) => {
	const getPhotoDetail = (story: StoryBookMeta): PhotoCardDetailType => ({
		title: story.title,
		photoUrl: story.cover,
		description: story.description,
		city: story.city,
		country: story.country,
		year: Number(story.eventDateFrom.split(" ")[3]),
		month: story.eventDateFrom.split(" ")[1],
		activityType: story.activityType,
		activityDate: story.eventDateFrom,
	});

	// Sort by latest slug descending
	const sortedStories = [...stories].sort((a, b) =>
		b.slug.localeCompare(a.slug),
	);

	// Only the first story for long card
	const postContentLong =
		sortedStories.length > 0 ? (
			<Link
				href={`/storybook/${sortedStories[0].slug}`}
				key={sortedStories[0].slug}>
				<PostCardsLong photoDetail={getPhotoDetail(sortedStories[0])} />
			</Link>
		) : null;

	// All but the first story for regular cards
	const postContent = sortedStories.slice(1).map((story) => (
		<Link href={`/storybook/${story.slug}`} key={story.slug}>
			<PostCard photoDetail={getPhotoDetail(story)} />
		</Link>
	));

	return (
		<div className="flex flex-col gap-5 sm:gap-10">
			<SectionTitle
				left={
					<>
						I Will
						<br />
						TELL YOU
					</>
				}
				right={<>STORIES</>}
			/>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col">{postContentLong}</div>
				<div className="grid lg:grid-cols-5 gap-4">{postContent}</div>
			</div>
		</div>
	);
};

export default StoryPost;
