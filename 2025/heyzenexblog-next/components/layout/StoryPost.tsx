import { faker } from "@faker-js/faker";
import { ArrowRight } from "lucide-react";
import React from "react";
import { ImageWithSkeleton } from "../molecule/ImageWithSkeleton";
import SectionTitle from "./SectionTitle";
import { photoMock } from "@/mock/photo";
import PostCards from "../molecule/Cards/PostCards";

const StoryPost = () => {
	const postContent = photoMock({ length: 3 }).map((photoDetail, idx) => (
		<PostCards key={idx} photoDetail={photoDetail} />
	));
	return (
		<div className="flex flex-col gap-5 sm:gap-10">
			<SectionTitle
				left={
					<>
						I WIll
						<br />
						TELL YOU
					</>
				}
				right={<>STORIES.</>}></SectionTitle>

			<div className="flex flex-col gap-4">{postContent}</div>
		</div>
	);
};

export default StoryPost;
