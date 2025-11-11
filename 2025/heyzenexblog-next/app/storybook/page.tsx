import { getPaginatedStoryMetas } from "@/lib/storybook";
import React from "react";

const page = async () => {
	const story = await getPaginatedStoryMetas(2, 6);
	const stories = story.stories.map((story) => {
		return <li key={story.slug}>{story.title}</li>;
	});
	return (
		<div>
			<p>total pages {story.totalPages}</p>
			<p>total n {story.total}</p>
			<p>what is current page {story.currentPage}</p>
			<p>what is stories</p>
			<ul>{stories}</ul>
		</div>
	);
};

export default page;
