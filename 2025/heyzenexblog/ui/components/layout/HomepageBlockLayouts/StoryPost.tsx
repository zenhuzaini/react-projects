"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import PostCardsLong from "../../molecule/Cards/PostCardsLong";
import PostCard from "../../molecule/Cards/PostCard";
import Link from "next/link";
import { StoryBookMeta } from "@/types/data";
import { PhotoCardDetailType } from "@/types/components";

const StoryPost = ({ stories }: { stories: StoryBookMeta[] }) => {
	const prefersReducedMotion = useReducedMotion();
	const getCardMotion = (index: number) => ({
		initial: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: prefersReducedMotion ? 0 : -8 },
		whileHover: prefersReducedMotion
			? undefined
			: {
					y: -4,
					scale: 1.025,
					transition: { duration: 0.22, ease: "easeOut" as const },
				},
		transition: {
			opacity: {
				duration: prefersReducedMotion ? 0.01 : 0.32,
				delay: prefersReducedMotion ? 0 : index * 0.04,
			},
			y: {
				duration: prefersReducedMotion ? 0.01 : 0.32,
				delay: prefersReducedMotion ? 0 : index * 0.04,
				ease: [0.22, 1, 0.36, 1] as const,
			},
		},
	});

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
			<motion.div
				key={sortedStories[0].slug}
				{...getCardMotion(0)}
				className="relative w-full">
				<Link
					href={`/storybook/${sortedStories[0].slug}`}
					className="group block w-full">
					<PostCardsLong photoDetail={getPhotoDetail(sortedStories[0])} />
				</Link>
			</motion.div>
		) : null;

	// All but the first story for regular cards
	const postContent = sortedStories.slice(1).map((story, index) => (
		<motion.div
			key={story.slug}
			{...getCardMotion(index + 1)}
			className="relative min-w-0">
			<Link
				href={`/storybook/${story.slug}`}
				className="group block h-full w-full">
				<PostCard photoDetail={getPhotoDetail(story)} />
			</Link>
		</motion.div>
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
				<div className="flex flex-col">
					<AnimatePresence>{postContentLong}</AnimatePresence>
				</div>
				<div className="grid lg:grid-cols-5 gap-4">
					<AnimatePresence>{postContent}</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default StoryPost;
