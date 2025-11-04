import { faker } from "@faker-js/faker";
import { ArrowRight } from "lucide-react";
import React from "react";
import { ImageWithSkeleton } from "../molecule/ImageWithSkeleton";
import SectionTitle from "./SectionTitle";
import { photoMock } from "@/mock/photo";
import PostCardsLong from "../molecule/Cards/PostCardsLong";
import PostCard from "../molecule/Cards/PostCard";
import Link from "next/link";

const StoryPost = () => {
	const postContentLong = photoMock({ length: 1 }).map((photoDetail, idx) => (
		<Link key={idx} href={`/story/${photoDetail.id}`}>
			<PostCardsLong key={idx} photoDetail={photoDetail} />
		</Link>
	));
	const postContent = photoMock({ length: 4 }).map((photoDetail, idx) => (
		<Link key={idx} href={`/story/${photoDetail.id}`}>
			<PostCard key={idx} photoDetail={photoDetail} />
		</Link>
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
				right={<>STORIES</>}></SectionTitle>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col">{postContentLong}</div>
				<div className="grid sm:grid-cols-2 gap-4">{postContent}</div>
			</div>
		</div>
	);
};

export default StoryPost;
