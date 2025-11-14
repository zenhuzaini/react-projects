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
	});

	// Only the first story for long card
	const postContentLong =
		stories.length > 0 ? (
			<Link href={`/storybook/${stories[0].slug}`} key={stories[0].slug}>
				<PostCardsLong photoDetail={getPhotoDetail(stories[0])} />
			</Link>
		) : null;

	// All but the first story for regular cards
	const postContent = stories.slice(1).map((story) => (
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
				<div className="grid sm:grid-cols-4 gap-4">{postContent}</div>
			</div>
		</div>
	);
};

export default StoryPost;
